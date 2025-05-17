
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import ProductGrid from 'components/grid/product-grid';
import { TranslationProvider } from 'components/i18n/TranslationContext';
import ClientCart from 'components/order-summary';
import OrderSummary from 'components/order-summary/orderSummary';
import { getTranslations } from 'lib/i18n';
import { getCollectionProducts } from 'lib/shopify';

interface PageProps {
  params: {
    lan: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function CartPage({ params }: PageProps) {
  const { lan } = params;
  
  // Load translations
  const translations = await getTranslations(lan);
  
  const homepageItems = await getCollectionProducts({
    collection: 'Automobiles',
    lan
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
    category: item.tags[0] || 'Uncategorized'  }));

  return (
    // <TranslationProvider initialTranslations={translations}>
      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm">
            <a href={`/${lan}`} className="text-gray-500 hover:text-gray-700">
              {translations.common?.navbar?.home || "Home"}
            </a>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-medium">{translations.common?.cart?.title || "Cart"}</span>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-amber-50 border border-amber-100 p-3 rounded flex items-center">
            <div className="mr-3">
            </div>
            <span className="font-medium">{translations.common?.cart?.freeShipping || "Free shipping (excluding items shipped by local warehouses)"}</span>
          </div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-2/3">
             <div className="bg-green-100 text-green-900 px-4 py-2 rounded-lg flex justify-between items-center text-sm md:text-base mb-4">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircleIcon className="h-5 w-5 text-green-700" />
                <span>{translations.common?.cart?.freeShipping || "Free shipping on all orders"}</span>
              </div>
              <span className="text-green-700 text-sm">{translations.common?.cart?.limitedTimeOffer || "Limited-time offer"}</span>
            </div>          <ClientCart/>
            <div className="p-6">
              <div className="text-lg font-medium mb-2">{translations.common?.cart?.recommendedItems || "Recommended Items"}</div>
             <ProductGrid products={formattedProducts} gridClassName="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-3"/>
            </div>
          </div>
         <OrderSummary />
        </div>
      </div>
      </div>
  )
    {/* </TranslationProvider>  ); */}
}