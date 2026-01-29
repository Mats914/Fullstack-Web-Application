import { useLanguage } from '../contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sv' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      title={language === 'en' ? 'Switch to Swedish' : 'Växla till engelska'}
    >
      <GlobeAltIcon className="h-5 w-5 mr-2" />
      <span>{language === 'en' ? 'EN' : 'SV'}</span>
    </button>
  );
};

export default LanguageSwitcher;
