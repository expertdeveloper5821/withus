import { FC } from 'react';

interface CollectionLoadingProps {
  itemCount?: number;
}

const CollectionLoading: FC<CollectionLoadingProps> = ({ itemCount = 10 }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <div className="mb-8">
        <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded"></div>
        <div className="mt-2 h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
        <div className="mt-4 h-3 w-1/6 bg-gray-200 animate-pulse rounded"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {[...Array(itemCount)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-60 rounded-[4px] md:rounded-[20px] mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionLoading;
