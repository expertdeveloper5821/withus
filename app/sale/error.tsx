'use client';

import CollectionError from 'components/layout/collection-error';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <CollectionError error={error} reset={reset} collection="Sale" />;
}
