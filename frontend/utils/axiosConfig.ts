// utils/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001" // Corrigido para http se necessário
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token armazenado no interceptor:", token); // Verifique se o token está sendo lido corretamente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
