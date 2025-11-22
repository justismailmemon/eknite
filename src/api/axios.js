// src/api/axios.js
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request: start loading + attach token
api.interceptors.request.use((config) => {
  // 👇 only start NProgress if NOT explicitly skipped
  if (!config.skipProgress) {
    NProgress.start();
  }

  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// Response: stop loading
api.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default api;
