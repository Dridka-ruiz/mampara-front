// api.js
import axios from "axios";

export const apiUrlEtiquetasExt70_3 = "http://localhost:3000/etiquetasExt70_3";

export const fetchEtiquetas70_3 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt70_3);
  return response.data;
};

export const createEtiqueta70_3 = async (etiqueta70_3Data) => {
  const response = await axios.post(apiUrlEtiquetasExt70_3, etiqueta70_3Data);
  return response.data;
};
