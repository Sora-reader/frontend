import { AxiosRequestConfig } from 'axios';

export interface CustomAxiosConfig extends AxiosRequestConfig {
  retry?: boolean;
  silent?: boolean; // don't use progressBar for this request
}
