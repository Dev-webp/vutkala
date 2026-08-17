import axios from "axios";

const API = "/api/contact";

export const submitContactForm = async (data) => {
  return await axios.post(API, data, {
    withCredentials: true,
  });
};