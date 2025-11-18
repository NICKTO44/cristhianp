import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Actualizar posición del cursor
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Detectar hover sobre elementos interactivos
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Detectar click
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Agregar event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Cursor principal (punto pequeño) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-green rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor secundario (anillo grande) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-primary-green rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Efecto de glow */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 rounded-full pointer-events-none z-[9997] blur-xl"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      />

      {/* Trail effect (rastro) */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-primary-green rounded-full pointer-events-none z-[9996] opacity-40"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 15,
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-primary-green rounded-full pointer-events-none z-[9995] opacity-30"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 15,
        }}
      />

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-primary-green rounded-full pointer-events-none z-[9994] opacity-20"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 40,
          damping: 15,
        }}
      />
    </>
  );
};

export default CustomCursor;