// AcabadoLimpieza.js
import axios from "axios";

export const apiAcabadoLimpieza = "http://localhost:3000/tiempos-acabado";

export const fetchAcabadoLimpieza = async () => {
  const response = await axios.get(apiAcabadoLimpieza);
  return response.data;
};

export const createSetUp = async (AcavbadoData) => {
  const response = await axios.post(apiAcabadoLimpieza, AcavbadoData);
  return response.data;
};
