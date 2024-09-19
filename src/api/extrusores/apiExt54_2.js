// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_2 = "http://localhost:3000/etiquetasExt54_2";

export const fetchEtiquetas54_2 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_2);
  return response.data;
};

export const createEtiqueta54_2 = async (etiqueta54_2Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_2, etiqueta54_2Data);
  return response.data;
};
