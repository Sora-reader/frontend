import { createReducer } from '@reduxjs/toolkit';
import { MangaSearchResult } from '../../utils/apiTypes';
import { paginateNext, startSearch } from './actions';

type StateType = {
  query: string;
  results: MangaSearchResult;
};

const initialState: StateType = {
  query: '',
  results: { count: 0, results: [] },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(startSearch.fulfilled, (state, action) => {
    state.query = action.payload.query;
    state.results = action.payload.results;
  });
  builder.addCase(paginateNext.fulfilled, (state, action) => {
    state.results.count = action.payload.count;
    state.results.next = action.payload.next;
    state.results.previous = action.payload.previous;
    state.results.results.push(...action.payload.results);
  });
});

export default reducer;
