// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_1 = "http://localhost:3000/etiquetasExt54_1";

export const fetchEtiquetas54_1 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_1);
  return response.data;
};

export const createEtiqueta54_1 = async (etiqueta54_1Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_1, etiqueta54_1Data);
  return response.data;
};
