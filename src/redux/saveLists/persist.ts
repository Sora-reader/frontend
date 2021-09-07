import { persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';

const persistConfig = {
  key: 'saveLists',
  storage,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer<any>(persistConfig, reducer);
export default persistedReducer;
