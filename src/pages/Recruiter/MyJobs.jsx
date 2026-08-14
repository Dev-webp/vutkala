
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Myjob.css";

import {
  getMyJobs,
  updateJob,
  deleteJob,
} from "../../services/jobService";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [actionLoading, setActionLoading] = useState(null);

  // ========================================================
  // JOB FILTER
  // ========================================================

  const [filter, setFilter] = useState("OPEN");

  const filteredJobs = jobs.filter(
    (job) => job.status === filter
  );

  /*
  ========================================================
  LOAD MY JOBS
  ========================================================
  */

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyJobs();

      console.log("My jobs response:", response.data);

      if (response.data.success) {
        setJobs(response.data.jobs || []);
      } else {
        setError(
          response.data.message ||
            "Unable to load jobs."
        );
      }
    } catch (error) {
      console.error(
        "Load my jobs error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  ========================================================
  LOAD WHEN PAGE OPENS
  ========================================================
  */

  useEffect(() => {
    loadJobs();
  }, []);

  /*
  ========================================================
  UPDATE JOB
  ========================================================
  */

  const handleUpdate = async (job) => {
    // Do not allow archived jobs to be updated
    if (job.status !== "OPEN") {
      return;
    }

    try {
      setActionLoading(job.id);

      setError("");

      setMessage("");

      const response = await updateJob(
        job.id,
        {
          title: `${job.title} - Updated`,
        }
      );

      console.log(
        "Update job response:",
        response.data
      );

      if (response.data.success) {
        setMessage(
          "Job updated successfully."
        );

        setJobs((currentJobs) =>
          currentJobs.map((item) =>
            item.id === job.id
              ? {
                  ...item,
                  title:
                    response.data.job.title,
                  updated_at:
                    response.data.job.updated_at,
                }
              : item
          )
        );
      } else {
        setError(
          response.data.message ||
            "Unable to update job."
        );
      }
    } catch (error) {
      console.error(
        "Update job error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update job."
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  ========================================================
  ARCHIVE JOB
  ========================================================
  */

  const handleDelete = async (job) => {
    // Do not allow archived jobs to be archived again
    if (job.status !== "OPEN") {
      return;
    }

    const confirmed = window.confirm(
      `Archive "${job.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(job.id);

      setError("");

      setMessage("");

      const response = await deleteJob(
        job.id
      );

      console.log(
        "Archive job response:",
        response.data
      );

      if (response.data.success) {
        setMessage(
          "Job archived successfully."
        );

        /*
        Move the job to ARCHIVED instead
        of deleting it from the local state.
        */

        setJobs((currentJobs) =>
          currentJobs.map((item) =>
            item.id === job.id
              ? {
                  ...item,
                  status: "ARCHIVED",
                }
              : item
          )
        );
      } else {
        setError(
          response.data.message ||
            "Unable to archive job."
        );
      }
    } catch (error) {
      console.error(
        "Archive job error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to archive job."
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  ========================================================
  LOADING
  ========================================================
  */

  if (loading) {
    return (
      <div className="my-jobs-page">
        <h1>My Jobs</h1>

        <p>
          Loading jobs...
        </p>
      </div>
    );
  }

  /*
  ========================================================
  PAGE
  ========================================================
  */

  return (
    <div className="my-jobs-page">

      <h1>My Jobs</h1>

      <p>
        Manage the jobs posted by your account.
      </p>

      {/* ERROR */}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* SUCCESS */}

      {message && (
        <p className="success">
          {message}
        </p>
      )}

      {/* ==================================================
          JOB FILTER TABS
          ================================================== */}

      <div className="job-filters">

        <button
          type="button"
          onClick={() => setFilter("OPEN")}
          className={
            filter === "OPEN"
              ? "active"
              : ""
          }
        >
          Open Jobs
        </button>

        <button
          type="button"
          onClick={() =>
            setFilter("ARCHIVED")
          }
          className={
            filter === "ARCHIVED"
              ? "active"
              : ""
          }
        >
          Archived Jobs
        </button>

      </div>

      {/* ==================================================
          NO JOBS FOR CURRENT FILTER
          ================================================== */}

      {filteredJobs.length === 0 ? (

        <div>

          <p>
            {filter === "OPEN"
              ? "No open jobs found."
              : "No archived jobs found."}
          </p>

        </div>

      ) : (

        <div className="jobs-list">

          {filteredJobs.map((job) => (

            <div
              className="job-card"
              key={job.id}
            >

              <h2>
                {job.title}
              </h2>

              <p>
                <strong>
                  Company:
                </strong>{" "}

                {job.company_name ||
                  "Not provided"}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}

                {job.location ||
                  "Not provided"}
              </p>

              <p>
                <strong>
                  Employment:
                </strong>{" "}

                {job.employment_type ||
                  "Not provided"}
              </p>

              <p>
                <strong>
                  Experience:
                </strong>{" "}

                {job.experience_required ||
                  "Not provided"}
              </p>

              <p>
                <strong>
                  Salary:
                </strong>{" "}

                {job.salary_min || 0}

                {" - "}

                {job.salary_max || 0}
              </p>

              <p>
                <strong>
                  Skills:
                </strong>{" "}

                {job.skills ||
                  "Not provided"}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}

                {job.status}
              </p>

              {/* ==================================================
                  ACTIONS
                  ================================================== */}

              <div className="job-actions">

                {/* OPEN JOB ACTIONS */}

                {job.status === "OPEN" && (
                  <>

                 {job.status === "OPEN" && (
  <>
    <button
      type="button"
      disabled={actionLoading === job.id}
      onClick={() =>
        navigate(
          `/recruiter/jobs/edit/${job.id}`
        )
      }
    >
      Edit
    </button>

    <button
      type="button"
      disabled={actionLoading === job.id}
      onClick={() =>
        handleDelete(job)
      }
    >
      Archive
    </button>
  </>
)}
                    <button
                      type="button"
                      disabled={
                        actionLoading ===
                        job.id
                      }
                      onClick={() =>
                        handleDelete(job)
                      }
                    >
                      Archive
                    </button>

                  </>
                )}

                {/* ARCHIVED JOB */}

                {job.status === "ARCHIVED" && (
                  <span>
                    Archived
                  </span>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyJobs;

