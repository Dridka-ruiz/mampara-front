// api.js
import axios from "axios";

export const apiUrlEtiquetasExt54_3 = "http://localhost:3000/etiquetasExt54_3";

export const fetchEtiquetas54_3 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_3);
  return response.data;
};

export const createEtiqueta54_3 = async (etiqueta54_3Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_3, etiqueta54_3Data);
  return response.data;
};
