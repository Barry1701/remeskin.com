import axios from 'axios';

// Set the base URL for axios requests
axios.defaults.baseURL = 'https://drestf-api-8914bba56128.herokuapp.com';
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;



// Create instances for axios requests
export const axiosReq = axios.create();
export const axiosRes = axios.create();

