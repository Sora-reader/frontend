import { Dispatch, MouseEventHandler, SetStateAction, useEffect } from 'react';
import { MangaChapterImages } from '../apiTypes';

const scrolledBottom = () => window.window.scrollY + window.window.outerHeight >= document.body.offsetHeight;

const scrollVh = (direction: 'up' | 'down' = 'down') => {
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  // const headerHeight = document.getElementsByTagName('header')[0].offsetHeight;
  window.scroll({
    // top: window.scrollY + (vh - headerHeight) * (direction === 'up' ? -1 : 1),
    top: window.scrollY + vh * (direction === 'up' ? -1 : 1),
    behavior: 'smooth',
  });
};

export const getScrollClickHandler =
  (setImageNumber: Dispatch<SetStateAction<number>>, images?: MangaChapterImages): MouseEventHandler =>
  () => {
    if (!images) return;
    if (scrolledBottom()) {
      setImageNumber((prevState) => (prevState + 1 < images.length ? prevState + 1 : prevState));
    } else {
      scrollVh('down');
    }
  };

export const useKeyboardScroll = (images?: MangaChapterImages) => {
  const scrollKBHandler = getScrollKBHandler(images);
  useEffect(() => {
    // bindKeyboard is messing stuff up
    document.removeEventListener('keydown', scrollKBHandler);
    document.addEventListener('keydown', scrollKBHandler);
    return () => {
      document.removeEventListener('keydown', scrollKBHandler);
    };
  }, [images]);
};

export const getScrollKBHandler = (images?: MangaChapterImages) => {
  return function (e: KeyboardEvent): any {
    if (!['ArrowDown', 'ArrowUp'].includes(e.key) || e.repeat || !images) return;
    e.preventDefault();
    switch (e.key) {
      case 'ArrowDown':
        scrollVh('down');
        break;
      case 'ArrowUp':
        scrollVh('up');
        break;
    }
  };
};
