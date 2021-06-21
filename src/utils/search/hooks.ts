import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useNonLazyQuery(queryKey: string) {
  const router = useRouter();

  const match = decodeURI(router.asPath).match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));
  const query = match ? match[1] || '' : '';
  return query;
}

export function useSyncQuery(
  searchInputRef: React.MutableRefObject<HTMLInputElement | undefined> | undefined,
  query: string
) {
  useEffect(() => {
    if (searchInputRef) {
      const { current } = searchInputRef;
      if (current) {
        if (query && current.value !== query) {
          // Sync query value from url to input
          current.value = query;
        } else if (!query) {
          // If the query is empty then focus query input
          current.focus();
        }
      }
    }
  }, [query, searchInputRef]);
}
