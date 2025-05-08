import { CheckIcon } from '@heroicons/react/20/solid';
import FeatureScroller from 'components/FeatureScroller';
import ProductGrid from 'components/grid/product-grid';
import Footer from 'components/layout/footer';
import GreenBanner from 'components/layout/green-banner';
import LightningDeals from 'components/lightning-deals';
import { allIconList } from 'config/security-config';
import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
const guarantees = [
 "Recommended",
                "Beauty & Health",
                "Women’s Clothing",
                "Home & Kitchen",
                "Men’s Clothing",
                "Women’s Clothing",
];

export default async function HomePage() {
  const homepageItems = await getCollectionProducts({
    collection: '5stars',

  });
 
  const formattedProducts = homepageItems.map((item: any, index: number) => ({
    id: index + 1,
    title: item.title,
    handle: item.handle,
    discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
    tag: item.tags.includes("Mother's Day") ? "Mother's Day" : undefined,
    badge: item.tags.includes("Local") ? "Local" : undefined,
    ratings: 5,
    reviews: Math.floor(Math.random() * 200),
  }))

  const homepageItemss = await getCollectionProducts({ collection: "Kitchen" });

  const products = homepageItemss.slice(0, 7).map((item: any, index: number) => ({
    id: index + 1,
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || "",
  }));
 
  return (
    <>
      <div
        className="hero-banner h-[100px] sm:h-[224px] md:h-[148px] lg:h-[224px] xl:h-[224px] "
        style={{
          backgroundImage: "url('/bannerimg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className=" bg-gray-50 pt-9 ">
        <div className="block sm:hidden bg-red-100 rounded-lg  px-4 py-2 flex justify-between items-center max-w-xl mx-4 mb-4">
          <div className="flex items-start space-x-2 ">
            {/* <CheckCircleIcon className="w-5 h-5 text-green-600 mt-1" /> */}
            <CheckIcon className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <div className="text-green-600 font-semibold text-[13.89px]">Free Shipping</div>
              <div className="text-gray-500 text-[11.89px]">Limited Offer</div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-10 border-l border-gray-400 mx-4" />

          {/* Delivery Guarantee */}
          <div className="flex items-start space-x-2 ">
            <Image src={allIconList.DeliveryBlackIcon} alt={'truck'}  />
            <div>
              <div className="text-black font-semibold text-[13.89px]">Delivery guarantee</div>
              <div className="text-gray-500 text-[11.89px]">Refund of any issue</div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-[20px] lg:px-[69px]">
          <GreenBanner
            title="Why choose BiBi Shop"
            items={[
              { icon: allIconList.LockIcon, text: "Secure privacy" },
              { icon: allIconList.Safe, text: "Safe payments" },
              { icon: allIconList.DeliveryIcon, text: "Delivery guarantee" },
            ]}
            reminder=" Please be wary of scam messages and links. BiBi Shop won't ask for extra fees via SMS or email."
            linkText="View All"
          />
          <LightningDeals products={products} />
        </div>

        <header className="text-center py-1 md:py-4 ">
          <h1 className="text-xl font-bold text-red-500  text-[15px] md:text-[24px]">
            <div className="flex justify-center items-center">
              <Image
                src={allIconList.Star}
                alt="Lightning Icon"
                width={26}
                height={26}
                className="h-12 mr-2"
              />
              MEGA HOLIDAY SALE
              <Image
                src={allIconList.Star}
                alt="Lightning Icon"
                width={26}
                height={26}
                className="h-12 ml-2"
              />
            </div>
          </h1>

          <h2 className=" text-black text-[18px] md:text-[28px] mt-[-10px] md:mt-[0px] font-extrabold ">
            EXPLORE YOUR INTERESTS
          </h2>
        </header>
        <div className="pl-4 md:pl-[20px] lg:pl-[69px] ">
          <div className="flex items-center pt-0 md:pt-3 pb-8 sm:pb-13">

          <FeatureScroller  items={guarantees} showArrow={false} itemClassName="border border-[#00000080] rounded-[40px]  px-[15px] sm:px-[35px] py-[7px] sm:py-[14px] font-normal text-[18px] leading-[1.5]  whitespace-nowrap text-black"/>

            {/* <nav className="flex gap-5 overflow-x-auto scrollbar-hide pr-8">
              {[
                "Recommended",
                "Beauty & Health",
                "Women’s Clothing",
                "Home & Kitchen",
                "Men’s Clothing",
                "Women’s Clothing",
              ].map((category, index) => (
                <button
                  key={`${category}-${index}`}
                  className="px-[15px] sm:px-[35px] py-[8px] sm:py-[14px] font-normal text-[18px] leading-[1.5]  whitespace-nowrap text-black"
                  style={{
                    border: "1px solid #00000080",
                    borderRadius: "40px",
                  }}
                >
                  {category}
                </button>
              ))}
            </nav>
            <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[0px_4px_24px_0px_#00000026]">
              <Image
                src={allIconList.ArrowIcon}
                alt="Filter Icon"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div> */}
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-[20px] lg:px-[69px] ">
          <ProductGrid products={formattedProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
}
