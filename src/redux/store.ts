import { AnyAction, applyMiddleware, combineReducers, createStore, Middleware, Reducer, Action } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import manga from './manga/reducer';
import theme from './theme/reducer';
import search from './search/reducer';
import user from './user/reducer';
import { ThunkDispatch } from 'redux-thunk';

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  theme,
  manga,
  search,
  user,
});

export type State = ReturnType<typeof combinedReducer>;

const reducer: Reducer = (state: State, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.manga.manga) nextState.manga.manga = state.manga.manga; // TODO: remove?
    return nextState;
  }
  return combinedReducer(state, action);
};

const initStore = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper(initStore);
