// api.js
import axios from "axios";

export const apiUrlEtiquetasMol10 = "http://localhost:3000/etiquetasMol10";

export const fetchEtiquetasMol10 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol10);
  return response.data;
};

export const createEtiquetaMol10 = async (etiquetaMol10Data) => {
  const response = await axios.post(apiUrlEtiquetasMol10, etiquetaMol10Data);
  return response.data;
};
