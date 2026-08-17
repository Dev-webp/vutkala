import axios from "axios";

const API = "/api/hiring-requests";

export const submitHiringRequest = async (data) => {
  return await axios.post(API, data, {
    withCredentials: true,
  });
};