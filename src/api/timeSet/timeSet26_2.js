// api.js
import axios from "axios";

export const apiUrlTime26_2 = "http://localhost:3000/timeSet26_2";

export const fetchTime26_2 = async () => {
  const response = await axios.get(apiUrlTime26_2);
  return response.data;
};

export const createTime26_2 = async (time26_2Data) => {
  const response = await axios.post(apiUrlTime26_2, time26_2Data);
  return response.data;
};
