import { useEffect, useState } from 'react';

export const useScrolledBottom = () => {
  const [scrolledBottom, setScrolledBottom] = useState(false);

  useEffect(() => {
    document.onscroll = () => {
      setScrolledBottom(window.window.scrollY + window.window.outerHeight >= document.body.offsetHeight);
    };
  });

  return scrolledBottom;
};

export function useStickyState(defaultValue: any, key: string) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
