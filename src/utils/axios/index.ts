import axios from 'axios';


axios.defaults.baseURL = `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/api/`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export { initInterceptors } from './interceptors';
