// api.js
import axios from "axios";

export const apiUrlEtiquetasExt70_1 = "http://localhost:3000/etiquetasExt70_1";

export const fetchEtiquetas70_1 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt70_1);
  return response.data;
};

export const createEtiqueta70_1 = async (etiqueta70_1Data) => {
  const response = await axios.post(apiUrlEtiquetasExt70_1, etiqueta70_1Data);
  return response.data;
};
