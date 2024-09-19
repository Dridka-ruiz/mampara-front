// api.js
import axios from "axios";

export const apiUrlEtiquetasMol15 = "http://localhost:3000/etiquetasMol15";

export const fetchEtiquetasMol15 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol15);
  return response.data;
};

export const createEtiquetaMol15 = async (etiquetaMol15Data) => {
  const response = await axios.post(apiUrlEtiquetasMol15, etiquetaMol15Data);
  return response.data;
};
