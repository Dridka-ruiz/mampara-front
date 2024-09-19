// api.js
import axios from "axios";

export const apiUrlEtiquetasExt26_1 = "http://localhost:3000/etiquetasExt26_1";

export const fetchEtiquetas26_1 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt26_1);
  return response.data;
};

export const createEtiqueta26_1 = async (etiqueta26_1Data) => {
  const response = await axios.post(apiUrlEtiquetasExt26_1, etiqueta26_1Data);
  return response.data;
};
