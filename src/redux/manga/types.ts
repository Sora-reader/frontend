import { MangaType } from '../../catalogs/baseCatalog';
import { SET_MANGA } from './actions';

export interface SetMangaAction {
  type: typeof SET_MANGA;
  manga: MangaType;
}

export type MangaAction = SetMangaAction;
