import {Dispatch} from 'redux';
import {SearchResultsType} from '../../catalogs/baseCatalog';
import {ReadManga} from '../../catalogs/ReadManga';

export const SEARCH_MANGA = 'SEARCH_MANGA';

interface SearchMangaAction {
  type: typeof SEARCH_MANGA,
  searchQuery: string,
  searchResults: SearchResultsType
}

export type SearchActionTypes = SearchMangaAction

export const searchManga = (query: string) => {
  return async (dispatch: Dispatch<SearchMangaAction>): Promise<SearchMangaAction> => {
    let results: SearchResultsType;

    try {
      results = await ReadManga.search.run(query);
    } catch (reason) {
      results = {items: [], results: -1, invalidResults: 0};
      console.log('Request error', reason);
    }

    return dispatch({
      type: SEARCH_MANGA,
      searchQuery: query,
      searchResults: results,
    });
  };
};