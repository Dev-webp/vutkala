import axios from "axios";

const API = "/api/jobs";

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
  return await axios.get(`${API}${queryString}`, {
    withCredentials: true,
  });
};

// =====================================================
// GET SINGLE JOB
// =====================================================

export const getJob = async (id) => {
  return await axios.get(`${API}/${id}`, {
    withCredentials: true,
  });
};

// =====================================================
// CREATE JOB
// RECRUITER / ADMIN
// =====================================================

export const createJob = async (data) => {
  return await axios.post(API, data, {
    withCredentials: true,
  });
};

// =====================================================
// UPDATE JOB
// RECRUITER / ADMIN
// =====================================================

export const updateJob = async (id, data) => {
  return await axios.put(`${API}/${id}`, data, {
    withCredentials: true,
  });
};

// =====================================================
// ARCHIVE / DELETE JOB
// RECRUITER / ADMIN
// =====================================================

export const deleteJob = async (id) => {
  return await axios.delete(`${API}/${id}`, {
    withCredentials: true,
  });
};

// =====================================================
// GET MY JOBS
// RECRUITER
// =====================================================

export const getMyJobs = async () => {
  return await axios.get(`${API}/my`, {
    withCredentials: true,
  });
};