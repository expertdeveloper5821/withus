import React from "react";
import Image from "next/image";
import { allIconList } from "config/security-config";
import { getCollectionProducts } from "lib/shopify";

export default async function LightningDeals() {
  const homepageItems = await getCollectionProducts({
    collection: "Kitchen",
  });

  const litingProducts = homepageItems
    .slice(0, 7)
    .map((item: any, index: number) => ({
      id: index + 1,
      price: parseFloat(item.priceRange.maxVariantPrice.amount),
      image: item.featuredImage?.url || "",
    }));

  return (
    <div className=" text-white pb-4  pt-[39px]">
      <div
        className="flex items-center justify-between px-0 sm:px-3 py-2  bg-white sm:bg-[#D91E37] "
      
      >
        <Image
          src={allIconList.Lightning}
          alt="Lightning Icon"
          width={66}
          height={66}
          className="h-12 hidden sm:block"
        />
        <div className="flex items-center ">
          <Image
            src={allIconList.Light}
            alt="Lightning Icon"
            width={36}
            height={36}
            className="h-6 hidden sm:block"
          />
          <div className="flex gap-2 items-center">
          <h2 className="text-[16px] sm:text-[24px]  font-medium sm:font-extrabold ml-4 text-[#D91E37] sm:text-white">
            Lightning Deals
          </h2>
          <span className=" text-[18px]  font-normal ml-4 text-black sm:text-white">Limited time offer</span>
          </div>
        </div>
        <Image
          src={allIconList.Lightning}
          alt="Lightning Icon"
          width={66}
          height={66}
          className="h-12 hidden sm:block"
        />
      </div>
      <div className="flex gap-2 sm:gap-10 overflow-x-auto scrollbar-hide  pb-8 pt-5 sm:pt-10">
        {litingProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[96px] sm:min-w-[120px] overflow-hidden hover:scale-105 transition-transform"
          >
            <Image
              src={product.image}
              alt={`Product ${product.id}`}
              width={60}
              height={60}
              className="w-24 h-24 sm:w-full sm:h-40 object-cover"
            />
            <div className="pt-1">
              <div className="text-center line-clamp-1 text-red-500 text-lg text-[25px] font-bold leading-[150%] li">
                {product.price} Uzs
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
