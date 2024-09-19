// api.js
import axios from "axios";

export const apiUrlBuss2 = "http://localhost:3000/etiquetasBussll";

export const fetchEtiquetasBuss2 = async () => {
  const response = await axios.get(apiUrlBuss2);
  return response.data;
};

export const createEtiquetaBuss2 = async (etiquetaBuss2Data) => {
  const response = await axios.post(apiUrlBuss2, etiquetaBuss2Data);
  return response.data;
};
