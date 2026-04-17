import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
  withCredentials: true,
});

// Attach JWT token if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
