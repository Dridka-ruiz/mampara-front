// api.js
import axios from "axios";

export const apiUrlTime58 = "http://localhost:3000/timeset58";

export const fetchTime58 = async () => {
  const response = await axios.get(apiUrlTime58);
  return response.data;
};

export const createTime58 = async (time58Data) => {
  const response = await axios.post(apiUrlTime58, time58Data);
  return response.data;
};
