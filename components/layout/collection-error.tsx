'use client';

import { useEffect } from 'react';

interface CollectionErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  collection: string;
}

export default function CollectionError({
  error,
  reset,
  collection
}: CollectionErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(`Error loading ${collection} collection:`, error);
  }, [error, collection]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
      <p className="text-lg text-gray-600 mb-6">
        We couldn't load the {collection} products. Please try again later.
      </p>
      <button
        onClick={reset}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
