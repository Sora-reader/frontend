import { IncomingMessage } from 'http';
import { NextRouter } from 'next/router';

/**
 * A shortcut to shallow navigate
 */
export const shallowNavigate = (
  router: NextRouter,
  url: string,
  method: 'push' | 'replace' = 'push'
): Promise<boolean> => {
  const callable = router[method];
  return callable(url, undefined, { shallow: true });
};

/**
 * Navigate to detail page without causing get...Props
 */
export const navigateToDetail = (
  router: NextRouter,
  id: number | string,
  tabNumber?: number | string,
  method: 'push' | 'replace' = 'push'
): Promise<boolean> => {
  let url = `/detail/${id}`;
  if (tabNumber) url += `?tab=${tabNumber}`;
  return shallowNavigate(router, url, method);
};

/**
 * Detect if navigation is done on client side
 * @param req req prop from getServerSideProps
 */
export function isClientSideNavigation(req: IncomingMessage) {
  return req.url?.startsWith('/_next');
}
