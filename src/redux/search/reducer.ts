import { createReducer } from '@reduxjs/toolkit';
import { MutableRefObject } from 'react';
import { MangaList } from '../../api/types';
import { setSearchRef, startSearch } from './actions';

type StateType = {
  searchInputRef?: MutableRefObject<HTMLInputElement | undefined>;
  query: string;
  results: MangaList;
};

const initialState: StateType = {
  searchInputRef: undefined,
  query: '',
  results: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(startSearch.fulfilled, (state, action) => {
    state.query = action.payload.query;
    state.results = action.payload.results;
  });
  builder.addCase(setSearchRef, (state, action) => {
    return { ...state, searchInputRef: action.payload };
  });
});

export default reducer;
