// api.js
import axios from "axios";

export const apiUrlEtiquetasExt26_2 = "http://localhost:3000/etiquetasExt26_2";

export const fetchEtiquetas26_2 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt26_2);
  return response.data;
};

export const createEtiqueta26_2 = async (etiqueta26_2Data) => {
  const response = await axios.post(apiUrlEtiquetasExt26_2, etiqueta26_2Data);
  return response.data;
};
