import axios from "axios";

axios.defaults.baseURL = "https://drestf-api-8914bba56128.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
axios.defaults.withCredentials = true;