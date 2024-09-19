// api.js
import axios from "axios";

export const apiUrlTime70_3 = "http://localhost:3000/timeSet70_3";

export const fetchTime70_3 = async () => {
  const response = await axios.get(apiUrlTime70_3);
  return response.data;
};

export const createTime70_3 = async (time70_3Data) => {
  const response = await axios.post(apiUrlTime70_3, time70_3Data);
  return response.data;
};
