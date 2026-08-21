import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "../../styles/admin/AdminJobs.css";


// =====================================================
// API
// =====================================================

const adminApi = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});


// =====================================================
// COMPONENT
// =====================================================

export default function AdminJobs() {

  // ---------------------------------------------------
  // JOBS
  // ---------------------------------------------------

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ---------------------------------------------------
  // FILTERS
  // ---------------------------------------------------

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");


  // ---------------------------------------------------
  // SELECTED JOB
  // ---------------------------------------------------

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [company, setCompany] =
    useState(null);

  const [recruiter, setRecruiter] =
    useState(null);


  // ---------------------------------------------------
  // APPLICATIONS
  // ---------------------------------------------------

  const [applications, setApplications] =
    useState([]);

  const [shortlisted, setShortlisted] =
    useState([]);


  // ---------------------------------------------------
  // DETAILS LOADING
  // ---------------------------------------------------

  const [detailsLoading, setDetailsLoading] =
    useState(false);


  // ---------------------------------------------------
  // ACTIVE TAB
  // ---------------------------------------------------

  const [activeTab, setActiveTab] =
    useState("details");


  // ---------------------------------------------------
  // ACTION LOADING
  // ---------------------------------------------------

  const [actionLoading, setActionLoading] =
    useState(false);


  // =====================================================
  // LOAD JOBS
  // =====================================================

  const loadJobs = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await adminApi.get("/jobs");

      if (
        !response.data?.success
      ) {
        throw new Error(
          response.data?.message ||
          "Unable to load jobs."
        );
      }

      setJobs(
        response.data.jobs || []
      );

    } catch (err) {

      console.error(
        "Admin jobs error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load jobs."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadJobs();

  }, []);


  // =====================================================
  // HELPERS
  // =====================================================

  const getJobId = (job) => {

    return (
      job?.id ??
      job?.job_id
    );

  };


  const getJobTitle = (job) => {

    return (
      job?.title ||
      job?.job_title ||
      job?.position ||
      "Untitled Job"
    );

  };


  const getCompanyName = (job) => {

    return (
      job?.company_name ||
      job?.organization_name ||
      job?.company ||
      job?.organization ||
      company?.company_name ||
      company?.name ||
      company?.organization_name ||
      "Company not available"
    );

  };


  const getLocation = (job) => {

    if (job?.location) {
      return job.location;
    }

    const parts = [
      job?.city,
      job?.state,
      job?.country,
    ].filter(Boolean);

    return parts.length
      ? parts.join(", ")
      : "—";
  };


  const getJobType = (job) => {

    return (
      job?.job_type ||
      job?.employment_type ||
      job?.type ||
      "—"
    );

  };


  const getApplicationsCount = (job) => {

    return Number(
      job?.applications_count ??
      job?.application_count ??
      job?.applications ??
      0
    );

  };


  const formatDate = (date) => {

    if (!date) {
      return "—";
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return "—";
    }

    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  const formatDateTime = (date) => {

    if (!date) {
      return "—";
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return "—";
    }

    return parsed.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };


  const formatStatus = (status) => {

    if (!status) {
      return "Unknown";
    }

    return String(status)
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      );

  };


  const getStatusClass = (status) => {

    const value =
      String(status || "")
        .toUpperCase();

    if (
      value === "OPEN" ||
      value === "ACTIVE" ||
      value === "APPROVED" ||
      value === "PUBLISHED"
    ) {
      return "admin-job-status-active";
    }

    if (
      value === "PENDING" ||
      value === "DRAFT"
    ) {
      return "admin-job-status-pending";
    }

    if (
      value === "ARCHIVED" ||
      value === "CLOSED" ||
      value === "REJECTED" ||
      value === "EXPIRED"
    ) {
      return "admin-job-status-closed";
    }

    return "admin-job-status-default";

  };


  // =====================================================
  // OPEN JOB DETAILS
  // =====================================================

  const openJobDetails = async (
    job
  ) => {

    const id =
      getJobId(job);

    if (!id) {
      alert(
        "Job ID is missing."
      );
      return;
    }

    try {

      setDetailsLoading(true);

      setError("");

      setSelectedJob(job);

      setCompany(null);

      setRecruiter(null);

      setApplications([]);

      setShortlisted([]);

      setActiveTab("details");


      // -------------------------------------------------
      // JOB DETAILS
      // -------------------------------------------------

      const detailsResponse =
        await adminApi.get(
          `/jobs/${id}`
        );

      if (
        !detailsResponse.data?.success
      ) {
        throw new Error(
          detailsResponse.data?.message ||
          "Unable to load job details."
        );
      }

      setSelectedJob(
        detailsResponse.data.job ||
        job
      );

      setCompany(
        detailsResponse.data.company ||
        null
      );

      setRecruiter(
        detailsResponse.data.recruiter ||
        null
      );


      // -------------------------------------------------
      // APPLICATIONS
      // -------------------------------------------------

      const applicationsResponse =
        await adminApi.get(
          `/jobs/${id}/applications`
        );

      if (
        applicationsResponse.data?.success
      ) {

        setApplications(
          applicationsResponse.data.applications ||
          []
        );

      }


      // -------------------------------------------------
      // SHORTLISTED
      // -------------------------------------------------

      const shortlistedResponse =
        await adminApi.get(
          `/jobs/${id}/shortlisted`
        );

      if (
        shortlistedResponse.data?.success
      ) {

        setShortlisted(
          shortlistedResponse.data.shortlisted ||
          []
        );

      }

    } catch (err) {

      console.error(
        "Job details error:",
        err
      );

      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load job details."
      );

    } finally {

      setDetailsLoading(false);

    }

  };


  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  const closeDetails = () => {

    setSelectedJob(null);

    setCompany(null);

    setRecruiter(null);

    setApplications([]);

    setShortlisted([]);

  };


  // =====================================================
  // UPDATE JOB STATUS
  // =====================================================

  const updateJobStatus = async (
    newStatus
  ) => {

    if (!selectedJob) {
      return;
    }

    const id =
      getJobId(
        selectedJob
      );

    if (!id) {
      return;
    }

    try {

      setActionLoading(true);

      const response =
        await adminApi.put(
          `/jobs/${id}/status`,
          {
            status: newStatus,
          }
        );

      if (
        !response.data?.success
      ) {
        throw new Error(
          response.data?.message ||
          "Failed to update status."
        );
      }

      const updatedJob =
        response.data.job;

      setSelectedJob(
        updatedJob
      );


      // Update table
      setJobs(
        (previousJobs) =>
          previousJobs.map(
            (job) =>
              getJobId(job) === id
                ? {
                    ...job,
                    ...updatedJob,
                  }
                : job
          )
      );

      alert(
        "Job status updated successfully."
      );

    } catch (err) {

      console.error(
        "Update job status error:",
        err
      );

      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update job status."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // =====================================================
  // ARCHIVE
  // =====================================================

  const archiveJob = async () => {

    if (!selectedJob) {
      return;
    }

    const id =
      getJobId(
        selectedJob
      );

    if (!id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Archive "${getJobTitle(
          selectedJob
        )}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      setActionLoading(true);

      const response =
        await adminApi.put(
          `/jobs/${id}/archive`
        );

      if (
        !response.data?.success
      ) {
        throw new Error(
          response.data?.message ||
          "Failed to archive job."
        );
      }

      const updatedJob =
        response.data.job;

      setSelectedJob(
        updatedJob
      );

      setJobs(
        (previousJobs) =>
          previousJobs.map(
            (job) =>
              getJobId(job) === id
                ? {
                    ...job,
                    ...updatedJob,
                  }
                : job
          )
      );

      alert(
        "Job archived successfully."
      );

    } catch (err) {

      console.error(
        "Archive job error:",
        err
      );

      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to archive job."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // =====================================================
  // RESTORE
  // =====================================================

  const restoreJob = async () => {

    if (!selectedJob) {
      return;
    }

    const id =
      getJobId(
        selectedJob
      );

    if (!id) {
      return;
    }

    try {

      setActionLoading(true);

      const response =
        await adminApi.put(
          `/jobs/${id}/restore`
        );

      if (
        !response.data?.success
      ) {
        throw new Error(
          response.data?.message ||
          "Failed to restore job."
        );
      }

      const updatedJob =
        response.data.job;

      setSelectedJob(
        updatedJob
      );

      setJobs(
        (previousJobs) =>
          previousJobs.map(
            (job) =>
              getJobId(job) === id
                ? {
                    ...job,
                    ...updatedJob,
                  }
                : job
          )
      );

      alert(
        "Job restored successfully."
      );

    } catch (err) {

      console.error(
        "Restore job error:",
        err
      );

      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to restore job."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // =====================================================
  // FILTER
  // =====================================================

  const filteredJobs =
    jobs.filter(
      (job) => {

        const title =
          getJobTitle(job);

        const companyName =
          getCompanyName(job);

        const location =
          getLocation(job);

        const searchText =
          `
          ${title}
          ${companyName}
          ${location}
          `
            .toLowerCase();

        const matchesSearch =
          searchText.includes(
            search.toLowerCase()
          );

        const jobStatus =
          String(
            job.status || ""
          ).toUpperCase();

        const matchesStatus =
          statusFilter === "ALL" ||
          jobStatus ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );


  // =====================================================
  // SUMMARY
  // =====================================================

  const totalApplications =
    jobs.reduce(
      (total, job) =>
        total +
        getApplicationsCount(
          job
        ),
      0
    );


  const activeJobs =
    jobs.filter(
      (job) => {

        const status =
          String(
            job.status || ""
          ).toUpperCase();

        return (
          status === "OPEN" ||
          status === "ACTIVE"
        );

      }
    ).length;


  const archivedJobs =
    jobs.filter(
      (job) =>
        String(
          job.status || ""
        ).toUpperCase() ===
        "ARCHIVED"
    ).length;


  const pendingJobs =
    jobs.filter(
      (job) =>
        String(
          job.status || ""
        ).toUpperCase() ===
        "PENDING"
    ).length;


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="admin-jobs-page">

        <div className="admin-jobs-loading">

          <div className="admin-jobs-spinner" />

          <p>
            Loading jobs...
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
      <div className="admin-jobs-page">

        <div className="admin-jobs-error">

          <div className="admin-jobs-error-icon">
            !
          </div>

          <h2>
            Unable to load jobs
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={loadJobs}
            className="admin-jobs-retry"
          >
            Try Again
          </button>

        </div>

      </div>
    );

  }


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="admin-jobs-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="admin-jobs-header">

        <div className="admin-jobs-header-text">

          <span className="admin-jobs-eyebrow">
            JOB MANAGEMENT
          </span>

          <h2>
            Jobs
          </h2>

          <p>
            View, manage and monitor all
            recruiter and company jobs.
          </p>

        </div>

        <button
          type="button"
          className="admin-jobs-refresh"
          onClick={loadJobs}
        >
          ↻ Refresh
        </button>

      </div>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="admin-jobs-summary">

        <div className="admin-jobs-summary-card">

          <div className="admin-jobs-summary-icon">
            ▤
          </div>

          <div>
            <span>
              Total Jobs
            </span>

            <strong>
              {jobs.length}
            </strong>
          </div>

        </div>


        <div className="admin-jobs-summary-card">

          <div className="admin-jobs-summary-icon active">
            ✓
          </div>

          <div>
            <span>
              Active Jobs
            </span>

            <strong>
              {activeJobs}
            </strong>
          </div>

        </div>


        <div className="admin-jobs-summary-card">

          <div className="admin-jobs-summary-icon pending">
            ◷
          </div>

          <div>
            <span>
              Pending
            </span>

            <strong>
              {pendingJobs}
            </strong>
          </div>

        </div>


        <div className="admin-jobs-summary-card">

          <div className="admin-jobs-summary-icon applications">
            ♙
          </div>

          <div>
            <span>
              Applications
            </span>

            <strong>
              {totalApplications}
            </strong>
          </div>

        </div>


        <div className="admin-jobs-summary-card">

          <div className="admin-jobs-summary-icon">
            ▣
          </div>

          <div>
            <span>
              Archived
            </span>

            <strong>
              {archivedJobs}
            </strong>
          </div>

        </div>

      </div>


      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div className="admin-jobs-toolbar">

        <div className="admin-jobs-search">

          <span className="admin-jobs-search-icon">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search jobs, companies or locations..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

          {search && (
            <button
              type="button"
              className="admin-jobs-search-clear"
              onClick={() =>
                setSearch("")
              }
            >
              ×
            </button>
          )}

        </div>


        <div className="admin-jobs-filter">

          <label htmlFor="job-status">
            Status
          </label>

          <select
            id="job-status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >

            <option value="ALL">
              All Status
            </option>

            <option value="OPEN">
              Open
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="DRAFT">
              Draft
            </option>

            <option value="CLOSED">
              Closed
            </option>

            <option value="REJECTED">
              Rejected
            </option>

            <option value="EXPIRED">
              Expired
            </option>

            <option value="ARCHIVED">
              Archived
            </option>

          </select>

        </div>

      </div>


      {/* =================================================
          RESULT COUNT
      ================================================= */}

      <div className="admin-jobs-result-info">

        Showing{" "}
        <strong>
          {filteredJobs.length}
        </strong>{" "}
        of{" "}
        <strong>
          {jobs.length}
        </strong>{" "}
        jobs

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <div className="admin-jobs-card">

        {filteredJobs.length === 0 ? (

          <div className="admin-jobs-empty">

            <div className="admin-jobs-empty-icon">
              ▤
            </div>

            <h3>
              No jobs found
            </h3>

            <p>
              No jobs match your current
              search or filter.
            </p>

          </div>

        ) : (

          <div className="admin-jobs-table-wrapper">

            <table className="admin-jobs-table">

              <thead>

                <tr>

                  <th>
                    JOB
                  </th>

                  <th>
                    COMPANY
                  </th>

                  <th>
                    LOCATION
                  </th>

                  <th>
                    TYPE
                  </th>

                  <th>
                    APPLICATIONS
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    CREATED
                  </th>

                  <th>
                    ACTION
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredJobs.map(
                  (job) => (

                    <tr
                      key={
                        getJobId(job)
                      }
                    >

                      <td>

                        <div className="admin-job-title-cell">

                          <div className="admin-job-icon">
                            ▤
                          </div>

                          <div>

                            <strong>
                              {getJobTitle(
                                job
                              )}
                            </strong>

                            <span>
                              ID:{" "}
                              {getJobId(
                                job
                              )}
                            </span>

                          </div>

                        </div>

                      </td>


                      <td>

                        <span className="admin-job-company">

                          {getCompanyName(
                            job
                          )}

                        </span>

                      </td>


                      <td>

                        <span className="admin-job-location">

                          {getLocation(
                            job
                          )}

                        </span>

                      </td>


                      <td>

                        <span className="admin-job-type">

                          {getJobType(
                            job
                          )}

                        </span>

                      </td>


                      <td>

                        <span className="admin-job-applications">

                          {getApplicationsCount(
                            job
                          )}

                        </span>

                      </td>


                      <td>

                        <span
                          className={
                            `admin-job-status ${
                              getStatusClass(
                                job.status
                              )
                            }`
                          }
                        >

                          <span className="admin-job-status-dot" />

                          {formatStatus(
                            job.status
                          )}

                        </span>

                      </td>


                      <td>

                        <span className="admin-job-date">

                          {formatDate(
                            job.created_at ||
                            job.createdAt
                          )}

                        </span>

                      </td>


                      <td>

                        <button
                          type="button"
                          className="admin-job-view-button"
                          onClick={() =>
                            openJobDetails(
                              job
                            )
                          }
                        >
                          View Details
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          JOB DETAILS MODAL
      ================================================= */}

      {selectedJob && (

        <div
          className="admin-job-modal-overlay"
          onClick={closeDetails}
        >

          <div
            className="admin-job-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* -------------------------------------------
                MODAL HEADER
            ------------------------------------------- */}

            <div className="admin-job-modal-header">

              <div>

                <span className="admin-jobs-eyebrow">
                  JOB DETAILS
                </span>

                <h2>
                  {getJobTitle(
                    selectedJob
                  )}
                </h2>

                <p>
                  {getCompanyName(
                    selectedJob
                  )}
                </p>

              </div>


              <button
                type="button"
                className="admin-job-modal-close"
                onClick={closeDetails}
              >
                ×
              </button>

            </div>


            {/* -------------------------------------------
                STATUS CONTROL
            ------------------------------------------- */}

            <div className="admin-job-management-bar">

              <div>

                <span>
                  Current Status
                </span>

                <strong
                  className={
                    `admin-job-status ${
                      getStatusClass(
                        selectedJob.status
                      )
                    }`
                  }
                >
                  {formatStatus(
                    selectedJob.status
                  )}
                </strong>

              </div>


              <div className="admin-job-management-actions">

                <select
                  value={
                    String(
                      selectedJob.status ||
                      ""
                    ).toUpperCase()
                  }
                  disabled={
                    actionLoading
                  }
                  onChange={(event) =>
                    updateJobStatus(
                      event.target.value
                    )
                  }
                >

                  <option value="OPEN">
                    Open
                  </option>

                  <option value="ACTIVE">
                    Active
                  </option>

                  <option value="PENDING">
                    Pending
                  </option>

                  <option value="DRAFT">
                    Draft
                  </option>

                  <option value="CLOSED">
                    Closed
                  </option>

                  <option value="REJECTED">
                    Rejected
                  </option>

                  <option value="EXPIRED">
                    Expired
                  </option>

                  <option value="ARCHIVED">
                    Archived
                  </option>

                </select>


                {String(
                  selectedJob.status ||
                  ""
                ).toUpperCase() ===
                "ARCHIVED" ? (

                  <button
                    type="button"
                    disabled={
                      actionLoading
                    }
                    onClick={
                      restoreJob
                    }
                  >
                    Restore Job
                  </button>

                ) : (

                  <button
                    type="button"
                    disabled={
                      actionLoading
                    }
                    onClick={
                      archiveJob
                    }
                  >
                    Archive Job
                  </button>

                )}

              </div>

            </div>


            {/* -------------------------------------------
                STATISTICS
            ------------------------------------------- */}

            <div className="admin-job-statistics">

              <div>

                <span>
                  Applications
                </span>

                <strong>
                  {
                    selectedJob
                      .applications_count ??
                    applications.length
                  }
                </strong>

              </div>


              <div>

                <span>
                  Shortlisted
                </span>

                <strong>
                  {
                    selectedJob
                      .shortlisted_count ??
                    shortlisted.length
                  }
                </strong>

              </div>


              <div>

                <span>
                  Pending
                </span>

                <strong>
                  {
                    selectedJob
                      .pending_applications_count ??
                    applications.filter(
                      (a) =>
                        String(
                          a.status ||
                          ""
                        ).toUpperCase() ===
                        "PENDING"
                    ).length
                  }
                </strong>

              </div>


              <div>

                <span>
                  Rejected
                </span>

                <strong>
                  {
                    selectedJob
                      .rejected_applications_count ??
                    applications.filter(
                      (a) =>
                        String(
                          a.status ||
                          ""
                        ).toUpperCase() ===
                        "REJECTED"
                    ).length
                  }
                </strong>

              </div>


              <div>

                <span>
                  Hired
                </span>

                <strong>
                  {
                    selectedJob
                      .hired_applications_count ??
                    applications.filter(
                      (a) =>
                        String(
                          a.status ||
                          ""
                        ).toUpperCase() ===
                        "HIRED"
                    ).length
                  }
                </strong>

              </div>

            </div>


            {/* -------------------------------------------
                TABS
            ------------------------------------------- */}

            <div className="admin-job-tabs">

              <button
                type="button"
                className={
                  activeTab === "details"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(
                    "details"
                  )
                }
              >
                Job Details
              </button>


              <button
                type="button"
                className={
                  activeTab === "company"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(
                    "company"
                  )
                }
              >
                Company
              </button>


              <button
                type="button"
                className={
                  activeTab === "applications"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(
                    "applications"
                  )
                }
              >
                Applications (
                {
                  applications.length
                }
                )
              </button>


              <button
                type="button"
                className={
                  activeTab === "shortlisted"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(
                    "shortlisted"
                  )
                }
              >
                Shortlisted (
                {
                  shortlisted.length
                }
                )
              </button>

            </div>


            {/* -------------------------------------------
                TAB CONTENT
            ------------------------------------------- */}

            <div className="admin-job-tab-content">

              {detailsLoading ? (

                <div className="admin-job-details-loading">
                  Loading complete job details...
                </div>

              ) : (

                <>

                  {/* =====================================
                      JOB DETAILS
                  ===================================== */}

                  {activeTab ===
                    "details" && (

                    <div className="admin-job-details-grid">

                      {Object.entries(
                        selectedJob
                      ).map(
                        ([key, value]) => {

                          if (
                            [
                              "description",
                              "requirements",
                              "responsibilities",
                              "skills",
                              "id",
                            ].includes(
                              key
                            )
                          ) {
                            return null;
                          }

                          if (
                            value === null ||
                            value === undefined ||
                            value === ""
                          ) {
                            return null;
                          }

                          if (
                            typeof value ===
                            "object"
                          ) {
                            return null;
                          }

                          return (
                            <div
                              className="admin-job-detail-field"
                              key={key}
                            >

                              <span>
                                {key
                                  .replaceAll(
                                    "_",
                                    " "
                                  )
                                  .replace(
                                    /\b\w/g,
                                    (c) =>
                                      c.toUpperCase()
                                  )}
                              </span>

                              <strong>
                                {String(
                                  value
                                )}
                              </strong>

                            </div>
                          );

                        }
                      )}


                      {selectedJob.description && (

                        <div className="admin-job-long-field">

                          <span>
                            Description
                          </span>

                          <p>
                            {
                              selectedJob.description
                            }
                          </p>

                        </div>

                      )}


                      {selectedJob.requirements && (

                        <div className="admin-job-long-field">

                          <span>
                            Requirements
                          </span>

                          <p>
                            {
                              selectedJob.requirements
                            }
                          </p>

                        </div>

                      )}


                      {selectedJob.responsibilities && (

                        <div className="admin-job-long-field">

                          <span>
                            Responsibilities
                          </span>

                          <p>
                            {
                              selectedJob.responsibilities
                            }
                          </p>

                        </div>

                      )}


                      {selectedJob.skills && (

                        <div className="admin-job-long-field">

                          <span>
                            Skills
                          </span>

                          <p>
                            {
                              selectedJob.skills
                            }
                          </p>

                        </div>

                      )}

                    </div>

                  )}


                  {/* =====================================
                      COMPANY
                  ===================================== */}

                  {activeTab ===
                    "company" && (

                    <div>

                      {!company ? (

                        <div className="admin-job-empty-tab">

                          Company information
                          is not available.

                        </div>

                      ) : (

                        <div className="admin-job-details-grid">

                          {Object.entries(
                            company
                          ).map(
                            ([key, value]) => {

                              if (
                                value ===
                                  null ||
                                value ===
                                  undefined ||
                                value === ""
                              ) {
                                return null;
                              }

                              if (
                                typeof value ===
                                "object"
                              ) {
                                return null;
                              }

                              return (
                                <div
                                  className="admin-job-detail-field"
                                  key={key}
                                >

                                  <span>
                                    {key
                                      .replaceAll(
                                        "_",
                                        " "
                                      )
                                      .replace(
                                        /\b\w/g,
                                        (c) =>
                                          c.toUpperCase()
                                      )}
                                  </span>

                                  <strong>
                                    {String(
                                      value
                                    )}
                                  </strong>

                                </div>
                              );

                            }
                          )}

                        </div>

                      )}


                      {recruiter && (

                        <div className="admin-job-recruiter-box">

                          <h3>
                            Posted By
                          </h3>

                          <p>
                            <strong>
                              {
                                recruiter.full_name
                              }
                            </strong>
                          </p>

                          <p>
                            {
                              recruiter.email
                            }
                          </p>

                          <p>
                            {
                              recruiter.phone ||
                              "Phone not available"
                            }
                          </p>

                        </div>

                      )}

                    </div>

                  )}


                  {/* =====================================
                      APPLICATIONS
                  ===================================== */}

                  {activeTab ===
                    "applications" && (

                    <div>

                      {applications.length ===
                      0 ? (

                        <div className="admin-job-empty-tab">

                          No applications
                          received for this
                          job.

                        </div>

                      ) : (

                        <div className="admin-job-applications-list">

                          {applications.map(
                            (application) => (

                              <div
                                className="admin-job-application-card"
                                key={
                                  application.id
                                }
                              >

                                <div>

                                  <strong>
                                    {
                                      application.candidate_name ||
                                      "Unknown Candidate"
                                    }
                                  </strong>

                                  <span>
                                    {
                                      application.candidate_email ||
                                      "No email"
                                    }
                                  </span>

                                  <span>
                                    {
                                      application.candidate_phone ||
                                      "No phone"
                                    }
                                  </span>

                                </div>


                                <div>

                                  <span
                                    className={
                                      `admin-job-status ${
                                        getStatusClass(
                                          application.status
                                        )
                                      }`
                                    }
                                  >
                                    {
                                      formatStatus(
                                        application.status
                                      )
                                    }
                                  </span>

                                  <small>
                                    Applied:{" "}
                                    {
                                      formatDateTime(
                                        application.applied_at
                                      )
                                    }
                                  </small>

                                </div>


                                <div className="admin-job-application-actions">

                                  {application.resume_url && (

                                    <a
                                      href={
                                        application.resume_url
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Resume
                                    </a>

                                  )}

                                  {application.cover_letter && (

                                    <button
                                      type="button"
                                      onClick={() =>
                                        alert(
                                          application.cover_letter
                                        )
                                      }
                                    >
                                      Cover Letter
                                    </button>

                                  )}

                                </div>

                              </div>

                            )
                          )}

                        </div>

                      )}

                    </div>

                  )}


                  {/* =====================================
                      SHORTLISTED
                  ===================================== */}

                  {activeTab ===
                    "shortlisted" && (

                    <div>

                      {shortlisted.length ===
                      0 ? (

                        <div className="admin-job-empty-tab">

                          No candidates have
                          been shortlisted yet.

                        </div>

                      ) : (

                        <div className="admin-job-applications-list">

                          {shortlisted.map(
                            (candidate) => (

                              <div
                                className="admin-job-application-card"
                                key={
                                  candidate.id
                                }
                              >

                                <div>

                                  <strong>
                                    {
                                      candidate.candidate_name
                                    }
                                  </strong>

                                  <span>
                                    {
                                      candidate.candidate_email
                                    }
                                  </span>

                                  <span>
                                    {
                                      candidate.candidate_phone ||
                                      "No phone"
                                    }
                                  </span>

                                </div>


                                <div>

                                  <span className="admin-job-status admin-job-status-active">
                                    Shortlisted
                                  </span>

                                  <small>
                                    Applied:{" "}
                                    {
                                      formatDateTime(
                                        candidate.applied_at
                                      )
                                    }
                                  </small>

                                </div>


                                {candidate.resume_url && (

                                  <a
                                    href={
                                      candidate.resume_url
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Resume
                                  </a>

                                )}

                              </div>

                            )
                          )}

                        </div>

                      )}

                    </div>

                  )}

                </>

              )}

            </div>


            {/* -------------------------------------------
                FOOTER
            ------------------------------------------- */}

            <div className="admin-job-modal-footer">

              <button
                type="button"
                onClick={
                  closeDetails
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}