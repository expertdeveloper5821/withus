'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useCollections } from '../../../hooks/useCollections';

// Mock collections data until API is fully implemented
const COLLECTIONS = [
  { title: 'Baby Toddler Toys', handle: 'baby-toddler-toys', path: '/search/baby-toddler-toys' },
  { title: 'Electronics', handle: 'electronics', path: '/search/electronics' },
  { title: 'Home Decor', handle: 'home-decor', path: '/search/home-decor' },
  { title: 'Kitchen Appliances', handle: 'kitchen-appliances', path: '/search/kitchen-appliances' },
  { title: 'Fashion Accessories', handle: 'fashion-accessories', path: '/search/fashion-accessories' },
  { title: 'Books & Stationery', handle: 'books-stationery', path: '/search/books-stationery' }
];

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { collections, loading } = useCollections();
  const [inputValue, setInputValue] = useState(searchParams?.get('q') || '');
  const [suggestions, setSuggestions] = useState<typeof COLLECTIONS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  
  // Format text to URL-friendly slug (e.g., "Baby Toddler Toys" -> "baby-toddler-toys")
  const formatAsUrlParam = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };
  // Use actual collections if available, otherwise use mock data
  const availableCollections = collections.length > 0 ? collections : COLLECTIONS;

  // Update suggestions based on input
  useEffect(() => {
    if (inputValue.length > 1) {
      const filteredSuggestions = availableCollections.filter(collection => 
        collection.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, availableCollections]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: typeof COLLECTIONS[0]) => {
    setInputValue(suggestion.title);
    setShowSuggestions(false);
    
    // Navigate to the collection page if path exists, otherwise do a search
    if (suggestion.path) {
      router.push(suggestion.path);
    } else {
      // Format the title for the URL as a fallback
      const formattedPath = `/search/${suggestion.handle || formatAsUrlParam(suggestion.title)}`;
      router.push(formattedPath);
    }
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('q', inputValue);
      router.push(`/search?${params.toString()}`);
    }
  };
  
  // Clear input field and close suggestions
  const clearInput = () => {
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">      <Form action="/search" className="relative w-full" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          key={`search-input-${searchParams?.get('q')}`}
          type="text"
          name="q"
          placeholder="Search for products..."
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          className="text-md w-full rounded-lg border bg-white px-4 py-2 pr-16 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        {inputValue && (
          <button 
            type="button"
            onClick={clearInput}
            className="absolute right-9 top-0 flex h-full items-center px-2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
        <button type="submit" className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <MagnifyingGlassIcon className="h-4" />
        </button>
      </Form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionRef}
          className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
        >
          <ul className="py-1 max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
