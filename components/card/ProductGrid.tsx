import Image from 'next/image';
import { ShoppingCartIcon} from '@heroicons/react/24/outline';

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  tag?: string;
  badge?: string;
  rating: number;
  reviews: number;
  category: string;
}

interface ProductGridProps {
  title?: string;
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ title = "Items you may want to add", products }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:lg:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative aspect-square">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    width={200}
                    height={200}
                  />
                ) : (
                  <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
              {product.tag && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.tag}
                </div>
              )}
              {product.badge && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  {product.badge}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-gray-900">CA${product.price}</span>
                  <span className="ml-1 text-sm text-gray-500 line-through">CA${product.originalPrice}</span>
                </div>
                <button className="flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-full">
                  <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
