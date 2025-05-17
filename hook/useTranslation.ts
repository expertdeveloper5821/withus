import { useTranslation } from 'next-i18next';

export default function useCustomTranslation() {
  const { t } = useTranslation('common');
  return { t };
}
