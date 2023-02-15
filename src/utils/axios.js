import axios from "axios";

console.log("API URL", process.env.VUE_APP_API_URL);

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default axiosInstance;
