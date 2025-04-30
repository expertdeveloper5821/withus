import Footer from 'components/layout/footer';
import ProductGrid from 'components/grid/product-grid';
import LightningDeals from 'components/lightning-deals';
import GreenBanner from 'components/layout/green-banner'; 
import { getCollectionProducts } from 'lib/shopify';
import { allIconList } from 'config/security-config';



export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
const products = [
  {
    id: '1',
    image: '/images/product1.jpg',
    title: 'Boys Brown T-Shirt Full Shirt',
    price: 28,
    discountPrice: 199,
    description: 'Best Selling Item in Men’s Shirts',
    ratings: 4,
    reviews: 2560,
  },
]

export default async function HomePage() {
  const homepageItems = await getCollectionProducts({
    collection: '5stars',

  });
  
  const formattedProducts = homepageItems.map((item: any, index: number) => ({
    id: index + 1,
    title: item.title,
    discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
    tag: item.tags.includes("Mother's Day") ? "Mother's Day" : undefined,
    badge: item.tags.includes("Local") ? "Local" : undefined,
    rating: 4.5,
    reviews: Math.floor(Math.random() * 200),
    //category: item.tags[0] || 'Uncategorized'
  }))
 
  return (
    <>
      
      <div
        className="hero-banner h-[300px] sm:h-[200px]" 
        style={{
          backgroundImage: "url('/bannerimg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="px-4 sm:px-6 md:px-[69px] bg-gray-50 py-2"> 
        <GreenBanner
          title="Why choose BiBi Shop"
          items={[
            { icon: allIconList.LockIcon, text: 'Secure privacy' },
            { icon: 'credit_card', text: 'Safe payments' },
            { icon: 'local_shipping', text: 'Delivery guarantee' },
          ]}
          reminder="Security reminder: Please be wary of scam messages and links. BiBi Shop won't ask for extra fees via SMS or email."
          linkText="View All"
        />
        <LightningDeals />
        <header className="text-center py-4 bg-gray-100">
          <h1 className="text-xl font-bold text-red-500">
            ⭐ MEGA HOLIDAY SALE ⭐
          </h1>
          <h2 className="text-lg font-semibold text-black">EXPLORE YOUR INTERESTS</h2>
        </header>
        <div className="flex items-center bg-white py-4">
          <nav className="flex gap-4 overflow-x-auto scrollbar-hide px-8">
            {['Recommended', 'Beauty & Health', 'Women’s Clothing', 'Home & Kitchen', 'Men’s Clothing', 'Women’s Clothing'].map((category, index) => (
              <button
                key={`${category}-${index}`}
                className="px-4 py-2 border rounded-full text-sm font-medium hover:bg-gray-100 whitespace-nowrap text-black"
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
        <ProductGrid products={formattedProducts} />
      </div>
      <Footer />
    </>
  );
}
