// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_7 = "http://localhost:3000/etiquetasExt54_7";

export const fetchEtiquetas54_7 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_7);
  return response.data;
};

export const createEtiqueta54_7 = async (etiqueta54_7Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_7, etiqueta54_7Data);
  return response.data;
};
