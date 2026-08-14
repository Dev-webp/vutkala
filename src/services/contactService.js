import axios from "axios";

const API = "http://localhost:5000/api/contact";

export const submitContactForm = async (data) => {
  return await axios.post(API, data);
};