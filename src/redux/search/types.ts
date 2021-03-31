import { MutableRefObject, Ref } from 'react';
import { SearchResultsType } from '../../catalogs/baseCatalog';
import { SEARCH_MANGA, SET_SEARCH_INPUT_REF } from './actions';

export interface SearchMangaAction {
    type: typeof SEARCH_MANGA,
    searchQuery: string,
    searchResults: SearchResultsType
}
export interface SetSearchInputRefAction {
    type: typeof SET_SEARCH_INPUT_REF,
    ref: MutableRefObject<HTMLInputElement | undefined>,
}

type SearchActionTypes = SearchMangaAction | SetSearchInputRefAction;

export default SearchActionTypes;
