import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 bg-primary-gray-light border border-primary-green/30 rounded-full text-sm font-medium transition-all hover:border-primary-green/50 cursor-hover"
      aria-label="Change language"
    >
      {/* Bandera USA */}
      <span 
        className={`text-xl transition-opacity ${
          i18n.language === 'en' ? 'opacity-100' : 'opacity-40'
        }`}
      >
        🇺🇸
      </span>
      
      <span className="text-primary-white/40">|</span>
      
      {/* Bandera España */}
      <span 
        className={`text-xl transition-opacity ${
          i18n.language === 'es' ? 'opacity-100' : 'opacity-40'
        }`}
      >
        🇪🇸
      </span>
    </motion.button>
  );
};

export default LanguageToggle;