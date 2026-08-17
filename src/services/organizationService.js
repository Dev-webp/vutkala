import axios from "axios";

const API = "/api/organizations";

export const getMyOrganization = async () => {
  return await axios.get(`${API}/my`, {
    withCredentials: true,
  });
};

export const updateMyOrganization = async (data) => {
  return await axios.put(`${API}/my`, data, {
    withCredentials: true,
  });
};