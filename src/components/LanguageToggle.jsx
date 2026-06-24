import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button className="language-toggle" onClick={toggleLanguage}>
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageToggle;