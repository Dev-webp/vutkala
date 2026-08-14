import React, { useMemo, useState } from "react";

import "./Applications.css";

function Applications() {
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Temporary data for UI design.
  // We will replace this with the API later.
  const applications = [
    {
      id: 1,
      candidateName: "John Smith",
      email: "john@email.com",
      jobTitle: "React Developer",
      appliedDate: "2026-08-10",
      status: "NEW",
    },
    {
      id: 2,
      candidateName: "Anil Sharma",
      email: "anil@email.com",
      jobTitle: "Node Developer",
      appliedDate: "2026-08-09",
      status: "UNDER_REVIEW",
    },
    {
      id: 3,
      candidateName: "Rahul Kumar",
      email: "rahul@email.com",
      jobTitle: "React Developer",
      appliedDate: "2026-08-08",
      status: "SHORTLISTED",
    },
  ];

  const jobs = [
    ...new Set(
      applications.map(
        (application) => application.jobTitle
      )
    ),
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.candidateName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesJob =
        jobFilter === "ALL" ||
        application.jobTitle === jobFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        application.status === statusFilter;

      return (
        matchesSearch &&
        matchesJob &&
        matchesStatus
      );
    });
  }, [
    applications,
    search,
    jobFilter,
    statusFilter,
  ]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="applications-page">

      {/* HEADER */}

      <div className="applications-header">

        <div>
          <span className="applications-eyebrow">
            RECRUITMENT
          </span>

          <h1>
            Applications
          </h1>

          <p>
            Review and manage candidates who
            applied to your jobs.
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


      {/* FILTER BAR */}

      <div className="applications-toolbar">

        <div className="application-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={jobFilter}
          onChange={(e) =>
            setJobFilter(e.target.value)
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


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="ALL">
            All Status
          </option>

          <option value="NEW">
            New
          </option>

          <option value="UNDER_REVIEW">
            Under Review
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


      {/* APPLICATION TABLE */}

      <div className="applications-card">

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


        {filteredApplications.length === 0 ? (

          <div className="applications-empty">

            <div className="empty-candidate-icon">
              +
            </div>

            <h3>
              No applications found
            </h3>

            <p>
              Try changing your filters or
              search criteria.
            </p>

          </div>

        ) : (

          filteredApplications.map(
            (application) => (

              <div
                className="application-row"
                key={application.id}
              >

                {/* CANDIDATE */}

                <div className="candidate-cell">

                  <div className="candidate-avatar">
                    {getInitials(
                      application.candidateName
                    )}
                  </div>

                  <div>
                    <h3>
                      {application.candidateName}
                    </h3>

                    <p>
                      {application.email}
                    </p>
                  </div>

                </div>


                {/* POSITION */}

                <div className="position-cell">
                  {application.jobTitle}
                </div>


                {/* DATE */}

                <div className="date-cell">
                  {formatDate(
                    application.appliedDate
                  )}
                </div>


                {/* STATUS */}

                <div>
                  <span
                    className={`application-status ${application.status.toLowerCase()}`}
                  >
                    {application.status.replace(
                      "_",
                      " "
                    )}
                  </span>
                </div>


                {/* ACTION */}

                <div>
                  <button
                    type="button"
                    className="application-view-btn"
                  >
                    View
                  </button>
                </div>

              </div>

            )
          )

        )}

      </div>

    </div>
  );
}

export default Applications;