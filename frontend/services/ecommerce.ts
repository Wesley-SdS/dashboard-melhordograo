// services/ecommerce.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ECOMMERCE_API_URL
});

// Opcional: Adicionar interceptador para incluir token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ajuste conforme onde você guarda o token
    console.log("Token armazenado:", token); // Verifique se o token está correto

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

console.log("Axios configurado corretamente"); // Verifique se o Axios foi configurado corretamente

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products"); // Corrigido: removido "/api"
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users"); // Verifique se este endpoint está correto
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
