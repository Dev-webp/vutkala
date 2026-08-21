import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./Applications.css";

import {
  getRecruiterApplications,
  viewResume,
  updateApplicationStatus,
} from "../../services/applicationService";


function Applications() {

  const [applications, setApplications] = useState([]);

  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected candidate for profile modal
  const [selectedApplication, setSelectedApplication] =
    useState(null);

  // Status update loading
  const [updatingStatusId, setUpdatingStatusId] =
    useState(null);


  // =====================================================
  // FETCH APPLICATIONS
  // =====================================================

  useEffect(() => {

    const fetchApplications = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await getRecruiterApplications();

        console.log(
          "RECRUITER APPLICATIONS:",
          response.data
        );

        setApplications(
          response.data.applications || []
        );

      } catch (error) {

        console.error(
          "Failed to fetch applications:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load applications."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchApplications();

  }, []);


  // =====================================================
  // JOBS
  // =====================================================

  const jobs = useMemo(() => {

    return [
      ...new Set(
        applications
          .map(
            (application) =>
              application.job_title
          )
          .filter(Boolean)
      ),
    ];

  }, [applications]);


  // =====================================================
  // STATUS COUNTS
  // =====================================================

  const statusCounts = useMemo(() => {

    return {

      ALL: applications.length,

      NEW: applications.filter(
        (application) =>
          application.status === "NEW"
      ).length,

      SHORTLISTED: applications.filter(
        (application) =>
          application.status === "SHORTLISTED"
      ).length,

      INTERVIEW: applications.filter(
        (application) =>
          application.status === "INTERVIEW"
      ).length,

      SELECTED: applications.filter(
        (application) =>
          application.status === "SELECTED"
      ).length,

      REJECTED: applications.filter(
        (application) =>
          application.status === "REJECTED"
      ).length,

    };

  }, [applications]);


  // =====================================================
  // FILTER APPLICATIONS
  // =====================================================

  const filteredApplications = useMemo(() => {

    const searchValue =
      search.toLowerCase().trim();

    return applications.filter(
      (application) => {

        const candidateName =
          application.candidate_name || "";

        const candidateEmail =
          application.candidate_email || "";

        const jobTitle =
          application.job_title || "";

        const matchesSearch =
          candidateName
            .toLowerCase()
            .includes(searchValue) ||
          candidateEmail
            .toLowerCase()
            .includes(searchValue);

        const matchesJob =
          jobFilter === "ALL" ||
          jobTitle === jobFilter;

        const matchesStatus =
          statusFilter === "ALL" ||
          application.status === statusFilter;

        return (
          matchesSearch &&
          matchesJob &&
          matchesStatus
        );

      }
    );

  }, [
    applications,
    search,
    jobFilter,
    statusFilter,
  ]);


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
  // DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) return "—";

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
  // STATUS NAVIGATION
  // =====================================================

  const handleStatusNavigation = (status) => {

    setStatusFilter(status);

    setTimeout(() => {

      document
        .querySelector(".applications-card")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

    }, 50);

  };


  // =====================================================
  // VIEW RESUME
  // =====================================================

  const handleViewResume = async (
    applicationId
  ) => {

    try {

      const response =
        await viewResume(applicationId);

      const url =
        window.URL.createObjectURL(
          response.data
        );

      window.open(
        url,
        "_blank"
      );

      // Clean up object URL later
      setTimeout(() => {

        window.URL.revokeObjectURL(url);

      }, 10000);

    } catch (error) {

      console.error(
        "View resume error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to open resume."
      );

    }

  };


  // =====================================================
  // UPDATE APPLICATION STATUS
  // =====================================================

  const handleStatusChange = async (
    applicationId,
    newStatus
  ) => {

    try {

      const application =
        applications.find(
          (item) =>
            item.id === applicationId
        );

      if (!application) {
        return;
      }


      const oldStatus =
        application.status || "NEW";


      // Don't update if same status
      if (oldStatus === newStatus) {
        return;
      }


      // Confirmation for important status changes
      const confirmed =
        window.confirm(
          `Are you sure you want to change this candidate's status from ${oldStatus} to ${newStatus}?`
        );


      if (!confirmed) {
        return;
      }


      setUpdatingStatusId(
        applicationId
      );


      console.log(
        "UPDATING APPLICATION STATUS:",
        {
          applicationId,
          oldStatus,
          newStatus,
        }
      );


      const response =
        await updateApplicationStatus(
          applicationId,
          newStatus
        );


      console.log(
        "APPLICATION STATUS UPDATED:",
        response.data
      );


      // =================================================
      // UPDATE APPLICATION IN STATE
      // =================================================

      setApplications(
        (previousApplications) =>
          previousApplications.map(
            (item) =>
              item.id === applicationId
                ? {
                    ...item,
                    status:
                      newStatus,
                    updated_at:
                      new Date().toISOString(),
                  }
                : item
          )
      );


      // =================================================
      // UPDATE MODAL DATA IF OPEN
      // =================================================

      setSelectedApplication(
        (previousApplication) => {

          if (
            !previousApplication ||
            previousApplication.id !==
              applicationId
          ) {

            return previousApplication;

          }

          return {
            ...previousApplication,
            status: newStatus,
          };

        }
      );


      // =================================================
      // EMAIL RESULT
      // =================================================

      if (
        response.data?.emailSent === true
      ) {

        alert(
          `Application status updated to ${newStatus}.\n\nCandidate email sent successfully.`
        );

      } else {

        alert(
          `Application status updated to ${newStatus}.`
        );

      }

    } catch (error) {

      console.error(
        "Update application status error:",
        error
      );


      alert(
        error.response?.data?.message ||
          "Unable to update application status."
      );

    } finally {

      setUpdatingStatusId(null);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="applications-page">

        <div className="applications-header">

          <div>

            <span className="applications-eyebrow">
              RECRUITMENT
            </span>

            <h1>
              Applications
            </h1>

            <p>
              Review and manage candidates
              who applied to your jobs.
            </p>

          </div>

        </div>


        <div className="applications-card">

          <div className="applications-empty">

            <div className="empty-candidate-icon">
              ...
            </div>

            <h3>
              Loading applications...
            </h3>

            <p>
              Please wait while we load
              candidate applications.
            </p>

          </div>

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
          HEADER
      ================================================= */}

      <div className="applications-header">

        <div>

          <span className="applications-eyebrow">
            RECRUITMENT
          </span>

          <h1>
            Applications
          </h1>

          <p>
            Review, shortlist and manage
            candidates across your hiring pipeline.
          </p>

        </div>


        <div className="applications-count">

          <strong>
            {filteredApplications.length}
          </strong>

          <span>
            Applications
          </span>

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="applications-error">

          <strong>
            Unable to load applications
          </strong>

          <p>
            {error}
          </p>

        </div>

      )}


      {/* =================================================
          QUICK STATUS NAVIGATION
      ================================================= */}

      <div className="application-status-navigation">


        {/* ALL */}

        <button
          type="button"
          className={
            statusFilter === "ALL"
              ? "status-nav-card active"
              : "status-nav-card"
          }
          onClick={() =>
            handleStatusNavigation("ALL")
          }
        >

          <span className="status-nav-label">
            ALL
          </span>

          <strong>
            {statusCounts.ALL}
          </strong>

          <small>
            Applications
          </small>

        </button>


        {/* NEW */}

        <button
          type="button"
          className={
            statusFilter === "NEW"
              ? "status-nav-card active new"
              : "status-nav-card new"
          }
          onClick={() =>
            handleStatusNavigation("NEW")
          }
        >

          <span className="status-nav-label">
            NEW
          </span>

          <strong>
            {statusCounts.NEW}
          </strong>

          <small>
            New candidates
          </small>

        </button>


        {/* SHORTLISTED */}

        <button
          type="button"
          className={
            statusFilter === "SHORTLISTED"
              ? "status-nav-card active shortlisted"
              : "status-nav-card shortlisted"
          }
          onClick={() =>
            handleStatusNavigation(
              "SHORTLISTED"
            )
          }
        >

          <span className="status-nav-label">
            SHORTLISTED
          </span>

          <strong>
            {statusCounts.SHORTLISTED}
          </strong>

          <small>
            Shortlisted
          </small>

        </button>


        {/* INTERVIEW */}

        <button
          type="button"
          className={
            statusFilter === "INTERVIEW"
              ? "status-nav-card active interview"
              : "status-nav-card interview"
          }
          onClick={() =>
            handleStatusNavigation(
              "INTERVIEW"
            )
          }
        >

          <span className="status-nav-label">
            INTERVIEW
          </span>

          <strong>
            {statusCounts.INTERVIEW}
          </strong>

          <small>
            Interviews
          </small>

        </button>


        {/* SELECTED */}

        <button
          type="button"
          className={
            statusFilter === "SELECTED"
              ? "status-nav-card active selected"
              : "status-nav-card selected"
          }
          onClick={() =>
            handleStatusNavigation(
              "SELECTED"
            )
          }
        >

          <span className="status-nav-label">
            SELECTED
          </span>

          <strong>
            {statusCounts.SELECTED}
          </strong>

          <small>
            Selected
          </small>

        </button>


        {/* REJECTED */}

        <button
          type="button"
          className={
            statusFilter === "REJECTED"
              ? "status-nav-card active rejected"
              : "status-nav-card rejected"
          }
          onClick={() =>
            handleStatusNavigation(
              "REJECTED"
            )
          }
        >

          <span className="status-nav-label">
            REJECTED
          </span>

          <strong>
            {statusCounts.REJECTED}
          </strong>

          <small>
            Rejected
          </small>

        </button>

      </div>


      {/* =================================================
          FILTER BAR
      ================================================= */}

      <div className="applications-toolbar">


        {/* SEARCH */}

        <div className="application-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        {/* JOB FILTER */}

        <select
          value={jobFilter}
          onChange={(e) =>
            setJobFilter(
              e.target.value
            )
          }
        >

          <option value="ALL">
            All Jobs
          </option>

          {jobs.map((job) => (

            <option
              key={job}
              value={job}
            >
              {job}
            </option>

          ))}

        </select>


        {/* STATUS FILTER */}

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >

          <option value="ALL">
            All Status
          </option>

          <option value="NEW">
            New
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

          <option value="REJECTED">
            Rejected
          </option>

        </select>

      </div>


      {/* =================================================
          APPLICATION TABLE
      ================================================= */}

      <div className="applications-card">


        {/* TABLE HEADER */}

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


        {/* =================================================
            NO APPLICATIONS
        ================================================= */}

      {filteredApplications.length === 0 ? (

  <div className="applications-empty">

    <div className="empty-candidate-icon">
      +
    </div>

    <h3>
      No applications found
    </h3>

    <p>
      {applications.length === 0
        ? "No candidates have applied to your jobs yet."
        : "Try changing your filters or search criteria."
      }
    </p>

  </div>

) : (

  filteredApplications.map((application) => (

    <div
      className="application-row"
      key={application.id}
    >

      {/* ============================================
          CANDIDATE
      ============================================ */}

      <div className="candidate-cell">

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


      {/* ============================================
          POSITION
      ============================================ */}

      <div className="position-cell">

        {application.job_title ||
          "Unknown Position"}

      </div>


      {/* ============================================
          DATE
      ============================================ */}

      <div className="date-cell">

        {formatDate(
          application.applied_at
        )}

      </div>


      {/* ============================================
          STATUS
      ============================================ */}

      <div className="application-status-cell">

        <select
          value={
            application.status || "NEW"
          }

          disabled={
            updatingStatusId ===
            application.id
          }

          onChange={(e) =>
            handleStatusChange(
              application.id,
              e.target.value
            )
          }

          className={`application-status-select ${
            (
              application.status ||
              "NEW"
            ).toLowerCase()
          }`}
        >

          <option value="NEW">
            New
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

          <option value="REJECTED">
            Rejected
          </option>

        </select>


        {updatingStatusId ===
          application.id && (

          <small className="status-updating-text">
            Updating...
          </small>

        )}

      </div>


      {/* ============================================
          ACTION
      ============================================ */}

      <div className="application-actions">

        <button
          type="button"
          className="application-view-btn"
          onClick={() =>
            setSelectedApplication(
              application
            )
          }
        >
          View Profile
        </button>


        <button
          type="button"
          className="application-resume-btn"
          onClick={() =>
            handleViewResume(
              application.id
            )
          }
        >
          View Resume
        </button>

      </div>

    </div>

  ))

)}

      </div>


      {/* =================================================
          CANDIDATE PROFILE MODAL
      ================================================= */}

      {selectedApplication && (

        <div
          className="candidate-modal-overlay"
          onClick={() =>
            setSelectedApplication(
              null
            )
          }
        >

          <div
            className="candidate-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="candidate-modal-header">

              <div className="candidate-modal-person">

                <div className="candidate-modal-avatar">

                  {getInitials(
                    selectedApplication.candidate_name
                  )}

                </div>


                <div>

                  <span className="candidate-modal-eyebrow">
                    CANDIDATE PROFILE
                  </span>

                  <h2>

                    {selectedApplication.candidate_name ||
                      "Unknown Candidate"}

                  </h2>

                  <p>

                    {selectedApplication.candidate_email ||
                      "No email available"}

                  </p>

                </div>

              </div>


              <button
                type="button"
                className="candidate-modal-close"
                onClick={() =>
                  setSelectedApplication(
                    null
                  )
                }
              >
                ×
              </button>

            </div>


            {/* =================================================
                APPLICATION SUMMARY
            ================================================= */}

            <div className="candidate-profile-grid">


              <div className="profile-info-card">

                <span>
                  APPLIED POSITION
                </span>

                <strong>

                  {selectedApplication.job_title ||
                    "—"}

                </strong>

              </div>


              <div className="profile-info-card">

                <span>
                  APPLICATION STATUS
                </span>

                <strong
                  className={`profile-status ${
                    (
                      selectedApplication.status ||
                      "NEW"
                    ).toLowerCase()
                  }`}
                >

                  {(
                    selectedApplication.status ||
                    "NEW"
                  ).replace(
                    "_",
                    " "
                  )}

                </strong>

              </div>


              <div className="profile-info-card">

                <span>
                  APPLIED DATE
                </span>

                <strong>

                  {formatDate(
                    selectedApplication.applied_at
                  )}

                </strong>

              </div>

            </div>


            {/* =================================================
                CHANGE STATUS FROM MODAL
            ================================================= */}

            <div className="candidate-details-section">

              <div className="candidate-section-title">

                <span>
                  APPLICATION
                </span>

                <h3>
                  Update Application Status
                </h3>

              </div>


              <div className="modal-status-control">

                <select
                  value={
                    selectedApplication.status ||
                    "NEW"
                  }

                  disabled={
                    updatingStatusId ===
                    selectedApplication.id
                  }

                  onChange={(e) =>
                    handleStatusChange(
                      selectedApplication.id,
                      e.target.value
                    )
                  }

                  className={`application-status-select ${
                    (
                      selectedApplication.status ||
                      "NEW"
                    ).toLowerCase()
                  }`}
                >

                  <option value="NEW">
                    New
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

                  <option value="REJECTED">
                    Rejected
                  </option>

                </select>


                {updatingStatusId ===
                  selectedApplication.id && (

                  <span className="status-updating-text">
                    Updating...
                  </span>

                )}

              </div>

            </div>


            {/* =================================================
                CANDIDATE INFORMATION
            ================================================= */}

            <div className="candidate-details-section">

              <div className="candidate-section-title">

                <span>
                  CANDIDATE INFORMATION
                </span>

                <h3>
                  Personal & Professional Details
                </h3>

              </div>


              <div className="candidate-details-grid">


                <div>

                  <label>
                    Full Name
                  </label>

                  <p>

                    {selectedApplication.candidate_name ||
                      "—"}

                  </p>

                </div>


                <div>

                  <label>
                    Email
                  </label>

                  <p>

                    {selectedApplication.candidate_email ||
                      "—"}

                  </p>

                </div>


                <div>

                  <label>
                    Phone
                  </label>

                  <p>

                    {selectedApplication.candidate_phone ||
                      selectedApplication.phone ||
                      "—"}

                  </p>

                </div>


                <div>

                  <label>
                    Location
                  </label>

                  <p>

                    {selectedApplication.location ||
                      selectedApplication.candidate_location ||
                      "—"}

                  </p>

                </div>


                <div>

                  <label>
                    Experience
                  </label>

                  <p>

                    {selectedApplication.experience ||
                      selectedApplication.experience_years ||
                      "—"}

                  </p>

                </div>


                <div>

                  <label>
                    Education
                  </label>

                  <p>

                    {selectedApplication.education ||
                      "—"}

                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                SKILLS
            ================================================= */}

            {(selectedApplication.skills ||
              selectedApplication.candidate_skills) && (

              <div className="candidate-details-section">

                <div className="candidate-section-title">

                  <span>
                    SKILLS
                  </span>

                  <h3>
                    Technical Skills
                  </h3>

                </div>


                <div className="candidate-skills">

                  {String(
                    selectedApplication.skills ||
                      selectedApplication.candidate_skills
                  )
                    .split(",")
                    .map(
                      (skill) => (

                        <span
                          key={skill}
                        >
                          {skill.trim()}
                        </span>

                      )
                    )}

                </div>

              </div>

            )}


            {/* =================================================
                RESUME
            ================================================= */}

            {(selectedApplication.resume_url ||
              selectedApplication.resume) && (

              <div className="candidate-resume-section">

                <div>

                  <span>
                    RESUME
                  </span>

                  <h3>
                    Candidate Resume
                  </h3>

                </div>


                <button
                  type="button"
                  className="resume-button"
                  onClick={() =>
                    handleViewResume(
                      selectedApplication.id
                    )
                  }
                >
                  View Resume →
                </button>

              </div>

            )}


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="candidate-modal-footer">

              <button
                type="button"
                className="modal-secondary-button"
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


export default Applications;