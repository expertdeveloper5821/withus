import Footer from 'components/layout/footer';
import ProductGrid from 'components/grid/product-grid';
import LightningDeals from 'components/lightning-deals';
import GreenBanner from 'components/layout/green-banner'; 
import { getCollection, getCollectionProducts } from 'lib/shopify';
import { allIconList } from 'config/security-config';
import Image from 'next/image';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};


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
 
  return (
    <>
      <div
        className="hero-banner h-[300px] sm:h-[249px] "
        style={{
          backgroundImage: "url('/bannerimg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className=" bg-gray-50 pt-9 ">
        <div className="block sm:hidden bg-red-100 rounded-lg  p-4 flex justify-between items-center max-w-xl mx-4 mb-4">
          <div className="flex items-start space-x-2 w-1/2">
            {/* <CheckCircleIcon className="w-5 h-5 text-green-600 mt-1" /> */}
            <div>
              <div className="text-green-600 font-semibold">Free Shipping</div>
              <div className="text-gray-500 text-sm">Limited Offer</div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-10 border-l border-gray-400 mx-4" />

          {/* Delivery Guarantee */}
          <div className="flex items-start space-x-2 w-1/2">
            {/* <TruckIcon className="w-5 h-5 text-black mt-1" /> */}
            <div>
              <div className="text-black font-semibold">Delivery guarantee</div>
              <div className="text-gray-500 text-sm">Refund of any issue</div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-[69px]">
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
          <LightningDeals />
        </div>

        <header className="text-center py-4 ">
          <h1 className="text-xl font-bold text-red-500   text-[24px]">
            <div className="flex justify-center items-center">
              <Image
                src={allIconList.Star}
                alt="Lightning Icon"
                width={26}
                height={26}
                className="h-12 mr-2"
              />{" "}
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

          <h2 className=" text-black text-[28px] font-extrabold ">
            EXPLORE YOUR INTERESTS
          </h2>
        </header>
        <div className="pl-4 md:pl-[69px] ">
          <div className="flex items-center pt-3 pt-6 pb-12 sm:pb-16">
            <nav className="flex gap-5 overflow-x-auto scrollbar-hide pr-8">
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
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-[69px]">
          <ProductGrid products={formattedProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
}
