import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { searchInputId } from '../../components/header/NavigationHeader';

export function useNonLazyQuery(queryKey: string) {
  const router = useRouter();

  const match = decodeURI(router.asPath).match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));
  const query = match ? match[1] || '' : '';
  return query;
}

export function useSyncQuery(query: string) {
  useEffect(() => {
    const searchInputElement = document.getElementById(searchInputId) as HTMLInputElement;
    if (searchInputElement) {
      if (query && searchInputElement.value !== query) {
        // Sync query value from url to input
        searchInputElement.value = query;
      } else if (!query) {
        // If the query is empty then focus query input
        searchInputElement.focus();
      }
    }
  }, [query]);
}
