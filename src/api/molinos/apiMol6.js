// api.js
import axios from "axios";

export const apiUrlEtiquetasMol6 = "http://localhost:3000/etiquetasMol6";

export const fetchEtiquetasMol6 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol6);
  return response.data;
};

export const createEtiquetaMol6 = async (etiquetaMol6Data) => {
  const response = await axios.post(apiUrlEtiquetasMol6, etiquetaMol6Data);
  return response.data;
};
