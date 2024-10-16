import axios from "axios";

axios.defaults.baseURL = "https://drestf-api-8914bba56128.herokuapp.com/";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Set default Content-Type dynamically based on request type
axiosReq.interceptors.request.use((config) => {
  if (config.method === "post" && config.headers["Content-Type"] !== "multipart/form-data") {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});