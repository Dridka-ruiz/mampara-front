// api.js
import axios from "axios";

export const apiUrlTime54_2 = "http://localhost:3000/timeset54_2";

export const fetchTime54_2 = async () => {
  const response = await axios.get(apiUrlTime54_2);
  return response.data;
};

export const createTime54_2 = async (time54_2Data) => {
  const response = await axios.post(apiUrlTime54_2, time54_2Data);
  return response.data;
};
