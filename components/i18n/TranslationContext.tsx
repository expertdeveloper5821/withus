'use client';

import { useParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

// Create context for translations
const TranslationContext = createContext<{
  t: (key: string, namespace?: string) => string;
  translations: Record<string, any>;
}>({
  t: (key: string) => key,
  translations: {}
});

// Create provider component to load translations
export function TranslationProvider({
  children,
  initialTranslations = {}
}: {
  children: React.ReactNode;
  initialTranslations?: Record<string, any>;
}) {
  const { lan } = useParams() as { lan: string };
  const [translations, setTranslations] = useState<Record<string, any>>(initialTranslations);

  useEffect(() => {
    // If translations were already provided, use them
    if (Object.keys(initialTranslations).length > 0) {
      setTranslations(initialTranslations);
      return;
    }

    // Otherwise load translations from the public directory
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${lan}/common.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations({ common: data });
        } else {
          // Fallback to English if the translation doesn't exist
          const fallbackResponse = await fetch('/locales/en/common.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setTranslations({ common: fallbackData });
          } else {
            console.error('Failed to load translations');
          }
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
  }, [lan, initialTranslations]);

  // Translation function
  const t = (key: string, namespace = 'common') => {
    const keys = key.split('.');
    let result = translations[namespace] || {};
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key itself
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <TranslationContext.Provider value={{ t, translations }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Custom hook to use translations
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
