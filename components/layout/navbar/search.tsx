'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();


  return (
    <form action="/search" className="relative w-full ">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder="Search Bibi Shop"
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-full bg-gray-200 px-4 py-3 text-black placeholder:text-neutral-600 placeholder:text-[14px] placeholder:font-medium text-[12px] focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-white md:bg-black p-2"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-4 w-4 text-black md:text-white" />
      </button>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full max-w-[550px]">
      <input
        placeholder="Search for products..."
        className="w-full rounded-full bg-gray-200 px-4 py-3 text-sm text-black placeholder:text-neutral-500"
      />
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-black p-2">
        <MagnifyingGlassIcon className="h-4 w-4 text-white" />
      </div>
    </form>
  );
}
