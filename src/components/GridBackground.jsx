import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let dots = [];

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    // Crear puntos flotantes
    const initDots = () => {
      dots = [];
      const numberOfDots = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < numberOfDots; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    // Animar los puntos
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar grid de líneas
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.05)';
      ctx.lineWidth = 1;

      const gridSize = 50;
      
      // Líneas verticales
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Líneas horizontales
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Dibujar y animar puntos
      dots.forEach(dot => {
        // Actualizar posición
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Rebotar en los bordes
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Dibujar punto
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${dot.opacity})`;
        ctx.fill();

        // Efecto de glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(34, 197, 94, 0.5)';
      });

      // Conectar puntos cercanos
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Inicializar
    resizeCanvas();
    animate();

    // Manejar resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas animado */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Gradiente radial verde */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Gradiente radial adicional (efecto spotlight) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/4 left-1/4 w-1/2 h-1/2 pointer-events-none z-0 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Textura de ruido sutil */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
};

export default GridBackground;