// api.js
import axios from "axios";

export const apiUrlTime54_8 = "http://localhost:3000/timeset54_8";

export const fetchTime54_8 = async () => {
  const response = await axios.get(apiUrlTime54_8);
  return response.data;
};

export const createTime54_8 = async (time54_8Data) => {
  const response = await axios.post(apiUrlTime54_8, time54_8Data);
  return response.data;
};
