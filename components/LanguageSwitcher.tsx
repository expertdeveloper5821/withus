
'use client';

import { languages } from 'components/i18n/settings';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { lan: currentLang } = useParams() as { lan: string };
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Get the current URL path without the language prefix
  const pathWithoutLang = () => {
    const segments:any = pathname?.split('/').slice(2);
    return segments.length > 0 ? `/${segments.join('/')}` : '';
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-white/90 border border-gray-200 rounded px-3 py-1.5"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 right-0 z-50 bg-white border border-gray-200 rounded shadow-lg p-1 w-24">
          {languages.filter(lang => lang !== currentLang).map(lang => (
            <Link
              key={lang}
              href={`/${lang}${pathWithoutLang()}`}
              className="block px-3 py-2 hover:bg-gray-100 rounded text-sm text-center"
              onClick={() => setIsOpen(false)}
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
