
import { AddToCart } from 'components/cart/add-to-cart';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

import FeatureScroller from 'components/FeatureScroller';
import ShippingInfoScroller from 'components/FeatureScroller/ShippingInfoScroller';
import { allIconList } from 'config/security-config';
import Image from 'next/image';


export function ProductDescription({ product }: { product: Product }) {
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
const savedAmount = maxPrice - minPrice;
  const discountPercent = Math.round((savedAmount / maxPrice) * 100);

 
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
        <h1 className="mb-2 text-[18px] md:text-[28px] font-normal leading-[26px] md:leading-[40px] w-full text-start " style={{letterSpacing:'1%'}}>{product.title}</h1>
        <div className="flex flex-col gap-1 text-[13px] font-medium">
  {/* Top Row: Sales and Seller */}
  <div className="flex items-center gap-2">
    <span className="text-neutral-500">53k+ Sold</span>
    <span className="text-neutral-500">Sold by</span>
    <div className="flex items-center gap-1">
      <div className="h-5 w-5 rounded-full bg-gray-300" />
      <span className="text-black font-semibold">Star seller</span>
      <span className="text-purple-700 text-xs bg-purple-100 rounded px-1 py-0.5 ml-1">★</span>
    </div>
  </div>

  {/* Badge & Category */}
  <div className="flex items-center gap-2">
    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded font-semibold">#1 Top Rated</span>
    <span className="text-neutral-500">In Men's Shirt</span>
  </div>

  {/* Rating */}
  <div className="flex items-center gap-1">
    <div className="flex text-yellow-400">
      ★ ★ ★ ★ ☆
    </div>
    <span className="text-black ml-1">4.5/5</span>
  </div>

  {/* Pricing */}
  <div className="flex items-center flex-wrap gap-2 mt-1 text-[18px] font-bold">
    <span className="text-black">{product.priceRange.maxVariantPrice.amount}</span>
    <span className="text-gray-400 line-through text-[15px] font-normal">{product.priceRange.minVariantPrice.amount}</span>
    <span className="text-red-600 text-[14px] font-semibold">Save {savedAmount.toLocaleString()} UZS</span>
    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded border border-red-500">{discountPercent.toLocaleString()}% OFF</span>
  </div>
</div>
        {/* <div className="mr-auto w-full p-2 text-[34px] font-extrabold text-black text-center">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div> */}
        <div className="hidden md:flex items-center justify-center bg-[#FCDEDB] py-2 px-4 rounded-md text-sm text-black font-medium gap-4">
      <div className="flex items-center gap-2">
        {/* <CheckCircleIcon className="h-4 w-4 text-green-500" /> */}
        <span>Free shipping on all orders</span>
      </div>
      <div className="h-4 border-l border-gray-300" />
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
      <ShippingInfoScroller/>

      <FeatureScroller title="Order Guarantee" items={guarantees} />
      <div className="flex items-center text-green-600 font-medium text-sm space-x-2">
 <Image
               src={allIconList.GreenArrow}
               alt="Arrow Icon"
               width={8}
               height={8}
               className="mt-1 ml-1"
             />
  <span>Safe payments, Secure privacy</span>

  {/* Arrow */}
  <span className="ml-1"> <Image
               src={allIconList.GreenArrow}
               alt="Arrow Icon"
               width={8}
               height={8}
               className="mt-1 ml-1"
             /></span>
</div>
    </>
  );
}
