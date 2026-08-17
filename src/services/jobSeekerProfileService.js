import axios from "axios";

const API = "/api/job-seeker/profile";

// =====================================================
// GET PROFILE
// =====================================================

export const getMyProfile = async () => {
  return await axios.get(API, {
    withCredentials: true,
  });
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateMyProfile = async (data) => {
  return await axios.put(API, data, {
    withCredentials: true,
  });
};