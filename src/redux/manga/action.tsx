import {Action, AnyAction, Dispatch} from 'redux';
import {MangaType} from '../../catalogs/baseCatalog';

export const mangaActionTypes = {
  SET: 'SET',
};

export interface SetMangaAction extends AnyAction {
  manga: MangaType
}

export const setManga = (manga: MangaType) => (dispatch: Dispatch): SetMangaAction => {
  return dispatch({type: mangaActionTypes.SET, manga: manga});
};