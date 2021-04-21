import { REFRESH_USER, SET_USER, RESET_USER_ACTION, SIGN_UP } from './actions';

export interface RefreshUserAction {
  type: typeof REFRESH_USER | typeof RESET_USER_ACTION;
  access?: string;
}

export interface SignInAction {
  type: typeof SET_USER | typeof RESET_USER_ACTION;
  username: string;
  access: string;
}

export interface ResetUserAction {
  type: typeof RESET_USER_ACTION;
}

export interface SignUpAction {
  type: typeof SIGN_UP;
  username: string;
  password: string;
}

export type UserAction = RefreshUserAction | SignInAction | ResetUserAction | SignUpAction;
