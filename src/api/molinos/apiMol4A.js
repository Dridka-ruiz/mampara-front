// api.js
import axios from "axios";

export const apiUrlEtiquetasMol4A = "http://localhost:3000/etiquetasMol4A";

export const fetchEtiquetasMol4A = async () => {
  const response = await axios.get(apiUrlEtiquetasMol4A);
  return response.data;
};

export const createEtiquetaMol4A = async (etiquetaMol4AData) => {
  const response = await axios.post(apiUrlEtiquetasMol4A, etiquetaMol4AData);
  return response.data;
};
