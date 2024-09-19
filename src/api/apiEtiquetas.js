// api.js
import axios from "axios";

export const apiUrl = "http://localhost:3000/etiquetas";

export const fetchEtiquetas = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const createEtiqueta = async (etiquetaData) => {
  const response = await fetch("http://localhost:3000/etiquetas", {
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

export const fetchProductos = async () => {
  try {
    const response = await fetch("http://localhost:3000/productos");
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
