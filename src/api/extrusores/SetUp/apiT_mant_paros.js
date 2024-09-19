// api.js
import axios from "axios";

export const apiMantParos = "http://localhost:3000/ext-mant-paros";

export const fetchMantParos = async () => {
  const response = await axios.get(apiMantParos);
  return response.data;
};

export const createT_mant_paros = async (etiquetaData) => {
  const response = await fetch("http://localhost:3000/ext-mant-paros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(etiquetaData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la etiqueta");
  }

  const newEtiqueta = await response.json();
  return newEtiqueta;
};
