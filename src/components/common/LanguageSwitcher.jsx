import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition"
    >
      <Languages size={16} />
      <span>{i18n.language === 'en' ? 'EN' : 'HI'}</span>
    </button>
  );
};

export default LanguageSwitcher;
