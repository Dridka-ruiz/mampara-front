// api.js
import axios from "axios";

export const apiUrlEtiquetasMol5 = "http://localhost:3000/etiquetasMol5";

export const fetchEtiquetasMol5 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol5);
  return response.data;
};

export const createEtiquetaMol5 = async (etiquetaMol5Data) => {
  const response = await axios.post(apiUrlEtiquetasMol5, etiquetaMol5Data);
  return response.data;
};
