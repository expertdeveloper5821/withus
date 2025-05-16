import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { allIconList } from 'config/security-config';
import { menuMappings, getMappedPathForMenuTitle } from 'config/menu-mappings';
import { getMenu } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import NavbarMenu from './navbarMenu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('main-menu-header');
  
  // Apply menu mappings from config file
  const updatedMenu = menu.map(item => {
    const mappedPath = getMappedPathForMenuTitle(item.title);
    if (mappedPath) {
      return { ...item, path: mappedPath };
    }
    return item;
  });

  const cleanedMenu = updatedMenu.map(item => ({
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
    <nav className="relative flex items-center justify-between p-3 lg:px-12 bg-white ">
      
      <div className="flex w-full gap-2 items-center justify-between ">
        <div className="flex  gap-2">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-2"
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
        <div className=" justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>   
            <Search />
          </Suspense>
        </div>
        <div className="block flex-none md:hidden ">
        <Suspense fallback={null}>
          <MobileMenu menu={cleanedMenu} />
        </Suspense>
      </div>
          <div className="flex items-center space-x-6">

    <div className="flex items-center space-x-2 md:space-x-6">
      <div className="flex items-center space-x-1 md:space-x-2" >
        <Image
          src={allIconList.ManIcon}
          alt="User Icon"
          width={24}
          height={24}
          className="w-8 rounded-full"
        />
        <span className="text-[12px] font-semibold text-gray-800 hidden md:block md:w-[49px]">Orders & Account</span>
      </div>

      <div className="md:flex items-center space-x-2 hidden ">
        <Image
          src={allIconList.Support}
          alt="Support Icon"
          width={24}
          height={24}
        />
        <span className="text-[12px] font-semibold text-gray-800">Support</span>
      </div>

      <div className="hidden md:flex items-center space-x-2">
        <span className="text-[12px] font-medium text-gray-800">EN</span>
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
