import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esES from 'locales/es/translations.json';

i18n.use(initReactI18next)
    .init({
        lng: 'es',
        resources: {
            es: { translation: esES },
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })
    .finally();
