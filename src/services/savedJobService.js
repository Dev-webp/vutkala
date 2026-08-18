import axios from "axios";

const savedJobsApi = axios.create({
  baseURL: "/api/saved-jobs",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// SAVE JOB
// =====================================================

export const saveJob = async (jobId) => {
  return await savedJobsApi.post("/", {
    job_id: jobId,
  });
};

// =====================================================
// REMOVE SAVED JOB
// =====================================================

export const removeSavedJob = async (jobId) => {
  return await savedJobsApi.delete(`/${jobId}`);
};

// =====================================================
// GET SAVED JOBS
// =====================================================

export const getSavedJobs = async () => {
  return await savedJobsApi.get("/");
};

// =====================================================
// CHECK SAVED JOB
// =====================================================

export const checkSavedJob = async (jobId) => {
  return await savedJobsApi.get(`/check/${jobId}`);
};