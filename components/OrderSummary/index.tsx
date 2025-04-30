'use client';

import { useEffect } from 'react';
import { useCart } from 'components/cart/cart-context';
import { createCartAndSetCookie, redirectToCheckout } from 'components/cart/actions';
import { EditItemQuantityButton } from 'components/cart/edit-item-quantity-button';
import { DeleteItemButton } from 'components/cart/delete-item-button';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import Price from 'components/price';

import LoadingDots from 'components/loading-dots';
import { DEFAULT_OPTION } from 'lib/constants';
import { useFormStatus } from 'react-dom';

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
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
      <ul className="divide-y divide-gray-200">
        {cart.lines
          .sort((a, b) =>
            a.merchandise.product.title.localeCompare(b.merchandise.product.title)
          )
          .map((item, i) => {
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
              <li key={i} className="py-6 flex">
                <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                    alt={
                      item.merchandise.product.featuredImage?.altText ||
                      item.merchandise.product.title
                    }
                    src={item.merchandise.product.featuredImage?.url}
                  />
                </div>
                <div className="ml-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex justify-between">
                      <Link
                        href={merchandiseUrl}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        {item.merchandise.product.title}
                      </Link>
                      <Price
                        className="text-sm font-medium text-gray-900"
                        amount={item.cost.totalAmount.amount}
                        currencyCode={item.cost.totalAmount.currencyCode}
                      />
                    </div>
                    {item.merchandise.title !== DEFAULT_OPTION && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.merchandise.title}
                      </p>
                    )}
                  </div>
                  <div className="flex-1 flex items-end justify-between">
                    <div className="flex">
                      <div className="inline-flex border border-gray-200 rounded">
                        <EditItemQuantityButton item={item} type="minus" optimisticUpdate={updateCartItem} />
                        <span className="w-10 text-center flex items-center justify-center text-sm">
                          {item.quantity}
                        </span>
                        <EditItemQuantityButton item={item} type="plus" optimisticUpdate={updateCartItem} />
                      </div>
                    </div>
                    <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>

      
    </div>
  );
}

