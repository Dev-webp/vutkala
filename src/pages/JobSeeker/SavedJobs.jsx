import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getSavedJobs,
  removeSavedJob,
} from "../../services/savedJobService";

import "./SavedJobs.css";

function SavedJobs() {

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [removingId, setRemovingId] =
    useState(null);


  // =====================================================
  // LOAD SAVED JOBS
  // =====================================================

  useEffect(() => {

    const loadSavedJobs = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await getSavedJobs();

        console.log(
          "Saved jobs response:",
          response.data
        );

        if (response.data.success) {

          setSavedJobs(
            response.data.savedJobs || []
          );

        } else {

          setError(
            response.data.message ||
            "Unable to load saved jobs."
          );

        }

      } catch (error) {

        console.error(
          "Load saved jobs error:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Unable to load saved jobs."
        );

      } finally {

        setLoading(false);

      }

    };

    loadSavedJobs();

  }, []);


  // =====================================================
  // REMOVE SAVED JOB
  // =====================================================

  const handleRemove = async (jobId) => {

    try {

      setRemovingId(jobId);

      await removeSavedJob(jobId);

      setSavedJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job.id !== jobId
        )
      );

    } catch (error) {

      console.error(
        "Remove saved job error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to remove saved job."
      );

    } finally {

      setRemovingId(null);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="saved-jobs-page">

        <div className="saved-jobs-loading">

          <div className="saved-jobs-spinner" />

          <p>
            Loading your saved jobs...
          </p>

        </div>

      </div>

    );

  }


  return (

    <div className="saved-jobs-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="saved-jobs-header">

        <div>

          <span className="saved-jobs-eyebrow">
            JOB SEEKER
          </span>

          <h1>
            Saved Jobs
          </h1>

          <p>
            Keep track of opportunities
            you want to explore later.
          </p>

        </div>


        <Link
          to="/seeker/jobs"
          className="saved-jobs-find-btn"
        >
          Find Jobs →
        </Link>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="saved-jobs-error">
          {error}
        </div>

      )}


      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="saved-jobs-summary">

        <div className="saved-summary-card">

          <span>
            SAVED JOBS
          </span>

          <strong>
            {savedJobs.length}
          </strong>

        </div>

        <div className="saved-summary-text">

          {savedJobs.length === 1
            ? "1 opportunity saved for later."
            : `${savedJobs.length} opportunities saved for later.`}

        </div>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="saved-jobs-section">

        <div className="saved-jobs-section-header">

          <div>

            <span className="saved-jobs-eyebrow">
              YOUR COLLECTION
            </span>

            <h2>
              Jobs You've Saved
            </h2>

          </div>

        </div>


        {/* =================================================
            EMPTY
        ================================================= */}

        {savedJobs.length === 0 ? (

          <div className="saved-jobs-empty">

            <div className="saved-empty-icon">
              ♡
            </div>

            <h3>
              No saved jobs yet
            </h3>

            <p>
              Save jobs that interest you
              and come back to them later.
            </p>

            <Link
              to="/seeker/jobs"
              className="saved-empty-btn"
            >
              Explore Jobs →
            </Link>

          </div>

        ) : (

          /* =================================================
             SAVED JOB LIST
          ================================================= */

          <div className="saved-jobs-list">

            {savedJobs.map((job) => {

              const companyName =
                job.company_name ||
                "Vutkal Global";

              const companyInitial =
                companyName
                  .charAt(0)
                  .toUpperCase();

              const salary =
                job.salary_min &&
                job.salary_max
                  ? `₹${Number(
                      job.salary_min
                    ).toLocaleString(
                      "en-IN"
                    )} - ₹${Number(
                      job.salary_max
                    ).toLocaleString(
                      "en-IN"
                    )}`
                  : "Salary not disclosed";


              return (

                <article
                  className="saved-job-card"
                  key={job.saved_job_id}
                >

                  {/* =================================================
                      COMPANY
                  ================================================= */}

                  <div className="saved-job-company">

                    <div className="saved-job-logo">

                      {companyInitial}

                    </div>

                    <div className="saved-job-company-info">

                      <h3>
                        {job.title}
                      </h3>

                      <p>
                        {companyName}
                      </p>

                    </div>

                  </div>


                  {/* =================================================
                      JOB META
                  ================================================= */}

                  <div className="saved-job-meta">

                    {job.location && (

                      <span>
                        📍 {job.location}
                      </span>

                    )}

                    {job.employment_type && (

                      <span>
                        {job.employment_type}
                      </span>

                    )}

                    {job.work_mode && (

                      <span>
                        {job.work_mode}
                      </span>

                    )}

                    {job.experience_required && (

                      <span>
                        {job.experience_required}
                        {" "}
                        years
                      </span>

                    )}

                  </div>


                  {/* =================================================
                      BOTTOM
                  ================================================= */}

                  <div className="saved-job-bottom">

                    <div className="saved-job-info">

                      <strong>
                        {salary}
                      </strong>

                      <span>
                        Saved{" "}

                        {job.saved_at
                          ? new Date(
                              job.saved_at
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : ""}
                      </span>

                    </div>


                    <div className="saved-job-actions">

                      <Link
                        to={`/seeker/jobs/${job.id}`}
                        className="saved-view-btn"
                      >
                        View Job →
                      </Link>


                      <button
                        type="button"
                        className="saved-remove-btn"
                        disabled={
                          removingId === job.id
                        }
                        onClick={() =>
                          handleRemove(
                            job.id
                          )
                        }
                      >

                        {removingId === job.id
                          ? "Removing..."
                          : "Remove"}

                      </button>

                    </div>

                  </div>

                </article>

              );

            })}

          </div>

        )}

      </section>

    </div>

  );
}

export default SavedJobs;