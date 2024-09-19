// api.js
import axios from "axios";

export const apiUrlTime54_7 = "http://localhost:3000/timeset54_7";

export const fetchTime54_7 = async () => {
  const response = await axios.get(apiUrlTime54_7);
  return response.data;
};

export const createTime54_7 = async (time54_7Data) => {
  const response = await axios.post(apiUrlTime54_7, time54_7Data);
  return response.data;
};
