import { MutableRefObject, useEffect, useLayoutEffect, useState } from 'react';

export const useScrolledBottom = () => {
  console.log('Init useScrolledBottom');
  const [scrolledBottom, setScrolledBottom] = useState(false);
  // On mobile scrollY + outerHeight may be couple pixels less than offsetHeight
  const mobileOffset = 20;

  useEffect(() => {
    document.onscroll = () => {
      setScrolledBottom(window.window.scrollY + window.window.outerHeight >= document.body.offsetHeight - mobileOffset);
    };
  });

  return scrolledBottom;
};

/**
 * Hook to determine element visibility
 */
export const useVisible = (rootElRef: MutableRefObject<any>) => {
  const [visible, setVisible] = useState(false);
  useLayoutEffect(() => {
    if (rootElRef && rootElRef.current) {
      const ob = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting);
        },
        {
          rootMargin: undefined,
        }
      );
      ob.observe(rootElRef.current);
      return () => {
        ob.unobserve(rootElRef.current);
      };
    }
  }, []);
  return visible;
};
