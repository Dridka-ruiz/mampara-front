// api.js
import axios from "axios";

export const apiUrlEtiquetasMol13 = "http://localhost:3000/etiquetasMol13";

export const fetchEtiquetasMol13 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol13);
  return response.data;
};

export const createEtiquetaMol13 = async (etiquetaMol13Data) => {
  const response = await axios.post(apiUrlEtiquetasMol13, etiquetaMol13Data);
  return response.data;
};
