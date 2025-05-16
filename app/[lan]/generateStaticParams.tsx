import { languages } from 'components/i18n/settings';

export async function generateStaticParams() {
  return languages.map((lan) => ({ lan }));
}