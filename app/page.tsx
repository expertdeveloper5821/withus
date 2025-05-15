
import HomePageSection from 'components/homepage-section';
import Footer from 'components/layout/footer';


export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};


export default async function HomePage() {
  return (
    <>
      <div
        className="hero-banner bg-banner-responsive h-[100px] sm:h-[224px] md:h-[148px] lg:h-[224px] xl:h-[224px] "
       
      ></div>
      <HomePageSection/>
      <Footer />
    </>
  );
}

