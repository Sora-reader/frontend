import axios from 'axios';
import { RefreshUserAction, SetUserAction, ResetUserAction } from './types';
import cookie from 'cookie';
import { TDispatch } from '../types';
import { CustomAxiosConfig } from '../../utils/axios/types';

export const SIGN_UP = 'SIGN_UP';

export const SET_USER = 'SET_USER';
export const REFRESH_USER = 'REFRESH_USER';
export const RESET_USER_ACTION = 'RESET_USER_ACTION';

const AUTH_URL = 'auth/';
const SIGN_IN_URL = `${AUTH_URL}sign-in/`;
const SIGN_UP_URL = `${AUTH_URL}sign-up/`;
const SIGN_OUT_URL = `${AUTH_URL}sign-out/`;
const REFRESH_URL = `${AUTH_URL}token-refresh/`;

export const RefreshUser = (retry = false) => {
  type ActionType = RefreshUserAction | ResetUserAction;
  return async (dispatch: TDispatch<ActionType>): Promise<ActionType> => {
    const cookies = cookie.parse(document.cookie);
    try {
      if (retry) {
        console.log('Refreshing token in retry');
      }
      const response = await axios.post(
        REFRESH_URL,
        {
          refresh: cookies.sora_refresh,
        },
        {
          retry,
          silent: true,
        } as CustomAxiosConfig
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
  return async (dispatch: TDispatch<SetUserAction | ResetUserAction>) => {
    try {
      const response = await axios.post(SIGN_IN_URL, {
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
      });
    }
  };
};

export const signUp = (username: string, password: string) => {
  return async (dispatch: TDispatch<SetUserAction | ResetUserAction>) => {
    try {
      const response = await axios.post(SIGN_UP_URL, {
        username,
        password,
      });

      document.cookie = `sora_refresh=${response.data.refresh}`;

      return dispatch({
        type: SET_USER,
        username,
        access: response.data.access,
      });
    } catch (response) {
      return dispatch({
        type: RESET_USER_ACTION,
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch: TDispatch<ResetUserAction>) => {
    await axios.get(SIGN_OUT_URL);
    document.cookie = 'sora_refresh=';
    return dispatch({
      type: RESET_USER_ACTION,
    });
  };
};
