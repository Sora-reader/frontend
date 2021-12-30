import { useEffect, useState } from 'react';
import { detailsNeedUpdate } from '../redux/manga/utils';
import { useDetailQuery } from './manga';

/**
 * Poll mangda detail query until it's updated
 * @param query return value of useDetailQuery
 */
export function usePollUntilUpdated(query: ReturnType<typeof useDetailQuery>) {
  const [retries, setRetries] = useState(3);
  useEffect(() => {
    if (retries && detailsNeedUpdate(query.data)) {
      query.refetch();
    }
    setRetries(retries - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);
}
