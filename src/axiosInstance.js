// axiosInstance.js
import axios from "axios";
import Cookies from "vue-cookies";

const instance = axios.create({
  baseURL: "http://localhost/api/v1/",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Attach the auth token from cookies if present
    const authToken = Cookies.get("auth_token");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
