import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import usePerformanceMode from '../hooks/usePerformanceMode';
import RubikCube from './RubikCube';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [cubeSize, setCubeSize] = useState(500);
  const { isLiteMode } = usePerformanceMode();
  const { t } = useTranslation();

  // Tamaño del cubo según viewport: más chico en mobile/tablet, 500 en desktop
  useEffect(() => {
    const updateCubeSize = () => {
      const w = window.innerWidth;
      if (w < 480) setCubeSize(240);
      else if (w < 768) setCubeSize(320);
      else if (w < 1024) setCubeSize(380);
      else setCubeSize(500);
    };
    updateCubeSize();
    window.addEventListener('resize', updateCubeSize);
    return () => window.removeEventListener('resize', updateCubeSize);
  }, []);

  const roles = [
    t('hero.roles.webDev'),
    t('hero.roles.frontend'),
    t('hero.roles.backend'),
    t('hero.roles.creator')
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
  }, [currentIndex, isDeleting, roleIndex, roles]);

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

  const cubeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: 'easeOut',
        delay: 0.4,
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Contenido de texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start"
          >
            <div className="w-full text-center lg:text-left">
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-block px-4 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-primary-green text-sm font-medium mb-4">
                   🟢 {t('hero.available')}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 leading-tight"
              >
                {t('hero.greeting')}{' '}
                <span className="text-primary-green inline-block">
                  {t('hero.name')}
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-display font-semibold text-primary-white/90 h-12 md:h-14">
                  <span className="text-primary-green">{displayedText}</span>
                  <span className="animate-pulse text-primary-green">|</span>
                </h2>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-primary-white/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                {t('hero.description')}{' '}
                <span className="text-primary-green font-semibold">React</span>,{' '}
                <span className="text-primary-green font-semibold">Node.js</span>,{' '}
                <span className="text-primary-green font-semibold">MySQL</span> {t('hero.and')}.
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
                  <span className="relative z-10">{t('hero.btnProjects')}</span>
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
                  <span>{t('hero.btnCV')}</span>
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
                  <p className="text-sm text-primary-white/60">{t('hero.stats.years')}</p>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-primary-green">10+</h3>
                  <p className="text-sm text-primary-white/60">{t('hero.stats.projects')}</p>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-primary-green">8+</h3>
                  <p className="text-sm text-primary-white/60">{t('hero.stats.technologies')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Cubo de Rubik — tal cual el proyecto original, fondo negro, solo desktop */}
          <motion.div
            variants={cubeVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center mt-10 lg:mt-0"
          >
            {!isLiteMode && <RubikCube width={cubeSize} height={cubeSize} />}
          </motion.div>
        </div>

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