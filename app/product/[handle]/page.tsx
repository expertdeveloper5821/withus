import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductGrid from 'components/grid/product-grid';
import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductProvider } from 'components/product/product-context';
import { ProductDescription } from 'components/product/product-description';
import ProductDetails from 'components/product/product-details';
import ReviewList from 'components/ReviewList';
import { HIDDEN_PRODUCT_TAG, reviews } from 'lib/constants';
import { getCollectionProducts, getProduct, getProductRecommendations } from 'lib/shopify';
import { Image } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';


export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}
export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  console.log('product', product);
  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  const homepage = await getCollectionProducts({
    collection: 'best-sellers',
  });

  const formattedProducts = homepage.slice(0, 20).map((item: any, index: number) => ({
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
  }));

  const images = product.images.slice(0, 5).map((image: any) => ({
    src: image.url,
    altText: image.altText || 'Product image',
  }));

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-screen-2xl bg-white">
        {/* Main Product Section */}
        <div>
        <div className="flex flex-col bg-white p-0 md:p-8 lg:flex-row lg:gap-8 dark:border-neutral-800">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
            <div className='hidden md:block '>
            <ReviewList reviews={reviews} />
            <ProductDetails images={images} />
            </div>
          </div>

          {/* Product Details */}
          <div className=" w-full lg:w-1/2 p-4 md:p-2 lg:p-0">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
            
          </div>
        </div>
        </div>
        <div className='block md:hidden lg:hidden'>
      {/* <div className='w-[100%] md:w-[90%] lg:w-[40%] mt-[26px] md:mt-[26px] lg:mt-[-226px] mx-0 md:mx-6'> */}
      <ReviewList reviews={reviews} />
      <ProductDetails images={images} />
      </div>
        
        {/* Related Products Section */}
        <div className="p-4 md:p-8 lg:p-12">
          <ProductGrid products={formattedProducts} />
        </div>
      </div>
      <Footer />
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
