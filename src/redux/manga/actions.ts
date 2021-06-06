import { Dispatch } from 'redux';
import { MangaType } from '../../catalogs/baseCatalog';
import {LoadLastVisitedManga, MangaAction, PushLastVisitedManga, SetMangaAction} from './types';

export const SET_MANGA = 'SET_MANGA';
export const LOAD_LAST_VISITED_MANGA = 'LOAD_LAST_VISITED_MANGA';
export const PUSH_LAST_VISITED_MANGA = 'PUSH_LAST_VISITED_MANGA';

export const setManga = (manga: MangaType) => (dispatch: Dispatch<MangaAction>): SetMangaAction => {
  return dispatch({ type: SET_MANGA, manga });
};


export const loadLastVisitedManga = (mangas: Array<MangaType>) => {
  return (dispatch: Dispatch<MangaAction>): LoadLastVisitedManga => {
    return dispatch({ type: LOAD_LAST_VISITED_MANGA, mangas });
  }
};



export const pushLastVisitedManga = (manga: MangaType) => (dispatch: Dispatch<MangaAction>): PushLastVisitedManga => {
  return dispatch({ type: PUSH_LAST_VISITED_MANGA, manga });
};
