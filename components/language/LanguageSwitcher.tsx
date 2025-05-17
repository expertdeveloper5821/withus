'use client';

import { languages } from 'components/i18n/settings';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname: any = usePathname();
  const { lan: currentLang } = useParams() as { lan: string };
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLang: string) => {
    if (newLang === currentLang) {
      setIsOpen(false);
      return;
    }

    const pathWithoutLang = pathname.split('/').slice(2).join('/');
    router.push(`/${newLang}/${pathWithoutLang}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 rounded border border-gray-200 bg-white text-sm focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="uppercase">{currentLang}</span>
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded shadow-md py-1 w-24">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={`block w-full text-left px-3 py-1 text-sm ${
                lang === currentLang ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
