import { AnyAction, combineReducers, Reducer } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import manga from './manga/reducer';
import theme from './theme/reducer';
import search from './search/reducer';
import user from './user/reducer';
import { configureStore } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  theme,
  manga,
  search,
  user,
});

export type State = ReturnType<typeof combinedReducer>;

const reducer: Reducer = (state: State, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE: {
      // Hydrate action payload contains server state
      // So we merge the previous state with the server one
      return {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      // We are also able to persist some client state as described here
      // https://github.com/vercel/next.js/blob/canary/examples/with-redux-wrapper/README.md
    }
    default:
      return combinedReducer(state, action);
  }
};

const createStoreWrapped = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunkMiddleware],
  });

export type RootState = ReturnType<typeof combineReducers>;
export const wrapper = createWrapper(createStoreWrapped);
