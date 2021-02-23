import {SearchResultsType} from '../../catalogs/baseCatalog';
import {SEARCH_MANGA, SearchActionTypes} from './action';

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
    action: SearchActionTypes): StateType {
  switch (action.type) {
    case SEARCH_MANGA:
      return {
        ...state,
        query: action.searchQuery,
        results: action.searchResults,
      };
    default:
      return state;
  }
}