// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_6 = "http://localhost:3000/etiquetasExt54_6";

export const fetchEtiquetas54_6 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_6);
  return response.data;
};

export const createEtiqueta54_6 = async (etiqueta54_6Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_6, etiqueta54_6Data);
  return response.data;
};
