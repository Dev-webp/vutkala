
import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getJob } from "../../services/jobService";

import {
  applyForJob,
  getMyApplications,
} from "../../services/applicationService";

import {
  saveJob,
  removeSavedJob,
  checkSavedJob,
} from "../../services/savedJobService";

import { useAuth } from "../../context/AuthContext";

import "./JobDetails.css";


function JobDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();


  // =====================================================
  // JOB STATE
  // =====================================================

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =====================================================
  // APPLICATION STATE
  // =====================================================

  const [alreadyApplied, setAlreadyApplied] =
    useState(false);

  const [checkingApplication, setCheckingApplication] =
    useState(false);

  const [applying, setApplying] =
    useState(false);

  const [applicationMessage, setApplicationMessage] =
    useState("");

  const [applicationError, setApplicationError] =
    useState("");


  // =====================================================
  // SAVED JOB STATE
  // =====================================================

  const [isSaved, setIsSaved] =
    useState(false);

  const [checkingSavedJob, setCheckingSavedJob] =
    useState(false);

  const [savingJob, setSavingJob] =
    useState(false);


  // =====================================================
  // LOAD JOB
  // =====================================================

  useEffect(() => {

    const loadJob = async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await getJob(id);


        if (response.data.success) {

          setJob(
            response.data.job
          );

        } else {

          setError(
            response.data.message ||
              "Unable to load job."
          );

        }

      } catch (error) {

        console.error(
          "Get job details error:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Unable to load job details."
        );

      } finally {

        setLoading(false);

      }

    };


    if (id) {

      loadJob();

    }

  }, [id]);


  // =====================================================
  // CHECK WHETHER USER ALREADY APPLIED
  // =====================================================

  useEffect(() => {

    const checkApplication = async () => {

      try {

        // Only check logged-in Job Seekers

        if (
          !user ||
          user.role !== "JOB_SEEKER"
        ) {

          setAlreadyApplied(false);

          return;

        }


        setCheckingApplication(true);


        const response =
          await getMyApplications();


        if (
          response.data.success
        ) {

          const applications =
            response.data.applications || [];


          const hasApplied =
            applications.some(
              (application) =>
                String(
                  application.job_id
                ) === String(id)
            );


          setAlreadyApplied(
            hasApplied
          );


          // Clear old messages if
          // application already exists

          if (hasApplied) {

            setApplicationError("");

            setApplicationMessage("");

          }

        }

      } catch (error) {

        console.error(
          "Check application error:",
          error
        );

      } finally {

        setCheckingApplication(false);

      }

    };


    if (id) {

      checkApplication();

    }

  }, [id, user]);


  // =====================================================
  // CHECK WHETHER JOB IS SAVED
  // =====================================================

  useEffect(() => {

    const checkSaved = async () => {

      try {

        // Only check logged-in Job Seekers

        if (
          !user ||
          user.role !== "JOB_SEEKER"
        ) {

          setIsSaved(false);

          return;

        }


        setCheckingSavedJob(true);


        const response =
          await checkSavedJob(id);


        if (
          response.data.success
        ) {

          setIsSaved(
            response.data.saved === true
          );

        }

      } catch (error) {

        console.error(
          "Check saved job error:",
          error
        );

        // Don't break the page if
        // saved-job check fails.

        setIsSaved(false);

      } finally {

        setCheckingSavedJob(false);

      }

    };


    if (id) {

      checkSaved();

    }

  }, [id, user]);


  // =====================================================
  // SAVE / REMOVE JOB
  // =====================================================

  const handleSaveJob = async () => {

    try {

      // -------------------------------------------------
      // NOT LOGGED IN
      // -------------------------------------------------

      if (!user) {

        navigate(
          "/login",
          {
            state: {
              from:
                `/seeker/jobs/${id}`,
            },
          }
        );

        return;

      }


      // -------------------------------------------------
      // WRONG ROLE
      // -------------------------------------------------

      if (
        user.role !== "JOB_SEEKER"
      ) {

        return;

      }


      // -------------------------------------------------
      // PREVENT DOUBLE CLICK
      // -------------------------------------------------

      if (savingJob) {

        return;

      }


      setSavingJob(true);


      // -------------------------------------------------
      // REMOVE SAVED JOB
      // -------------------------------------------------

      if (isSaved) {

        await removeSavedJob(id);

        setIsSaved(false);

      }

      // -------------------------------------------------
      // SAVE JOB
      // -------------------------------------------------

      else {

        await saveJob(id);

        setIsSaved(true);

      }

    } catch (error) {

      console.error(
        "Save/remove job error:",
        error
      );


      // Duplicate save

      if (
        error.response?.status === 409
      ) {

        setIsSaved(true);

      }

    } finally {

      setSavingJob(false);

    }

  };


  // =====================================================
  // APPLY FOR JOB
  // =====================================================

  const handleApply = async () => {

    // Prevent duplicate click

    if (
      applying ||
      alreadyApplied
    ) {

      return;

    }


    try {

      setApplying(true);

      setApplicationMessage("");

      setApplicationError("");


      const response =
        await applyForJob({
          job_id: id,
        });


      // -------------------------------------------------
      // SUCCESS
      // -------------------------------------------------

      if (
        response.data.success
      ) {

        setAlreadyApplied(true);

        setApplicationMessage(
          response.data.message ||
            "Application submitted successfully."
        );

        setApplicationError("");

      }

      // -------------------------------------------------
      // API RETURNED FAILURE
      // -------------------------------------------------

      else {

        setApplicationError(
          response.data.message ||
            "Unable to submit application."
        );

      }

    } catch (error) {

      console.error(
        "Apply job error:",
        error
      );


      // -------------------------------------------------
      // DUPLICATE APPLICATION
      // -------------------------------------------------

      if (
        error.response?.status === 409
      ) {

        setAlreadyApplied(true);

        setApplicationMessage("");

        setApplicationError("");

        return;

      }


      // -------------------------------------------------
      // OTHER ERROR
      // -------------------------------------------------

      setApplicationError(
        error.response?.data?.message ||
          "Unable to submit application."
      );

    } finally {

      setApplying(false);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="job-details-state">

        <div className="job-details-state-card">

          <div className="job-details-loader" />

          <h2>
            Loading job details...
          </h2>

          <p>
            Please wait while we load this
            opportunity.
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="job-details-state">

        <div className="job-details-state-card error-state">

          <div className="job-details-state-icon">
            !
          </div>

          <h2>
            Unable to load this job
          </h2>

          <p>
            {error}
          </p>

          <Link
            to="/seeker/jobs"
            className="job-state-back-btn"
          >
            ← Back to Jobs
          </Link>

        </div>

      </div>

    );

  }


  // =====================================================
  // JOB NOT FOUND
  // =====================================================

  if (!job) {

    return (

      <div className="job-details-state">

        <div className="job-details-state-card">

          <div className="job-details-state-icon">
            !
          </div>

          <h2>
            Job not found
          </h2>

          <p>
            This job may have been removed
            or is no longer available.
          </p>

          <Link
            to="/seeker/jobs"
            className="job-state-back-btn"
          >
            ← Back to Jobs
          </Link>

        </div>

      </div>

    );

  }


  // =====================================================
  // COMPANY
  // =====================================================

  const companyName =
    job.company_name ||
    "Vutkala Global";


  const companyInitial =
    companyName
      .charAt(0)
      .toUpperCase();


  // =====================================================
  // SALARY
  // =====================================================

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


  // =====================================================
  // SKILLS
  // =====================================================

  const skills =
    job.skills
      ? job.skills
          .split(",")
          .map(
            (skill) =>
              skill.trim()
          )
          .filter(Boolean)

      : [];


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="job-details-page">

      <div className="job-details-container">


        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/seeker/jobs"
          className="back-to-jobs"
        >
          ← Back to Jobs
        </Link>


        {/* =================================================
            JOB HEADER
        ================================================= */}

        <section className="job-details-header">

          <div className="job-company-logo">
            {companyInitial}
          </div>


          <div className="job-header-content">

            <span className="job-details-eyebrow">
              VUTKAL CAREERS
            </span>


            <h1>
              {job.title}
            </h1>


            <p className="job-company-name">
              {companyName}
            </p>


            <div className="job-header-meta">

              {job.location && (

                <span>
                  📍 {job.location}
                </span>

              )}


              {job.work_mode && (

                <span>
                  {job.work_mode}
                </span>

              )}


              {job.employment_type && (

                <span>
                  {job.employment_type}
                </span>

              )}


              {job.experience_required && (

                <span>
                  {job.experience_required}
                </span>

              )}

            </div>

          </div>

        </section>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="job-details-layout">


          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <main className="job-details-main">


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <section className="job-details-section">

              <div className="details-section-label">
                ABOUT THE ROLE
              </div>


              <h2>
                Job Description
              </h2>


              <div className="job-description">

                {job.description ? (

                  job.description
                    .split("\n")
                    .map(
                      (
                        paragraph,
                        index
                      ) => (

                        <p key={index}>
                          {paragraph}
                        </p>

                      )
                    )

                ) : (

                  <p>
                    No job description has
                    been provided for this
                    position.
                  </p>

                )}

              </div>

            </section>


            {/* =================================================
                SKILLS
            ================================================= */}

            {skills.length > 0 && (

              <section className="job-details-section">

                <div className="details-section-label">
                  REQUIREMENTS
                </div>


                <h2>
                  Required Skills
                </h2>


                <div className="job-detail-skills">

                  {skills.map(
                    (
                      skill,
                      index
                    ) => (

                      <span key={index}>
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </section>

            )}


            {/* =================================================
                JOB INFORMATION
            ================================================= */}

            <section className="job-details-section">

              <div className="details-section-label">
                POSITION DETAILS
              </div>


              <h2>
                Job Information
              </h2>


              <div className="job-information-grid">


                {job.location && (

                  <div className="job-info-item">

                    <span>
                      Location
                    </span>

                    <strong>
                      {job.location}
                    </strong>

                  </div>

                )}


                {job.work_mode && (

                  <div className="job-info-item">

                    <span>
                      Work Mode
                    </span>

                    <strong>
                      {job.work_mode}
                    </strong>

                  </div>

                )}


                {job.employment_type && (

                  <div className="job-info-item">

                    <span>
                      Employment Type
                    </span>

                    <strong>
                      {job.employment_type}
                    </strong>

                  </div>

                )}


                {job.experience_required && (

                  <div className="job-info-item">

                    <span>
                      Experience
                    </span>

                    <strong>
                      {job.experience_required}
                    </strong>

                  </div>

                )}


                {job.industry && (

                  <div className="job-info-item">

                    <span>
                      Industry
                    </span>

                    <strong>
                      {job.industry}
                    </strong>

                  </div>

                )}


                <div className="job-info-item">

                  <span>
                    Salary
                  </span>

                  <strong>
                    {salary}
                  </strong>

                </div>

              </div>

            </section>

          </main>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="job-details-sidebar">


            {/* =================================================
                APPLY CARD
            ================================================= */}

            <div className="apply-card">

              <span className="apply-card-label">
                INTERESTED?
              </span>


              <h2>
                Ready to take the next step?
              </h2>


              <p>
                Apply for this opportunity
                and take your career forward.
              </p>


              {/* =================================================
                  SAVE JOB
              ================================================= */}

              <button
                type="button"
                className={`save-job-btn ${
                  isSaved ? "saved" : ""
                }`}
                onClick={handleSaveJob}
                disabled={
                  savingJob ||
                  checkingSavedJob
                }
              >

                <span className="save-job-icon">

                  {isSaved
                    ? "♥"
                    : "♡"}

                </span>


                <span>

                  {checkingSavedJob
                    ? "Checking..."
                    : savingJob
                      ? "Saving..."
                      : isSaved
                        ? "Saved"
                        : "Save Job"}

                </span>

              </button>


              {/* =================================================
                  ALREADY APPLIED
              ================================================= */}

              {alreadyApplied ? (

                <>

                  <div className="application-success already-applied-message">

                    You have already applied
                    for this job.

                  </div>


                  <button
                    type="button"
                    className="apply-now-btn already-applied"
                    disabled
                  >

                    Applied

                    <span>
                      ✓
                    </span>

                  </button>

                </>

              ) : (

                <>

                  {/* =============================================
                      SUCCESS MESSAGE
                  ============================================= */}

                  {applicationMessage && (

                    <div className="application-success">

                      {applicationMessage}

                    </div>

                  )}


                  {/* =============================================
                      ERROR MESSAGE
                  ============================================= */}

                  {applicationError && (

                    <div className="application-error">

                      {applicationError}

                    </div>

                  )}


                  {/* =============================================
                      APPLY BUTTON
                  ============================================= */}

                  <button
                    type="button"
                    className="apply-now-btn"
                    disabled={
                      applying ||
                      checkingApplication
                    }
                    onClick={() => {


                      // -------------------------------------------
                      // NOT LOGGED IN
                      // -------------------------------------------

                      if (!user) {

                        navigate(
                          "/login",
                          {
                            state: {
                              from:
                                `/seeker/jobs/${id}`,
                            },
                          }
                        );

                        return;

                      }


                      // -------------------------------------------
                      // WRONG ROLE
                      // -------------------------------------------

                      if (
                        user.role !==
                        "JOB_SEEKER"
                      ) {

                        setApplicationError(
                          "Only Job Seekers can apply for jobs."
                        );

                        return;

                      }


                      // -------------------------------------------
                      // APPLY
                      // -------------------------------------------

                      handleApply();

                    }}
                  >

                    {checkingApplication
                      ? "Checking..."
                      : applying
                        ? "Applying..."
                        : "Apply Now"}


                    {!checkingApplication &&
                      !applying && (

                        <span>
                          →
                        </span>

                      )}

                  </button>


                  <div className="apply-note">

                    {!user

                      ? "You must be logged in as a Job Seeker to apply."

                      : "Submit your application for this opportunity."}

                  </div>

                </>

              )}

            </div>


            {/* =================================================
                SALARY
            ================================================= */}

            <div className="salary-card">

              <span>
                COMPENSATION
              </span>


              <strong>
                {salary}
              </strong>


              <small>
                Compensation details provided
                by the employer.
              </small>

            </div>


            {/* =================================================
                QUICK INFORMATION
            ================================================= */}

            <div className="job-sidebar-info">


              <div className="job-sidebar-info-item">

                <span>
                  COMPANY
                </span>

                <strong>
                  {companyName}
                </strong>

              </div>


              {job.industry && (

                <div className="job-sidebar-info-item">

                  <span>
                    INDUSTRY
                  </span>

                  <strong>
                    {job.industry}
                  </strong>

                </div>

              )}


              {job.employment_type && (

                <div className="job-sidebar-info-item">

                  <span>
                    JOB TYPE
                  </span>

                  <strong>
                    {job.employment_type}
                  </strong>

                </div>

              )}

            </div>

          </aside>

        </div>

      </div>

    </div>

  );

}


export default JobDetails;