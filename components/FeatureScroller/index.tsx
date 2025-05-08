'use client';
import { allIconList } from "config/security-config";
import Image from "next/image";
import React, { useRef } from "react";

interface GuaranteeScrollerProps {
  title?: string;
  items: string[];
  itemClassName?: string;
  showArrow?: boolean; // Add a prop to control the visibility of the image
}

const FeatureScroller: React.FC<GuaranteeScrollerProps> = ({
  title,
  items = [],
  itemClassName = "bg-green-600 text-white text-sm px-4 py-2 rounded-md whitespace-nowrap", // Default styles
  showArrow = true, 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className="p-1 md:p-4 rounded-md w-full mt-2">
      <div className="flex items-center gap-2 text-green-600 font-semibold text-sm mb-2">
        <div className="flex text-[22px] font-medium">
          {title}
          {showArrow && (
            <Image
              src={allIconList.GreenArrow}
              alt="Arrow Icon"
              width={8}
              height={8}
              className="mt-1 ml-1"
            />
          )}
        </div>
      </div>

      {/* Scrollable Row */}
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto md:overflow-x-auto lg:overflow-x-hidden scrollbar-hide scroll-smooth pr-10"
        >
          {items.map((item, idx) => (
            <span key={idx} className={itemClassName}>
              {item}
            </span>
          ))}
        </div>
       
          <button
            className="hidden md:absolute right-0 -mr-4 bg-white shadow-md w-8 h-8 rounded-full flex items-center justify-center"
            onClick={handleScroll}
          >
            <Image
              src={allIconList.ArrowIcon}
              alt="Filter Icon"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </button>
      
      </div>
    </div>
  );
};

export default FeatureScroller;