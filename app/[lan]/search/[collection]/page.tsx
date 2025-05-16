import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionPageHeader from 'components/layout/collection-page-header';
import ProductGrid from 'components/grid/product-grid';
import { defaultSort, sorting } from 'lib/constants';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };  
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  // Transform the Shopify products to match the ProductGrid's expected format
  const formattedProducts = products.map((item, index) => ({
    id: index + 1,
    title: item.title,
    handle: item.handle,
    discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
    tag: item.tags.includes("Sale") ? "Sale" : undefined,
    badge: item.tags.includes("New") ? "New" : undefined,
    ratings: 4, // Default rating
    reviews: Math.floor(Math.random() * 100) + 10, // Simulate review count
  }));

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <CollectionPageHeader
        title={collection.title}
        description={collection.description || `Explore our ${collection.title} collection`}
        collectionName={collection.title}
        itemCount={formattedProducts.length}
      />
      
      {formattedProducts.length > 0 ? (
        <ProductGrid products={formattedProducts} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-600">No products found in this collection</h2>
          <p className="mt-2 text-gray-500">Please check back later or try another collection</p>
        </div>
      )}
    </div>
  );
}
