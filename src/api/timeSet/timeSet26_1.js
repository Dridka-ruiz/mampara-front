// api.js
import axios from "axios";

export const apiUrlTime26_1 = "http://localhost:3000/timeSet26_1";

export const fetchTime26_1 = async () => {
  const response = await axios.get(apiUrlTime26_1);
  return response.data;
};

export const createTime26_1 = async (time26_1Data) => {
  const response = await axios.post(apiUrlTime26_1, time26_1Data);
  return response.data;
};
