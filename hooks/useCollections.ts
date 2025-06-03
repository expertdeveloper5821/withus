'use client';

import { useEffect, useState } from 'react';

export type Collection = {
  handle: string;
  title: string;
  description: string;
  path: string;
};

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);
        const response = await fetch('/api/collections');
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

  return { collections, loading, error };
}
