// AcabadoLimpieza.js
import axios from "axios";

export const apiParosMantenimiento = "http://localhost:3000/ext-mant-paros";

export const fetchParosMantenimientos = async () => {
  const response = await axios.get(apiParosMantenimiento);
  return response.data;
};

export const createParoMantenimiento = async (ParoMantenimientoData) => {
  const response = await axios.post(
    apiParosMantenimiento,
    ParoMantenimientoData
  );
  return response.data;
};
