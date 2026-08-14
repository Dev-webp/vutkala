import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyJobs } from "../../services/jobService";

import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyJobs();

      if (response.data.success) {
        setJobs(response.data.jobs || []);
      } else {
        setError(
          response.data.message ||
            "Unable to load dashboard data."
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

  const openJobs = jobs.filter(
    (job) => job.status === "OPEN"
  ).length;

  const archivedJobs = jobs.filter(
    (job) => job.status === "ARCHIVED"
  ).length;

  // =====================================================
  // RECENT JOBS
  // =====================================================

  const recentJobs = [...jobs]
    .sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    )
    .slice(0, 5);

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
            Recruiter Dashboard
          </h1>

          <p>
            Manage your jobs, recruitment activities
            and hiring pipeline from one place.
          </p>
        </div>

        <Link
          to="/recruiter/post-job"
          className="dashboard-primary-button"
        >
          <span>+</span>
          Post New Job
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

        <div className="stat-card">

          <div className="stat-card-top">
            <span className="stat-label">
              Total Jobs
            </span>

            <span className="stat-icon">
              JOB
            </span>
          </div>

          <strong className="stat-value">
            {loading ? "..." : totalJobs}
          </strong>

          <span className="stat-description">
            All jobs posted by you
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-card-top">
            <span className="stat-label">
              Open Jobs
            </span>

            <span className="stat-icon">
              OPEN
            </span>
          </div>

          <strong className="stat-value">
            {loading ? "..." : openJobs}
          </strong>

          <span className="stat-description">
            Currently accepting applications
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-card-top">
            <span className="stat-label">
              Archived Jobs
            </span>

            <span className="stat-icon">
              ARC
            </span>
          </div>

          <strong className="stat-value">
            {loading ? "..." : archivedJobs}
          </strong>

          <span className="stat-description">
            Jobs no longer active
          </span>

        </div>

      </section>


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              GET STARTED
            </span>

            <h2>
              Quick Actions
            </h2>
          </div>

        </div>


        <div className="quick-actions">

          <Link
            to="/recruiter/post-job"
            className="quick-action-card primary"
          >

            <div className="quick-action-icon">
              +
            </div>

            <div>
              <h3>
                Post a Job
              </h3>

              <p>
                Create a new job opportunity and
                start attracting candidates.
              </p>
            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </Link>


          <Link
            to="/recruiter/my-jobs"
            className="quick-action-card"
          >

            <div className="quick-action-icon">
              JOB
            </div>

            <div>
              <h3>
                Manage My Jobs
              </h3>

              <p>
                View, update and archive your
                existing job posts.
              </p>
            </div>

            <span className="quick-action-arrow">
              →
            </span>

          </Link>

        </div>

      </section>


      {/* =================================================
          RECENT JOBS
      ================================================= */}

      <section className="dashboard-section recent-jobs-section">

        <div className="section-heading recent-heading">

          <div>
            <span className="section-eyebrow">
              YOUR JOB POSTS
            </span>

            <h2>
              Recent Jobs
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
            Loading your jobs...
          </div>

        ) : recentJobs.length === 0 ? (

          <div className="dashboard-empty">

            <div className="empty-icon">
              +
            </div>

            <h3>
              No jobs posted yet
            </h3>

            <p>
              Create your first job post to start
              attracting candidates.
            </p>

            <Link
              to="/recruiter/post-job"
              className="empty-action"
            >
              Post Your First Job
            </Link>

          </div>

        ) : (

          <div className="recent-jobs-list">

            {recentJobs.map((job) => (

              <div
                className="recent-job-row"
                key={job.id}
              >

                <div className="recent-job-main">

                  <div className="job-title-icon">
                    {job.title
                      ?.charAt(0)
                      .toUpperCase() || "J"}
                  </div>

                  <div>

                    <h3>
                      {job.title}
                    </h3>

                    <p>
                      {job.location ||
                        "Location not provided"}
                    </p>

                  </div>

                </div>


                <div className="recent-job-details">

                  <span>
                    {job.employment_type ||
                      "Not specified"}
                  </span>

                  <span>
                    {job.experience_required
                      ? `${job.experience_required} years`
                      : "Experience not specified"}
                  </span>

                </div>


                <span
                  className={`job-status ${String(
                    job.status
                  ).toLowerCase()}`}
                >
                  {job.status}
                </span>


                <Link
                  to={`/recruiter/jobs/edit/${job.id}`}
                  className="job-view-link"
                >
                  Edit
                </Link>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default RecruiterDashboard;