import { createReducer } from '@reduxjs/toolkit';
import { MangaList } from '../../api/types';
import { startSearch } from './actions';

type StateType = {
  query: string;
  results: MangaList;
};

const initialState: StateType = {
  query: '',
  results: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(startSearch.fulfilled, (state, action) => {
    state.query = action.payload.query;
    state.results = action.payload.results;
  });
});

export default reducer;
