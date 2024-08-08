// services/ecommerce.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ECOMMERCE_API_URL
});

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
