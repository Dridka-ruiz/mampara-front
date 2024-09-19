// api.js
import axios from "axios";

export const apiUrlEtiquetasMol2 = "http://localhost:3000/etiquetasMol2";

export const fetchEtiquetasMol2 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol2);
  return response.data;
};

export const createEtiquetaMol2 = async (etiquetaMol2Data) => {
  const response = await axios.post(apiUrlEtiquetasMol2, etiquetaMol2Data);
  return response.data;
};
