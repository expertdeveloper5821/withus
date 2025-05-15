// import React, { useEffect, useState } from 'react';
// import ProductGrid from 'components/grid/product-grid'; // Example ProductGrid component
// import { getCollections } from 'lib/shopify';

// const ProductPage = () => {
//   const [collections, setCollections] = useState([]);
//   const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
//   const [formattedProducts, setFormattedProducts] = useState([]);

//   useEffect(() => {
//     // Fetch all collections on component mount
//     const fetchCollections = async () => {
//       const productCollections = await getCollections();
//       setCollections(productCollections);
//     };

//     fetchCollections();
//   }, []);

//   useEffect(() => {
//     // Fetch products when a collection is selected
//     const fetchProducts = async () => {
//       if (selectedCollectionId) {
//         const products = await getProductsByCollectionId(selectedCollectionId);

//         // Format if needed
//         const formatted = products.map((product: any) => ({
//           id: product.id,
//           name: product.title,
//           price: product.price,
//           image: product.image,
//           // ...other formatting
//         }));

//         setFormattedProducts(formatted);
//       }
//     };

//     fetchProducts();
//   }, [selectedCollectionId]);

//   const handleCollectionClick = (id: string) => {
//     setSelectedCollectionId(id);
//   };

//   return (
//     <div>
//       {/* Render collections */}
//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
//         {collections.map((collection: any) => (
//           <button key={collection.id} onClick={() => handleCollectionClick(collection.id)}>
//             {collection.title}
//           </button>
//         ))}
//       </div>

//       {/* Render products */}
//       <ProductGrid products={formattedProducts} />
//     </div>
//   );
// };

// export default ProductPage;

// components/CartItem.tsx
import React from 'react';


interface CartItemProps {
  title: string;
  color: string;
  size: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({
  title,
  color,
  size,
  price,
  originalPrice,
  image,
  quantity,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-start gap-4">
        <input type="checkbox" className="mt-2" />
        <img src={image} alt={title} className="w-20 h-20 object-cover rounded" />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">Color: {color} / Size: {size}</p>
          <div className="flex items-center gap-2">
            <p className="text-red-600 font-semibold">{price.toLocaleString()} UZS</p>
            <p className="line-through text-sm text-gray-400">{originalPrice.toLocaleString()} UZS</p>
            <span className="text-white text-xs bg-red-500 px-1 rounded">-{Math.round((1 - price / originalPrice) * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <select className="border rounded px-2 py-1 text-sm">
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button className="text-gray-400 hover:text-red-600">
        Del
        </button>
      </div>
    </div>
  );
};

