import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export default function RubikCube({ width = 500, height = 500 }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // ── Scene / Camera ────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 100)
    camera.position.set(8, 6, 10)
    camera.lookAt(0, 0, 0)

    // ── Environment (reflejos realistas en el metal) ──────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
    pmremGenerator.dispose()

    // ── Lighting ──────────────────────────────────────────────
    // Ambiente MUY bajo a propósito: no queremos que todo el cubo se vea
    // parejo. La iluminación real viene de spotlights angostos con target,
    // que sólo "pegan" en una franja/sección del cubo, como en la referencia.
    scene.add(new THREE.AmbientLight(0xffffff, 0.12))
    scene.add(new THREE.HemisphereLight(0x8899aa, 0x050505, 0.08))

    // Spot principal: cono angosto, apunta a una esquina superior del cubo.
    const spot1 = new THREE.SpotLight(0xfff2e0, 55, 30, 0.22, 0.55, 1.2)
    spot1.position.set(5, 7, 6)
    const spot1Target = new THREE.Object3D()
    spot1Target.position.set(0.6, 0.5, 0.6)
    scene.add(spot1Target)
    spot1.target = spot1Target
    scene.add(spot1)
    scene.add(spot1Target)

    // Spot secundario: más frío, pega en otra esquina/lateral distinta.
    const spot2 = new THREE.SpotLight(0x8fbfff, 30, 28, 0.18, 0.6, 1.4)
    spot2.position.set(-6, -3, 5)
    const spot2Target = new THREE.Object3D()
    spot2Target.position.set(-0.4, -0.5, 0.4)
    scene.add(spot2Target)
    spot2.target = spot2Target
    scene.add(spot2)

    // Un tercer spot muy angosto, tipo "línea de luz" sobre un solo cubito.
    const spot3 = new THREE.SpotLight(0xffffff, 40, 22, 0.09, 0.3, 1.6)
    spot3.position.set(1, 8, 3)
    const spot3Target = new THREE.Object3D()
    spot3Target.position.set(0.97, 0.97, 0.3)
    scene.add(spot3Target)
    spot3.target = spot3Target
    scene.add(spot3)

    // Relleno mínimo para que las zonas fuera del spot no sean negro absoluto,
    // pero sin competir en intensidad con los spots.
    const fillLight = new THREE.DirectionalLight(0xbcd4ff, 0.14)
    fillLight.position.set(-6, 2, -3)
    scene.add(fillLight)

    // ── Texturas procedurales (canvas) ────────────────────────
    // Patrón de puntos / malla (cara verde)
    function makeDotTexture(base = '#123321', dot = '#040f08') {
      const size = 256
      const c = document.createElement('canvas')
      c.width = c.height = size
      const ctx = c.getContext('2d')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, size, size)
      const cell = 16
      for (let y = cell / 2; y < size; y += cell) {
        for (let x = cell / 2; x < size; x += cell) {
          const r = 4.6
          const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
          grad.addColorStop(0, dot)
          grad.addColorStop(1, '#010301')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      const tex = new THREE.CanvasTexture(c)
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping
      tex.colorSpace = THREE.SRGBColorSpace
      return tex
    }

    // Grano / speckle metálico MUY sutil, tintado por color base
    function makeSpeckleTexture(base = '#3f3f3f') {
      const size = 256
      const c = document.createElement('canvas')
      c.width = c.height = size
      const ctx = c.getContext('2d')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, size, size)
      const imgData = ctx.getImageData(0, 0, size, size)
      const d = imgData.data
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() - 0.5) * 8
        d[i] += n; d[i + 1] += n; d[i + 2] += n
      }
      ctx.putImageData(imgData, 0, 0)
      // muy pocas motas brillantes, tipo micro-reflejo
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * size
        const y = Math.random() * size
        ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.07})`
        ctx.fillRect(x, y, 1, 1)
      }
      const tex = new THREE.CanvasTexture(c)
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping
      tex.colorSpace = THREE.SRGBColorSpace
      return tex
    }

    // Cara lisa/glossy negra, casi sin textura, solo micro-grano
    function makeGlossyTexture() {
      const size = 256
      const c = document.createElement('canvas')
      c.width = c.height = size
      const ctx = c.getContext('2d')
      ctx.fillStyle = '#0e0e0e'
      ctx.fillRect(0, 0, size, size)
      const imgData = ctx.getImageData(0, 0, size, size)
      const d = imgData.data
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() - 0.5) * 8
        d[i] += n; d[i + 1] += n; d[i + 2] += n
      }
      ctx.putImageData(imgData, 0, 0)
      const tex = new THREE.CanvasTexture(c)
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping
      tex.colorSpace = THREE.SRGBColorSpace
      return tex
    }

    const dotTex = makeDotTexture('#3a3a3a', '#0a0a0a')        // malla con agujeritos, gris medio
    const speckleTexOrange = makeSpeckleTexture('#101010')      // negro
    const speckleTexGreen  = makeSpeckleTexture('#4d4d4d')      // gris ceniza
    const glossyTex = makeGlossyTexture()                       // negro glossy

    // ── Materials — negro / gris ceniza / malla de agujeritos ─
    const matGreenGrid = new THREE.MeshPhysicalMaterial({
      color: 0x3a3a3a,
      map: dotTex,
      roughness: 0.5,
      metalness: 0.4,
      clearcoat: 0.3,
      clearcoatRoughness: 0.3,
      envMapIntensity: 1.2,
    })
    const matGreen = new THREE.MeshPhysicalMaterial({
      color: 0x4d4d4d,
      map: speckleTexGreen,
      roughness: 0.35,
      metalness: 0.55,
      clearcoat: 0.5,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.5,
    })
    const matOrange = new THREE.MeshPhysicalMaterial({
      color: 0x0e0e0e,
      map: speckleTexOrange,
      roughness: 0.2,
      metalness: 0.35,
      clearcoat: 0.9,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.7,
    })

    // Costuras: SIN relieve, SIN brillo -> mate total, cero clearcoat, para
    // que el bevel no se lea como línea marcada / emboss iluminado.
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: 0x202020,
      roughness: 0.95,
      metalness: 0.1,
      clearcoat: 0.0,
      envMapIntensity: 0.25,
    })
    const cornerMat = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      roughness: 0.95,
      metalness: 0.1,
      clearcoat: 0.0,
      envMapIntensity: 0.25,
    })

    const FACE_MATS = {
      px: matGreen, nx: matOrange,
      py: matGreenGrid, ny: matOrange,
      pz: matGreen, nz: matOrange,
    }

    const SP = 1.06
    const CS = 0.97
    const ROUND = CS * 0.05
    const EW = 0.006   // costuras casi invisibles, sin borde marcado
    const SO = CS / 2 + 0.002
    const SW = CS * 0.97
    const ST = 0.014

    // ── Build a single cubie ──────────────────────────────────
    function buildCubie(gx, gy, gz) {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(new THREE.BoxGeometry(CS, CS, CS), matGreen))

      const h = CS / 2
      ;[
        [h,h,0,EW,EW,CS],[-h,h,0,EW,EW,CS],[h,-h,0,EW,EW,CS],[-h,-h,0,EW,EW,CS],
        [0,h,h,CS,EW,EW],[0,-h,h,CS,EW,EW],[0,h,-h,CS,EW,EW],[0,-h,-h,CS,EW,EW],
        [h,0,h,EW,CS,EW],[-h,0,h,EW,CS,EW],[h,0,-h,EW,CS,EW],[-h,0,-h,EW,CS,EW],
      ].forEach(([x,y,z,w,ht,d]) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w,ht,d), edgeMat)
        m.position.set(x,y,z); g.add(m)
      })

      // Esquinas: SIN puntos/bolitas visibles -> se elimina por completo.
      // (antes había esferas en cada vértice; el usuario las quiere fuera)

      ;[
        { key:'px', cond:gx===1,  pos:[SO,0,0],  rot:[0,Math.PI/2,0] },
        { key:'nx', cond:gx===-1, pos:[-SO,0,0], rot:[0,-Math.PI/2,0] },
        { key:'py', cond:gy===1,  pos:[0,SO,0],  rot:[-Math.PI/2,0,0] },
        { key:'ny', cond:gy===-1, pos:[0,-SO,0], rot:[Math.PI/2,0,0] },
        { key:'pz', cond:gz===1,  pos:[0,0,SO],  rot:[0,0,0] },
        { key:'nz', cond:gz===-1, pos:[0,0,-SO], rot:[0,Math.PI,0] },
      ].forEach(({ key, cond, pos, rot }) => {
        if (!cond) return
        const s = new THREE.Mesh(new THREE.BoxGeometry(SW,SW,ST), FACE_MATS[key])
        s.position.set(...pos); s.rotation.set(...rot); g.add(s)
      })

      g.position.set(gx*SP, gy*SP, gz*SP)
      g.userData = { gx, gy, gz }
      return g
    }

    // ── Build 3×3×3 ──────────────────────────────────────────
    const root = new THREE.Group()
    scene.add(root)
    const pieces = []

    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const p = buildCubie(x, y, z)
          root.add(p)
          pieces.push(p)
        }

    const pivot = new THREE.Group()
    root.add(pivot)

    // ── Rotación global: auto + drag ──────────────────────────
    let autoRotY   = 0
    let autoRotX   = 0
    let autoRotZ   = 0

    let isDragging  = false
    let dragStartX  = 0
    let dragStartY  = 0
    let dragRotY    = 0
    let dragRotX    = 0
    let velX        = 0
    let velY        = 0
    let lastDX      = 0
    let lastDY      = 0

    const DRAG_SENSITIVITY = 0.008

    function getClientXY(e) {
      if (e.touches) return { cx: e.touches[0].clientX, cy: e.touches[0].clientY }
      return { cx: e.clientX, cy: e.clientY }
    }

    function onPointerDown(e) {
      isDragging = true
      const { cx, cy } = getClientXY(e)
      dragStartX = cx
      dragStartY = cy
      velX = 0; velY = 0
    }

    function onPointerMove(e) {
      if (!isDragging) return
      const { cx, cy } = getClientXY(e)
      lastDX = cx - dragStartX
      lastDY = cy - dragStartY
      dragStartX = cx
      dragStartY = cy
      dragRotY += lastDX * DRAG_SENSITIVITY
      dragRotX += lastDY * DRAG_SENSITIVITY
      // Sin límite en X: así nunca hay un salto/snap al agarrar el cubo
      // después de que el idle lo haya llevado a un ángulo "libre".
    }

    function onPointerUp() {
      if (!isDragging) return
      isDragging = false
      velY = lastDX * DRAG_SENSITIVITY * 0.3
      velX = lastDY * DRAG_SENSITIVITY * 0.3
      lastDX = 0; lastDY = 0
    }

    const el = renderer.domElement
    el.addEventListener('mousedown',  onPointerDown)
    el.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('mousemove',  onPointerMove)
    window.addEventListener('touchmove',  onPointerMove, { passive: true })
    window.addEventListener('mouseup',    onPointerUp)
    window.addEventListener('touchend',   onPointerUp)

    // ── Movimientos de capas ──────────────────────────────────
    const moveSeq = [
      { a:'y', s:1,  d:1  }, { a:'x', s:-1, d:-1 },
      { a:'z', s:1,  d:1  }, { a:'y', s:-1, d:-1 },
      { a:'x', s:1,  d:1  }, { a:'z', s:0,  d:-1 },
      { a:'y', s:0,  d:1  }, { a:'x', s:0,  d:-1 },
      { a:'z', s:-1, d:1  }, { a:'y', s:1,  d:-1 },
      { a:'x', s:-1, d:1  }, { a:'z', s:1,  d:-1 },
    ]

    let mIdx        = 0
    let isAnimating = false
    let pauseFrames = 0
    const PAUSE     = 90
    const HALF_PI   = Math.PI / 2
    const DURATION  = 55
    let animAxis    = 'y'
    let animDir     = 1
    let animFrame   = 0

    function startMove(mv) {
      isAnimating = true
      animAxis  = mv.a
      animDir   = mv.d
      animFrame = 0

      pieces.forEach(p => {
        const coord = mv.a === 'x' ? p.userData.gx
                    : mv.a === 'y' ? p.userData.gy
                    :                p.userData.gz
        if (coord === mv.s) {
          root.remove(p)
          pivot.add(p)
        }
      })
      pivot.rotation.set(0, 0, 0)
    }

    function easeInOut(t) {
      return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2
    }

    // Objetos reutilizables: crearlos de nuevo en cada pieza/cada movimiento
    // genera basura que el GC tiene que recolectar, y eso es lo que causa
    // el micro-freeze al interactuar justo cuando termina un giro.
    const _worldPos    = new THREE.Vector3()
    const _worldQuat   = new THREE.Quaternion()
    const _rootInverse = new THREE.Matrix4()
    const _rootQuat    = new THREE.Quaternion()

    function endMove() {
      pivot.rotation[animAxis] = animDir * HALF_PI
      pivot.updateMatrixWorld(true)

      const toDetach = [...pivot.children].filter(c => pieces.includes(c))
      toDetach.forEach(p => {
        pivot.updateMatrixWorld(true)
        p.getWorldPosition(_worldPos)
        p.getWorldQuaternion(_worldQuat)

        pivot.remove(p)
        root.add(p)

        _rootInverse.copy(root.matrixWorld).invert()
        _worldPos.applyMatrix4(_rootInverse)

        p.position.x = Math.round(_worldPos.x / SP) * SP
        p.position.y = Math.round(_worldPos.y / SP) * SP
        p.position.z = Math.round(_worldPos.z / SP) * SP

        p.userData.gx = Math.round(p.position.x / SP)
        p.userData.gy = Math.round(p.position.y / SP)
        p.userData.gz = Math.round(p.position.z / SP)

        root.getWorldQuaternion(_rootQuat)
        _rootQuat.invert()
        p.quaternion.copy(_rootQuat).multiply(_worldQuat)
      })

      pivot.rotation.set(0, 0, 0)
      isAnimating = false
      pauseFrames = 0
      mIdx = (mIdx + 1) % moveSeq.length
    }

    // ── Animation loop ────────────────────────────────────────
    let t = 0
    let rafId

    // Idle = "tumbling" real: en vez de calcular el ángulo como función
    // del tiempo (seno, que SIEMPRE vuelve a su punto de partida), integro
    // una velocidad angular por eje que varía sola con el tiempo. El ángulo
    // solo acumula -> nunca hay retorno ni reinicio, rotación libre continua
    // en direcciones que van cambiando.
    let idleVelX = 0
    let idleVelY = 0.02
    let idleVelZ = 0
    let idleTargetVelX = 0
    let idleTargetVelY = 0.02
    let idleTargetVelZ = 0
    let idleRetimer      = 0
    let idleRetimerEvery = 1.2

    function loop() {
      rafId = requestAnimationFrame(loop)
      t += 0.016

      if (isDragging) {
        autoRotY = dragRotY
        autoRotX = dragRotX
        autoRotZ = 0
      } else {
        if (Math.abs(velY) > 0.0001 || Math.abs(velX) > 0.0001) {
          dragRotY += velY
          dragRotX += velX
          velY *= 0.92
          velX *= 0.92
          autoRotY = dragRotY
          autoRotX = dragRotX
          autoRotZ = 0
        } else {
          // Cada pocos segundos elegimos nuevas velocidades objetivo -> el
          // cubo cambia de dirección/rumbo sin nunca detenerse ni volver.
          idleRetimer += 0.016
          if (idleRetimer > idleRetimerEvery) {
            idleTargetVelX = (Math.random() - 0.5) * 0.042
            idleTargetVelY = (Math.random() - 0.5) * 0.042
            idleTargetVelZ = (Math.random() - 0.5) * 0.028
            idleRetimerEvery = 1.5 + Math.random() * 3
            idleRetimer = 0
          }
          // Interpolación suave de velocidad -> los cambios de rumbo son
          // graduales, nunca un salto brusco de ángulo.
          idleVelX += (idleTargetVelX - idleVelX) * 0.02
          idleVelY += (idleTargetVelY - idleVelY) * 0.02
          idleVelZ += (idleTargetVelZ - idleVelZ) * 0.02

          autoRotX += idleVelX
          autoRotY += idleVelY
          autoRotZ += idleVelZ
          dragRotY = autoRotY
          dragRotX = autoRotX
        }
      }

      root.rotation.y = autoRotY
      root.rotation.x = autoRotX
      root.rotation.z = autoRotZ

      // Rim light drift
      // Deriva sutil de los spots -> la franja de luz "respira" en vez de
      // quedar estática, sin volverse una iluminación general.
      spot1.position.x = 5 + Math.sin(t * 0.1) * 1.2
      spot1.position.y = 7 + Math.cos(t * 0.08) * 0.8
      spot2.position.x = -6 + Math.cos(t * 0.09) * 1.5
      spot2.position.z = 5 + Math.sin(t * 0.07) * 1.5

      if (isAnimating) {
        animFrame++
        const progress = Math.min(animFrame / DURATION, 1)
        pivot.rotation[animAxis] = animDir * easeInOut(progress) * HALF_PI
        if (progress >= 1) endMove()
      } else {
        pauseFrames++
        if (pauseFrames >= PAUSE) startMove(moveSeq[mIdx])
      }

      renderer.render(scene, camera)
    }

    loop()

    // ── Resize ────────────────────────────────────────────────
    function handleResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove',  onPointerMove)
      window.removeEventListener('touchmove',  onPointerMove)
      window.removeEventListener('mouseup',    onPointerUp)
      window.removeEventListener('touchend',   onPointerUp)
      el.removeEventListener('mousedown',  onPointerDown)
      el.removeEventListener('touchstart', onPointerDown)
      renderer.dispose()
      dotTex.dispose(); speckleTexOrange.dispose(); speckleTexGreen.dispose(); glossyTex.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [width, height])

  return (
    <div
      ref={mountRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    />
  )
}