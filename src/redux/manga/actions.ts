import { createAction } from '@reduxjs/toolkit';
import { MangaType } from '../../catalogs/baseCatalog';

export const setManga = createAction<MangaType>('manga/set');
export const loadLastVisitedManga = createAction<Array<MangaType>>('manga/loadLastVisited');
export const pushLastVisitedManga = createAction<MangaType>('manga/pushLastVisited');
