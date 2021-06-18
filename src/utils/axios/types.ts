import { AxiosRequestConfig } from 'axios';

export interface CustomAxiosConfig extends AxiosRequestConfig {
  retry?: boolean;
  silent?: boolean; // don't use loader and don render spinner for this request
}
