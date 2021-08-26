import { AnyAction, combineReducers, Reducer } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import manga from './manga/reducer';
import theme from './theme/reducer';
import search from './search/reducer';
import user from './user/reducer';
import progressBar from './progressBar/reducer';
import saveLists from './saveLists/reducer';
import { configureStore, Store } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  theme,
  manga,
  search,
  user,
  progressBar,
  saveLists,
});

export type RootState = ReturnType<typeof combinedReducer>;
export type StoreType = Store<RootState>;

const reducer: Reducer = (state: RootState, action: AnyAction) => {
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
  configureStore<RootState>({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunkMiddleware],
  });

export const wrapper = createWrapper(createStoreWrapped);
