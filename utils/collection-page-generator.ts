/**
 * Collection Page Generator
 * 
 * This utility provides a consistent way to generate new collection pages.
 * When you want to add a new collection page to be linked from the Shopify menu,
 * you can use this as a template and reference.
 */

import { MenuMapping } from 'types/menu-mappings';

/**
 * Template for creating a new collection page
 * 
 * @param mapping The menu mapping configuration for this collection
 * @returns A list of files that need to be created for the collection page
 */
export function generateCollectionPageTemplate(mapping: MenuMapping) {
  const routePath = mapping.path.startsWith('/') ? mapping.path.substring(1) : mapping.path;
  const title = mapping.title;
  const description = mapping.description || `Explore our ${title.toLowerCase()} collection`;
  const collectionHandle = routePath.replace(/-/g, '_');
  
  const pageTemplate = `import { getCollectionProducts } from 'lib/shopify';
import ProductGrid from 'components/grid/product-grid';
import { notFound } from 'next/navigation';
import CollectionPageHeader from 'components/layout/collection-page-header';

export const metadata = {
  title: '${title}',
  description: '${description}'
};

export default async function ${toPascalCase(routePath)}Page() {
  // Fetch products from Shopify
  const products = await getCollectionProducts({ 
    collection: '${collectionHandle}',
    sortKey: 'BEST_SELLING',
    reverse: false 
  });

  if (!products || products.length === 0) {
    return notFound();
  }

  // Format the products to match the expected structure for ProductGrid
  const formattedProducts = products.map((item, index) => ({
    id: index + 1,
    title: item.title,
    handle: item.handle,
    discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
    tag: item.tags.includes("${title}") ? "${title}" : undefined,
    badge: item.tags.includes("${title}") ? "${title}" : undefined,
    ratings: 4, // Default rating
    reviews: Math.floor(Math.random() * 100), // Placeholder review count
  }));

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <CollectionPageHeader
        title="${title}"
        description="${description}"
        collectionName="${title}"
        itemCount={formattedProducts.length}
      />
      
      {formattedProducts.length > 0 ? (
        <ProductGrid products={formattedProducts} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-600">No products found</h2>
          <p className="mt-2 text-gray-500">Please check back later</p>
        </div>
      )}
    </div>
  );
}`;

  const layoutTemplate = `import Footer from 'components/layout/footer';

export default function ${toPascalCase(routePath)}Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white">
        <div className="hero-banner bg-banner-responsive h-[100px] sm:h-[224px] md:h-[148px] lg:h-[224px] xl:h-[224px]"></div>
        {children}
      </div>
      <Footer />
    </>
  );
}`;

  const loadingTemplate = `import CollectionLoading from 'components/layout/collection-loading';

export default function Loading() {
  return <CollectionLoading itemCount={10} />;
}`;

  const errorTemplate = `'use client';

import CollectionError from 'components/layout/collection-error';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <CollectionError error={error} reset={reset} collection="${title}" />;
}`;

  const opengraphTemplate = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${title} | BiBi Shop',
  description: '${description}',
  openGraph: {
    type: 'website',
    title: '${title} | BiBi Shop',
    description: '${description}'
  }
};`;

  return {
    path: routePath,
    files: [
      {
        name: 'page.tsx',
        content: pageTemplate
      },
      {
        name: 'layout.tsx',
        content: layoutTemplate
      },
      {
        name: 'loading.tsx',
        content: loadingTemplate
      },
      {
        name: 'error.tsx',
        content: errorTemplate
      },
      {
        name: 'opengraph-image.tsx',
        content: opengraphTemplate
      }
    ]
  };
}

/**
 * Convert a kebab-case string to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
