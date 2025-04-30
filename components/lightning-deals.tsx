import React from 'react';
import Image from 'next/image';
import { allIconList } from 'config/security-config';
import { getCollectionProducts } from 'lib/shopify';

export default async function LightningDeals() {
  const homepageItems = await getCollectionProducts({
      collection: 'Kitchen',
   });
    
    const litingProducts = homepageItems.map((item: any, index: number) => ({
      id: index + 1,
      price: parseFloat(item.priceRange.maxVariantPrice.amount),
      image: item.featuredImage?.url || '',
    }))
   
  return (
    <div className="text-white py-6">
      <div className="flex items-center justify-between px-6 bg-red-500 py-4 rounded-lg">
        <Image
          src={allIconList.Lightning}
          alt="Lightning Icon"
          width={24}
          height={24}
          className="h-6"
        />
        <div className="flex items-center">
          <span className="text-2xl font-bold">⚡</span>
          <h2 className="text-lg font-semibold ml-2">Lightning Deals</h2>
          <span className="ml-4 text-sm">Limited time offer</span>
        </div>
        <Image
         src={allIconList.Lightning}
          alt="Lightning Icon"
          width={24}
          height={24}
          className="h-6"
        />
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-6 py-6">
        {litingProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[180px] bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <Image
              src={product.image} // Ensure product images are in the public/images folder
              alt={`Product ${product.id}`}
              width={180}
              height={160}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="text-center text-red-500 font-bold text-lg">
                {product.price} Uzs
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
