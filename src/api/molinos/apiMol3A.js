// api.js
import axios from "axios";

export const apiUrlEtiquetasMol3A = "http://localhost:3000/etiquetasMol3A";

export const fetchEtiquetasMol3A = async () => {
  const response = await axios.get(apiUrlEtiquetasMol3A);
  return response.data;
};

export const createEtiquetaMol3A = async (etiquetaMol3AData) => {
  const response = await axios.post(apiUrlEtiquetasMol3A, etiquetaMol3AData);
  return response.data;
};
