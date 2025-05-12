'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(`/api/searchSuggestions?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setShowDropdown(true);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (text: string) => {
    setQuery(text);
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(text)}`);
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-full bg-gray-200 px-4 py-2 text-black placeholder:text-neutral-600"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
             {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
