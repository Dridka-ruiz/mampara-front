// api.js
import axios from "axios";

export const apiUrlTime40 = "http://localhost:3000/timeset40";

export const fetchTime40 = async () => {
  const response = await axios.get(apiUrlTime40);
  return response.data;
};

export const createTime40 = async (time40Data) => {
  const response = await axios.post(apiUrlTime40, time40Data);
  return response.data;
};
