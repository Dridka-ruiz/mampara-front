// api.js
import axios from "axios";

export const apiUrlTime70_1 = "http://localhost:3000/timeSet70_1";

export const fetchTime70_1 = async () => {
  const response = await axios.get(apiUrlTime70_1);
  return response.data;
};

export const createTime70_1 = async (time70_1Data) => {
  const response = await axios.post(apiUrlTime70_1, time70_1Data);
  return response.data;
};
