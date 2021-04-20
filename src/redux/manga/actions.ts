import { Dispatch } from 'redux';
import { MangaType } from '../../catalogs/baseCatalog';
import { MangaAction, SetMangaAction } from './types';

export const SET_MANGA = 'SET_MANGA';

export const setManga = (manga: MangaType) => (dispatch: Dispatch<MangaAction>): SetMangaAction => {
  return dispatch({ type: SET_MANGA, manga });
};
