// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_5 = "http://localhost:3000/etiquetasExt54_5";

export const fetchEtiquetas54_5 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_5);
  return response.data;
};

export const createEtiqueta54_5 = async (etiqueta54_5Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_5, etiqueta54_2Data);
  return response.data;
};
