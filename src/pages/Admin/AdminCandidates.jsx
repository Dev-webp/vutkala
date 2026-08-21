import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import "../../styles/admin/AdminCandidates.css";

const adminApi = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});

export default function AdminCandidates() {
  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [resumeFilter, setResumeFilter] =
    useState("ALL");

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [detailsError, setDetailsError] =
    useState("");

  // =====================================================
  // LOAD CANDIDATES
  // =====================================================

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await adminApi.get(
          "/candidates"
        );

      if (
        !response.data?.success
      ) {
        throw new Error(
          response.data?.message ||
            "Unable to load candidates."
        );
      }

      setCandidates(
        response.data.candidates || []
      );
    } catch (err) {
      console.error(
        "Admin candidates error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load candidates."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  // =====================================================
  // LOAD CANDIDATE DETAILS
  // =====================================================

  const openCandidate = async (
    candidateId
  ) => {
    try {
      setDetailsLoading(true);
      setDetailsError("");
      setSelectedCandidate(null);

      const response =
        await adminApi.get(
          `/candidates/${candidateId}`
        );

      if (
        !response.data?.success
      ) {
        throw new Error(
          response.data?.message ||
            "Unable to load candidate."
        );
      }

      setSelectedCandidate(
        response.data.candidate
      );
    } catch (err) {
      console.error(
        "Candidate details error:",
        err
      );

      setDetailsError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load candidate details."
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "—";

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

  const formatDateTime = (
    date
  ) => {
    if (!date) return "—";

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

  const formatStatus = (
    status
  ) => {
    if (!status) return "Unknown";

    return String(status)
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      );
  };

  const getStatusClass = (
    status
  ) => {
    const value =
      String(
        status || ""
      ).toUpperCase();

    if (
      value === "APPROVED" ||
      value === "ACTIVE" ||
      value === "SHORTLISTED" ||
      value === "SELECTED"
    ) {
      return "candidate-status-success";
    }

    if (
      value === "PENDING" ||
      value === "APPLIED" ||
      value === "UNDER_REVIEW"
    ) {
      return "candidate-status-warning";
    }

    if (
      value === "REJECTED" ||
      value === "CLOSED"
    ) {
      return "candidate-status-danger";
    }

    return "candidate-status-default";
  };

  const hasResume = (
    candidate
  ) => {
    return Boolean(
      candidate?.resume_url
    );
  };

  const getResumeUrl = (
    resumeUrl
  ) => {
    if (!resumeUrl) {
      return "";
    }

    if (
      resumeUrl.startsWith(
        "http://"
      ) ||
      resumeUrl.startsWith(
        "https://"
      )
    ) {
      return resumeUrl;
    }

    if (
      resumeUrl.startsWith("/")
    ) {
      return resumeUrl;
    }

    return `/${resumeUrl}`;
  };

  const formatSalary = (
    min,
    max
  ) => {
    if (
      min == null &&
      max == null
    ) {
      return "Not specified";
    }

    const format = (value) =>
      Number(value).toLocaleString(
        "en-IN"
      );

    if (
      min != null &&
      max != null
    ) {
      return `₹${format(
        min
      )} - ₹${format(max)}`;
    }

    if (min != null) {
      return `From ₹${format(
        min
      )}`;
    }

    return `Up to ₹${format(
      max
    )}`;
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredCandidates =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return candidates.filter(
        (candidate) => {
          const searchText = `
            ${candidate.full_name || ""}
            ${candidate.email || ""}
            ${candidate.phone || ""}
            ${candidate.location || ""}
            ${candidate.headline || ""}
            ${candidate.current_job_title || ""}
            ${candidate.industry || ""}
            ${candidate.skills || ""}
          `.toLowerCase();

          const matchesSearch =
            !query ||
            searchText.includes(
              query
            );

          const resumeExists =
            hasResume(candidate);

          const matchesResume =
            resumeFilter === "ALL" ||
            (resumeFilter ===
              "UPLOADED" &&
              resumeExists) ||
            (resumeFilter ===
              "MISSING" &&
              !resumeExists);

          return (
            matchesSearch &&
            matchesResume
          );
        }
      );
    }, [
      candidates,
      search,
      resumeFilter,
    ]);

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalCandidates =
    candidates.length;

  const candidatesWithResume =
    candidates.filter(
      hasResume
    ).length;

  const totalApplications =
    candidates.reduce(
      (
        total,
        candidate
      ) =>
        total +
        Number(
          candidate.applications_count ||
            0
        ),
      0
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="admin-candidates-page">
        <div className="admin-candidates-loading">
          <div className="admin-candidates-spinner" />

          <p>
            Loading candidates...
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
      <div className="admin-candidates-page">
        <div className="admin-candidates-error">
          <div className="admin-candidates-error-icon">
            !
          </div>

          <h2>
            Unable to load candidates
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={
              loadCandidates
            }
            className="admin-candidates-retry"
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
    <div className="admin-candidates-page">

      {/* HEADER */}

      <div className="admin-candidates-header">

        <div>
          <span className="admin-candidates-eyebrow">
            CANDIDATE MANAGEMENT
          </span>

          <h1>
            Candidates
          </h1>

          <p>
            View candidate profiles,
            resumes, applications and
            company details.
          </p>
        </div>

        <button
          type="button"
          className="admin-candidates-refresh"
          onClick={
            loadCandidates
          }
        >
          ↻ Refresh
        </button>

      </div>

      {/* SUMMARY */}

      <div className="admin-candidates-summary">

        <div className="admin-candidate-summary-card">
          <span className="summary-icon">
            ♙
          </span>

          <div>
            <span>
              Total Candidates
            </span>

            <strong>
              {totalCandidates}
            </strong>
          </div>
        </div>

        <div className="admin-candidate-summary-card">
          <span className="summary-icon success">
            ✓
          </span>

          <div>
            <span>
              Resumes Uploaded
            </span>

            <strong>
              {candidatesWithResume}
            </strong>
          </div>
        </div>

        <div className="admin-candidate-summary-card">
          <span className="summary-icon applications">
            ▤
          </span>

          <div>
            <span>
              Applications
            </span>

            <strong>
              {totalApplications}
            </strong>
          </div>
        </div>

      </div>

      {/* TOOLBAR */}

      <div className="admin-candidates-toolbar">

        <div className="admin-candidates-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search name, email, skills, location..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
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

        <div className="admin-candidates-filter">

          <label>
            Resume
          </label>

          <select
            value={resumeFilter}
            onChange={(e) =>
              setResumeFilter(
                e.target.value
              )
            }
          >
            <option value="ALL">
              All Candidates
            </option>

            <option value="UPLOADED">
              Resume Uploaded
            </option>

            <option value="MISSING">
              No Resume
            </option>
          </select>

        </div>

      </div>

      {/* RESULT */}

      <div className="admin-candidates-result-info">
        Showing{" "}
        <strong>
          {
            filteredCandidates.length
          }
        </strong>{" "}
        of{" "}
        <strong>
          {candidates.length}
        </strong>{" "}
        candidates
      </div>

      {/* TABLE */}

      <div className="admin-candidates-card">

        {filteredCandidates.length ===
        0 ? (
          <div className="admin-candidates-empty">

            <div>
              ♙
            </div>

            <h3>
              No candidates found
            </h3>

            <p>
              Try changing your
              search or filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setResumeFilter(
                  "ALL"
                );
              }}
            >
              Clear Filters
            </button>

          </div>
        ) : (

          <div className="admin-candidates-table-wrapper">

            <table className="admin-candidates-table">

              <thead>
                <tr>
                  <th>
                    CANDIDATE
                  </th>

                  <th>
                    CONTACT
                  </th>

                  <th>
                    PROFESSIONAL
                  </th>

                  <th>
                    LOCATION
                  </th>

                  <th>
                    RESUME
                  </th>

                  <th>
                    APPLICATIONS
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredCandidates.map(
                  (candidate) => (
                    <tr
                      key={
                        candidate.id
                      }
                    >

                      {/* CANDIDATE */}

                      <td>
                        <div className="candidate-name-cell">

                          {candidate.profile_image ? (
                            <img
                              src={
                                candidate.profile_image
                              }
                              alt={
                                candidate.full_name
                              }
                              className="candidate-avatar"
                            />
                          ) : (
                            <div className="candidate-avatar-placeholder">
                              {(
                                candidate.full_name ||
                                "C"
                              )
                                .charAt(
                                  0
                                )
                                .toUpperCase()}
                            </div>
                          )}

                          <div>
                            <strong>
                              {
                                candidate.full_name
                              }
                            </strong>

                            <span>
                              {
                                candidate.headline ||
                                candidate.current_job_title ||
                                "Job Seeker"
                              }
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* CONTACT */}

                      <td>
                        <div className="candidate-contact-cell">
                          <strong>
                            {
                              candidate.email
                            }
                          </strong>

                          <span>
                            {
                              candidate.phone ||
                              "No phone"
                            }
                          </span>
                        </div>
                      </td>

                      {/* PROFESSIONAL */}

                      <td>
                        <div className="candidate-professional-cell">

                          <strong>
                            {
                              candidate.current_job_title ||
                              "Not specified"
                            }
                          </strong>

                          <span>
                            {
                              candidate.experience_years !=
                              null
                                ? `${candidate.experience_years} years experience`
                                : "Experience not specified"
                            }
                          </span>

                        </div>
                      </td>

                      {/* LOCATION */}

                      <td>
                        {
                          candidate.location ||
                          "—"
                        }
                      </td>

                      {/* RESUME */}

                      <td>
                        {hasResume(
                          candidate
                        ) ? (
                          <span className="resume-badge uploaded">
                            ✓ Uploaded
                          </span>
                        ) : (
                          <span className="resume-badge missing">
                            — Not uploaded
                          </span>
                        )}
                      </td>

                      {/* APPLICATIONS */}

                      <td>
                        <span className="applications-count">
                          {
                            candidate.applications_count ||
                            0
                          }
                        </span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <span
                          className={`candidate-status ${getStatusClass(
                            candidate.status
                          )}`}
                        >
                          {
                            formatStatus(
                              candidate.status
                            )
                          }
                        </span>
                      </td>

                      {/* ACTION */}

                      <td>
                        <button
                          type="button"
                          className="candidate-view-button"
                          onClick={() =>
                            openCandidate(
                              candidate.id
                            )
                          }
                        >
                          View Profile
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
          DETAILS MODAL
      ================================================= */}

      {(detailsLoading ||
        selectedCandidate ||
        detailsError) && (
        <div
          className="candidate-modal-overlay"
          onClick={() => {
            if (
              !detailsLoading
            ) {
              setSelectedCandidate(
                null
              );
              setDetailsError("");
            }
          }}
        >

          <div
            className="candidate-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="candidate-modal-header">

              <div>
                <span>
                  CANDIDATE PROFILE
                </span>

                <h2>
                  {detailsLoading
                    ? "Loading..."
                    : selectedCandidate?.full_name ||
                      "Candidate"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCandidate(
                    null
                  );
                  setDetailsError(
                    ""
                  );
                }}
              >
                ×
              </button>

            </div>

            {detailsLoading && (
              <div className="candidate-modal-loading">
                <div className="admin-candidates-spinner" />
                <p>
                  Loading complete
                  candidate profile...
                </p>
              </div>
            )}

            {detailsError && (
              <div className="candidate-modal-error">
                <strong>
                  Unable to load candidate
                </strong>

                <p>
                  {detailsError}
                </p>
              </div>
            )}

            {selectedCandidate && (
              <div className="candidate-modal-body">

                {/* PROFILE HERO */}

                <div className="candidate-profile-hero">

                  {selectedCandidate.profile_image ? (
                    <img
                      src={
                        selectedCandidate.profile_image
                      }
                      alt={
                        selectedCandidate.full_name
                      }
                      className="candidate-profile-image"
                    />
                  ) : (
                    <div className="candidate-profile-image-placeholder">
                      {(
                        selectedCandidate.full_name ||
                        "C"
                      )
                        .charAt(
                          0
                        )
                        .toUpperCase()}
                    </div>
                  )}

                  <div>

                    <h3>
                      {
                        selectedCandidate.full_name
                      }
                    </h3>

                    <p>
                      {
                        selectedCandidate.headline ||
                        selectedCandidate.current_job_title ||
                        "Job Seeker"
                      }
                    </p>

                    <span>
                      📍{" "}
                      {
                        selectedCandidate.location ||
                        "Location not specified"
                      }
                    </span>

                  </div>

                </div>

                {/* ACCOUNT */}

                <section className="candidate-detail-section">

                  <h3>
                    Account Information
                  </h3>

                  <div className="candidate-detail-grid">

                    <DetailItem
                      label="Full Name"
                      value={
                        selectedCandidate.full_name
                      }
                    />

                    <DetailItem
                      label="Email"
                      value={
                        selectedCandidate.email
                      }
                    />

                    <DetailItem
                      label="Phone"
                      value={
                        selectedCandidate.phone
                      }
                    />

                    <DetailItem
                      label="Account Status"
                      value={formatStatus(
                        selectedCandidate.status
                      )}
                    />

                    <DetailItem
                      label="Email Verified"
                      value={
                        selectedCandidate.is_email_verified
                          ? "Yes"
                          : "No"
                      }
                    />

                    <DetailItem
                      label="Login Provider"
                      value={formatStatus(
                        selectedCandidate.provider
                      )}
                    />

                    <DetailItem
                      label="Registered"
                      value={formatDate(
                        selectedCandidate.user_created_at
                      )}
                    />

                    <DetailItem
                      label="Last Login"
                      value={formatDateTime(
                        selectedCandidate.last_login
                      )}
                    />

                  </div>

                </section>

                {/* PROFESSIONAL */}

                <section className="candidate-detail-section">

                  <h3>
                    Professional Information
                  </h3>

                  <div className="candidate-detail-grid">

                    <DetailItem
                      label="Headline"
                      value={
                        selectedCandidate.headline
                      }
                    />

                    <DetailItem
                      label="Current Job Title"
                      value={
                        selectedCandidate.current_job_title
                      }
                    />

                    <DetailItem
                      label="Industry"
                      value={
                        selectedCandidate.industry
                      }
                    />

                    <DetailItem
                      label="Experience"
                      value={
                        selectedCandidate.experience_years !=
                        null
                          ? `${selectedCandidate.experience_years} years`
                          : null
                      }
                    />

                    <DetailItem
                      label="Location"
                      value={
                        selectedCandidate.location
                      }
                    />

                  </div>

                </section>

                {/* BIO */}

                {selectedCandidate.bio && (
                  <section className="candidate-detail-section">

                    <h3>
                      About Candidate
                    </h3>

                    <div className="candidate-long-text">
                      {
                        selectedCandidate.bio
                      }
                    </div>

                  </section>
                )}

                {/* SKILLS */}

                {selectedCandidate.skills && (
                  <section className="candidate-detail-section">

                    <h3>
                      Skills
                    </h3>

                    <div className="candidate-skills">
                      {String(
                        selectedCandidate.skills
                      )
                        .split(
                          /[,|\n]/
                        )
                        .map(
                          (
                            skill,
                            index
                          ) => (
                            <span
                              key={
                                index
                              }
                            >
                              {skill.trim()}
                            </span>
                          )
                        )
                        .filter(
                          (item) =>
                            item.props
                              .children
                        )}
                    </div>

                  </section>
                )}

                {/* EDUCATION */}

                {selectedCandidate.education && (
                  <section className="candidate-detail-section">

                    <h3>
                      Education
                    </h3>

                    <div className="candidate-long-text">
                      {
                        selectedCandidate.education
                      }
                    </div>

                  </section>
                )}

                {/* RESUME */}

                <section className="candidate-detail-section">

                  <h3>
                    Resume
                  </h3>

                  {selectedCandidate.resume_url ? (
                    <div className="candidate-resume-card">

                      <div>
                        <strong>
                          Resume available
                        </strong>

                        <span>
                          Uploaded resume
                        </span>
                      </div>

                      <div className="candidate-resume-actions">

                        <a
                          href={getResumeUrl(
                            selectedCandidate.resume_url
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="resume-view-button"
                        >
                          View Resume
                        </a>

                        <a
                          href={getResumeUrl(
                            selectedCandidate.resume_url
                          )}
                          download
                          className="resume-download-button"
                        >
                          Download
                        </a>

                      </div>

                    </div>
                  ) : (
                    <div className="candidate-no-resume">
                      No resume uploaded.
                    </div>
                  )}

                </section>

                {/* LINKS */}

                {(selectedCandidate.linkedin_url ||
                  selectedCandidate.portfolio_url ||
                  selectedCandidate.github_url) && (
                  <section className="candidate-detail-section">

                    <h3>
                      Professional Links
                    </h3>

                    <div className="candidate-links">

                      {selectedCandidate.linkedin_url && (
                        <a
                          href={
                            selectedCandidate.linkedin_url
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          LinkedIn
                        </a>
                      )}

                      {selectedCandidate.portfolio_url && (
                        <a
                          href={
                            selectedCandidate.portfolio_url
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Portfolio
                        </a>
                      )}

                      {selectedCandidate.github_url && (
                        <a
                          href={
                            selectedCandidate.github_url
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      )}

                    </div>

                  </section>
                )}

                {/* APPLICATIONS */}

                <section className="candidate-detail-section">

                  <div className="section-heading-row">

                    <h3>
                      Applications
                    </h3>

                    <span className="application-total-badge">
                      {
                        selectedCandidate.applications_count ||
                        0
                      }
                    </span>

                  </div>

                  {selectedCandidate.applications?.length ===
                  0 ? (
                    <div className="candidate-no-applications">
                      This candidate has
                      not applied for any
                      jobs yet.
                    </div>
                  ) : (
                    <div className="candidate-applications-list">

                      {selectedCandidate.applications.map(
                        (application) => (
                          <div
                            key={
                              application.application_id
                            }
                            className="candidate-application-card"
                          >

                            <div className="application-main">

                              <h4>
                                {
                                  application.job_title
                                }
                              </h4>

                              <p>
                                {
                                  application.company_name ||
                                  "Company not available"
                                }
                              </p>

                              <div className="application-meta">

                                <span>
                                  📍{" "}
                                  {
                                    application.job_location ||
                                    "Location not specified"
                                  }
                                </span>

                                <span>
                                  Applied{" "}
                                  {formatDate(
                                    application.applied_at
                                  )}
                                </span>

                                <span>
                                  {
                                    application.work_mode ||
                                    application.employment_type ||
                                    application.job_type ||
                                    "Job type not specified"
                                  }
                                </span>

                              </div>

                            </div>

                            <div className="application-side">

                              <span
                                className={`candidate-status ${getStatusClass(
                                  application.application_status
                                )}`}
                              >
                                {
                                  formatStatus(
                                    application.application_status
                                  )
                                }
                              </span>

                              {application.application_resume_url && (
                                <a
                                  href={getResumeUrl(
                                    application.application_resume_url
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Resume
                                </a>
                              )}

                            </div>

                            {/* COMPANY */}

                            <div className="application-company-details">

                              <strong>
                                Company Details
                              </strong>

                              <div className="company-detail-grid">

                                <DetailItem
                                  label="Company"
                                  value={
                                    application.company_name
                                  }
                                />

                                <DetailItem
                                  label="Email"
                                  value={
                                    application.company_email
                                  }
                                />

                                <DetailItem
                                  label="Phone"
                                  value={
                                    application.company_phone
                                  }
                                />

                                <DetailItem
                                  label="Industry"
                                  value={
                                    application.company_industry
                                  }
                                />

                                <DetailItem
                                  label="Company Size"
                                  value={
                                    application.company_size
                                  }
                                />

                                <DetailItem
                                  label="Location"
                                  value={[
                                    application.company_city,
                                    application.company_country,
                                  ]
                                    .filter(
                                      Boolean
                                    )
                                    .join(
                                      ", "
                                    )}
                                />

                                <DetailItem
                                  label="Website"
                                  value={
                                    application.company_website
                                  }
                                />

                              </div>

                              {application.company_address && (
                                <div className="company-address">
                                  <strong>
                                    Address
                                  </strong>

                                  <p>
                                    {
                                      application.company_address
                                    }
                                  </p>
                                </div>
                              )}

                            </div>

                            {/* JOB */}

                            <div className="application-job-details">

                              <strong>
                                Job Details
                              </strong>

                              <div className="company-detail-grid">

                                <DetailItem
                                  label="Experience Required"
                                  value={
                                    application.experience_required
                                  }
                                />

                                <DetailItem
                                  label="Salary"
                                  value={formatSalary(
                                    application.salary_min,
                                    application.salary_max
                                  )}
                                />

                                <DetailItem
                                  label="Industry"
                                  value={
                                    application.job_industry
                                  }
                                />

                                <DetailItem
                                  label="Job Status"
                                  value={formatStatus(
                                    application.job_status
                                  )}
                                />

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </section>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

// =====================================================
// DETAIL ITEM
// =====================================================

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="candidate-detail-item">

      <span>
        {label}
      </span>

      <strong>
        {value ||
          "Not specified"}
      </strong>

    </div>
  );
}