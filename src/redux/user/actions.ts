import axios from 'axios';
import { UserCredentials } from './types';
import cookie from 'cookie';
import { CustomAxiosConfig } from '../../utils/axios/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const AUTH_URL = 'auth/';
const SIGN_IN_URL = `${AUTH_URL}sign-in/`;
const SIGN_UP_URL = `${AUTH_URL}sign-up/`;
const SIGN_OUT_URL = `${AUTH_URL}sign-out/`;
const REFRESH_URL = `${AUTH_URL}token-refresh/`;

export const refreshUser = createAsyncThunk('user/refresh', async (retry: boolean = false) => {
  const cookies = cookie.parse(document.cookie);
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

  return response.data.access;
});

export const signIn = createAsyncThunk('user/signIn', async ({ username, password }: UserCredentials) => {
  const response = await axios.post(SIGN_IN_URL, {
    username,
    password,
  });

  document.cookie = `sora_refresh=${response.data.refresh}`;

  return {
    username,
    access: response.data.access,
  };
});

export const signUp = createAsyncThunk('user/signUp', async ({ username, password }: UserCredentials) => {
  const response = await axios.post(SIGN_UP_URL, {
    username,
    password,
  });

  document.cookie = `sora_refresh=${response.data.refresh}`;

  return {
    username,
    access: response.data.access,
  };
});

export const signOut = createAsyncThunk('user/signOut', async () => {
  await axios.get(SIGN_OUT_URL);
  document.cookie = 'sora_refresh=';
});
