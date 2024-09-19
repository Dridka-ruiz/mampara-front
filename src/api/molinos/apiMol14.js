// api.js
import axios from "axios";

export const apiUrlEtiquetasMol14 = "http://localhost:3000/etiquetasMol14";

export const fetchEtiquetasMol14 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol14);
  return response.data;
};

export const createEtiquetaMol14 = async (etiquetaMol14Data) => {
  const response = await axios.post(apiUrlEtiquetasMol14, etiquetaMol14Data);
  return response.data;
};
