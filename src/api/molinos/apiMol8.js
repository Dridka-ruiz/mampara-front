// api.js
import axios from "axios";

export const apiUrlEtiquetasMol8 = "http://localhost:3000/etiquetasMol8";

export const fetchEtiquetasMol8 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol8);
  return response.data;
};

export const createEtiquetaMol8 = async (etiquetaMol8Data) => {
  const response = await axios.post(apiUrlEtiquetasMol8, etiquetaMol8Data);
  return response.data;
};
