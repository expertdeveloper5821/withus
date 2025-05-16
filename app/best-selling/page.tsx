'use client';

import { useState, useEffect } from 'react';
import ProductGrid from 'components/grid/product-grid';
import CollectionPageHeader from 'components/layout/collection-page-header';

// Define the Product interface
interface Product {
  id: number;
  title: string;
  handle: string;
  discountPrice: number;
  price: number;
  image: string;
  tag?: string;
  badge?: string;
  ratings: number;
  reviews: number;
  updatedAt: string;
}

export default function BestSellingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isGridLoading, setIsGridLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollectionProducts = async (handle: string) => {
    try {
      setIsGridLoading(true);
      const response = await fetch(`/api/collections/products?collection=${handle}`);
      if (!response.ok) throw new Error(`Failed to fetch collection: ${handle}`);
      const products = await response.json();
     
      const formattedProducts: Product[] = products.map((item: any, index: number) => ({
        id: index + 1,
        title: item.title,
        handle: item.handle,
        discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
        price: parseFloat(item.priceRange.maxVariantPrice.amount),
        image: item.featuredImage?.url || '',
        tag: item.tags?.includes("Mother's Day") ? "Mother's Day" : undefined,
        badge: item.tags?.includes("Local") ? "Local" : undefined,
        ratings: 4, 
        reviews: Math.floor(Math.random() * 200),
        updatedAt: item.updatedAt || new Date().toISOString()
      }));
      
      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
      setIsGridLoading(false);
    } catch (error) {
      console.error(`Error fetching ${handle} products:`, error);
      setError('Failed to load collection products');
      setIsGridLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectionProducts('best-sellers');
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-[18px] text-black font-bold">Best-Selling Items</h1>
      </div>
      
      {isGridLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Skeleton for product image */}
              <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
              
              <div className="p-4">
                {/* Skeleton for title */}
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                
                {/* Skeleton for price */}
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
                
                {/* Skeleton for ratings */}
                <div className="flex items-center mt-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mr-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-red-600">{error}</h2>
          <p className="mt-2 text-gray-500">Please try again later</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-600">No products found</h2>
          <p className="mt-2 text-gray-500">Please check back later for our best selling items</p>
        </div>
      )}
    </div>
  );
}
