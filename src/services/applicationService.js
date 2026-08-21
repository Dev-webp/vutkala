import axios from "axios";

const applicationsApi = axios.create({
  baseURL: "/api/applications",
  withCredentials: true,
});

// =====================================================
// APPLY FOR JOB
// =====================================================

export const applyForJob = async (data) => {
  const formData = new FormData();

  formData.append("job_id", data.job_id);

  if (data.cover_letter) {
    formData.append("cover_letter", data.cover_letter);
  }

  if (data.resume) {
    formData.append("resume", data.resume);
  }

  return await applicationsApi.post("/", formData);
};

// =====================================================
// GET MY APPLICATIONS
// =====================================================

export const getMyApplications = async () => {
  return await applicationsApi.get("/my");
};

// =====================================================
// GET RECRUITER APPLICATIONS
// =====================================================

export const getRecruiterApplications = async () => {
  return await applicationsApi.get("/recruiter");
};

// =====================================================
// VIEW RESUME
// =====================================================

export const viewResume = async (applicationId) => {
  return await applicationsApi.get(
    `/${applicationId}/resume`,
    {
      responseType: "blob",
    }
  );
};

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  return await applicationsApi.put(
    `/${applicationId}/status`,
    {
      status,
    }
  );
};