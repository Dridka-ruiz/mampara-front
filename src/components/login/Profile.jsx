import React, { useEffect, useState } from "react";
import { useAxios } from "./axios";
import { useAuth } from "./AuthContext";
import PermisoValidator from "./PermisoValidator";
import "../../style/Bienvenidos/bienvenidos.css";

function Profile() {
  const [user, setUser] = useState(null);
  const api = useAxios();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        /*   console.log(user); */
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };

    fetchUser();
  }, [api, logout]);

  const handleLogout = () => {
    logout(); // Llama a la función de logout del contexto de autenticación
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerLogo">
      <div className="bienvenido">
        <div className="positionBienvenida">
          <h1 className="h1Estilo">Bienvenido a producción</h1>
          <h1 className="h1Estilo2">{user.username}</h1>
        </div>

        {/* ejemplo de los permiso */}
        {/*       <PermisoValidator permiso="extrusores.mostrar">
        <div>No se mueve la etiqueta</div>
      </PermisoValidator>
 */}
      </div>
    </div>
  );
}

export default Profile;
