import { REFRESH_USER, SET_USER, RESET_USER_ACTION } from './actions';

export interface RefreshUserAction {
  type: typeof REFRESH_USER;
  access?: string;
}

export interface SetUserAction {
  type: typeof SET_USER;
  username: string;
  access: string;
}

export interface ResetUserAction {
  type: typeof RESET_USER_ACTION;
}

export type UserAction = RefreshUserAction | SetUserAction | ResetUserAction;
