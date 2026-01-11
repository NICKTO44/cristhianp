import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationsEN from './locales/en.json';
import translationsES from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationsEN
      },
      es: {
        translation: translationsES
      }
    },
    lng: 'en', // Idioma por defecto: inglés
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;