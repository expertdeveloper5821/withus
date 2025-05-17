import { promises as fs } from 'fs';
import path from 'path';

// Define supported languages
export const locales = ['en', 'ru', 'uz', 'kz'] as const;
export const defaultLocale = 'en';

export type Locale = typeof locales[number];

// Function to load translations from JSON files
export async function getTranslations(
  locale: string, 
  namespaces: string[] = ['common']
): Promise<Record<string, Record<string, any>>> {
  const translations: Record<string, Record<string, any>> = {};

  try {
    for (const namespace of namespaces) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
        const fileContent = await fs.readFile(filePath, 'utf8');
        translations[namespace] = JSON.parse(fileContent);
      } catch (error) {
        console.error(`Error loading translation for ${locale}/${namespace}:`, error);
        // Fallback to English if translation is missing
        if (locale !== defaultLocale) {
          const defaultFilePath = path.join(process.cwd(), 'public', 'locales', defaultLocale, `${namespace}.json`);
          try {
            const defaultFileContent = await fs.readFile(defaultFilePath, 'utf8');
            translations[namespace] = JSON.parse(defaultFileContent);
          } catch (fallbackError) {
            translations[namespace] = {};
          }
        } else {
          translations[namespace] = {};
        }
      }
    }
    return translations;
  } catch (error) {
    console.error('Failed to load translations:', error);
    return { common: {} };
  }
}

// Helper function to get a translation by key
export function getTranslation(
  translations: Record<string, Record<string, any>>,
  key: string,
  namespace: string = 'common'
): string {
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
}