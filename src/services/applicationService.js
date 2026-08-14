import axios from "axios";

const API =
  "http://localhost:5000/api/applications";

// =====================================================
// APPLY FOR JOB
// =====================================================

export const applyForJob = async (data) => {
  return await axios.post(
    API,
    data,
    {
      withCredentials: true,
    }
  );
};


// =====================================================
// GET MY APPLICATIONS
// =====================================================

export const getMyApplications =
  async () => {
    return await axios.get(
      `${API}/my`,
      {
        withCredentials: true,
      }
    );
  };