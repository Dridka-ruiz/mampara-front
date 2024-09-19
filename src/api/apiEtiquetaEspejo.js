/* // api.js
import axios from "axios";

export const etiquetasEspejoUrl = "http://localhost:3000/etiquetas-espejo";

export const fetchEtiquetasEspejo = async () => {
  const response = await axios.get(etiquetasEspejoUrl);
  return response.data;
};

export const createEtiquetaEspejo = async (etiquetaEspejoData) => {
  const response = await fetch("http://localhost:3000/etiquetas-espejo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(etiquetaEspejoData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la etiqueta");
  }

  const newEtiqueta = await response.json();
  return newEtiqueta;
};
 */
