// api.js
import axios from "axios";

/* export const apiUrlEtiquetasExt54_4 =
  "http://localhost:3000/etiquetasExt54_2";*/
export const apiUrlEtiquetasExt54_4 = "http://localhost:3000/etiquetasExt54_4";

export const fetchEtiquetas54_4 = async () => {
  const response = await axios.get(apiUrlEtiquetasExt54_4);
  return response.data;
};

export const createEtiqueta54_4 = async (etiqueta54_4Data) => {
  const response = await axios.post(apiUrlEtiquetasExt54_4, etiqueta54_4Data);
  return response.data;
};
