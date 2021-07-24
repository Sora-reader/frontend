import { AnyAction, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';

export interface TDispatch<A extends Action = AnyAction> extends ThunkDispatch<RootState, any, A> {}
export type Condition<ThunkArg> = (
  arg: ThunkArg,
  api: { getState: () => RootState; extra: any }
) => boolean | undefined;
