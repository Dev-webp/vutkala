import axios from "axios";

const profileApi = axios.create({
  baseURL: "/api/job-seeker/profile",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// GET MY PROFILE
// =====================================================

export const getMyProfile = async () => {
  return await profileApi.get("/");
};

// =====================================================
// UPDATE MY PROFILE
// =====================================================

export const updateMyProfile = async (data) => {
  return await profileApi.put("/", data);
};