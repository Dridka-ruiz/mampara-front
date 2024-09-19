// api.js
import axios from "axios";

export const apiUrlEtiquetasMol7 = "http://localhost:3000/etiquetasMol7";

export const fetchEtiquetasMol7 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol7);
  return response.data;
};

export const createEtiquetaMol7 = async (etiquetaMol7Data) => {
  const response = await axios.post(apiUrlEtiquetasMol7, etiquetaMol7Data);
  return response.data;
};
