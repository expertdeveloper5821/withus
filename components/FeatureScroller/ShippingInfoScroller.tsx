'use client';
import { allIconList } from 'config/security-config'; // Make sure this path is correct
import Image from 'next/image';
import { useRef } from 'react';

const ShippingInfoScroller = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-[90%] max-w-2xl  px-1 mt-4">
      {/* Title */}
      <div className="flex items-center  text-green-600 font-semibold mb-2 text-sm">
        <div className="flex items-center text-[20px] md:text-[22px] gap-2">
          <Image
            src={allIconList.GreenDeliveryIcon}
            alt="Delivery Icon"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          Free shipping
        </div>
        <span className="text-green-600"> <Image
                      src={allIconList.GreenArrow}
                      alt="Arrow Icon"
                      width={6}
                      height={6}
                      className="mt-1 ml-2"
                    /></span>
      </div>

      {/* Scrollable Cards */}
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto md:overflow-x-hidden scrollbar-hide scroll-smooth mt-2 ml-6"
        >
          {/* Card Example */}
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="min-w-[280px] flex-shrink-0 bg-gray-50  rounded-xl p-4">
              <p className="text-green-600 font-medium mb-1">
                Standard: free on all orders
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">Delivery:</span>{' '}
                <span className="text-black">9–22</span> business day
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-black">Courier company:</span>{' '}
                <span className="text-black">UZ post, Jana post</span>
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Button (Tablet/Desktop Only) */}
        <button
          className="hidden md:flex absolute right-0 mr-2 bg-white shadow-md w-13 h-13 rounded-full items-center justify-center"
          onClick={handleScroll}
        >
          <Image
            src={allIconList.ArrowIcon}
            alt="Arrow Icon"
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
};

export default ShippingInfoScroller;
