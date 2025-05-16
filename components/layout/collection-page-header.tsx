'use client';

import { useEffect, useState } from 'react';

interface CollectionPageHeaderProps {
  title: string;
  description?: string;
  collectionName?: string;
  itemCount?: number;
}

export default function CollectionPageHeader({
  title,
  description,
  collectionName,
  itemCount
}: CollectionPageHeaderProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsAnimated(true);
  }, []);

  return (
    <div className={`mb-8 transition-opacity duration-700 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-[12px] font-bold text-black">{title}</h1>
      <p className="mt-2 text-gray-600">{description}</p>
      {collectionName && (
        <div className="mt-2 text-sm text-gray-500">
          Collection: <span className="font-medium">{collectionName}</span>
        </div>
      )}
      {itemCount !== undefined && (
        <div className="mt-1 text-sm text-gray-500">
          {itemCount} {itemCount === 1 ? 'product' : 'products'} found
        </div>
      )}
    </div>
  );
}
