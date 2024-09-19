// api.js
import axios from "axios";

export const apiUrlTime54_4 = "http://localhost:3000/timeset54_4";

export const fetchTime54_4 = async () => {
  const response = await axios.get(apiUrlTime54_4);
  return response.data;
};

export const createTime54_4 = async (time54_2Data) => {
  const response = await axios.post(apiUrlTime54_4, time54_2Data);
  return response.data;
};
