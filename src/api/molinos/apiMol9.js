// api.js
import axios from "axios";

export const apiUrlEtiquetasMol9 = "http://localhost:3000/etiquetasMol9";

export const fetchEtiquetasMol9 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol9);
  return response.data;
};

export const createEtiquetaMol9 = async (etiquetaMol9Data) => {
  const response = await axios.post(apiUrlEtiquetasMol9, etiquetaMol9Data);
  return response.data;
};
