'use client';

import { allIconList } from 'config/security-config';
import { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function NavbarMenu({ menu }: { menu: Menu[] }) {
  return (
    <ul className="hidden gap-6 text-sm md:flex md:items-center text-black">
      {menu.map((item: Menu) => (
        <DropdownMenuItem key={item.title} item={item} />
      ))}
    </ul>
  );
}

function DropdownMenuItem({ item }: { item: Menu }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const hasChildren = item.children && item.children.length > 0;
  
  const activeChild = item.children?.find((child: { title: string | null; }) => child.title === activeCategory);
  
  return (
    <li className="relative">
      <div 
        className="flex items-center cursor-pointer text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
        onMouseEnter={() => hasChildren && setIsOpen(true)}
      >
              
              <Link
        href={item.path}
        prefetch={true}
        className="flex items-center text-black"
        style={{
          fontWeight: 400,
          fontSize: '13.81px',
          lineHeight: '1.5',
        }}
      >
        {(item.title === 'Best-Selling Item' || item.title === '5-Star Rated') && (
          <Image src={item.title === 'Best-Selling Item' ? allIconList.BestIcon : allIconList.StarIcon} alt={item.title} className="h-4 w-4 mr-2" />
        )}
        {item.title}
      </Link>
        {hasChildren && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="black"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
      
      {hasChildren && (
        <div 
          className={`absolute left-0 top-full mt-4 p-2 z-50 bg-white shadow-lg rounded-md transition-opacity duration-200 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          style={{ width: '1000px', minHeight:"224px" }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex">
            <div className="w-64 border-r border-gray-100">
              <ul className="py-2">
                {item.children.map((child: Menu) => {
                  const hasSubChildren = child.children && child.children.length > 0;
                  const isActive = child.title === activeCategory;
                  
                  return (
                    <li 
                      key={child.title}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center ${
                        isActive ? 'bg-gray-50' : ''
                      }`}
                      onMouseEnter={() => setActiveCategory(child.title)}
                    >
                      <Link href={child.path} prefetch={true} className="block text-sm">
                        {child.title}
                      </Link>
                      
                      {hasSubChildren && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {activeChild && activeChild.children && activeChild.children.length > 0 && (
              <div className="flex-1 p-6 bg-white text-black">
                <div className="grid grid-cols-5 gap-6">
                  {activeChild.children.map((subItem: Menu) => (
                    <Link 
                      key={subItem.title}
                      href={subItem.path} 
                      prefetch={true}
                      className="flex flex-col items-center text-center group"
                    >
                      <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden mb-3 flex items-center justify-center">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-400">Image</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium group-hover:underline">
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {!activeCategory && (
              <div className="flex-1 p-6 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Select a category to view items</p>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}