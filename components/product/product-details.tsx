'use client';

import Image from 'next/image';
import { useState } from 'react';


interface ImageType {
  src: string;
  altText?: string;
}

interface ExpandableGalleryProps {
  images: ImageType[];
}

const ExpandableGallery = ({ images }: ExpandableGalleryProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    // <div className="relative max-w-xl mx-auto">
        <div
      className={`relative mx-auto transition-all duration-500 ${
        expanded ? 'max-w-3xl' : 'max-w-xs'
      }`}
    >
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? 'max-h-[200px]' : 'max-h-[300px]'
        }`}
      >
      {/* <div className={`overflow-hidden transition-all duration-300 ${expanded ? '' : 'h-[400px]'}`}> */}
      {images.map((image, index) => (
          <div key={index} className="relative w-full aspect-[3/4]">
            <Image
              src={image.src}
              alt={''}
              fill
              className="object-contain"
            />
          </div>
        ))}

        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center mx-auto gap-1 text-sm font-medium text-black hover:underline"
        >
          {expanded ? 'See less' : 'See more'}
          {expanded ? (<>up</>) : (<>down</>)}
        </button>
      </div>
    </div>
  );
};

export default ExpandableGallery;
