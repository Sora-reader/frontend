import { SIGN_IN, SIGN_IN_ERROR, SIGN_OUT, SIGN_UP } from './actions';

export interface SignInAction {
  type: typeof SIGN_IN;
  username: string;
  token: string;
}

export interface SignInErrorAction {
  type: typeof SIGN_IN_ERROR;
  error: string;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export interface SignUpAction {
  type: typeof SIGN_UP;
  username: string;
  password: string;
}

export type UserAction =
  | SignInAction
  | SignInErrorAction
  | SignOutAction
  | SignUpAction;
