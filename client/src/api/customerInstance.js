import axios from "axios";

const customerInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

customerInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("customer");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default customerInstance;
