import Footer from 'components/layout/footer';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';
import ChildrenWrapper from './children-wrapper';

export default function SearchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto  max-w-(--breakpoint-2xl) bg-white flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
      <div className="order-none flex md:order-last gap-8">
      <button className="flex items-center gap-1 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition">
        {/* <FunnelIcon className="h-4 w-4" /> */}
        Filters
      </button>

      {/* Deals Button */}
      <button className="flex items-center gap-1 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition">
        {/* <BoltIcon className="h-4 w-4" /> */}
        Deals end today
      </button>
          <FilterList list={sorting} />
         
        </div>
        {/* <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections />
        </div> */}
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        
      </div>
      <Footer />
    </>
  );
}
