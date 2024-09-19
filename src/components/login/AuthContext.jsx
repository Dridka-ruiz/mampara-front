import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [permissions, setPermissions] = useState(
    JSON.parse(localStorage.getItem("permissions")) || []
  );
  const [authInProgress, setAuthInProgress] = useState(false);

  useEffect(() => {
    // Si el token es válido, establece el estado de autenticación
    if (token && isTokenValid(token)) {
      setToken(token);
      setPermissions(permissions);
    } else {
      logout(); // Si el token no es válido, cierra sesión
    }
  }, []);

  const isTokenValid = (token) => {
    // Lógica para verificar la validez del token
    // Ejemplo: verificar la expiración del token (esto depende de tu implementación de token)
    const tokenExpirationDate = getTokenExpirationDate(token);
    return tokenExpirationDate > new Date();
  };

  const getTokenExpirationDate = (token) => {
    // Decodifica y obtiene la fecha de expiración del token
    // Este es un ejemplo y depende de cómo esté estructurado tu token
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return new Date(decodedToken.exp * 1000);
  };

  const login = (newToken, newPermissions) => {
    if (!authInProgress && newToken && newPermissions) {
      setAuthInProgress(true);
      localStorage.setItem("token", newToken);
      localStorage.setItem("permissions", JSON.stringify(newPermissions));
      setToken(newToken);
      setPermissions(newPermissions);
      setAuthInProgress(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    setToken(null);
    setPermissions([]);
  };

  return (
    <AuthContext.Provider value={{ token, permissions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
