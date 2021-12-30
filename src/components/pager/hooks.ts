import { Dispatch } from '@reduxjs/toolkit';
import { useCallback, useEffect, useMemo } from 'react';
import { Manga, MangaChapter, MangaChapterImages, MangaChapters } from '../../api/types';
import { setRead } from '../../redux/manga/actions';
import { getKeyboardScrollHandler } from './utils';

/**
 * Use keyUp/Down listener which scrolls image up/down
 */
export const useKeyboardScroll = (images?: MangaChapterImages) => {
  const scrollKBHandler = getKeyboardScrollHandler(images);
  useEffect(() => {
    // bindKeyboard is messing stuff up
    document.removeEventListener('keydown', scrollKBHandler);
    document.addEventListener('keydown', scrollKBHandler);
    return () => {
      document.removeEventListener('keydown', scrollKBHandler);
    };
  });
};

/**
 * Get memoized chapter which comes after the current. (All chapters are sorted by volume and number)
 * Either return the chapter with the same volume and chapter number higher
 * Or the first chapter with volume more than the current
 */
export const getNextChapter = (chapters: MangaChapters, chapter?: MangaChapter) => {
  if (!chapters || !chapter) return;
  let nextChapter;
  const sameVolumeChapters = chapters.filter(
    (chapterElement) => chapterElement.volume === chapter.volume && chapterElement.number > chapter.number
  );

  if (sameVolumeChapters.length) {
    nextChapter = sameVolumeChapters.sort((a, b) => a.number - b.number)[0];
  } else {
    const nextVolumeChapters = chapters.filter((chapterElement) => chapterElement.volume > chapter.volume);
    if (nextVolumeChapters.length) {
      nextChapter = nextVolumeChapters.sort((a, b) => a.volume - b.volume || a.number - b.number)[0];
    }
  }

  return nextChapter;
};

/**
 * Return memoized value for next chapter link
 */
export const useNextChapterLink = (manga: Manga, chapters: MangaChapters, chapter?: MangaChapter) =>
  useMemo(() => {
    const nextChapter = getNextChapter(chapters, chapter);
    if (nextChapter) {
      return `/read/${manga.id}/${nextChapter.volume}/${nextChapter.number}`;
    }
  }, [manga, chapter, chapters]);

/**
 * Return memoized callback of function which detects if the value is a valid image number for given image list
 */
export const useGetValidImageNumber = (images?: MangaChapterImages) => {
  return useCallback((value: number) => (0 <= value && value < (images?.length || -1) ? value : undefined), [images]);
};

/**
 * @returns Memoized callback which dispatched setRead if needed
 */
export const useSetReadOnCurrent = (
  dispatch: Dispatch,
  mangaId: number,
  chapter?: MangaChapter,
  images?: MangaChapterImages
) =>
  useCallback(
    (position: number) => {
      if (chapter && images && position >= images.length / 2) dispatch(setRead(mangaId, chapter.id));
    },
    [dispatch, mangaId, chapter, images]
  );
