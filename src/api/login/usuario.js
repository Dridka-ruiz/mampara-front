// api.js
import axios from "axios";

export const apiUrl = "http://localhost:3000/users";

export const fetchUsuarios = async () => {
  try {
    const response = await axios.get(apiUrl);
    // Aquí asumimos que los datos están dentro de la propiedad 'data'
    const usuarios = response.data.data;
    return usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw new Error("Error al obtener usuarios");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }

    const nuevoUsuario = await response.json();
    return nuevoUsuario;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw new Error("Error al crear usuario");
  }
};
