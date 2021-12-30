import { useEffect, useState } from 'react';

export function withPollUntilUpdated<HookType>(hook: HookType, checker: (q: any) => boolean): HookType {
  // @ts-ignore
  return function () {
    // @ts-ignore
    const query = hook.apply<any, Parameters<HookType>, ReturnType<HookType>>(undefined, arguments);
    // should be pretty close to wait_for on run_parser
    const [retries, setRetries] = useState(7);
    useEffect(() => {
      let timeoutId: any;
      if (retries && checker(query)) {
        timeoutId = setTimeout(() => {
          query.refetch();
          setRetries(retries - 1);
        }, 1000);
      }
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.isError, query.data]);
    return query;
  } as HookType;
}
