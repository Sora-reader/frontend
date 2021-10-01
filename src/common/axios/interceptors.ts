import axios, { AxiosError } from 'axios';
import { StoreType } from '../../redux/store';
import { AppDispatch } from '../../redux/types';
import { refreshUser } from '../../redux/user/actions';
import { CustomAxiosConfig } from './types';
import { refreshAxiosDefaults, shouldRetry } from './utils';

export function initInterceptors(store: StoreType) {
  // Response interceptor to retry 401/403 with refreshed token
  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const requestConfig = error.config as CustomAxiosConfig;

      if (shouldRetry(error)) {
        console.log('401/403 code for a request, refreshing access...');
        requestConfig.retry = true;

        // Wait for token to be refreshed and renew token
        await (store.dispatch as AppDispatch)(refreshUser(requestConfig.retry));
        const accessToken = store.getState().user.access;
        refreshAxiosDefaults(accessToken);

        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
        return axios(requestConfig);
      } else if (!requestConfig.retry) {
        console.log('Request retry failed');
      }

      return Promise.reject(error);
    }
  );
}
