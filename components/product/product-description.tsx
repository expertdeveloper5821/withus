
import { AddToCart } from 'components/cart/add-to-cart';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

import { CheckIcon } from '@heroicons/react/20/solid';
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
        <div className=" flex flex-col pb-6 dark:border-neutral-700 text-black w-full text-center">
          <div className='flex  items-start'>
        <h1 className="mb-2 text-[18px] md:text-[28px] font-normal leading-[26px] md:leading-[40px] w-full text-start " style={{letterSpacing:'1%'}}>{product.title}</h1>
        <Image src={allIconList.ShareIcon} alt='' className='mt-3 md:block hidden'/>        </div>
        <div className="flex flex-col gap-1 text-[13px] font-medium">
  {/* Top Row: Sales and Seller */}
  <div className="flex items-center gap-2">
    <span className="text-neutral-500 text-[18px] font-normal">53k+ Sold</span>
    <span className="text-black text-[18px] font-normal">Sold by</span>
    <div className="flex items-center gap-1">

      <div />
      <Image src={allIconList.StarSellerImg} alt="Seller" width={28} height={28} className="h-8 w-8" />
    </div>
  </div>

  {/* Badge & Category */}
  <div className="flex justify-between items-center gap-2">
    <div>
  <span className="inline-block text-white text-xs font-semibold px-4 py-2 bg-green-600 rounded-tl-[10px] rounded-br-[10px] rounded-tr-none rounded-bl-none">
  #1 Top Rated
</span>
    <span className="text-neutral-500">In Men's Shirt</span>
    </div>
    
  <div className="flex items-center gap-1">
    <div className="flex text-yellow-400 text-[18px] md:text-[26px]">
      ★ ★ ★ ★ ☆
    </div>
    <span className="text-black ml-1">4.5/5</span>
  </div>
  </div>

  

  {/* Pricing */}
  <div className="flex items-center flex-wrap gap-2 mt-1 font-bold">
    <span className="text-black text-[18px] md:text-[30px] ">{product.priceRange.maxVariantPrice.amount} UZS</span>
    <span className="text-gray-400 line-through text-[15px] md:text-[22px] font-normal">{product.priceRange.minVariantPrice.amount}</span>
    <span className="text-red-600 text-[14px] font-semibold md:text-[22px]">Save {savedAmount.toLocaleString()} UZS</span>
    <span className="bg-red-100 text-red-600 text-20px font-bold px-2 py-0.5 rounded border border-red-500">{discountPercent.toLocaleString()}% OFF</span>
  </div>
</div>
       <div className="hidden md:flex mt-6 items-center justify-evenly bg-[#FCDEDB] py-3 px-4 rounded-md text-[18px] text-black font-medium gap-4">
      <div className="flex items-center gap-2">
        <CheckIcon className="h-4 w-4 text-[#0A8800]" />
        <span>Free shipping on all orders</span>
      </div>
      <div className="h-4 border-l border-gray-300" />
      <div className="flex items-center gap-2">
      <CheckIcon className="h-4 w-4 text-[#0A8800]" />
        <span>12 000 UZS Credit for delay</span>
      </div>
    </div> 
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <div className="space-y-4">
  {/* Top message with icon */}
  <div className="flex items-center text-gray-600 text-sm font-medium">
    {/* Home/Info Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 9.75L12 4l9 5.75M4.5 10.5v8.25a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V10.5"
      />
    </svg>
    91% of customers say these fit true to size
  </div>

  {/* Qty dropdown */}
  <div className="flex items-center space-x-4 mb-2">
    <label className="font-semibold text-black text-base">Qty</label>
    <select className="border border-gray-300 rounded-md px-4 py-1 text-sm focus:outline-none text-black focus:ring-1 focus:ring-black">
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num} className='text-black'> 
          {num}
        </option>
      ))}
    </select>
  </div>
</div>
      {/* {product.descriptionHtml ? (
        <>
        <Prose
          className="mb-6 text-sm text-black leading-tight dark:text-black/[60%]"
          html={product.descriptionHtml}
        />
      </>) : null} */}
      <AddToCart product={product} />
      <ShippingInfoScroller/>
<div className='mt-8'>
      <FeatureScroller title="Order Guarantee" items={guarantees}  />
      </div>
      <div className="flex items-center mt-8 text-[#0A8800] font-medium text-[20px] space-x-2">
 <Image
               src={allIconList.OrderGreenIcon}
               alt="Arrow Icon"
               width={20}
               height={20}
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
