// api.js
import axios from "axios";

export const apiUrlTime54_6 = "http://localhost:3000/timeset54_6";

export const fetchTime54_6 = async () => {
  const response = await axios.get(apiUrlTime54_6);
  return response.data;
};

export const createTime54_6 = async (time54_6Data) => {
  const response = await axios.post(apiUrlTime54_6, time54_6Data);
  return response.data;
};
