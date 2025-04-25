'use client';

import clsx from 'clsx';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useCart } from 'components/cart/cart-context';
import { createCartAndSetCookie, redirectToCheckout } from 'components/cart/actions';
import { EditItemQuantityButton } from 'components/cart/edit-item-quantity-button';
import { DeleteItemButton } from 'components/cart/delete-item-button';


export default function CartPage() {
  const { cart, updateCartItem } = useCart();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);
  

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="font-medium">Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-amber-50 border border-amber-100 p-3 rounded flex items-center">
          <div className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <span className="font-medium">Free shipping (excluding items shipped by local warehouses)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            {!cart || cart.lines.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm mb-6 text-center">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-24 h-24 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Your shopping cart is empty</h2>
                  <p className="text-gray-500 mb-6">Add your favorite items in it.</p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto">
                    <Link href="/signin" className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md text-center font-medium">
                      Sign in / Register
                    </Link>
                  </div>
                  <Link href="/" className="block w-full max-w-xs mx-auto mt-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md text-center font-medium">
                    Start shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h1 className="text-xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
                <ul className="divide-y divide-gray-200">
                  {cart.lines
                    .sort((a, b) =>
                      a.merchandise.product.title.localeCompare(
                        b.merchandise.product.title
                      )
                    )
                    .map((item, i) => {
                      const merchandiseSearchParams: Record<string, string> = {};
                      
                      item.merchandise.selectedOptions.forEach(
                        ({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] = value;
                          }
                        }
                      );

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
                              src={
                                item.merchandise.product.featuredImage?.url
                              }
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
                                  <EditItemQuantityButton
                                    item={item}
                                    type="minus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                  <span className="w-10 text-center flex items-center justify-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <EditItemQuantityButton
                                    item={item}
                                    type="plus"
                                    optimisticUpdate={updateCartItem}
                                  />
                                </div>
                              </div>
                              <div className="flex">
                                <DeleteItemButton
                                  item={item}
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            Recommended Items
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Items you may want to add</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      id: 1,
                      title: 'Dual Cameras E99 Pro Drone',
                      price: 31.23,
                      originalPrice: 140.81,
                      image: '/drone-placeholder.jpg',
                      tag: "Mother's Day",
                      rating: 4.8,
                      reviews: 235,
                      category: 'Drones & Flying Toys'
                    },
                    {
                      id: 2,
                      title: 'Stylish Quartz Men\'s Watch',
                      price: 16.41,
                      originalPrice: 54.59,
                      image: '/watch-placeholder.jpg',
                      rating: 4.9,
                      reviews: 260,
                      category: 'Men\'s Watches'
                    },
                    {
                      id: 3,
                      title: 'Seven-piece Capybara Pencil Case',
                      price: 5.87,
                      originalPrice: 19.99,
                      image: '/pencilcase-placeholder.jpg',
                      tag: "Mother's Day",
                      rating: 4.9,
                      reviews: 141,
                      category: 'Storage & Organization'
                    },
                    {
                      id: 4,
                      title: 'Android 13 Smartphone',
                      price: 115.23,
                      originalPrice: 191.89,
                      image: '/phone-placeholder.jpg',
                      tag: "Mother's Day",
                      badge: "Local",
                      rating: 0,
                      reviews: 0,
                      category: 'Smartphones'
                    }
                  ].map((product) => (
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
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Estimated total</span>
                  <span className="font-medium">{cart ? <Price amount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} /> : 'CA$0.00'}</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  Taxes and delivery fees are calculated on the next page.
                </div>
                
                <form action={redirectToCheckout} className="mt-6">
                  <CheckoutButton />
                </form>
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">You will not be charged until you review this order on the next page</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Safe Payment Options</p>
                      <p className="text-sm text-gray-500">Temu is committed to protecting your payment information. We follow PCI DSS standards, use strong encryption, and perform regular reviews of systems to protect your privacy.</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">1. Payment methods</p>
                    <div className="grid grid-cols-5 gap-2">
                      {['PayPal', 'Visa', 'Mastercard', 'Discover', 'Diners', 'JCB', 'UnionPay', 'Apple Pay', 'Google Pay'].map((method) => (
                        <div key={method} className="h-8 bg-gray-100 rounded flex items-center justify-center p-1">
                          <span className="text-xs text-gray-500">{method}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">2. Security certification</p>
                    <div className="grid grid-cols-4 gap-2">
                      {['SSL', 'PCI', 'ID Check', 'SafeKey'].map((cert) => (
                        <div key={cert} className="h-8 bg-gray-100 rounded flex items-center justify-center p-1">
                          <span className="text-xs text-gray-500">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-4 border-t border-gray-200">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Secure privacy</p>
                      <p className="text-sm text-gray-500">Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We will only use your information in accordance with our privacy policy to provide and improve our services to you.</p>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">Learn more &rarr;</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-4 border-t border-gray-200">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Temu Purchase Protection</p>
                      <p className="text-sm text-gray-500">Shop confidently on Temu knowing that if something goes wrong, we've always got your back.</p>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">See program terms &rarr;</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-2">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Temu's Tree Planting Program &rarr;</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-full font-medium transition-colors"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : 'Checkout (0)'}
    </button>
  );
}