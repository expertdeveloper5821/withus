'use client';
import { allIconList } from "config/security-config";
import Image from "next/image";
import React, { useRef } from "react";

interface GuaranteeScrollerProps {
  title?: string;
  items: string[];
  itemClassName?: string;
  mainScollClassName?: string;
  showArrow?: boolean; // Add a prop to control the visibility of the image
}

const FeatureScroller: React.FC<GuaranteeScrollerProps> = ({
  title,
  items = [],
  itemClassName = "bg-[#0A8800] text-white text-[15px] md:text-[18px] font-medium  px-4 py-2 rounded-md whitespace-nowrap", 
  mainScollClassName = "flex gap-2 overflow-x-auto md:overflow-x-auto lg:overflow-x-hidden scrollbar-hide scroll-smooth mt-2  md:ml-6 pr-10 md:w-[90%]",
  showArrow = true, 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className=" rounded-md w-full mt-2">
      <div className="flex items-center gap-2 text-[#0A8800] font-semibold text-sm mb-2">       
        <div className="flex text-[20px] md:text-[22px] gap-2 font-medium">
        {showArrow && ( <Image
            src={allIconList.OrderGreenIcon}
            alt="Delivery Icon"
            width={24}
            height={24}
            className="h-6 w-6" />)}
          {title}
          {showArrow && (
            <Image
              src={allIconList.GreenArrow}
              alt="Arrow Icon"
              width={6}
              height={6}
              className="mt-1 ml-2"
            />
          )}
        </div>
      </div>

      {/* Scrollable Row */}
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className={mainScollClassName}
        >
          {items.map((item, idx) => (
            <span key={idx} className={itemClassName}>
              {item}
            </span>
          ))}
        </div>
       
          <button
            className="hidden md:relative lg:block xl:block right-0 mr-4 bg-white shadow-md w-13 h-13 rounded-full flex items-center  justify-center"
            onClick={handleScroll}
          >
            <Image
              src={allIconList.ArrowIcon}
              alt="Filter Icon"
              width={24}
              height={24}
              className="h-8 w-8 ml-2"
            />
          </button>
      
      </div>
    </div>
  );
};

export default FeatureScroller;