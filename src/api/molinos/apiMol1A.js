// api.js
import axios from "axios";

export const apiUrlEtiquetasMol1A = "http://localhost:3000/etiquetasMol1A";

export const fetchEtiquetasMol1A = async () => {
  const response = await axios.get(apiUrlEtiquetasMol1A);
  return response.data;
};

export const createEtiquetaMol1A = async (etiquetaMol1AData) => {
  const response = await axios.post(apiUrlEtiquetasMol1A, etiquetaMol1AData);
  return response.data;
};
