import { AnyAction, combineReducers, Reducer } from 'redux';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import manga from './manga/reducer';
import theme from './theme/reducer';
import search from './search/reducer';
import user from './user/reducer';
import progressBar from './progressBar/reducer';
import saveLists from './saveLists/reducer';
import { configureStore, Store } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { TDispatch } from './types';

const defaultReducers = {
  theme,
  manga,
  search,
  user,
  progressBar,
  saveLists,
};
const combinedReducer = combineReducers(defaultReducers);

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

const createStoreWrapped: MakeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return configureStore<RootState>({
      reducer,
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
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunkMiddleware],
  }); // Creating the store again

  // @ts-ignore
  store.__persistor = persistStore(store); // This creates a persistor object to .__persistor,
  // so that we can avail the persistability feature

  return store;
};

export const wrapper = createWrapper(createStoreWrapped);

export const useAppDispatch = () => useDispatch<TDispatch>();
