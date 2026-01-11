import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiVite,
} from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import usePerformanceMode from '../hooks/usePerformanceMode';

const Technologies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isLiteMode } = usePerformanceMode();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const technologies = [
    {
      name: 'HTML5',
      icon: <FaHtml5 />,
      color: '#E34F26',
      category: t('technologies.categories.frontend'),
    },
    {
      name: 'CSS3',
      icon: <FaCss3Alt />,
      color: '#1572B6',
      category: t('technologies.categories.frontend'),
    },
    {
      name: 'JavaScript',
      icon: <FaJs />,
      color: '#F7DF1E',
      category: t('technologies.categories.frontend'),
    },
    {
      name: 'React',
      icon: <FaReact />,
      color: '#61DAFB',
      category: t('technologies.categories.frontend'),
    },
    {
      name: 'Tailwind CSS',
      icon: <SiTailwindcss />,
      color: '#06B6D4',
      category: t('technologies.categories.frontend'),
    },
    {
      name: 'Vite',
      icon: <SiVite />,
      color: '#646CFF',
      category: t('technologies.categories.frontend'),
    },
    {
      name: 'Node.js',
      icon: <FaNodeJs />,
      color: '#339933',
      category: t('technologies.categories.backend'),
    },
    {
      name: 'Express',
      icon: <SiExpress />,
      color: '#FFFFFF',
      category: t('technologies.categories.backend'),
    },
    {
      name: 'MySQL',
      icon: <SiMysql />,
      color: '#4479A1',
      category: t('technologies.categories.database'),
    },
    {
      name: 'Database',
      icon: <FaDatabase />,
      color: '#22C55E',
      category: t('technologies.categories.database'),
    },
    {
      name: 'Git',
      icon: <FaGitAlt />,
      color: '#F05032',
      category: t('technologies.categories.tools'),
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      color: '#FFFFFF',
      category: t('technologies.categories.tools'),
    },
  ];

  return (
    <section
      id="tecnologias"
      ref={ref}
      className="relative py-20 md:py-32 bg-primary-black overflow-hidden"
    >
      {/* Grid background pattern */}
      <div className="absolute inset-0 grid-background opacity-50" />

      {/* Decorative gradient - MODO COMPLETO: animado, MODO LITE: estático */}
      {isLiteMode ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-green/10 rounded-full" />
      ) : (
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-green/20 rounded-full blur-[150px]"
        />
      )}

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-primary-green text-sm font-medium mb-6">
            {t('technologies.badge')}
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('technologies.title')}{' '}
            <span className="text-primary-green">{t('technologies.titleHighlight')}</span>
          </h2>

          <p className="text-lg text-primary-white/70 max-w-2xl mx-auto">
            {t('technologies.description')}
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: isLiteMode ? 1.05 : 1.1,
                y: isLiteMode ? 0 : -10,
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative cursor-hover"
            >
              {/* Card */}
              <div className={`relative rounded-2xl p-6 border border-primary-green/20 hover:border-primary-green/50 transition-all duration-300 h-full flex flex-col items-center justify-center ${
                isLiteMode
                  ? 'bg-primary-gray-light/50'
                  : 'glass-strong'
              }`}>
                {/* Glow effect on hover - Solo en modo completo */}
                {!isLiteMode && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{
                      background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                    }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className="relative text-6xl mb-4 transition-all duration-300"
                  style={{
                    color: tech.color,
                    filter: isLiteMode ? 'none' : 'drop-shadow(0 0 10px currentColor)',
                  }}
                  whileHover={isLiteMode ? {} : {
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {tech.icon}
                </motion.div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-primary-white text-center group-hover:text-primary-green transition-colors duration-300">
                  {tech.name}
                </h3>

                {/* Category badge */}
                <span className="mt-2 text-xs text-primary-white/50 group-hover:text-primary-white/70 transition-colors duration-300">
                  {tech.category}
                </span>

                {/* Shine effect - Solo en modo completo */}
                {!isLiteMode && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '200% 200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>

              {/* Tooltip on hover (opcional) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none hidden md:block"
              >
                <div className={`px-3 py-1 rounded-lg border border-primary-green/30 whitespace-nowrap ${
                  isLiteMode
                    ? 'bg-primary-gray-light/90'
                    : 'glass-strong'
                }`}>
                  <p className="text-xs text-primary-white/80">{tech.name}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className={`rounded-2xl p-8 max-w-3xl mx-auto border border-primary-green/20 ${
            isLiteMode
              ? 'bg-primary-gray-light/50'
              : 'glass-strong'
          }`}>
            <p className="text-lg text-primary-white/70 mb-4">
              {t('technologies.additionalInfo')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-primary-gray-light rounded-full text-sm text-primary-green border border-primary-green/30">
                {t('technologies.tags.restAPIs')}
              </span>
              <span className="px-4 py-2 bg-primary-gray-light rounded-full text-sm text-primary-green border border-primary-green/30">
                {t('technologies.tags.responsive')}
              </span>
              <span className="px-4 py-2 bg-primary-gray-light rounded-full text-sm text-primary-green border border-primary-green/30">
                {t('technologies.tags.cleanCode')}
              </span>
              <span className="px-4 py-2 bg-primary-gray-light rounded-full text-sm text-primary-green border border-primary-green/30">
                {t('technologies.tags.agile')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />
    </section>
  );
};

export default Technologies;