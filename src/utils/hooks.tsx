import { EffectCallback, useRef } from 'react';
import { MutableRefObject, useEffect, useState } from 'react';

/**
 * useEffect which runs only once avoiding exhaustive-deps linter
 */
export const useInitialEffect = (effect: EffectCallback) => {
  const refCallback = useRef<EffectCallback>();
  refCallback.current = effect;

  useEffect(() => {
    if (refCallback.current) refCallback.current();
  }, []);
};

/**
 * Hook to determine whether user scrolled to bottom or not
 */
export const useScrolledBottom = () => {
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
  // seems that the callback is fired on object creation
  const [firstFire, setFirstFire] = useState(false);

  useInitialEffect(() => {
    if (rootElRef && rootElRef.current) {
      const ob = new IntersectionObserver(
        ([entry]) => {
          if (!firstFire) setVisible(entry.isIntersecting);
          else setFirstFire(true);
        },
        {
          rootMargin: '-50% 0%',
        }
      );
      ob.observe(rootElRef.current);
      return () => {
        ob.unobserve(rootElRef.current);
      };
    }
  });
  return visible;
};
