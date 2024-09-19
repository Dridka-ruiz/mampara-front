// api.js
import axios from "axios";

export const apiUrlBuss1 = "http://localhost:3000/etiquetasBussl";

export const fetchEtiquetasBuss1 = async () => {
  const response = await axios.get(apiUrlBuss1);
  return response.data;
};

export const createEtiquetaBuss1 = async (etiquetaBuss1Data) => {
  const response = await axios.post(apiUrlBuss1, etiquetaBuss1Data);
  return response.data;
};
