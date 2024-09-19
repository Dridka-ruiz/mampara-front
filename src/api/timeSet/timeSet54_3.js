// api.js
import axios from "axios";

export const apiUrlTime54_3 = "http://localhost:3000/timeset54_3";

export const fetchTime54_3 = async () => {
  const response = await axios.get(apiUrlTime54_3);
  return response.data;
};

export const createTime54_3 = async (time54_3Data) => {
  const response = await axios.post(apiUrlTime54_3, time54_3Data);
  return response.data;
};
