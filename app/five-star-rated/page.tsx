import { getCollectionProducts, getProducts } from 'lib/shopify';
import ProductGrid from 'components/grid/product-grid';
import CollectionPageHeader from 'components/layout/collection-page-header';

export const metadata = {
  title: '5-Star Rated Products',
  description: 'Explore our highest-rated products with 5-star customer reviews'
};

export default async function FiveStarRatedPage() {
     const productss = await getCollectionProducts({ collection:'5stars' });
  
 const formattedProducts: any = productss.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        handle: item.handle,
        discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
        price: parseFloat(item.priceRange.maxVariantPrice.amount),
        image: item.featuredImage?.url || '',
        tag: item.tags?.includes("Mother's Day") ? "Mother's Day" : undefined,
        badge: item.tags?.includes("Local") ? "Local" : undefined,
        ratings: 4, 
        reviews: Math.floor(Math.random() * 200),
       
      }));
    

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <CollectionPageHeader
        title="5-Star Rated Products"
      />
      
      {formattedProducts.length > 0 ? (
        <ProductGrid products={formattedProducts} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-600">No 5-star products found</h2>
          <p className="mt-2 text-gray-500">Please check back later for our top-rated items</p>
        </div>
      )}
    </div>
  );
}
