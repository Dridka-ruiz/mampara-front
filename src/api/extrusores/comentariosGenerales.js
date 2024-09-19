// api.js
import axios from "axios";

export const apiComentariosGlobales =
  "http://localhost:3000/comentariosGlobales";

export const fetchComentariosGlobales = async () => {
  const response = await axios.get("http://localhost:3000/comentariosGlobales");
  return response.data.map((comentario, index) => ({
    ...comentario,
    id: comentario.id || index.toString(), // Asigna un id único si falta
  }));
};
export const createComentarioGlobal = async (comentarioGlobalData) => {
  const response = await fetch("http://localhost:3000/comentariosGlobales", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comentarioGlobalData),
  });

  if (!response.ok) {
    throw new Error("Error al crear del comentario");
  }

  const newComentarioGlobales = await response.json();
  return newComentarioGlobales;
};
