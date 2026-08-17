import axios from "axios";

const API = "/api/admin";

export const getPendingRecruiters = async () => {
  return await axios.get(`${API}/recruiters/pending`, {
    withCredentials: true,
  });
};

export const getRecruiter = async (id) => {
  return await axios.get(`${API}/recruiters/${id}`, {
    withCredentials: true,
  });
};

export const approveRecruiter = async (id) => {
  return await axios.put(
    `${API}/recruiters/${id}/approve`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const rejectRecruiter = async (id) => {
  return await axios.put(
    `${API}/recruiters/${id}/reject`,
    {},
    {
      withCredentials: true,
    }
  );
};