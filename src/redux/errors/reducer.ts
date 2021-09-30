import { createReducer } from '@reduxjs/toolkit';
import { addError, dismissError } from './actions';
import { AppError } from './types';

type StateType = Array<AppError>;

const initialState: StateType = [];

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(addError, (state, action) => {
    state.push({ ...action.payload, id: state.length });
  });
  builder.addCase(dismissError, (state, action) => {
    return state.filter((e) => e.id !== action.payload);
  });
});

export default reducer;
