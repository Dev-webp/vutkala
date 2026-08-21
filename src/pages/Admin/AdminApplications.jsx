import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import "./AdminApplications.css";


/* =========================================================
   API
========================================================= */

const applicationsApi = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});


/* =========================================================
   ADMIN APPLICATIONS
========================================================= */

function AdminApplications() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [companyFilter, setCompanyFilter] =
    useState("ALL");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [statusLoading, setStatusLoading] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);


  /* =======================================================
     LOAD APPLICATIONS
  ======================================================= */

  const loadApplications = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await applicationsApi.get(
          "/applications"
        );

      if (
        response.data?.success
      ) {

        setApplications(
          Array.isArray(
            response.data.applications
          )
            ? response.data.applications
            : []
        );

      } else {

        setError(
          response.data?.message ||
            "Unable to load applications."
        );

      }

    } catch (err) {

      console.error(
        "Admin applications error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load applications."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    loadApplications();

  }, []);


  /* =======================================================
     GET STATUS
  ======================================================= */

  const getStatus = (application) => {

    return String(
      application.status ||
        "PENDING"
    ).toUpperCase();

  };


  /* =======================================================
     GET CANDIDATE NAME
  ======================================================= */

  const getCandidateName =
    (application) => {

      return (
        application.candidate_name ||
        application.full_name ||
        application.candidate?.full_name ||
        "Unknown Candidate"
      );

    };


  /* =======================================================
     GET CANDIDATE EMAIL
  ======================================================= */

  const getCandidateEmail =
    (application) => {

      return (
        application.candidate_email ||
        application.email ||
        application.candidate?.email ||
        "No email"
      );

    };


  /* =======================================================
     GET JOB TITLE
  ======================================================= */

  const getJobTitle =
    (application) => {

      return (
        application.job_title ||
        application.job?.title ||
        "Unknown Job"
      );

    };


  /* =======================================================
     GET COMPANY
  ======================================================= */

  const getCompanyName =
    (application) => {

      return (
        application.company_name ||
        application.company?.company_name ||
        application.organization_name ||
        "Unknown Company"
      );

    };


  /* =======================================================
     GET LOCATION
  ======================================================= */

  const getLocation =
    (application) => {

      return (
        application.job_location ||
        application.location ||
        application.job?.location ||
        "Location not provided"
      );

    };


  /* =======================================================
     GET DATE
  ======================================================= */

  const formatDate =
    (value) => {

      if (!value) {
        return "—";
      }

      try {

        return new Date(
          value
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );

      } catch {
        return "—";
      }

    };


  /* =======================================================
     COMPANY OPTIONS
  ======================================================= */

  const companies =
    useMemo(() => {

      const values =
        applications
          .map(
            (application) =>
              getCompanyName(
                application
              )
          )
          .filter(Boolean);

      return [
        ...new Set(values),
      ].sort();

    }, [applications]);


  /* =======================================================
     FILTERED APPLICATIONS
  ======================================================= */

  const filteredApplications =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();

      return applications.filter(
        (application) => {

          const candidateName =
            getCandidateName(
              application
            ).toLowerCase();

          const email =
            getCandidateEmail(
              application
            ).toLowerCase();

          const job =
            getJobTitle(
              application
            ).toLowerCase();

          const company =
            getCompanyName(
              application
            ).toLowerCase();

          const location =
            getLocation(
              application
            ).toLowerCase();

          const status =
            getStatus(
              application
            );


          const matchesSearch =
            !searchValue ||
            candidateName.includes(
              searchValue
            ) ||
            email.includes(
              searchValue
            ) ||
            job.includes(
              searchValue
            ) ||
            company.includes(
              searchValue
            ) ||
            location.includes(
              searchValue
            );


          const matchesStatus =
            statusFilter === "ALL" ||
            status === statusFilter;


          const matchesCompany =
            companyFilter === "ALL" ||
            getCompanyName(
              application
            ) === companyFilter;


          return (
            matchesSearch &&
            matchesStatus &&
            matchesCompany
          );

        }
      );

    }, [
      applications,
      search,
      statusFilter,
      companyFilter,
    ]);


  /* =======================================================
     STATUS COUNTS
  ======================================================= */

  const statusCounts =
    useMemo(() => {

      return {
        total:
          applications.length,

        pending:
          applications.filter(
            (application) =>
              getStatus(
                application
              ) === "PENDING"
          ).length,

        shortlisted:
          applications.filter(
            (application) =>
              getStatus(
                application
              ) === "SHORTLISTED"
          ).length,

        interview:
          applications.filter(
            (application) =>
              getStatus(
                application
              ) === "INTERVIEW"
          ).length,

        selected:
          applications.filter(
            (application) =>
              getStatus(
                application
              ) === "SELECTED" ||
              getStatus(
                application
              ) === "HIRED"
          ).length,

        rejected:
          applications.filter(
            (application) =>
              getStatus(
                application
              ) === "REJECTED"
          ).length,
      };

    }, [applications]);


  /* =======================================================
     VIEW APPLICATION
  ======================================================= */

  const handleView =
    async (application) => {

      const applicationId =
        application.id;

      if (!applicationId) {
        return;
      }

      try {

        setDetailsLoading(true);

        setError("");

        const response =
          await applicationsApi.get(
            `/applications/${applicationId}`
          );

        if (
          response.data?.success
        ) {

          setSelectedApplication(
            response.data.application
          );

        } else {

          setSelectedApplication(
            application
          );

        }

      } catch (err) {

        console.error(
          "Get application details error:",
          err
        );

        /*
         * Fallback to the row data so
         * the admin can still view it.
         */

        setSelectedApplication(
          application
        );

      } finally {

        setDetailsLoading(false);

      }
    };


  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const handleStatusChange =
    async (
      application,
      newStatus
    ) => {

      const applicationId =
        application.id;

      if (!applicationId) {
        return;
      }

      try {

        setStatusLoading(
          applicationId
        );

        setError("");

        const response =
          await applicationsApi.put(
            `/applications/${applicationId}/status`,
            {
              status:
                newStatus,
            }
          );


        if (
          !response.data?.success
        ) {

          setError(
            response.data?.message ||
              "Unable to update application status."
          );

          return;
        }


        /*
         * Update list locally.
         */

        setApplications(
          (previous) =>
            previous.map(
              (item) =>
                item.id ===
                applicationId
                  ? {
                      ...item,
                      status:
                        newStatus,
                    }
                  : item
            )
        );


        /*
         * Update selected
         * application too.
         */

        setSelectedApplication(
          (previous) =>
            previous &&
            previous.id ===
              applicationId
              ? {
                  ...previous,
                  status:
                    newStatus,
                }
              : previous
        );

      } catch (err) {

        console.error(
          "Update application status error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to update application status."
        );

      } finally {

        setStatusLoading(null);

      }
    };


  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {

    setSearch("");

    setStatusFilter("ALL");

    setCompanyFilter("ALL");

  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <div className="admin-applications-page">

        <div className="admin-applications-loading">

          <div className="admin-applications-spinner" />

          <h2>
            Loading Applications
          </h2>

          <p>
            Please wait while application
            data is loaded.
          </p>

        </div>

      </div>

    );

  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <div className="admin-applications-page">

      <div className="admin-applications-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="admin-applications-header">

          <div>

            <span className="admin-applications-eyebrow">
              ADMINISTRATION
            </span>

            <h1>
              Applications
            </h1>

            <p>
              Monitor applications across
              all jobs and companies.
            </p>

          </div>

          <button
            type="button"
            className="admin-applications-refresh-button"
            onClick={loadApplications}
          >
            ↻ Refresh
          </button>

        </header>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="admin-applications-error">

            <span>!</span>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
            >
              ×
            </button>

          </div>

        )}


        {/* =================================================
            STATS
        ================================================= */}

        <section className="admin-application-stats">


          <div className="admin-application-stat">

            <span>
              Total
            </span>

            <strong>
              {statusCounts.total}
            </strong>

          </div>


          <div className="admin-application-stat">

            <span>
              Pending
            </span>

            <strong>
              {statusCounts.pending}
            </strong>

          </div>


          <div className="admin-application-stat">

            <span>
              Shortlisted
            </span>

            <strong>
              {statusCounts.shortlisted}
            </strong>

          </div>


          <div className="admin-application-stat">

            <span>
              Interview
            </span>

            <strong>
              {statusCounts.interview}
            </strong>

          </div>


          <div className="admin-application-stat">

            <span>
              Selected
            </span>

            <strong>
              {statusCounts.selected}
            </strong>

          </div>


          <div className="admin-application-stat">

            <span>
              Rejected
            </span>

            <strong>
              {statusCounts.rejected}
            </strong>

          </div>

        </section>


        {/* =================================================
            FILTER TOOLBAR
        ================================================= */}

        <section className="admin-applications-toolbar">


          <div className="admin-applications-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search candidate, email, job or company..."
            />

          </div>


          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >

            <option value="ALL">
              All Statuses
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="SHORTLISTED">
              Shortlisted
            </option>

            <option value="INTERVIEW">
              Interview
            </option>

            <option value="SELECTED">
              Selected
            </option>

            <option value="HIRED">
              Hired
            </option>

            <option value="REJECTED">
              Rejected
            </option>

          </select>


          <select
            value={companyFilter}
            onChange={(e) =>
              setCompanyFilter(
                e.target.value
              )
            }
          >

            <option value="ALL">
              All Companies
            </option>

            {companies.map(
              (company) => (

                <option
                  key={company}
                  value={company}
                >
                  {company}
                </option>

              )
            )}

          </select>


          <button
            type="button"
            className="admin-applications-clear-button"
            onClick={clearFilters}
          >
            Clear
          </button>

        </section>


        {/* =================================================
            RESULTS HEADER
        ================================================= */}

        <section className="admin-applications-results-header">

          <div>

            <span>
              APPLICATION DIRECTORY
            </span>

            <h2>
              {filteredApplications.length}
              {" "}
              {filteredApplications.length === 1
                ? "Application"
                : "Applications"}
            </h2>

          </div>

        </section>


        {/* =================================================
            EMPTY
        ================================================= */}

        {filteredApplications.length === 0 ? (

          <div className="admin-applications-empty">

            <div className="admin-applications-empty-icon">
              📄
            </div>

            <h3>
              No applications found
            </h3>

            <p>
              There are no applications matching
              the selected filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          /* =================================================
             APPLICATION TABLE
          ================================================= */

          <div className="admin-applications-table-card">

            <div className="admin-applications-table">


              {/* TABLE HEADER */}

              <div className="admin-applications-table-header">

                <span>
                  CANDIDATE
                </span>

                <span>
                  JOB
                </span>

                <span>
                  COMPANY
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


              {/* TABLE ROWS */}

              {filteredApplications.map(
                (application) => {

                  const status =
                    getStatus(
                      application
                    );

                  const candidateName =
                    getCandidateName(
                      application
                    );

                  return (

                    <div
                      className="admin-application-row"
                      key={
                        application.id
                      }
                    >


                      {/* CANDIDATE */}

                      <div className="admin-application-candidate">

                        <div className="admin-application-avatar">

                          {
                            candidateName
                              .charAt(0)
                              .toUpperCase()
                          }

                        </div>

                        <div>

                          <h3>
                            {candidateName}
                          </h3>

                          <p>
                            {
                              getCandidateEmail(
                                application
                              )
                            }
                          </p>

                        </div>

                      </div>


                      {/* JOB */}

                      <div className="admin-application-job">

                        <strong>
                          {
                            getJobTitle(
                              application
                            )
                          }
                        </strong>

                        <span>
                          {
                            getLocation(
                              application
                            )
                          }
                        </span>

                      </div>


                      {/* COMPANY */}

                      <div className="admin-application-company">

                        {
                          getCompanyName(
                            application
                          )
                        }

                      </div>


                      {/* DATE */}

                      <div className="admin-application-date">

                        {
                          formatDate(
                            application.applied_at
                          )
                        }

                      </div>


                      {/* STATUS */}

                      <div>

                        <span
                          className={`admin-application-status ${status.toLowerCase()}`}
                        >
                          {status}
                        </span>

                      </div>


                      {/* ACTION */}

                      <div className="admin-application-actions">

                        <button
                          type="button"
                          className="admin-application-view-button"
                          onClick={() =>
                            handleView(
                              application
                            )
                          }
                        >
                          View
                        </button>


                        <select
                          value={status}
                          disabled={
                            statusLoading ===
                            application.id
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              application,
                              e.target.value
                            )
                          }
                        >

                          <option value="PENDING">
                            Pending
                          </option>

                          <option value="SHORTLISTED">
                            Shortlisted
                          </option>

                          <option value="INTERVIEW">
                            Interview
                          </option>

                          <option value="SELECTED">
                            Selected
                          </option>

                          <option value="HIRED">
                            Hired
                          </option>

                          <option value="REJECTED">
                            Rejected
                          </option>

                        </select>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>

        )}

      </div>


      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedApplication && (

        <div
          className="admin-application-modal-overlay"
          onClick={() =>
            setSelectedApplication(
              null
            )
          }
        >

          <div
            className="admin-application-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* MODAL HEADER */}

            <div className="admin-application-modal-header">

              <div>

                <span>
                  APPLICATION DETAILS
                </span>

                <h2>
                  {
                    getCandidateName(
                      selectedApplication
                    )
                  }
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(
                    null
                  )
                }
              >
                ×
              </button>

            </div>


            {/* MODAL BODY */}

            {detailsLoading ? (

              <div className="admin-application-modal-loading">

                <div className="admin-applications-spinner" />

                <p>
                  Loading application details...
                </p>

              </div>

            ) : (

              <div className="admin-application-modal-body">


                <div className="admin-application-detail">

                  <span>
                    Candidate
                  </span>

                  <strong>
                    {
                      getCandidateName(
                        selectedApplication
                      )
                    }
                  </strong>

                </div>


                <div className="admin-application-detail">

                  <span>
                    Email
                  </span>

                  <strong>
                    {
                      getCandidateEmail(
                        selectedApplication
                      )
                    }
                  </strong>

                </div>


                <div className="admin-application-detail">

                  <span>
                    Phone
                  </span>

                  <strong>
                    {
                      selectedApplication.candidate_phone ||
                      selectedApplication.phone ||
                      "Not provided"
                    }
                  </strong>

                </div>


                <div className="admin-application-detail">

                  <span>
                    Job
                  </span>

                  <strong>
                    {
                      getJobTitle(
                        selectedApplication
                      )
                    }
                  </strong>

                </div>


                <div className="admin-application-detail">

                  <span>
                    Company
                  </span>

                  <strong>
                    {
                      getCompanyName(
                        selectedApplication
                      )
                    }
                  </strong>

                </div>


                <div className="admin-application-detail">

                  <span>
                    Location
                  </span>

                  <strong>
                    {
                      getLocation(
                        selectedApplication
                      )
                    }
                  </strong>

                </div>


                <div className="admin-application-detail">

                  <span>
                    Applied
                  </span>

                  <strong>
                    {
                      formatDate(
                        selectedApplication.applied_at
                      )
                    }
                  </strong>

                </div>


                <div className="admin-application-detail">

                  <span>
                    Status
                  </span>

                  <strong>

                    <span
                      className={`admin-application-status ${getStatus(
                        selectedApplication
                      ).toLowerCase()}`}
                    >
                      {
                        getStatus(
                          selectedApplication
                        )
                      }
                    </span>

                  </strong>

                </div>


                {/* RESUME */}

                {selectedApplication.resume_url && (

                  <div className="admin-application-detail-full">

                    <span>
                      Resume
                    </span>

                    <a
                      href={
                        selectedApplication.resume_url
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Resume
                    </a>

                  </div>

                )}


                {/* COVER LETTER */}

                <div className="admin-application-detail-full">

                  <span>
                    Cover Letter
                  </span>

                  <div className="admin-application-cover-letter">

                    {
                      selectedApplication.cover_letter ||
                      "No cover letter provided."
                    }

                  </div>

                </div>


                {/* STATUS */}

                <div className="admin-application-modal-status">

                  <label>
                    Update Application Status
                  </label>

                  <select
                    value={
                      getStatus(
                        selectedApplication
                      )
                    }
                    disabled={
                      statusLoading ===
                      selectedApplication.id
                    }
                    onChange={(e) =>
                      handleStatusChange(
                        selectedApplication,
                        e.target.value
                      )
                    }
                  >

                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="SHORTLISTED">
                      Shortlisted
                    </option>

                    <option value="INTERVIEW">
                      Interview
                    </option>

                    <option value="SELECTED">
                      Selected
                    </option>

                    <option value="HIRED">
                      Hired
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>

                  </select>

                </div>

              </div>

            )}


            {/* MODAL FOOTER */}

            <div className="admin-application-modal-footer">

              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(
                    null
                  )
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


export default AdminApplications;