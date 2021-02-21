import {SearchResultsType} from '../../catalogs/baseCatalog';
import {searchActionTypes, SearchMangaAction} from './action';

type StateType = {
  query: string,
  results: SearchResultsType,
}

const initialState: StateType = {
  query: '',
  results: {
    results: 0,
    invalidResults: 0,
    items: [],
  },
};

export default function reducer(
    state = initialState,
    action: SearchMangaAction): StateType {
  switch (action.type) {
    case searchActionTypes.SEARCH_MANGA:
      return {
        ...state,
        query: action.searchQuery,
        results: action.searchResults,
      };
    default:
      return state;
  }
}