// api.js
import axios from "axios";

export const apiUrlTime54_1 = "http://localhost:3000/timeset54_1";

export const fetchTime54_1 = async () => {
  const response = await axios.get(apiUrlTime54_1);
  return response.data;
};

export const createTime54_1 = async (time54_2Data) => {
  const response = await axios.post(apiUrlTime54_1, time54_2Data);
  return response.data;
};
