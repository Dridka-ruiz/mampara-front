// api.js
import axios from "axios";

export const apiUrlTime70_2 = "http://localhost:3000/timeSet70_2";

export const fetchTime70_2 = async () => {
  const response = await axios.get(apiUrlTime70_2);
  return response.data;
};

export const createTime70_2 = async (timeBuss1Data) => {
  const response = await axios.post(apiUrlTime70_2, timeBuss1Data);
  return response.data;
};
