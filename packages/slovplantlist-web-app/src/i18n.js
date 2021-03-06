import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './l10n/en.json';
import translationSlovak from './l10n/sk.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  sk: {
    translation: translationSlovak,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'sk',

    keySeparator: '.', // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
