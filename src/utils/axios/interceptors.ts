import axios, { AxiosError } from 'axios';
import * as progressBarActions from '../../redux/progressBar/actions';
import { StoreType } from '../../redux/store';
import { TDispatch } from '../../redux/types';
import { refreshUser } from '../../redux/user/actions';
import { CustomAxiosConfig } from './types';
import { refreshAxiosDefaults, shouldRetry, taskNameFromConfig } from './utils';

export function initInterceptors(store: StoreType) {
  const loadingDispatch = (config: CustomAxiosConfig, type: 'start' | 'end' = 'end') => {
    if (!config.silent) {
      const taskExists = store.getState().progressBar.includes(taskNameFromConfig(config));
      if (type === 'start' && taskExists) return;
      else if (type === 'end' && !taskExists) return;

      const key = `${type}Loading` as keyof typeof progressBarActions;
      console.log(`dispatching ${key} for ${taskNameFromConfig(config)}`);
      store.dispatch(progressBarActions[key](taskNameFromConfig(config)));
    }
  };

  // Request interceptor to dispatch loading
  axios.interceptors.request.use(
    (request: CustomAxiosConfig) => {
      loadingDispatch(request, 'start');
      return request;
    },
    (error: AxiosError) => {
      loadingDispatch(error.config);
      return Promise.reject(error);
    }
  );

  // Response interceptor to retry 401/403 with refreshed token
  axios.interceptors.response.use(
    (response) => {
      loadingDispatch(response.config);
      return response;
    },
    async (error: AxiosError) => {
      const requestConfig = error.config as CustomAxiosConfig;

      if (shouldRetry(error)) {
        console.log('401/403 code for a request, refreshing access...');
        requestConfig.retry = true;

        // Wait for token to be refreshed and renew token
        await (store.dispatch as TDispatch)(refreshUser(requestConfig.retry));
        const accessToken = store.getState().user.access;
        refreshAxiosDefaults(accessToken);

        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
        return axios(requestConfig);
      } else if (!requestConfig.retry) {
        console.log('Request retry failed');
      }

      loadingDispatch(requestConfig);
      return Promise.reject(error);
    }
  );
}
