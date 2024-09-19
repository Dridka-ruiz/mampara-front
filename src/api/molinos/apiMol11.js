// api.js
import axios from "axios";

export const apiUrlEtiquetasMol11 = "http://localhost:3000/etiquetasMol11";

export const fetchEtiquetasMol11 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol11);
  return response.data;
};

export const createEtiquetaMol11 = async (etiquetaMol11Data) => {
  const response = await axios.post(apiUrlEtiquetasMol11, etiquetaMol11Data);
  return response.data;
};
