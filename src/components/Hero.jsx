import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'Desarrollador Web',
    'Frontend Developer',
    'Backend Developer',
    'Creador de Experiencias'
  ];

  // Efecto de typing para los roles
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 1000 : 2000;

    if (!isDeleting && currentIndex === currentRole.length) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(currentRole.substring(0, currentIndex + (isDeleting ? -1 : 1)));
      setCurrentIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Gradiente de fondo animado */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-green opacity-20 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary-green opacity-20 blur-[120px] rounded-full"
      />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Contenido de texto */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-primary-green text-sm font-medium mb-4">
                 🟢 Disponible para proyectos
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
            >
              Hola, soy{' '}
              <span className="text-primary-green inline-block">
                Cristhian Quispe
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-primary-white/90 h-12 md:h-14">
                <span className="text-primary-green">{displayedText}</span>
                <span className="animate-pulse text-primary-green">|</span>
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-white/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Construyo aplicaciones web modernas, optimizadas y funcionales utilizando
              tecnologías como{' '}
              <span className="text-primary-green font-semibold">React</span>,{' '}
              <span className="text-primary-green font-semibold">Node.js</span>,{' '}
              <span className="text-primary-green font-semibold">MySQL</span> y más.
            </motion.p>

            {/* Botones */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll('proyectos')}
                className="btn-primary cursor-hover group relative overflow-hidden"
              >
                <span className="relative z-10">Ver Proyectos</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-green to-green-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.a
                href="/assets/cv/CV-Cristhian-Quispe.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary cursor-hover flex items-center justify-center"
              >
                <span>Descargar CV</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-primary-green">3+</h3>
                <p className="text-sm text-primary-white/60">Años estudiando</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-primary-green">10+</h3>
                <p className="text-sm text-primary-white/60">Proyectos</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-primary-green">8+</h3>
                <p className="text-sm text-primary-white/60">Tecnologías</p>
              </div>
            </motion.div>
          </div>

          {/* Ilustración / Avatar */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Círculo de fondo con glow */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-green/30 to-transparent blur-2xl"
              />

              {/* Avatar / Ilustración - MEJORADO CENTRADO */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full glass p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-gray to-primary-gray-light flex items-center justify-center overflow-hidden border-2 border-primary-green/30">
                  {/* Imagen centrada */}
                  <img
                    src={`${import.meta.env.BASE_URL}assets/images/avatar1.png`}
                    alt="Cristhian Quispe"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback con efecto GLOW RADIANTE */}
                  <motion.div 
                    className="w-full h-full flex items-center justify-center text-8xl font-bold relative"
                    style={{ display: 'none' }}
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)',
                        '0 0 30px rgba(34, 197, 94, 1), 0 0 60px rgba(34, 197, 94, 0.8), 0 0 90px rgba(34, 197, 94, 0.6)',
                        '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {/* Glow adicional detrás de la C */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="w-40 h-40 bg-primary-green rounded-full blur-3xl" />
                    </motion.div>
                    
                    {/* Letra C con gradiente y glow */}
                    <span 
                      className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-primary-green via-green-400 to-primary-green"
                      style={{
                        filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))',
                      }}
                    >
                      C
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Elementos decorativos flotantes */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-8 -right-8 w-20 h-20 rounded-lg glass-strong flex items-center justify-center text-3xl"
              >
                ⚛️
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-8 -left-8 w-20 h-20 rounded-lg glass-strong flex items-center justify-center text-3xl"
              >
                💻
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="cursor-hover"
            onClick={() => handleScroll('sobre-mi')}
          >
            <FaArrowDown className="text-primary-green text-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;