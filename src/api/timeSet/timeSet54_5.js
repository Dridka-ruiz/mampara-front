// api.js
import axios from "axios";

export const apiUrlTime54_5 = "http://localhost:3000/timeset54_5";

export const fetchTime54_5 = async () => {
  const response = await axios.get(apiUrlTime54_5);
  return response.data;
};

export const createTime54_5 = async (time54_2Data) => {
  const response = await axios.post(apiUrlTime54_5, time54_2Data);
  return response.data;
};
