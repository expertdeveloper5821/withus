import { CartProvider } from 'components/cart/cart-context';
import LanguageSwitcher from 'components/LanguageSwitcher';
import { Navbar } from 'components/layout/navbar';
import TopBanner from 'components/layout/top-banner';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { dir } from 'i18next';
import { getTranslations } from 'lib/i18n';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import '../globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  }
};

export async function generateStaticParams() {
    return [
      { lan: 'en' },
      { lan: 'ru' },
      { lan: 'uz' },
      { lan: 'kz' },
    ];
}

export default async function RootLayout({
  children,
  params: { lan }
}: {
  children: ReactNode;
  params: { lan: string };

}) {
    // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart(lan);
  
  // Load translations for server components
  const translations = await getTranslations(lan);
  
  return (
    <html lang={lan} dir={dir(lan)}  className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <CartProvider cartPromise={cart}>
        <TopBanner />
          
            <Navbar lan={lan} />
            <main>
              {children}
              <Toaster closeButton />
              <WelcomeToast />
            </main>
        </CartProvider>
      </body>
    </html>
  );
}

