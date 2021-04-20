import { AnyAction, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { UserAction } from './user/types';
import { ThemeAction } from './theme/types';
import { State } from './store';

export type RAction = UserAction | ThemeAction;
export interface TDispatch<A extends Action = AnyAction> extends ThunkDispatch<State, any, A> {}
