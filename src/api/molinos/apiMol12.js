// api.js
import axios from "axios";

export const apiUrlEtiquetasMol12 = "http://localhost:3000/etiquetasMol12";

export const fetchEtiquetasMol12 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol12);
  return response.data;
};

export const createEtiquetaMol12 = async (etiquetaMol12Data) => {
  const response = await axios.post(apiUrlEtiquetasMol12, etiquetaMol12Data);
  return response.data;
};
