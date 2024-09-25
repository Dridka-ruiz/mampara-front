// api.js
import axios from "axios";

export const apiUrlEtiquetasMol3 = "http://localhost:3000/etiquetasMol3";

export const fetchEtiquetasMol3 = async () => {
  const response = await axios.get(apiUrlEtiquetasMol3);
  return response.data;
};
/*  */
export const createEtiquetaMol3 = async (etiquetaMol3Data) => {
  const response = await axios.post(apiUrlEtiquetasMol3, etiquetaMol3Data);
  return response.data;
};
