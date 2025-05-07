
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

import FeatureScroller from 'components/FeatureScroller';


export function ProductDescription({ product }: { product: Product }) {
 
  const guarantees = [
    "Free return",
    "12 000 UZS Credit for delay",
    "Return if item doesn't match",
    "Fast delivery",
    "Buyer protection",
  ];
  return (
    <>
      {/* <div className="mb-6 flex flex-col pb-6 dark:border-neutral-700 text-black">
        <h1 className="mb-2 text-[28px] font-normal leading-[40px] " >{product.title}</h1>
        <div className="mr-auto w-auto  p-2 text-[34px] font-extrabold text-black"> */}
        <div className="mb-6 flex flex-col pb-6 dark:border-neutral-700 text-black w-full text-center">
        <h1 className="mb-2 text-[28px] font-normal leading-[40px] w-full text-center">{product.title}</h1>
        <div className="mr-auto w-full p-2 text-[34px] font-extrabold text-black text-center">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        <div className="flex items-center justify-center bg-[#FCDEDB] py-2 px-4 rounded-md text-sm text-black font-medium gap-4">
      {/* Left Text */}
      <div className="flex items-center gap-2">
        {/* <CheckCircleIcon className="h-4 w-4 text-green-500" /> */}
        <span>Free shipping on all orders</span>
      </div>

      {/* Divider */}
      <div className="h-4 border-l border-gray-300" />

      {/* Right Text */}
      <div className="flex items-center gap-2">
        {/* <CheckCircleIcon className="h-4 w-4 text-green-500" /> */}
        <span>12 000 UZS Credit for delay</span>
      </div>
    </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {/* {product.descriptionHtml ? (
        <>
        <Prose
          className="mb-6 text-sm text-black leading-tight dark:text-black/[60%]"
          html={product.descriptionHtml}
        />
      </>) : null} */}
      <AddToCart product={product} />

      <FeatureScroller title="Order Guarantee" items={guarantees} />
    </>
  );
}
