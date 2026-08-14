import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getMyApplications,
} from "../../services/applicationService";

import "./MyApplications.css";

function MyApplications() {

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  // =====================================================
  // LOAD APPLICATIONS
  // =====================================================

  useEffect(() => {

    const loadApplications =
      async () => {

        try {

          setLoading(true);
          setError("");

          const response =
            await getMyApplications();

          console.log(
            "MY APPLICATIONS RESPONSE:",
            response.data
          );

          if (
            response.data.success
          ) {

            setApplications(
              response.data.applications ||
              []
            );

          } else {

            setError(
              response.data.message ||
              "Unable to load applications."
            );

          }

        } catch (error) {

          console.error(
            "Load applications error:",
            error
          );

          setError(
            error.response?.data?.message ||
            "Unable to load applications."
          );

        } finally {

          setLoading(false);

        }

      };

    loadApplications();

  }, []);


  // =====================================================
  // COUNTS
  // =====================================================

  const totalApplications =
    applications.length;

  const newApplications =
    applications.filter(
      (application) =>
        application.status === "NEW"
    ).length;

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "SHORTLISTED"
    ).length;

  const rejectedApplications =
    applications.filter(
      (application) =>
        application.status ===
        "REJECTED"
    ).length;


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="applications-page">

        <div className="applications-loading">

          Loading your applications...

        </div>

      </div>
    );

  }


  return (

    <div className="applications-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="applications-header">

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
          className="applications-find-btn"
        >
          Find Jobs →
        </Link>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="applications-error">

          {error}

        </div>

      )}


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="applications-stats">

        <div className="application-stat-card">

          <span>
            ALL APPLICATIONS
          </span>

          <strong>
            {totalApplications}
          </strong>

        </div>


        <div className="application-stat-card">

          <span>
            NEW
          </span>

          <strong>
            {newApplications}
          </strong>

        </div>


        <div className="application-stat-card">

          <span>
            SHORTLISTED
          </span>

          <strong>
            {shortlistedApplications}
          </strong>

        </div>


        <div className="application-stat-card">

          <span>
            REJECTED
          </span>

          <strong>
            {rejectedApplications}
          </strong>

        </div>

      </div>


      {/* =================================================
          APPLICATIONS
      ================================================= */}

      <section className="applications-section">

        <div className="applications-section-header">

          <div>

            <span className="applications-eyebrow">
              YOUR ACTIVITY
            </span>

            <h2>
              Applications
            </h2>

          </div>

        </div>


        {applications.length === 0 ? (

          <div className="applications-empty">

            <div className="empty-icon">
              ✓
            </div>

            <h3>
              No applications yet
            </h3>

            <p>
              You haven't applied to any
              jobs yet. Start exploring
              opportunities that match
              your skills.
            </p>

            <Link
              to="/seeker/jobs"
              className="applications-empty-btn"
            >
              Explore Jobs →
            </Link>

          </div>

        ) : (

          <div className="applications-list">

            {applications.map(
              (application) => (

                <div
                  className="application-card"
                  key={application.id}
                >

                  {/* COMPANY */}

                  <div className="application-company">

                    <div className="application-company-logo">

                      {(
                        application.company_name ||
                        "V"
                      )
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div>

                      <h3>
                        {application.title}
                      </h3>

                      <p>
                        {application.company_name ||
                          "Company"}
                      </p>

                    </div>

                  </div>


                  {/* DETAILS */}

                  <div className="application-details">

                    {application.location && (

                      <span>
                        📍{" "}
                        {application.location}
                      </span>

                    )}

                    {application.employment_type && (

                      <span>
                        {application.employment_type}
                      </span>

                    )}

                    {application.work_mode && (

                      <span>
                        {application.work_mode}
                      </span>

                    )}

                  </div>


                  {/* RIGHT */}

                  <div className="application-right">

                    <span
                      className={`application-status ${String(
                        application.status
                      ).toLowerCase()}`}
                    >
                      {application.status}
                    </span>

                    <span className="application-date">

                      Applied{" "}

                      {application.applied_at
                        ? new Date(
                            application.applied_at
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : ""}

                    </span>

                    <Link
                      to={`/seeker/jobs/${application.job_id}`}
                      className="application-view-btn"
                    >
                      View Job →
                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>

    </div>

  );
}

export default MyApplications;