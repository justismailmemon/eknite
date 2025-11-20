// src/api/axios.js
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // comes from .env
});

// Request: start loading + attach token
api.interceptors.request.use((config) => {
  NProgress.start();

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
