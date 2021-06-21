import { MutableRefObject } from 'react';
import { Dispatch } from 'redux';
import { SearchResults } from '../../catalogs/baseCatalog';
import { ReadManga } from '../../catalogs/ReadManga';
import { TDispatch } from '../types';
import SearchMangaAction, { SetSearchInputRefAction } from './types';

export const SEARCH_MANGA = 'SEARCH_MANGA';
export const SET_SEARCH_INPUT_REF = 'SET_SEARCH_INPUT_REF';

export const searchManga = (query: string) => {
  return async (dispatch: TDispatch<SearchMangaAction>): Promise<SearchMangaAction> => {
    let results: SearchResults;
    try {
      results = await ReadManga.search.run(query);
    } catch (reason) {
      results = { query, items: [], results: -1, invalidResults: 0 };
      console.log('Request error');
      console.log(reason);
    }

    return dispatch({
      type: SEARCH_MANGA,
      searchResults: results,
    });
  };
};

export const setSearchInputRef = (ref: MutableRefObject<HTMLInputElement | undefined>) => {
  return (dispatch: Dispatch<SetSearchInputRefAction>): SetSearchInputRefAction =>
    dispatch({
      type: SET_SEARCH_INPUT_REF,
      ref,
    });
};
