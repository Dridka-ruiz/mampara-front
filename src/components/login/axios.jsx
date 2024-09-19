import axios from "axios";
import { useAuth } from "./AuthContext";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const useAxios = () => {
  const { token, logout } = useAuth();

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logout(); // Llama a la función de logout del contexto de autenticación
      }
      return Promise.reject(error);
    }
  );

  return api;
};
