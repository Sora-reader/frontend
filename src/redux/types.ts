import { AnyAction, applyMiddleware, combineReducers, createStore, Middleware, Reducer, Action } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import manga from './manga/reducer';
import theme from './theme/reducer';
import search from './search/reducer';
import user from './user/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { UserAction } from './user/types';
import { ThemeAction } from './theme/types';
import { State } from './store';

export type RAction = UserAction | ThemeAction;
export interface TDispatch<A extends Action = AnyAction> extends ThunkDispatch<State, any, A> {}
