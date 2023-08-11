/** @format */

import axios from 'axios';
import { baseUrl } from './apisConfig';

const Axios = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
});

export default Axios;
