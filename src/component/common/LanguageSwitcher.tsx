import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
        localStorage.setItem('i18nextLng', languageCode);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    return (
        <div className="relative group">
            {/* Main Button */}
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 border border-gray-600">
                <FontAwesomeIcon icon={faGlobe} className="text-cyan-400" />
                <span className="text-white text-sm font-medium">
                    {currentLanguage.flag} {currentLanguage.name}
                </span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 w-44 bg-gray-800 border border-gray-600 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                {languages.map((language) => (
                    <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${i18n.language === language.code
                                ? 'bg-cyan-600/20 text-cyan-300 border-l-4 border-cyan-400'
                                : 'text-white hover:text-cyan-300'
                            }`}
                    >
                        <span className="text-lg">{language.flag}</span>
                        <span className="font-medium text-sm flex-1">{language.name}</span>
                        {i18n.language === language.code && (
                            <span className="text-cyan-400 text-sm">✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}