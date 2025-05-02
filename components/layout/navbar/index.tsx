import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import {  getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import NavbarMenu from './navbarMenu';
import Image from 'next/image';
import { allIconList } from 'config/security-config';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('main-menu-header');

  const cleanedMenu = menu.map(item => ({
    ...item,
    path: item.path.replace(/^pages\//, '/'),
    children: item?.children?.map((child: any) => ({
      ...child,
      path: child.path.replace(/^pages\//, '/'),
      children: child?.children?.map((subChild: any) => ({
        ...subChild,
        path: subChild.path.replace(/^pages\//, '/')
      }))
    }))
  }));
  

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-white ">
      <div className="block flex-none md:hidden ">
        <Suspense fallback={null}>
          <MobileMenu menu={cleanedMenu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center justify-between ">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            {/* <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div> */}
          </Link>
          {cleanedMenu.length ? (
            <NavbarMenu menu={cleanedMenu} />
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
          <div className="flex items-center space-x-6">

    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Image
          src={allIconList.ManIcon}
          alt="User Icon"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span className="text-sm font-medium text-gray-800">Orders & Account</span>
      </div>

      <div className="flex items-center space-x-2">
        <Image
          src={allIconList.Support}
          alt="Support Icon"
          width={24}
          height={24}
        />
        <span className="text-sm font-medium text-gray-800">Support</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-800">EN</span>
      </div>
    </div>
  </div>
   
        <div className="flex justify-end space-x-4">

          <CartModal />
        </div>
      </div>
    </nav>
  );
}
