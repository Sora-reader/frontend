import { createReducer } from '@reduxjs/toolkit';
import { Manga } from '../../utils/apiTypes';
import { favor, unfavor, addToList, removeFromList } from './actions';
import { ListType } from './types';
import { pushToArray, removeFromArray } from './utils';

type StateType = Record<ListType, Array<Manga>>;

const initialState: StateType = {
  favorite: [],
  readLater: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(favor, (state, action) => {
    pushToArray(action.payload, state.favorite);
  });
  builder.addCase(unfavor, (state, action) => {
    return { ...state, favorite: removeFromArray(action.payload, state.favorite) };
  });
  builder.addCase(addToList, (state, action) => {
    pushToArray(action.payload.manga, state[action.payload.list]);
  });
  builder.addCase(removeFromList, (state, action) => {
    let list = state[action.payload.list];
    return {
      ...state,
      [action.payload.list]: removeFromArray(action.payload.manga, list),
    };
  });
});

export default reducer;
