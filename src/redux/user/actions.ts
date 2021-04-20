import axios, { AxiosRequestConfig } from 'axios';
import { Dispatch } from 'redux';
import { RefreshUserAction, SignInAction, ResetUserAction, SignUpAction } from './types';
import cookie from 'cookie';
import { TDispatch } from '../types';

export const SIGN_UP = 'SIGN_UP';

export const SET_USER = 'SET_USER';
export const REFRESH_USER = 'REFRESH_USER';
export const RESET_USER_ACTION = 'RESET_USER_ACTION';

export const RefreshUser = (retry = false) => {
  return async (dispatch: TDispatch<RefreshUserAction>): Promise<RefreshUserAction> => {
    const cookies = cookie.parse(document.cookie);
    try {
      if (retry) {
        console.log('Refreshing token in retry');
      }
      const response = await axios.post(
        'auth/refresh/',
        {
          refresh: cookies.sora_refresh,
        },
        {
          retry,
        } as AxiosRequestConfig
      );
      console.log('Refreshed token', response.data);

      axios.defaults.headers.post.Authorization = `Bearer ${response.data.access}`;
      axios.defaults.headers.put.Authorization = `Bearer ${response.data.access}`;
      axios.defaults.headers.patch.Authorization = `Bearer ${response.data.access}`;

      return dispatch({
        type: REFRESH_USER,
        access: response.data.access,
      });
    } catch (response) {
      console.log('Error refreshing', response);
    }
    return dispatch({
      type: RESET_USER_ACTION,
    });
  };
};

export const signIn = (username: string, password: string) => {
  // TODO
  return async (dispatch: Dispatch<SignInAction>) => {
    try {
      const response = await axios.post('token/', {
        username,
        password,
      });

      document.cookie = `sora_refresh=${response.data.refresh}`;

      axios.defaults.headers.post.Authorization = `Bearer ${response.data.access}`;
      axios.defaults.headers.put.Authorization = `Bearer ${response.data.access}`;
      axios.defaults.headers.patch.Authorization = `Bearer ${response.data.access}`;

      return dispatch({
        type: SET_USER,
        username,
        access: response.data.access,
      });
    } catch (response) {
      return dispatch({
        type: RESET_USER_ACTION,
        username: '',
        access: '',
      });
    }
  };
};

export const signOut = (): ResetUserAction => {
  // TODO clear cookies
  return { type: RESET_USER_ACTION };
};

export const signUp = (username: string, password: string): SignUpAction => ({
  type: SIGN_UP,
  username,
  password,
});
