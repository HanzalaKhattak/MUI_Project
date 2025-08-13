// filepath: d:\MUI_Project\src\i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        categories: "Categories",
        contact: "Contact Us",
        searchPlaceholder: "Tell us what you are looking for?",
        name: "Name"
      }
    },
    ar: {
      translation: {
        home: "الرئيسية",
        categories: "الفئات",
        contact: "اتصل بنا",
        searchPlaceholder: "ما الذي تبحث عنه؟",
        name: "الاسم"
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;