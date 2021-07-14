import { useCallback, useEffect, useMemo } from 'react';
import { Manga, MangaChapter, MangaChapterImages } from '../../utils/apiTypes';

export const useNextChapterLink = (manga: Manga, chapter?: MangaChapter) =>
  useMemo(() => {
    if (!manga.chapters || !chapter) return;
    const nextChapter = manga.chapters.find((chapterElement) => {
      return chapterElement.volume === chapter.volume && chapterElement.number === chapter.number + 1;
    });
    if (nextChapter) {
      return `/read/${manga.id}/${chapter.volume}/${chapter.number + 1}`;
    }
  }, [manga, chapter]);

export const useGetValidImageNumber = (images?: MangaChapterImages) =>
  useCallback((value: number) => (0 <= value && value < (images?.length || -1) ? value : undefined), [images]);

export const useUserScalable = () =>
  useEffect(() => {
    const viewport = document.getElementById('viewport');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }

    return () => {
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=0');
      }
    };
  }, []);
