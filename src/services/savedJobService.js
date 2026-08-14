import axios from "axios";

const API =
  "http://localhost:5000/api/saved-jobs";


// =====================================================
// SAVE JOB
// =====================================================

export const saveJob = async (jobId) => {
  return await axios.post(
    API,
    {
      job_id: jobId,
    },
    {
      withCredentials: true,
    }
  );
};


// =====================================================
// REMOVE SAVED JOB
// =====================================================

export const removeSavedJob = async (
  jobId
) => {
  return await axios.delete(
    `${API}/${jobId}`,
    {
      withCredentials: true,
    }
  );
};


// =====================================================
// GET SAVED JOBS
// =====================================================

export const getSavedJobs = async () => {
  return await axios.get(
    API,
    {
      withCredentials: true,
    }
  );
};


// =====================================================
// CHECK SAVED JOB
// =====================================================

export const checkSavedJob = async (
  jobId
) => {
  return await axios.get(
    `${API}/check/${jobId}`,
    {
      withCredentials: true,
    }
  );
};