import axios from 'axios';
import {RefreshUser} from '../redux/user/actions';

// Defaults for API
axios.defaults.baseURL = `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Django's CSRF, we don't need this, because DRF avoids CSRF
// axios.defaults.withCredentials = true
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.xsrfCookieName = 'csrftoken';

function refreshAxiosDefaults(access: String) {
    axios.defaults.headers.post.Authorization = `Bearer ${access}`;
    axios.defaults.headers.put.Authorization = `Bearer ${access}`;
    axios.defaults.headers.patch.Authorization = `Bearer ${access}`;
}

export function initInterceptors(store: any) {
    // Response interceptor to retry 401/403 with refreshed token
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if ([401, 403].includes(error.response.status) && !originalRequest.retry) {
                console.log('401/403 code for a request, refreshing access...');

                originalRequest.retry = true;

                const state = store.getState();

                console.log('Access token before refresh', state.user.access);
                // Wait for token to be refreshed and renew token
                await store.dispatch(RefreshUser(originalRequest.retry));
                console.log('Access token after refresh', state.user.access);

                refreshAxiosDefaults(state.user.access);
                originalRequest.headers.Authorization = `Bearer ${state.user.access}`

                return axios(originalRequest);
            }
            else if (!originalRequest.retry) {
                console.log('Request retry failed')
            }
            return Promise.reject(error);
        }
    );
}