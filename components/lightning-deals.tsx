'use client';

import { allIconList } from "config/security-config";
import Image from "next/image";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  price: number;
  image: string;
};

export default function LightningDealsClient({ products }: { products: Product[] }) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 840;
    setVisibleProducts(isSmallScreen ? products.slice(0, 5) : products);

    const handleResize = () => {
      const isSmall = window.innerWidth < 840;
      setVisibleProducts(isSmall ? products.slice(0, 5) : products);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  return (
    <div className="text-white md:pb-4 pt-[18px] md:pt-[36px]">
      <div className="flex items-center justify-between px-0 sm:px-3 py-2 sm:bg-[#D91E37]">
        <Image
          src={allIconList.Lightning}
          alt="Lightning Icon"
          width={66}
          height={66}
          className="h-12 hidden sm:block"
        />
        <div className="flex items-center">
          <Image
            src={allIconList.Light}
            alt="Lightning Icon"
            width={36}
            height={36}
            className="h-6 hidden sm:block"
          />
            <Image
            src={allIconList.LightingRedIcon}
            alt="Lightning Icon"
            width={30}
            height={30}
            className="h-4 block md:hidden"
          />
          
          <div className="flex gap-16 md:gap-2 items-center ">
            <h2 className="text-[16px] sm:text-[24px] font-medium sm:font-extrabold ml-0 md:ml-4 text-[#D91E37] sm:text-white">
              Lightning Deals
            </h2>
            <span className="text-[16px] md:text-[18px] font-normal ml-1 text-[#00000099] sm:text-white">
              Limited time offer
            </span>
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
      <div className="flex  gap-2 md:gap-2 lg:gap-10 overflow-x-auto scrollbar-hide pb-2 md:pb-8 pt-1 md:pt-5 sm:pt-10">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[62px] md:min-w-[96px] lg:min-w-[124px] xl:min-w-[162px] sm:min-w-[120px] overflow-hidden hover:scale-105 transition-transform"
          >
            <Image
              src={product.image}
              alt={`Product ${product.id}`}
              width={60}
              height={60}
              className="w-16 h-16  md:w-full sm:h-26 object-cover"
            />
            <div className="pt-1">
              <div className="text-center line-clamp-1 text-red-500 text-[14px] md:text-[25px] font-bold leading-[150%]">
                {product.price} Uzs
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
