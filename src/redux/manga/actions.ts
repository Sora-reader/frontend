import { createAction } from '@reduxjs/toolkit';
import { Manga, MangaList } from '../../api/types';

export const setManga = createAction<Manga>('manga/set');
export const loadLastVisitedManga = createAction<MangaList>('manga/loadLastVisited');
export const pushLastVisitedManga = createAction<Manga>('manga/pushLastVisited');
