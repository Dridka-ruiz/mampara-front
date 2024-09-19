import React, { useEffect, useState } from "react";
import "../../style/login/user.css";
import { FaCircleUser } from "react-icons/fa6";

import { useAxios } from "../Login/axios";

import { useAuth } from "../Login/AuthContext";

function user() {
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
    <div className="contenedoruser">
      <div>
        <FaCircleUser
          style={{
            fontSize: "30px",
            margin: "3px",
          }}
        />
      </div>

      <p
        style={{
          margin: "1px",
          fontSize: "23px",
        }}
      >
        {user.username}
      </p>
    </div>
  );
}

export default user;
