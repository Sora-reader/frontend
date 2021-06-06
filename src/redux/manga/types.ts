import { MangaType } from '../../catalogs/baseCatalog';
import {LOAD_LAST_VISITED_MANGA, PUSH_LAST_VISITED_MANGA, SET_MANGA} from './actions';

export interface SetMangaAction {
  type: typeof SET_MANGA;
  manga: MangaType;
}

export interface LoadLastVisitedManga {
  type: typeof LOAD_LAST_VISITED_MANGA;
  mangas: Array<MangaType>;
}

export interface PushLastVisitedManga {
  type: typeof PUSH_LAST_VISITED_MANGA;
  manga: MangaType;
}

export type MangaAction = SetMangaAction | PushLastVisitedManga | LoadLastVisitedManga;
