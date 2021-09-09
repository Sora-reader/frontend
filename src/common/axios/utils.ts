import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { CustomAxiosConfig } from './types';

export function refreshAxiosDefaults(access: String) {
  axios.defaults.headers.post.Authorization = `Bearer ${access}`;
  axios.defaults.headers.put.Authorization = `Bearer ${access}`;
  axios.defaults.headers.patch.Authorization = `Bearer ${access}`;
}

export const shouldRetry = (error: AxiosError) => {
  const config = error.config as CustomAxiosConfig;
  return [401, 403].includes(Number(error.response?.status)) && !config.retry;
};

export const taskNameFromConfig = (config: AxiosRequestConfig) => {
  return `${config.baseURL}${config.url}`;
};
