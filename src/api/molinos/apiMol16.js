// api.js
import axios from "axios";

export const apiUrlEtiquetasMol16 = "http://localhost:3000/etiquetasMol16";

export const fetchEtiquetasMol16 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol16);
  return response.data;
};

export const createEtiquetaMol16 = async (etiquetaMol16Data) => {
  const response = await axios.post(apiUrlEtiquetasMol16, etiquetaMol16Data);
  return response.data;
};
