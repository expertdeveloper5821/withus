import React from 'react';

interface Product {
  id: string | number;
  image: string;
  title: string;
  discountPrice?: number;
  originalPrice?: number;
  price?: number | string;
  description: string;
  ratings: number;
  reviews: number;
}

export default function ProductGrid({ products }: { products: Product[] | any }) {
  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {products.map((product:any) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-md bg-white"
        >
          <div className="relative">
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              MEGA SALE
            </span>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
          <h3 className="text-sm font-semibold mt-2 line-clamp-2 text-black">{product.title}</h3>
          <div className="flex items-center justify-between mt-2">
  <div className="text-red-500 font-bold text-lg">
    {product.discountPrice} <span className="text-xs">Uzs</span>
    <span className="line-through text-gray-500 text-sm ml-2">
      {product.price}
    </span>
  </div>
  <button className="px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 flex items-center justify-center">
    🛒
  </button>
</div>
          <p className="text-xs text-gray-500 mt-1">{product.description}</p>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <span className="text-yellow-500">{"★".repeat(product.ratings)}</span>
            <span className="text-gray-400 ml-1">
              {"☆".repeat(5 - product.ratings)}
            </span>
            <span className="ml-2">({product.reviews.toLocaleString()})</span>
          </div>
          {/* <button className="mt-2 px-4 py-2 bg-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 flex items-center justify-center">
            🛒
          </button> */}
        </div>
      ))}
    </div>
  );
}