import { useEffect, useState } from "react";
import { useAxios } from "./axios";
import { useAuth } from "./AuthContext";

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const api = useAxios();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };

    fetchUser();
  }, [api, logout]);

  return user;
};

export default useFetchUser;
