import { Dispatch } from 'redux';
import { MangaType } from '../../catalogs/baseCatalog';

export const SET_MANGA = 'SET_MANGA';

interface SetMangaAction {
  type: typeof SET_MANGA;
  manga: MangaType;
}

export type MangaActionTypes = SetMangaAction;

export const setManga = (manga: MangaType) => (dispatch: Dispatch<MangaActionTypes>): SetMangaAction => {
  return dispatch({ type: SET_MANGA, manga });
};
