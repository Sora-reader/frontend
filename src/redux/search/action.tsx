import {AnyAction, Dispatch} from 'redux';
import {SearchResultsType} from '../../catalogs/baseCatalog';
import {ReadManga} from '../../catalogs/ReadManga';

export const searchActionTypes = {
  SEARCH_MANGA: 'SEARCH_MANGA',
};

export interface SearchMangaAction extends AnyAction {
  searchQuery: string,
  searchResults: SearchResultsType
}

export const searchManga = (query: string) => {
  return async (dispatch: Dispatch): Promise<SearchMangaAction> => {
    let results: SearchResultsType;

    try {
      results = await ReadManga.search.run(query);
    } catch (reason) {
      results = {items: [], results: -1, invalidResults: 0};
      console.log('Request error', reason);
    }
    return dispatch(
        {
          type: searchActionTypes.SEARCH_MANGA,
          searchQuery: query,
          searchResults: results,
        });
  };
};