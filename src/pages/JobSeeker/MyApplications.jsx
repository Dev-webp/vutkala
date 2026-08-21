import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getMyApplications,
} from "../../services/applicationService";

import "./MyApplications.css";


// =====================================================
// STATUS CONFIG
// =====================================================

const STATUS_CONFIG = {
  NEW: {
    label: "Applied",
    step: 1,
  },

  SHORTLISTED: {
    label: "Shortlisted",
    step: 2,
  },

  INTERVIEW: {
    label: "Interview",
    step: 3,
  },

  SELECTED: {
    label: "Selected",
    step: 4,
  },

  REJECTED: {
    label: "Not Selected",
    step: 0,
  },
};


// =====================================================
// COMPONENT
// =====================================================

function MyApplications() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("ALL");

  const [sortBy, setSortBy] =
    useState("latest");

  const [refreshing, setRefreshing] =
    useState(false);


  // =====================================================
  // LOAD APPLICATIONS
  // =====================================================

  const loadApplications = async (
    showLoader = true
  ) => {

    try {

      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const response =
        await getMyApplications();

      console.log(
        "MY APPLICATIONS RESPONSE:",
        response.data
      );

      if (response.data?.success) {

        setApplications(
          response.data.applications || []
        );

      } else {

        setError(
          response.data?.message ||
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
      setRefreshing(false);

    }

  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadApplications();

  }, []);


  // =====================================================
  // COUNTS
  // =====================================================

  const counts = useMemo(() => {

    return {

      all: applications.length,

      new: applications.filter(
        (application) =>
          application.status === "NEW"
      ).length,

      shortlisted: applications.filter(
        (application) =>
          application.status === "SHORTLISTED"
      ).length,

      interview: applications.filter(
        (application) =>
          application.status === "INTERVIEW"
      ).length,

      selected: applications.filter(
        (application) =>
          application.status === "SELECTED"
      ).length,

      rejected: applications.filter(
        (application) =>
          application.status === "REJECTED"
      ).length,

    };

  }, [applications]);


  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredApplications = useMemo(() => {

    let result = [...applications];


    // ---------------------------------------------------
    // STATUS FILTER
    // ---------------------------------------------------

    if (activeTab !== "ALL") {

      result = result.filter(
        (application) =>
          application.status === activeTab
      );

    }


    // ---------------------------------------------------
    // SEARCH
    // ---------------------------------------------------

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {

      result = result.filter(
        (application) => {

          const title =
            String(
              application.title || ""
            ).toLowerCase();

          const company =
            String(
              application.company_name || ""
            ).toLowerCase();

          const location =
            String(
              application.location || ""
            ).toLowerCase();

          return (
            title.includes(searchValue) ||
            company.includes(searchValue) ||
            location.includes(searchValue)
          );

        }
      );

    }


    // ---------------------------------------------------
    // SORT
    // ---------------------------------------------------

    result.sort((a, b) => {

      const dateA =
        a.applied_at
          ? new Date(a.applied_at).getTime()
          : 0;

      const dateB =
        b.applied_at
          ? new Date(b.applied_at).getTime()
          : 0;

      if (sortBy === "latest") {
        return dateB - dateA;
      }

      if (sortBy === "oldest") {
        return dateA - dateB;
      }

      if (sortBy === "company") {

        return String(
          a.company_name || ""
        ).localeCompare(
          String(
            b.company_name || ""
          )
        );

      }

      return 0;

    });


    return result;

  }, [
    applications,
    activeTab,
    search,
    sortBy,
  ]);


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "";
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
  // SALARY
  // =====================================================

  const getSalary = (application) => {

    if (
      application.salary_min &&
      application.salary_max
    ) {

      return `₹${Number(
        application.salary_min
      ).toLocaleString("en-IN")} - ₹${Number(
        application.salary_max
      ).toLocaleString("en-IN")}`;

    }

    if (application.salary_min) {

      return `₹${Number(
        application.salary_min
      ).toLocaleString("en-IN")}+`;

    }

    return "Salary not disclosed";

  };


  // =====================================================
  // COMPANY INITIAL
  // =====================================================

  const getCompanyInitial = (
    application
  ) => {

    const company =
      application.company_name ||
      "Company";

    return company
      .charAt(0)
      .toUpperCase();

  };


  // =====================================================
  // STATUS
  // =====================================================

  const getStatusConfig = (status) => {

    return (
      STATUS_CONFIG[status] || {
        label: status || "Applied",
        step: 1,
      }
    );

  };


  // =====================================================
  // PROGRESS
  // =====================================================

  const renderProgress = (
    application
  ) => {

    const status =
      application.status;

    if (status === "REJECTED") {

      return (

        <div className="application-progress rejected-progress">

          <div className="application-progress-line">

            <span className="progress-line-active" />

          </div>

          <div className="application-progress-steps">

            <div className="progress-step completed">

              <span>✓</span>

              <small>
                Applied
              </small>

            </div>

            <div className="progress-step rejected">

              <span>×</span>

              <small>
                Not Selected
              </small>

            </div>

          </div>

        </div>

      );

    }


    const currentStep =
      getStatusConfig(status).step;


    const steps = [
      {
        number: 1,
        label: "Applied",
      },
      {
        number: 2,
        label: "Shortlisted",
      },
      {
        number: 3,
        label: "Interview",
      },
      {
        number: 4,
        label: "Selected",
      },
    ];


    return (

      <div className="application-progress">

        <div className="application-progress-line">

          <span
            className="progress-line-active"
            style={{
              width:
                `${Math.max(
                  0,
                  ((currentStep - 1) / 3) * 100
                )}%`,
            }}
          />

        </div>


        <div className="application-progress-steps">

          {steps.map((step) => (

            <div
              key={step.number}
              className={`progress-step ${
                step.number <= currentStep
                  ? "completed"
                  : ""
              } ${
                step.number === currentStep
                  ? "current"
                  : ""
              }`}
            >

              <span>

                {step.number <= currentStep
                  ? "✓"
                  : step.number}

              </span>

              <small>
                {step.label}
              </small>

            </div>

          ))}

        </div>

      </div>

    );

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="applications-page">

        <div className="applications-loading">

          <div className="applications-spinner" />

          <p>
            Loading your applications...
          </p>

        </div>

      </div>

    );

  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <div className="applications-page">


      {/* =================================================
          PAGE HEADER
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
            Track all your job applications
            and hiring progress in one place.
          </p>

        </div>


        <Link
          to="/seeker/jobs"
          className="applications-find-btn"
        >
          Find Jobs
          <span>→</span>
        </Link>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="applications-error">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              loadApplications(false)
            }
          >
            Try Again
          </button>

        </div>

      )}


      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="applications-summary">

        <div className="application-summary-card">

          <span>
            TOTAL APPLICATIONS
          </span>

          <strong>
            {counts.all}
          </strong>

        </div>


        <div className="application-summary-card">

          <span>
            SHORTLISTED
          </span>

          <strong>
            {counts.shortlisted}
          </strong>

        </div>


        <div className="application-summary-card">

          <span>
            INTERVIEWS
          </span>

          <strong>
            {counts.interview}
          </strong>

        </div>


        <div className="application-summary-card">

          <span>
            SELECTED
          </span>

          <strong>
            {counts.selected}
          </strong>

        </div>

      </div>


      {/* =================================================
          APPLICATION CONTENT
      ================================================= */}

      <section className="applications-section">


        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div className="applications-section-header">

          <div>

            <span className="applications-eyebrow">
              APPLICATION ACTIVITY
            </span>

            <h2>
              Your Applications
            </h2>

          </div>


          <button
            type="button"
            className="applications-refresh-btn"
            onClick={() =>
              loadApplications(false)
            }
            disabled={refreshing}
          >

            {refreshing
              ? "Refreshing..."
              : "↻ Refresh"}

          </button>

        </div>


        {/* =================================================
            SEARCH + SORT
        ================================================= */}

        <div className="applications-toolbar">


          <div className="applications-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by job title, company or location"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (

              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>

            )}

          </div>


          <select
            className="applications-sort"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option value="latest">
              Latest Applied
            </option>

            <option value="oldest">
              Oldest Applied
            </option>

            <option value="company">
              Company Name
            </option>

          </select>

        </div>


        {/* =================================================
            STATUS TABS
        ================================================= */}

        <div className="applications-tabs">

          <button
            type="button"
            className={
              activeTab === "ALL"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("ALL")
            }
          >
            All
            <span>
              {counts.all}
            </span>
          </button>


          <button
            type="button"
            className={
              activeTab === "NEW"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("NEW")
            }
          >
            Applied
            <span>
              {counts.new}
            </span>
          </button>


          <button
            type="button"
            className={
              activeTab === "SHORTLISTED"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("SHORTLISTED")
            }
          >
            Shortlisted
            <span>
              {counts.shortlisted}
            </span>
          </button>


          <button
            type="button"
            className={
              activeTab === "INTERVIEW"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("INTERVIEW")
            }
          >
            Interview
            <span>
              {counts.interview}
            </span>
          </button>


          <button
            type="button"
            className={
              activeTab === "SELECTED"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("SELECTED")
            }
          >
            Selected
            <span>
              {counts.selected}
            </span>
          </button>


          <button
            type="button"
            className={
              activeTab === "REJECTED"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("REJECTED")
            }
          >
            Not Selected
            <span>
              {counts.rejected}
            </span>
          </button>

        </div>


        {/* =================================================
            RESULT COUNT
        ================================================= */}

        <div className="applications-result-count">

          Showing{" "}

          <strong>
            {filteredApplications.length}
          </strong>{" "}

          of{" "}

          <strong>
            {applications.length}
          </strong>{" "}

          applications

        </div>


        {/* =================================================
            EMPTY
        ================================================= */}

        {filteredApplications.length === 0 ? (

          <div className="applications-empty">

            <div className="empty-icon">
              🔎
            </div>

            <h3>

              {applications.length === 0
                ? "No applications yet"
                : "No applications found"}

            </h3>

            <p>

              {applications.length === 0
                ? "You haven't applied to any jobs yet. Start exploring opportunities that match your skills."
                : "Try changing your search or status filter."}

            </p>


            {applications.length === 0 ? (

              <Link
                to="/seeker/jobs"
                className="applications-empty-btn"
              >
                Explore Jobs →
              </Link>

            ) : (

              <button
                type="button"
                className="applications-empty-btn"
                onClick={() => {

                  setSearch("");
                  setActiveTab("ALL");

                }}
              >
                Clear Filters
              </button>

            )}

          </div>

        ) : (


          /* =================================================
             APPLICATION LIST
          ================================================= */

          <div className="applications-list">

            {filteredApplications.map(
              (application) => {

                const statusConfig =
                  getStatusConfig(
                    application.status
                  );


                return (

                  <article
                    className="application-card"
                    key={application.id}
                  >


                    {/* =======================================
                        TOP
                    ======================================= */}

                    <div className="application-card-top">


                      {/* COMPANY */}
                      <div className="application-company">

                        <div className="application-company-logo">

                          {getCompanyInitial(
                            application
                          )}

                        </div>


                        <div className="application-company-info">

                          <h3>
                            {application.title ||
                              "Job Position"}
                          </h3>

                          <p>
                            {application.company_name ||
                              "Company"}
                          </p>

                        </div>

                      </div>


                      {/* STATUS */}

                      <span
                        className={`application-status ${String(
                          application.status || ""
                        ).toLowerCase()}`}
                      >
                        {statusConfig.label}
                      </span>

                    </div>


                    {/* =======================================
                        JOB DETAILS
                    ======================================= */}

                    <div className="application-details">


                      {application.location && (

                        <span>
                          📍{" "}
                          {application.location}
                        </span>

                      )}


                      {application.experience_required && (

                        <span>
                          💼{" "}
                          {application.experience_required}
                        </span>

                      )}


                      {application.employment_type && (

                        <span>
                          🏢{" "}
                          {application.employment_type}
                        </span>

                      )}


                      {application.work_mode && (

                        <span>
                          🌐{" "}
                          {application.work_mode}
                        </span>

                      )}


                    </div>


                    {/* =======================================
                        SALARY + DATE
                    ======================================= */}

                    <div className="application-meta">

                      <strong>
                        {getSalary(
                          application
                        )}
                      </strong>

                      <span>
                        Applied{" "}
                        {formatDate(
                          application.applied_at
                        )}
                      </span>

                    </div>


                    {/* =======================================
                        PROGRESS
                    ======================================= */}

                    {renderProgress(
                      application
                    )}


                    {/* =======================================
                        BOTTOM
                    ======================================= */}

                    <div className="application-card-bottom">

                      <span className="application-updated">

                        Last updated{" "}

                        {formatDate(
                          application.updated_at ||
                          application.applied_at
                        )}

                      </span>


                      <Link
                        to={`/seeker/jobs/${application.job_id}`}
                        className="application-view-btn"
                      >
                        View Job
                        <span>→</span>
                      </Link>

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