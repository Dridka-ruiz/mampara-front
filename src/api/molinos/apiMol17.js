// api.js
import axios from "axios";

export const apiUrlEtiquetasMol17 = "http://localhost:3000/etiquetasMol17";

export const fetchEtiquetasMol17 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol17);
  return response.data;
};

export const createEtiquetaMol17 = async (etiquetaMol17Data) => {
  const response = await axios.post(apiUrlEtiquetasMol17, etiquetaMol17Data);
  return response.data;
};
