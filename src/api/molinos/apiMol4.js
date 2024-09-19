// api.js
import axios from "axios";

export const apiUrlEtiquetasMol4 = "http://localhost:3000/etiquetasMol4";

export const fetchEtiquetasMol4 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol4);
  return response.data;
};

export const createEtiquetaMol4 = async (etiquetaMol4Data) => {
  const response = await axios.post(apiUrlEtiquetasMol4, etiquetaMol4Data);
  return response.data;
};
