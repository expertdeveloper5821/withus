'use client';
import { languages } from 'components/i18n/settings';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const languageFlags: { [key: string]: string } = {
  en: '🇺🇸',
  ru: '🇷🇺',
  uz: '🇺🇿',
  kz: '🇰🇿',
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname:any = usePathname();
  const currentLang = pathname.split('/')[1];
  const [selectedLang, setSelectedLang] = useState(currentLang);

  const changeLanguage = (newLang: string) => {
    const segments = pathname.split('/');

    if (segments[1] && languages.includes(segments[1])) {
      segments[1] = newLang;
    } else {
      segments.unshift(newLang);
    }
    const newPath = segments.join('/') || '/';
    setSelectedLang(newLang);
    console.log(newLang, 'newPath');
    const expires = new Date(new Date().getTime() + 3600 * 1000).toUTCString(); 
    document.cookie = `i18next=${newLang}; path=/; expires=${expires}`;
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={selectedLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="p-2 rounded-lg border dark:bg-neutral-800 bg-white dark:border-neutral-700 border-gray-300"
      >
        {languages.map((lng) => (
          <option key={lng} value={lng}>
            {languageFlags[lng]} {lng.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
