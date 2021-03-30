import { MutableRefObject } from 'react';
import {Dispatch} from 'redux';
import {SearchResultsType} from '../../catalogs/baseCatalog';
import {ReadManga} from '../../catalogs/ReadManga';
import SearchMangaAction, { SetSearchInputRefAction } from './types';

export const SEARCH_MANGA = 'SEARCH_MANGA';
export const SET_SEARCH_INPUT_REF = 'SET_SEARCH_INPUT_REF';

export const searchManga = (query: string) => {
  return async (dispatch: Dispatch<SearchMangaAction>): Promise<SearchMangaAction> => {
    let results: SearchResultsType;
    try {
      results = await ReadManga.search.run(query);
    } catch (reason) {
      results = {items: [], results: -1, invalidResults: 0};
      console.log('Request error');
      console.log(reason);
    }

    return dispatch({
      type: SEARCH_MANGA,
      searchQuery: query,
      searchResults: results,
    });
  };
};

export const setSearchInputRef = (ref: MutableRefObject<HTMLInputElement | undefined>) => (dispatch: Dispatch): SetSearchInputRefAction => dispatch({
  type: SET_SEARCH_INPUT_REF,
  ref: ref
});