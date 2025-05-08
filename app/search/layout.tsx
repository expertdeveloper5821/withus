import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import Footer from 'components/layout/footer';
import FilterList from 'components/layout/search/filter';
import { allIconList } from 'config/security-config';
import { sorting } from 'lib/constants';
import Image from 'next/image';
import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto  max-w-(--breakpoint-2xl) bg-white flex-col gap-8  text-black md:flex-row dark:text-white">
      
<div className="flex order-none md:order-last gap-4 pb-4 pl-2 pt-4 overflow-x-auto">
  {/* Filter Button */}
  <button className="w-[50%] md:w-auto justify-center flex items-center  gap-1 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition whitespace-nowrap">
    <Image src={allIconList.FilterIcon} alt="Filter Icon" className="w-4 h-4" />
    Filters
  </button>

  {/* Deals Button */}
  <button className="w-[50%] md:w-auto flex justify-center items-center gap-1 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition whitespace-nowrap">
    <Image src={allIconList.GreyLight} alt="Bolt Icon" className="w-4 h-4" />
    Deals end today
  </button>

  {/* Sorting Options */}
  <FilterList list={sorting} />
</div>

{/* Mobile Shipping Info Banner - Only visible on small screens */}
<div className="flex items-center justify-between gap-2 bg-[#FFEAEA] px-4 py-2 md:hidden">
  <div className="flex items-center gap-2 text-green-700 font-normal text-sm">
    <CheckIcon className="w-4 h-4" />
    <span>Free shipping</span>
  </div>

  <div className="flex items-center gap-2 text-green-700 font-normal text-sm whitespace-nowrap">
    <CheckIcon className="w-4 h-4" />
    <span>Price adjustment within 30 days</span>
  </div>

  <ChevronRightIcon className="w-4 h-4 text-green-700" />
</div>

        {/* <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div> */}
        <div className="order-last min-h-screen w-full px-4 pb-4 md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        
      </div>
      <Footer />
    </>
  );
}
