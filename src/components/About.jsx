import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaRocket, FaLightbulb, FaGraduationCap } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import usePerformanceMode from '../hooks/usePerformanceMode';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isLiteMode } = usePerformanceMode();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const features = [
    {
      icon: <FaGraduationCap />,
      title: t('about.features.student.title'),
      description: t('about.features.student.description'),
    },
    {
      icon: <FaCode />,
      title: t('about.features.learning.title'),
      description: t('about.features.learning.description'),
    },
    {
      icon: <FaRocket />,
      title: t('about.features.modern.title'),
      description: t('about.features.modern.description'),
    },
    {
      icon: <FaLightbulb />,
      title: t('about.features.creative.title'),
      description: t('about.features.creative.description'),
    },
  ];

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
      id="sobre-mi"
      ref={ref}
      className="relative py-20 md:py-32 bg-gradient-to-b from-primary-black via-primary-gray/30 to-primary-black overflow-hidden"
    >
      {/* Decorative elements - MODO COMPLETO: animado, MODO LITE: estático */}
      {isLiteMode ? (
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-green/10 rounded-full" />
      ) : (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 right-10 w-72 h-72 bg-primary-green/20 rounded-full blur-[100px]"
        />
      )}

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Imagen/Avatar */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              whileHover={{ scale: isLiteMode ? 1 : 1.02 }}
              className="relative group"
            >
              {/* Glow effect - Solo en modo completo */}
              {!isLiteMode && (
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-green to-green-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
              )}

              {/* Image container */}
              <div className={`relative rounded-2xl overflow-hidden p-2 ${
                isLiteMode 
                  ? 'bg-primary-gray-light/50 border border-primary-green/30'
                  : 'glass-strong'
              }`}>
                <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary-gray to-primary-gray-light">
                  <img
                   src={`${import.meta.env.BASE_URL}assets/images/perfil.jpg`}
                    alt="Cristhian Quispe - Web Developer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback */}
                  <div className="w-full h-full hidden items-center justify-center">
                    <div className="text-center">
                      <div className="text-9xl font-bold text-primary-green mb-4">CQ</div>
                      <p className="text-primary-white/60">Cristhian Quispe</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge - Animación reducida en modo lite */}
              <motion.div
                animate={isLiteMode ? {} : {
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`absolute -bottom-6 -right-6 rounded-2xl p-4 border border-primary-green/30 ${
                  isLiteMode
                    ? 'bg-primary-gray-light/90'
                    : 'glass-strong'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary-green rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-primary-white">
                    {t('about.available')}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contenido de texto */}
          <div>
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-primary-green text-sm font-medium mb-6">
                {t('about.badge')}
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight"
            >
              {t('about.title')}{' '}
              <span className="text-primary-green">{t('about.titleHighlight')}</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <p className="text-lg text-primary-white/70 leading-relaxed">
                {t('about.paragraph1')} <span className="text-primary-green font-semibold">{t('about.paragraph1Highlight')}</span> {t('about.paragraph1End')} <span className="text-primary-white font-medium">{t('about.paragraph1Career')}</span>{t('about.paragraph1End2')}
              </p>

              <p className="text-lg text-primary-white/70 leading-relaxed">
                {t('about.paragraph2')} <span className="text-primary-green font-semibold">{t('about.paragraph2Highlight')}</span> {t('about.paragraph2End')} <span className="text-primary-white font-medium">{t('about.paragraph2Frontend')}</span> {t('about.paragraph2And')} <span className="text-primary-white font-medium">{t('about.paragraph2Backend')}</span>{t('about.paragraph2End2')}
              </p>

              <p className="text-lg text-primary-white/70 leading-relaxed">
                {t('about.paragraph3')} <span className="text-primary-green font-semibold">{t('about.paragraph3Highlight')}</span> {t('about.paragraph3End')}
              </p>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll('contacto')}
              className="btn-primary cursor-hover mb-12"
            >
              {t('about.btnContact')}
            </motion.button>

            {/* Features grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: isLiteMode ? 1 : 1.02, y: isLiteMode ? 0 : -5 }}
                  className={`rounded-xl p-5 border border-primary-green/20 hover:border-primary-green/50 transition-all duration-300 cursor-hover group ${
                    isLiteMode
                      ? 'bg-primary-gray-light/50'
                      : 'glass-strong'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl text-primary-green group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-primary-white/60">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-green/50 to-transparent" />
    </section>
  );
};

export default About;