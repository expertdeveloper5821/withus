'use client';
import { allIconList } from 'config/security-config';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const TopBanner = () => {
  const items = [
    { icon: allIconList.freeshipping, text: 'Free shipping', subtext: 'Special for you' },
    { icon: allIconList.CaoffIcon, text: 'CA$10 off', subtext: 'On orders over CA$100' },
    { icon: allIconList.GuaranteeIcon, text: 'Delivery guarantee', subtext: 'Refund for any issues' },
    { icon: allIconList.GetAppIcon, text: 'Get the bbshop App', subtext: '' },
  ];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
     <div className="hidden sm:flex bg-black text-white flex-row items-center px-4 py-4 text-sm justify-evenly gap-4">   
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3  ${
            isSmallScreen ? 'mb-4' : 'border-r border-gray-700 px-8 last:border-none'
          } border-r border-gray-700 px-12 last:border-none`}
        >
          <span className="text-lg"> <Image src={item.icon} alt={''} width={50} height={50} className='w-8 h-8' /></span>
          <div className="flex flex-col">
            <p className="font-bold  text-[15.88px] flex items-center gap-1">
              {item.text}  {index === 0 && <span className="text-white  text-[18px] font-semibold">›</span>}
            </p>
            {item.subtext && <p className="text-white font-normal  text-[13.89px] ">{item.subtext}</p>}
          </div>
        </div>
      ))}
    </div>
    
    </>
  );
};

export default TopBanner;
