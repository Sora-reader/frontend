import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { apiUrl } from '../../api';

applyCaseMiddleware(axios);

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';
