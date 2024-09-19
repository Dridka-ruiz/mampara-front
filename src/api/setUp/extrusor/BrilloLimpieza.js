// AcabadoLimpieza.js
import axios from "axios";

export const apiBrilloLimpieza = "http://localhost:3000/tiempos-brillo";

export const fetchBrilloLimpieza = async () => {
  const response = await axios.get(apiBrilloLimpieza);
  return response.data;
};

export const createSetUp = async (AcavbadoData) => {
  const response = await axios.post(apiBrilloLimpieza, AcavbadoData);
  return response.data;
};
