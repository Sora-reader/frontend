import { MutableRefObject } from 'react';
import { SearchResultsType } from '../../catalogs/baseCatalog';
import { SEARCH_MANGA, SET_SEARCH_INPUT_REF } from './actions';
import SearchActionTypes from './types';

type StateType = {
  searchInputRef?: MutableRefObject<HTMLInputElement | undefined>
  query: string,
  results: SearchResultsType,
};

const initialState: StateType = {
  searchInputRef: undefined,
  query: '',
  results: {
    results: 0,
    invalidResults: 0,
    items: [],
  },
};

export default function reducer(
  state = initialState,
  action: SearchActionTypes,
): StateType {
  switch (action.type) {
    case SEARCH_MANGA:
      return {
        ...state,
        query: action.searchQuery,
        results: action.searchResults,
      };
    case SET_SEARCH_INPUT_REF:
      return {
        ...state,
        searchInputRef: action.ref,
      };
    default:
      return state;
  }
}
