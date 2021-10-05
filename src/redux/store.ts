import { AnyAction, combineReducers, Reducer } from 'redux';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import manga from './manga/reducer';
import theme from './theme/reducer';
import search from './search/reducer';
import saveLists from './saveLists/reducer';
import errors from './errors/reducer';
import { configureStore, Store } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './types';
import { cloneDeep } from 'lodash';

const defaultReducers = {
  theme,
  manga,
  search,
  saveLists,
  errors,
};
const combinedReducer = combineReducers(defaultReducers);

export type RootState = ReturnType<typeof combinedReducer>;
export type StoreType = Store<RootState>;

const withHydration =
  (originalReducer: any): Reducer =>
  (state: RootState, action: AnyAction) => {
    switch (action.type) {
      case HYDRATE: {
        // Hydrate action payload contains server state
        // So we merge the previous state with the server one
        console.log('Hydration from', originalReducer.name);
        let nextState = cloneDeep(state);

        if (action.payload.manga?.current) {
          console.log('Using manga from server state');
          nextState.manga.current = action.payload.manga.current;
        }
        // Reuse server-side dispatched errors if were any
        nextState.errors = action.payload.errors;

        return nextState;
        // We are also able to persist some client state as described here
        // https://github.com/vercel/next.js/blob/canary/examples/with-redux-wrapper/README.md
      }
      default:
        return originalReducer(state, action);
    }
  };

const createStoreWrapped: MakeStore<RootState, any> = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return configureStore({
      reducer: combinedReducer,
      devTools: process.env.NODE_ENV !== 'production',
      middleware: [thunkMiddleware],
    });
  }

  // If it's on client side, create a store which will persist
  const { persistStore, persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

  const persistConfig = {
    key: 'sora-reader',
    whitelist: ['theme'],
    storage,
  };

  const persistReducers = {
    manga: require('./manga/persist').default,
    saveLists: require('./saveLists/persist').default,
  };

  const persistCombinedReducers = combineReducers({ ...defaultReducers, ...persistReducers });
  const persistedReducer = persistReducer(persistConfig, persistCombinedReducers);

  const store = configureStore({
    reducer: withHydration(persistedReducer),
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunkMiddleware],
  }); // Creating the store again

  // @ts-ignore
  store.__persistor = persistStore(store); // This creates a persistor object to .__persistor,
  // so that we can avail the persistability feature

  return store;
};

export const wrapper = createWrapper(createStoreWrapped);

export const useAppDispatch = () => useDispatch<AppDispatch>();
