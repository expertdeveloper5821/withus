'use client';

import { createCartAndSetCookie } from 'components/cart/actions';
import { useCart } from 'components/cart/cart-context';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { DeleteItemButton } from 'components/cart/delete-item-button';
import { EditItemQuantityDropdown } from 'components/cart/QuantitySelect';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';

export default function ClientCart() {
  const { cart, updateCartItem } = useCart();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);


  if (!cart || cart.lines.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm mb-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-24 h-24 mb-6">
            {/* empty cart icon */}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your shopping cart is empty</h2>
          <p className="text-gray-500 mb-6">Add your favorite items in it.</p>
          <Link href="/signin" className="block w-full bg-orange-500 text-white py-3 px-6 rounded-md text-center font-medium mb-2">
            Sign in / Register
          </Link>
          <Link href="/" className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md text-center font-medium">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
  
    <div className="bg-white p-0 md:p-6 rounded-xl shadow-md">
  <div className="flex justify-between items-center border-b pb-4 mb-4">
    <div className="flex items-center gap-2">
      <input type="checkbox" className="w-5 h-5 text-red-500 accent-red-500" />
      <span className="font-semibold text-lg text-gray-800">Select All ({cart.lines.length})</span>
    </div>
    <button className="text-gray-600 hover:text-black">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <ul className="space-y-4">
    {cart.lines.map((item, i) => {
      const quantity = item.quantity;
      const unitAmount = parseFloat(item.cost.totalAmount.amount);
      const currencyCode = item.cost.totalAmount.currencyCode;
      const totalAmount = (unitAmount * quantity).toFixed(2);

      const merchandiseSearchParams: Record<string, string> = {};
      item.merchandise.selectedOptions.forEach(({ name, value }) => {
        if (value !== DEFAULT_OPTION) {
          merchandiseSearchParams[name.toLowerCase()] = value;
        }
      });

      const merchandiseUrl = createUrl(
        `/product/${item.merchandise.product.handle}`,
        new URLSearchParams(merchandiseSearchParams)
      );

      return (
        <li key={i} className="flex items-center gap-4 border border-gray-200 rounded-lg p-4">
        


<input 
  type="checkbox" 
  className="w-5 h-5 "
 
/>
          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border">
            <Image
              className="w-full h-full object-cover"
              width={80}
              height={80}
              alt={item.merchandise.product.featuredImage?.altText || item.merchandise.product.title}
              src={item.merchandise.product.featuredImage?.url}
            />
          </div>

       
          <div className="flex-1 min-w-0">
            <Link
              href={merchandiseUrl}
              className="text-sm font-medium text-gray-900 hover:underline line-clamp-2 block"
            >
              {item.merchandise.product.title}
            </Link>
            <p className="text-xs text-gray-500 mt-1">
              Color: White / Size: Large <span className="inline-block ml-1">›</span>
            </p>
            <div className="flex items-center gap-2 mt-1 text-sm">
            
              <Price
                        className="text-sm font-semibold text-red-600 "
                        amount={item.cost.totalAmount.amount}
                        currencyCode={item.cost.totalAmount.currencyCode}
                      />
               
              <span className="line-through text-gray-400 text-xs">{(unitAmount * 1.5).toFixed(0)}</span>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded font-semibold">-67%</span>
            </div>
          </div>


          <div className="flex flex-col items-end gap-2">
          <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
            <div className="flex items-center space-x-1">
             
              <EditItemQuantityDropdown item={item} optimisticUpdate={updateCartItem} />
             
            </div>
           
           
          </div>
        </li>
      );
    })}
  </ul>
</div>

  );
}

