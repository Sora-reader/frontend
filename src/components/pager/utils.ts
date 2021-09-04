import { Dispatch } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { setRead } from '../../redux/manga/actions';
import { CurrentChapter } from '../../redux/manga/reducer';
import { MangaChapterImages } from '../../utils/apiTypes';
import { VH } from '../../utils/css';

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
 * @returns Memoized callback which dispatched setRead if needed
 */
export const useSetReadOnCurrent = (dispatch: Dispatch, mangaId: number, chapter?: CurrentChapter) =>
  useCallback(
    (position: number) => {
      if (chapter && chapter.images && position >= chapter.images.length / 2) dispatch(setRead(mangaId, chapter.id));
    },
    [dispatch, mangaId, chapter]
  );
