import axios from "axios";

const jobsApi = axios.create({
  baseURL: "/api/jobs",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// GET ALL JOBS
// PUBLIC / JOB SEEKER
//
// Examples:
// getJobs()
// getJobs("?search=react")
// getJobs("?location=Hyderabad")
// getJobs("?industry=Healthcare")
// =====================================================

export const getJobs = async (queryString = "") => {
  return await jobsApi.get(queryString ? `/${queryString}` : "/");
};

// =====================================================
// GET SINGLE JOB
// =====================================================

export const getJob = async (id) => {
  return await jobsApi.get(`/${id}`);
};

// =====================================================
// CREATE JOB
// RECRUITER / ADMIN
// =====================================================

export const createJob = async (data) => {
  return await jobsApi.post("/", data);
};

// =====================================================
// UPDATE JOB
// RECRUITER / ADMIN
// =====================================================

export const updateJob = async (id, data) => {
  return await jobsApi.put(`/${id}`, data);
};

// =====================================================
// ARCHIVE / DELETE JOB
// RECRUITER / ADMIN
// =====================================================

export const deleteJob = async (id) => {
  return await jobsApi.delete(`/${id}`);
};

// =====================================================
// GET MY JOBS
// RECRUITER
// =====================================================

export const getMyJobs = async () => {
  return await jobsApi.get("/my");
};