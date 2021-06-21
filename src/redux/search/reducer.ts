import { createReducer } from '@reduxjs/toolkit';
import { MutableRefObject } from 'react';
import { SearchResults } from '../../catalogs/baseCatalog';
import { setSearchRef, startSearch } from './actions';

type StateType = {
  searchInputRef?: MutableRefObject<HTMLInputElement | undefined>;
  results: SearchResults;
};

const initialState: StateType = {
  searchInputRef: undefined,
  results: {
    query: '',
    results: 0,
    invalidResults: 0,
    items: [],
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(startSearch.fulfilled, (state, action) => {
    state.results = action.payload;
  });
  builder.addCase(setSearchRef, (state, action) => {
    return { ...state, searchInputRef: action.payload };
  });
});

export default reducer;
