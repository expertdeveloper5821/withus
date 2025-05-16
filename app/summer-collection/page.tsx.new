import { getProducts } from 'lib/shopify';
import ProductGrid from 'components/grid/product-grid';
import CollectionPageHeader from 'components/layout/collection-page-header';

export const metadata = {
  title: 'Summer Collection',
  description: 'Seasonal products perfect for summer'
};

export default async function SummerCollectionPage() {
  // Fetch products from Shopify with a query to find summer-related products
  const products = await getProducts({
    query: 'tag:summer OR tag:seasonal OR title:summer', 
    sortKey: 'BEST_SELLING',
    reverse: false
  });

  // No need to use notFound() - we'll always show some products
  const fallbackProducts = products.length > 0 ? products : await getProducts({
    sortKey: 'BEST_SELLING',
    reverse: false
  });

  // Use fallback products if no summer products are found
  const displayProducts = fallbackProducts.slice(0, 12); // Limit to 12 products

  // Format the products to match the expected structure for ProductGrid
  const formattedProducts = displayProducts.map((item, index) => ({
    id: index + 1,
    title: item.title,
    handle: item.handle,
    discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
    tag: "Summer", // Add Summer tag to all products in this collection
    badge: item.tags.includes("New") ? "New" : undefined,
    ratings: 4.5, // Default rating for summer collection
    reviews: Math.floor(Math.random() * 100) + 20, // Simulate review count
  }));

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <CollectionPageHeader
        title="Summer Collection"
        description="Seasonal products perfect for summer"
        collectionName="Summer Collection"
        itemCount={formattedProducts.length}
      />
      
      {formattedProducts.length > 0 ? (
        <ProductGrid products={formattedProducts} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-600">Summer collection coming soon</h2>
          <p className="mt-2 text-gray-500">Check back later for our summer items</p>
        </div>
      )}
    </div>
  );
}
