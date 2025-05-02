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
        className="flex items-center justify-between px-3 py-2 "
        style={{ backgroundColor: "#D91E37" }}
      >
        <Image
          src={allIconList.Lightning}
          alt="Lightning Icon"
          width={66}
          height={66}
          className="h-12"
        />
        <div className="flex items-center">
          <Image
            src={allIconList.Light}
            alt="Lightning Icon"
            width={36}
            height={36}
            className="h-6"
          />
          <h2 className="text-[24px]  font-extrabold ml-4">
            Lightning Deals
          </h2>
          <span className=" text-[18px]  font-normal ml-4 ">Limited time offer</span>
        </div>
        <Image
          src={allIconList.Lightning}
          alt="Lightning Icon"
          width={66}
          height={66}
          className="h-12"
        />
      </div>
      <div className="flex gap-10 overflow-x-auto scrollbar-hide  pb-8 pt-10">
        {litingProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[120px] overflow-hidden hover:scale-105 transition-transform"
          >
            <Image
              src={product.image}
              alt={`Product ${product.id}`}
              width={60}
              height={60}
              className="w-full h-40 object-cover"
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
