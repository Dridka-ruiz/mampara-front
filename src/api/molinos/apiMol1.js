// api.js
import axios from "axios";

export const apiUrlEtiquetasMol1 = "http://localhost:3000/etiquetasMol1";

export const fetchEtiquetasMol1 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol1);
  return response.data;
};

export const createEtiquetaMol1 = async (etiquetaMol1Data) => {
  const response = await axios.post(apiUrlEtiquetasMol1, etiquetaMol1Data);
  return response.data;
};
