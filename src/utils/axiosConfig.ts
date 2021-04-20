import axios from 'axios';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../redux/store';
import { RefreshUser, REFRESH_USER } from '../redux/user/actions';
import { RefreshUserAction } from '../redux/user/types';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const dispatch = useDispatch() as ThunkDispatch<State, any, RefreshUserAction>;
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest.retry) {
      console.log('Og request', originalRequest, originalRequest.retry);
      console.log('401/403 code for a request, refreshing access...');
      originalRequest.retry = true;

      const access = useSelector((state: State) => state.user.access);

      await dispatch(RefreshUser(originalRequest.retry));

      originalRequest.headers.Authorization = `Bearer ${access}`;
      console.log('Updated configs');
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
