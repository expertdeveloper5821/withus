// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';


// interface ImageType {
//   src: string;
//   altText?: string;
// }

// interface ExpandableGalleryProps {
//   images: ImageType[];
// }

// const ExpandableGallery = ({ images }: ExpandableGalleryProps) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     // <div className="relative max-w-xl mx-auto">
//         <div
//       className={`relative mx-auto transition-all duration-500 ${
//         expanded ? 'max-w-3xl' : 'max-w-xs'
//       }`}
//     >
//       <div
//         className={`overflow-hidden transition-all duration-500 ${
//           expanded ? 'max-h-[200px]' : 'max-h-[300px]'
//         }`}
//       >
//       {/* <div className={`overflow-hidden transition-all duration-300 ${expanded ? '' : 'h-[400px]'}`}> */}
//       {images.map((image, index) => (
//           <div key={index} className="relative w-full aspect-[3/4]">
//             <Image
//               src={image.src}
//               alt={''}
//               fill
//               className="object-contain"
//             />
//           </div>
//         ))}

//         {!expanded && (
//           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
//         )}
//       </div>

//       <div className="text-center mt-4">
//         <button
//           onClick={() => setExpanded(!expanded)}
//           className="flex items-center justify-center mx-auto gap-1 text-sm font-medium text-black hover:underline"
//         >
//           {expanded ? 'See less' : 'See more'}
//           {expanded ? (<>up</>) : (<>down</>)}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpandableGallery;


'use client';

import { StarIcon } from '@heroicons/react/20/solid';
import { allIconList } from 'config/security-config';
import Image from 'next/image';
import { useState } from 'react';
interface ImageType {
  src: string;
  altText?: string;
}

interface ExpandableGalleryProps {
  images: ImageType[];
}

export default function ProductDetailsSection({ images }: ExpandableGalleryProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

 
  return (
    <div className="w-full px-4 py-6 border-t border-b border-gray-200">
        <div className=" md:items-center md:justify-between gap-4  rounded-md bg-white">
      {/* Left section: Avatar and Info */}
      <div className="block md:flex items-center gap-4">
        <Image
          src={allIconList.ProfileIcon}
          alt="Seller"
          width={60}
          height={60}
          className="w-18 h-18 rounded-full object-cover md:mb-[26px]"
        />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] md:text-[40px] font-semibold text-black">MOOCOM</h2>
           <Image
            src={allIconList.StarSellerImg} 
            alt="Star Seller"
            width={80}
            height={80}  
            className='w-14 h-14 md:h-18 md:w-18 mr-2' 
              />
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-700 mt-1 mb-4">
            <span>
              <span className="font-semibold text-black">994</span> Followers
            </span>
            <span>
              <span className="font-semibold text-black">200k+</span> Sold
            </span>
            <span className="flex items-center gap-1">
              <span className="font-semibold text-black">4.6</span>
              <StarIcon className="h-4 w-4 text-black" />
            </span>
          </div>
          <div className="flex gap-2">
          <button className="flex items-center gap-1 border px-4 py-1.5 border-black rounded-full text-[14px] md:text-[18px] font-normal text-black hover:bg-gray-100">
            <Image
              src={allIconList.User} 
              alt="Follow"
              width={16}
              height={16} />
            Follow
          </button>
          <button className="flex items-center gap-1 border px-4 py-1.5 border-black rounded-full text-[14px] md:text-[18px] font-normal text-black hover:bg-gray-100">
            Shop all item (100)
          </button>
        </div>
        </div>
      </div>

      {/* Right section: Buttons and Establish Date */}
      <div className="flex flex-col  gap-2 md:gap-1 mt-3">
        
        <div className="text-[16px] text-black flex items-center gap-1 mt-1 md:mt-0">
        <span>Seller established 1 year ago</span>
        </div>
      </div>
    </div>
      <h2 className="text-lg text-black font-semibold mb-2 mt-2">Product details</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>Material: Polyester</li>
        <li>Sleeve Length: Short Sleeve</li>
        <li>Details: None</li>
      </ul>

      <button
        onClick={toggleExpanded}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-black"
      >
        {expanded ? 'See less' : 'See more'}
        <span className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Conditionally Rendered Images */}
      {expanded && (
        <>
        {images.map((image, index) => (
                    <div key={index} className="relative w-full aspect-[3/3] mt-4">
                      <Image
                        src={image.src}
                        alt={''}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
        </>
      )}
    </div>
  );
}
