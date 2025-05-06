export const locales = ['en', 'ru', 'uz', 'kz'] as const;

export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];
