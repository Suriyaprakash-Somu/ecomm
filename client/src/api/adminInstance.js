import axios from "axios";

const adminInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

adminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default adminInstance;
