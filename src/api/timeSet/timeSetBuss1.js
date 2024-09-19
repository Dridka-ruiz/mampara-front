// api.js
import axios from "axios";

export const apiUrlTimeBuss1 = "http://localhost:3000/timesetBuss1";

export const fetchTimeBuss1 = async () => {
  const response = await axios.get(apiUrlTimeBuss1);
  return response.data;
};

export const createTimeBuss1 = async (timeBuss1Data) => {
  const response = await axios.post(apiUrlTimeBuss1, timeBuss1Data);
  return response.data;
};
