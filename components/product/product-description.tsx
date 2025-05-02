import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700 text-black">
        <h1 className="mb-2 text-[28px] font-normal leading-[40px] tracking-[0.01em]">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full  p-2 text-[34px] font-extrabold text-black">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <>
        <Prose
          className="mb-6 text-sm text-black leading-tight dark:text-black/[60%]"
          html={product.descriptionHtml}
        />
      </>) : null}
      <AddToCart product={product} />
    </>
  );
}
