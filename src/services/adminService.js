import axios from "axios";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const adminApi = axios.create({
  baseURL: `${API}/api/admin`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// GET PENDING RECRUITERS
// =====================================================

export const getPendingRecruiters = async () => {
  return await adminApi.get("/recruiters/pending");
};

// =====================================================
// GET RECRUITER
// =====================================================

export const getRecruiter = async (id) => {
  return await adminApi.get(`/recruiters/${id}`);
};

// =====================================================
// APPROVE RECRUITER
// =====================================================

export const approveRecruiter = async (id) => {
  return await adminApi.put(
    `/recruiters/${id}/approve`,
    {}
  );
};

// =====================================================
// REJECT RECRUITER
// =====================================================

export const rejectRecruiter = async (id) => {
  return await adminApi.put(
    `/recruiters/${id}/reject`,
    {}
  );
};