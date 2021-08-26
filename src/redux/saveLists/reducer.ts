import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { Manga } from '../../utils/apiTypes';
import { favor, unfavor, addToList, removeFromList } from './actions';
import { ListType } from './types';

type StateType = Record<ListType, Set<Manga>>;

const initialState: StateType = {
  favorite: new Set(),
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(favor, (state, action) => {
    state.favorite.add(action.payload);
  });
  builder.addCase(unfavor, (state, action) => {
    state.favorite.delete(action.payload);
  });
});

export default reducer;
