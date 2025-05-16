'use client';
import { allIconList } from "config/security-config";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

interface Item {
  title: string;
  description: string; 
}

interface GuaranteeScrollerProps {
  title?: string;
  items: Item[] | any; 
  itemClassName?: string;
  mainScollClassName?: string;
  showArrow?: boolean;
  onClickItem?: (item: Item) => void; 
  onDescriptionSelect?: (description: string) => void; 
}

const FeatureScroller: React.FC<GuaranteeScrollerProps> = ({
  title,
  items = [],
  itemClassName = "bg-[#0A8800] text-white text-[15px] md:text-[18px] font-medium px-4 py-2 rounded-md whitespace-nowrap", 
  mainScollClassName = "flex gap-2 overflow-x-auto md:overflow-x-auto lg:overflow-x-hidden scrollbar-hide scroll-smooth mt-2 md:ml-6 pr-10 md:w-[90%]",
  showArrow = true,
  onClickItem,
  onDescriptionSelect, 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'right' ? 150 : -100;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const position = scrollRef.current.scrollLeft;
      setScrollPosition(position);
      
      // Show left arrow if scrolled beyond index 0
      setShowLeftArrow(position > 100);
      
      // Disable left arrow if at the start (position close to 0)
      setIsAtStart(position < 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScrollEvent);
      return () => scrollContainer.removeEventListener('scroll', handleScrollEvent);
    }
  }, []);

  const handleClickItem = (item: Item) => {
    setSelectedItem(item);
    onClickItem?.(item); 
    if (onDescriptionSelect) {
      onDescriptionSelect(item.description); 
    }
  };

  return (
    <div className="rounded-md w-full mt-2">
      {/* Title and Icons */}
      <div className="flex items-center gap-2 text-[#0A8800] font-semibold text-sm mb-2">       
        <div className="flex text-[20px] md:text-[22px] gap-2 font-medium">
          {showArrow && (
            <Image
              src={allIconList.OrderGreenIcon}
              alt="Delivery Icon"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          )}
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

      {/* Scrollable Items */}
      <div className="relative flex items-center">
        {/* Left scroll arrow - hide completely when at start */}
        {!isAtStart && (
          <button
            className="hidden md:block lg:block xl:block absolute left-0 z-10 bg-white shadow-md w-13 h-13 rounded-full flex items-center justify-center hover:bg-gray-100"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            <Image
              src={allIconList.ArrowIcon}
              alt="Scroll Left"
              width={24}
              height={24}
              className="h-7 w-7 transform rotate-180 ml-3"
            />
          </button>
        )}
        
        <div 
          ref={scrollRef} 
          className={mainScollClassName}
          onScroll={handleScrollEvent}
        >
          {items.map((item:any, idx:any) => {
            const isActive = selectedItem?.title === item.title;
            return(
            <span
              key={idx}
              className={`
        ${itemClassName} 
        cursor-pointer 
         transform transition-transform duration-200 
        hover:scale-95
        hover:shadow-md 
        ${isActive ? "border border-black" : ""}
      `}
              onClick={() => handleClickItem(item)}
              role="button"
            >
              {item.title} 
            </span>
            )
          })}
        </div>

        {/* Right scroll arrow */}
        <button
          className="hidden md:relative lg:block xl:block right-0 mr-4 bg-white shadow-md w-13 h-13 rounded-full flex items-center justify-center"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          <Image
            src={allIconList.ArrowIcon}
            alt="Scroll Right"
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
