import axios from "axios";

const hiringApi = axios.create({
  baseURL: "/api/hiring-requests",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// SUBMIT HIRING REQUEST
// =====================================================

export const submitHiringRequest = async (data) => {
  return await hiringApi.post("/", data);
};