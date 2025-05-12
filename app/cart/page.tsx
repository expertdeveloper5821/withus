
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import ProductGrid from 'components/card/ProductGrid';
import ClientCart from 'components/OrderSummary';
import OrderSummary from 'components/OrderSummary/OrderSummary';
import { getCollectionProducts } from 'lib/shopify';


export default async function CartPage() {
  const homepageItems = await getCollectionProducts({
    collection: '5stars',

  });
 
  const formattedProducts = homepageItems.map((item: any, index: number) => ({
    id: index + 1,
    title: item.title,
    price: parseFloat(item.priceRange.minVariantPrice.amount),
    originalPrice: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
  
    tag: item.tags.includes("Mother's Day") ? "Mother's Day" : undefined,
    badge: item.tags.includes("Local") ? "Local" : undefined,
  
    rating: 4.5, 
    reviews: Math.floor(Math.random() * 200), 
    category: item.tags[0] || 'Uncategorized'
  }))
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className=" text-black">Cart</span>
        </div>
      </div>

      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6"> */}
        {/* <div className="bg-amber-50 border border-amber-100 p-3 rounded flex items-center"> */}
       
    {/* </div> */}
      {/* </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
          <div className="bg-green-100 text-green-900 px-4 py-2 rounded-lg flex justify-between items-center text-sm md:text-base mb-4">
      <div className="flex items-center gap-2 font-medium">
        <CheckCircleIcon className="h-5 w-5 text-green-700" />
        <span>Free shipping on all orders</span>
      </div>
      <span className="text-green-700 text-sm">Limited-time offer</span>
    </div>
          <ClientCart/>
            <div className="p-6">
              <div className="text-lg text-black font-medium mb-2">Explore your interests</div>
              <ProductGrid products={formattedProducts} />
            </div>
          </div>
         <OrderSummary />
        </div>
      </div>
    </div>
  );
}


