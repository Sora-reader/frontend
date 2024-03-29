import { useEffect, useState } from 'react';
import { MangaChapterImages } from '../../api/types';
import { VH } from '../../common/css';

/**
 * Round value diff to 0/1
 */
// > roundBinary(20)
// 1
// > roundBinary(0)
// 0
// > roundBinary(-10)
// -1
export const roundBinary = (value: number) => (value ? (value * 1) / Math.abs(value) : value);

/**
 * Scroll 80% of viewport height
 */
const scrollVh = (direction: 'up' | 'down' = 'down') => {
  window.scroll({
    top: window.scrollY + VH() * 0.8 * (direction === 'up' ? -1 : 1),
    behavior: 'smooth',
  });
};

/**
 * @returns event handler for ArrowUp/Down
 */
export const getKeyboardScrollHandler = (images?: MangaChapterImages) => {
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

/**
 * Load images sequentially
 */
export const useLoadImages = (images: MangaChapterImages) => {
  const [loadedImageIndex, setLoadedImageIndex] = useState(0);

  useEffect(() => {
    setLoadedImageIndex(0);
  }, [images]);

  useEffect(() => {
    const image = new Image();
    image.src = images[loadedImageIndex];
    image.onload = () => {
      setLoadedImageIndex(loadedImageIndex + 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedImageIndex, setLoadedImageIndex]);
};
