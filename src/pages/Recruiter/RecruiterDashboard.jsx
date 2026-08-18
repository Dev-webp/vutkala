import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { getMyJobs } from "../../services/jobService";

import {
  getRecruiterApplications,
} from "../../services/applicationService";

import "./RecruiterDashboard.css";


function RecruiterDashboard() {
  // =====================================================
  // STATE
  // =====================================================

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =====================================================
  // LOAD DASHBOARD
  // =====================================================

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        jobsResponse,
        applicationsResponse,
      ] = await Promise.all([
        getMyJobs(),
        getRecruiterApplications(),
      ]);


      // -----------------------------
      // JOBS
      // -----------------------------

      if (jobsResponse.data.success) {
        setJobs(
          jobsResponse.data.jobs || []
        );
      }


      // -----------------------------
      // APPLICATIONS
      // -----------------------------

      if (applicationsResponse.data.success) {
        setApplications(
          applicationsResponse.data.applications || []
        );
      }

    } catch (error) {
      console.error(
        "Recruiter dashboard error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard data."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadDashboard();
  }, []);


  // =====================================================
  // JOB STATISTICS
  // =====================================================

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) =>
      String(job.status).toUpperCase() === "OPEN"
  ).length;


  // =====================================================
  // APPLICATION STATISTICS
  // =====================================================

  const totalApplications =
    applications.length;


  const shortlistedApplications =
    applications.filter(
      (application) =>
        String(application.status).toUpperCase() ===
        "SHORTLISTED"
    ).length;


  const interviewApplications =
    applications.filter(
      (application) =>
        String(application.status).toUpperCase() ===
        "INTERVIEW"
    ).length;


  // =====================================================
  // RECRUITER NAME
  // =====================================================

  const recruiterName =
    jobs[0]?.recruiter_name ||
    "Recruiter";


  // =====================================================
  // RECENT APPLICATIONS
  // =====================================================

  const recentApplications = useMemo(() => {
    return [...applications]
      .sort(
        (a, b) =>
          new Date(b.applied_at) -
          new Date(a.applied_at)
      )
      .slice(0, 5);
  }, [applications]);


  // =====================================================
  // ACTIVE JOBS
  // =====================================================

  const recentActiveJobs = useMemo(() => {
    return jobs
      .filter(
        (job) =>
          String(job.status).toUpperCase() ===
          "OPEN"
      )
      .sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      )
      .slice(0, 5);
  }, [jobs]);


  // =====================================================
  // RECRUITMENT PIPELINE
  // =====================================================

  const pipeline = {
    NEW: applications.filter(
      (application) =>
        String(application.status).toUpperCase() ===
        "NEW"
    ).length,

    SHORTLISTED: applications.filter(
      (application) =>
        String(application.status).toUpperCase() ===
        "SHORTLISTED"
    ).length,

    INTERVIEW: applications.filter(
      (application) =>
        String(application.status).toUpperCase() ===
        "INTERVIEW"
    ).length,

    SELECTED: applications.filter(
      (application) =>
        String(application.status).toUpperCase() ===
        "SELECTED"
    ).length,

    REJECTED: applications.filter(
      (application) =>
        String(application.status).toUpperCase() ===
        "REJECTED"
    ).length,
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // =====================================================
  // INITIALS
  // =====================================================

  const getInitials = (name) => {
    return (name || "Candidate")
      .split(" ")
      .map(
        (word) =>
          word.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };


  // =====================================================
  // PIPELINE MAX
  // =====================================================

  const pipelineMax = Math.max(
    ...Object.values(pipeline),
    1
  );


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="recruiter-dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="dashboard-header">

        <div>

          <span className="dashboard-eyebrow">
            RECRUITER PORTAL
          </span>

          <h1>
            Good morning, {recruiterName} 👋
          </h1>

          <p>
            Here's what's happening with your
            recruitment today.
          </p>

        </div>


        <Link
          to="/recruiter/post-job"
          className="dashboard-primary-button"
        >
          <span>+</span>
          Post a Job
        </Link>

      </section>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}


      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="dashboard-stats">

        {/* ACTIVE JOBS */}

        <div className="stat-card">

          <div className="stat-card-top">

            <span className="stat-label">
              ACTIVE JOBS
            </span>

            <span className="stat-icon">
              JOB
            </span>

          </div>

          <strong className="stat-value">
            {loading ? "..." : activeJobs}
          </strong>

          <span className="stat-description">
            Currently accepting applications
          </span>

        </div>


        {/* APPLICATIONS */}

        <div className="stat-card">

          <div className="stat-card-top">

            <span className="stat-label">
              APPLICATIONS
            </span>

            <span className="stat-icon">
              APP
            </span>

          </div>

          <strong className="stat-value">
            {loading ? "..." : totalApplications}
          </strong>

          <span className="stat-description">
            Applications received
          </span>

        </div>


        {/* SHORTLISTED */}

        <div className="stat-card">

          <div className="stat-card-top">

            <span className="stat-label">
              SHORTLISTED
            </span>

            <span className="stat-icon">
              SEL
            </span>

          </div>

          <strong className="stat-value">
            {loading
              ? "..."
              : shortlistedApplications}
          </strong>

          <span className="stat-description">
            Candidates shortlisted
          </span>

        </div>


        {/* INTERVIEWS */}

        <div className="stat-card">

          <div className="stat-card-top">

            <span className="stat-label">
              INTERVIEWS
            </span>

            <span className="stat-icon">
              INT
            </span>

          </div>

          <strong className="stat-value">
            {loading
              ? "..."
              : interviewApplications}
          </strong>

          <span className="stat-description">
            Candidates in interview stage
          </span>

        </div>

      </section>


      {/* =================================================
          APPLICATION OVERVIEW + QUICK ACTIONS
      ================================================= */}

      <section className="dashboard-overview-grid">

        {/* APPLICATION OVERVIEW */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-eyebrow">
                RECRUITMENT
              </span>

              <h2>
                Application Overview
              </h2>

            </div>

            <span className="panel-total">
              {totalApplications}
              <small>
                Total
              </small>
            </span>

          </div>


          <div className="application-overview">

            <div className="overview-bar">

              <span
                style={{
                  width: `${
                    totalApplications
                      ? (pipeline.NEW /
                          totalApplications) *
                        100
                      : 0
                  }%`,
                }}
              />

            </div>


            <div className="overview-stats">

              <div>
                <strong>
                  {pipeline.NEW}
                </strong>

                <span>
                  New
                </span>
              </div>


              <div>
                <strong>
                  {pipeline.SHORTLISTED}
                </strong>

                <span>
                  Shortlisted
                </span>
              </div>


              <div>
                <strong>
                  {pipeline.INTERVIEW}
                </strong>

                <span>
                  Interview
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-eyebrow">
                ACTIONS
              </span>

              <h2>
                Quick Actions
              </h2>

            </div>

          </div>


          <div className="quick-actions">

            <Link
              to="/recruiter/post-job"
              className="quick-action-item"
            >

              <div className="quick-action-icon">
                +
              </div>

              <div>

                <h3>
                  Post New Job
                </h3>

                <p>
                  Create a new opportunity
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/recruiter/applications"
              className="quick-action-item"
            >

              <div className="quick-action-icon">
                APP
              </div>

              <div>

                <h3>
                  View Applications
                </h3>

                <p>
                  Review candidates
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/recruiter/my-jobs"
              className="quick-action-item"
            >

              <div className="quick-action-icon">
                JOB
              </div>

              <div>

                <h3>
                  Manage My Jobs
                </h3>

                <p>
                  Manage your job posts
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/recruiter/company-profile"
              className="quick-action-item"
            >

              <div className="quick-action-icon">
                CO
              </div>

              <div>

                <h3>
                  Company Profile
                </h3>

                <p>
                  Update company details
                </p>

              </div>

              <span>
                →
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* =================================================
          RECENT APPLICATIONS
      ================================================= */}

      <section className="dashboard-section">

        <div className="section-heading recent-heading">

          <div>

            <span className="section-eyebrow">
              CANDIDATES
            </span>

            <h2>
              Recent Applications
            </h2>

          </div>

          <Link
            to="/recruiter/applications"
            className="view-all-link"
          >
            View All →
          </Link>

        </div>


        <div className="recent-applications">

          {loading ? (

            <div className="dashboard-loading">
              Loading applications...
            </div>

          ) : recentApplications.length === 0 ? (

            <div className="dashboard-empty">

              <div className="empty-icon">
                +
              </div>

              <h3>
                No applications yet
              </h3>

              <p>
                Applications from candidates
                will appear here.
              </p>

            </div>

          ) : (

            <>

              <div className="applications-table-header">

                <span>
                  CANDIDATE
                </span>

                <span>
                  POSITION
                </span>

                <span>
                  APPLIED
                </span>

                <span>
                  STATUS
                </span>

                <span>
                  ACTION
                </span>

              </div>


              {recentApplications.map(
                (application) => (

                  <div
                    className="dashboard-application-row"
                    key={application.id}
                  >

                    {/* CANDIDATE */}

                    <div className="dashboard-candidate">

                      <div className="candidate-avatar">

                        {getInitials(
                          application.candidate_name
                        )}

                      </div>

                      <div>

                        <h3>
                          {application.candidate_name ||
                            "Unknown Candidate"}
                        </h3>

                        <p>
                          {application.candidate_email ||
                            "No email"}
                        </p>

                      </div>

                    </div>


                    {/* POSITION */}

                    <div className="dashboard-position">

                      {application.job_title ||
                        "Unknown Position"}

                    </div>


                    {/* DATE */}

                    <div className="dashboard-date">

                      {formatDate(
                        application.applied_at
                      )}

                    </div>


                    {/* STATUS */}

                    <div>

                      <span
                        className={`application-status ${
                          String(
                            application.status ||
                              "NEW"
                          ).toLowerCase()
                        }`}
                      >
                        {String(
                          application.status ||
                            "NEW"
                        ).replace(
                          "_",
                          " "
                        )}
                      </span>

                    </div>


                    {/* ACTION */}

                    <Link
                      to="/recruiter/applications"
                      className="dashboard-view-link"
                    >
                      View
                    </Link>

                  </div>

                )
              )}

            </>

          )}

        </div>

      </section>


      {/* =================================================
          ACTIVE JOBS + PIPELINE
      ================================================= */}

      <section className="dashboard-bottom-grid">

        {/* =================================================
            MY ACTIVE JOBS
        ================================================= */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-eyebrow">
                YOUR JOB POSTS
              </span>

              <h2>
                My Active Jobs
              </h2>

            </div>

            <Link
              to="/recruiter/my-jobs"
              className="view-all-link"
            >
              View All →
            </Link>

          </div>


          {loading ? (

            <div className="dashboard-loading">
              Loading jobs...
            </div>

          ) : recentActiveJobs.length === 0 ? (

            <div className="mini-empty">

              <p>
                No active jobs currently.
              </p>

              <Link
                to="/recruiter/post-job"
              >
                Post a Job →
              </Link>

            </div>

          ) : (

            <div className="active-jobs-list">

              {recentActiveJobs.map(
                (job) => {

                  const jobApplications =
                    applications.filter(
                      (application) =>
                        application.job_id ===
                        job.id
                    ).length;

                  return (

                    <div
                      className="active-job-row"
                      key={job.id}
                    >

                      <div className="active-job-icon">

                        {job.title
                          ?.charAt(0)
                          .toUpperCase() || "J"}

                      </div>

                      <div className="active-job-info">

                        <h3>
                          {job.title}
                        </h3>

                        <p>
                          {job.location ||
                            "Location not provided"}
                        </p>

                      </div>

                      <div className="active-job-applications">

                        <strong>
                          {jobApplications}
                        </strong>

                        <span>
                          applicants
                        </span>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>


        {/* =================================================
            RECRUITMENT PIPELINE
        ================================================= */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <span className="section-eyebrow">
                HIRING PIPELINE
              </span>

              <h2>
                Recruitment Pipeline
              </h2>

            </div>

          </div>


          <div className="pipeline-list">

            {[
              ["NEW", "New"],
              [
                "SHORTLISTED",
                "Shortlisted",
              ],
              [
                "INTERVIEW",
                "Interview",
              ],
              [
                "SELECTED",
                "Selected",
              ],
              [
                "REJECTED",
                "Rejected",
              ],
            ].map(
              ([key, label]) => (

                <div
                  className="pipeline-row"
                  key={key}
                >

                  <div className="pipeline-label">

                    <span>
                      {label}
                    </span>

                    <strong>
                      {pipeline[key]}
                    </strong>

                  </div>


                  <div className="pipeline-track">

                    <span
                      style={{
                        width: `${
                          (pipeline[key] /
                            pipelineMax) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

    </div>
  );
}


export default RecruiterDashboard;