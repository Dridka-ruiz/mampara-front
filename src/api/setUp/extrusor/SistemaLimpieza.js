// AcabadoLimpieza.js
import axios from "axios";

export const apiSistemaLimpieza = "http://localhost:3000/tiempos-sistema";

export const fetchSistemaLimpieza = async () => {
  const response = await axios.get(apiSistemaLimpieza);
  return response.data;
};

export const createSetUp = async (AcavbadoData) => {
  const response = await axios.post(apiSistemaLimpieza, AcavbadoData);
  return response.data;
};
