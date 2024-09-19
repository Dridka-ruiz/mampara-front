// api.js
import axios from "axios";

export const apiUrlTimeBuss2 = "http://localhost:3000/timesetBuss2";

export const fetchTimeBuss2 = async () => {
  const response = await axios.get(apiUrlTimeBuss2);
  return response.data;
};

export const createTimeBuss2 = async (timeBuss2Data) => {
  const response = await axios.post(apiUrlTimeBuss2, timeBuss2Data);
  return response.data;
};
