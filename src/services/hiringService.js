import axios from "axios";

const API =
  "http://localhost:5000/api/hiring-requests";

export const submitHiringRequest = async (
  data
) => {
  return await axios.post(API, data, {
    withCredentials: true,
  });
};