import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../redux/store';
import { RefreshUser, REFRESH_USER } from '../redux/user/actions';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const dispatch = useDispatch();
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest.retry) {
      console.log('Og request', originalRequest, originalRequest.retry);
      console.log('401/403 code for a request, refreshing access...');
      originalRequest.retry = true;

      const access = useSelector((state: State) => state.user.access);
      const cached_access = access;

      dispatch(RefreshUser(originalRequest.retry));

      while (access === cached_access) {}

      originalRequest.headers.Authorization = `Bearer ${access}`;
      console.log('Updated configs');
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
