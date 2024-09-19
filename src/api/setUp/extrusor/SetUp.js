// api.js
import axios from "axios";

export const apiSetUp = "http://localhost:3000/tiempos-limpieza";

export const fetchSetUp = async () => {
  const response = await axios.get(apiSetUp);
  return response.data;
};

export const createSetUp = async (setUpData) => {
  const response = await axios.post(apiSetUp, setUpData);
  return response.data;
};
