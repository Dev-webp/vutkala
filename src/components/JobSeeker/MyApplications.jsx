import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      // API will be connected when the application backend is created.
      setApplications([]);
    } catch (error) {
      console.error(
        "Load applications error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    return (
      status || "NEW"
    ).toLowerCase();
  };

  return (
    <div className="my-applications-page">

      {/* HEADER */}

      <section className="applications-header">

        <div>
          <span className="applications-eyebrow">
            JOB SEEKER
          </span>

          <h1>
            My Applications
          </h1>

          <p>
            Track your applications and
            follow your hiring journey.
          </p>
        </div>

        <Link
          to="/seeker/jobs"
          className="find-jobs-button"
        >
          Find Jobs →
        </Link>

      </section>


      {/* STATISTICS */}

      <section className="application-stats">

        <div className="application-stat-card">
          <span>ALL APPLICATIONS</span>

          <strong>
            {applications.length}
          </strong>
        </div>

        <div className="application-stat-card">
          <span>NEW</span>

          <strong>
            {
              applications.filter(
                (app) =>
                  app.status === "NEW"
              ).length
            }
          </strong>
        </div>

        <div className="application-stat-card">
          <span>SHORTLISTED</span>

          <strong>
            {
              applications.filter(
                (app) =>
                  app.status ===
                  "SHORTLISTED"
              ).length
            }
          </strong>
        </div>

        <div className="application-stat-card">
          <span>REJECTED</span>

          <strong>
            {
              applications.filter(
                (app) =>
                  app.status ===
                  "REJECTED"
              ).length
            }
          </strong>
        </div>

      </section>


      {/* APPLICATIONS */}

      <section className="applications-section">

        <div className="applications-section-header">

          <div>
            <span>
              YOUR ACTIVITY
            </span>

            <h2>
              Applications
            </h2>
          </div>

        </div>


        {loading ? (

          <div className="applications-loading">
            Loading applications...
          </div>

        ) : applications.length === 0 ? (

          <div className="applications-empty">

            <div className="empty-application-icon">
              ✓
            </div>

            <h3>
              No applications yet
            </h3>

            <p>
              You haven't applied to any jobs.
              Start exploring opportunities
              that match your skills.
            </p>

            <Link
              to="/seeker/jobs"
              className="empty-find-jobs"
            >
              Explore Jobs →
            </Link>

          </div>

        ) : (

          <div className="applications-list">

            {applications.map(
              (application) => {

                const job =
                  application.job || {};

                return (
                  <article
                    className="application-card"
                    key={application.id}
                  >

                    <div className="application-company-logo">
                      {job.company_name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "V"}
                    </div>


                    <div className="application-main">

                      <div className="application-title-row">

                        <div>

                          <h3>
                            {job.title ||
                              "Job Opportunity"}
                          </h3>

                          <p>
                            {job.company_name ||
                              "Vutkal Global"}
                          </p>

                        </div>

                        <span
                          className={`application-status ${getStatusClass(
                            application.status
                          )}`}
                        >
                          {application.status ||
                            "NEW"}
                        </span>

                      </div>


                      <div className="application-meta">

                        {job.location && (
                          <span>
                            📍{" "}
                            {job.location}
                          </span>
                        )}

                        {job.employment_type && (
                          <span>
                            {
                              job.employment_type
                            }
                          </span>
                        )}

                        {job.work_mode && (
                          <span>
                            {job.work_mode}
                          </span>
                        )}

                      </div>


                      <div className="application-footer">

                        <span>
                          Applied{" "}
                          {application.applied_at
                            ? new Date(
                                application.applied_at
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "Recently"}
                        </span>

                        {job.id && (
                          <Link
                            to={`/seeker/jobs/${job.id}`}
                          >
                            View Job →
                          </Link>
                        )}

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        )}

      </section>

    </div>
  );
}

export default MyApplications;