// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_8 = "http://localhost:3000/etiquetasExt54_8";

export const fetchEtiquetas54_8 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_8);
  return response.data;
};

export const createEtiqueta54_8 = async (etiqueta54_8Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_8, etiqueta54_8Data);
  return response.data;
};
