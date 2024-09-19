// api.js
import axios from "axios";

export const etiquetasMolUrl = "http://localhost:3000/etiquetasMolinos";

export const fetchEtiquetasMol = async () => {
  const response = await axios.get(etiquetasMolUrl);
  return response.data;
};

export const createEtiquetaMol = async (etiquetaMolData) => {
  const response = await fetch("http://localhost:3000/etiquetasMolinos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(etiquetaMolData),
  });

  if (!response.ok) {
    throw new Error("Error al crear la etiqueta");
  }

  const newEtiqueta = await response.json();
  return newEtiqueta;
};
