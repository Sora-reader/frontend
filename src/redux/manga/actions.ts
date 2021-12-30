import { createAction } from '@reduxjs/toolkit';
import { Manga, MangaList } from '../../api/types';

// Chapters
export const setRead = createAction('manga/setRead', (mangaId: number, chapterId: number) => {
  return { payload: { mangaId, chapterId } };
});

// Viewed
export const loadViewedManga = createAction<MangaList>('manga/loadViewed');
export const pushViewedManga = createAction<Manga>('manga/pushViewed');
