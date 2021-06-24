import { AnyAction } from '@reduxjs/toolkit';
import { startLoading, endLoading } from './actions';
import { LoadingTask } from './types';

type StateType = Array<LoadingTask>;

const initialState: StateType = [];

export default function reducer(state = initialState, action: AnyAction): StateType {
  if (startLoading.match(action) && action.payload) {
    const newState = [...state, action.payload];
    return Array.from(new Set(newState));
  } else if (endLoading.match(action) && action.payload) return state.filter((task) => task !== action.payload);
  return state;
}
