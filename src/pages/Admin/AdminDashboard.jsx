import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "../../styles/admin/AdminDashboard.css";

const adminApi = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    jobSeekers: 0,
    recruiters: 0,
    companies: 0,
    activeJobs: 0,
    pendingApprovals: 0,
  });

  const [recentUsers, setRecentUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await adminApi.get(
          "/dashboard"
        );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to load dashboard."
        );
      }

      const data =
        response.data;

      setStats({
        totalUsers:
          data.stats?.totalUsers || 0,

        jobSeekers:
          data.stats?.jobSeekers || 0,

        recruiters:
          data.stats?.recruiters || 0,

        companies:
          data.stats?.companies || 0,

        activeJobs:
          data.stats?.activeJobs || 0,

        pendingApprovals:
          data.stats?.pendingApprovals || 0,
      });

      setRecentUsers(
        data.recentUsers || []
      );

    } catch (err) {
      console.error(
        "Admin dashboard error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load dashboard."
      );

    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (number) => {
    return Number(number || 0)
      .toLocaleString("en-IN");
  };

  const getStatusClass = (status) => {
    const value =
      String(status || "")
        .toLowerCase();

    if (value === "approved") {
      return "status-approved";
    }

    if (value === "pending") {
      return "status-pending";
    }

    if (
      value === "blocked" ||
      value === "suspended"
    ) {
      return "status-blocked";
    }

    return "status-default";
  };

  const formatRole = (role) => {
    return String(role || "")
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard-loading">
          <div className="admin-dashboard-spinner" />

          <h2>
            Loading dashboard...
          </h2>

          <p>
            Fetching platform statistics.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard-error">
          <div className="admin-dashboard-error-icon">
            !
          </div>

          <h2>
            Unable to load dashboard
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={loadDashboard}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="admin-page-heading">
        <div>
          <span className="admin-page-eyebrow">
            OVERVIEW
          </span>

          <h2>
            Dashboard
          </h2>

          <p>
            Monitor your recruitment platform
            from one place.
          </p>
        </div>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={loadDashboard}
        >
          ↻ Refresh
        </button>
      </div>


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <section className="admin-stat-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-blue">
            ♙
          </div>

          <div className="admin-stat-content">
            <span>
              TOTAL USERS
            </span>

            <strong>
              {formatNumber(
                stats.totalUsers
              )}
            </strong>

            <small>
              All registered accounts
            </small>
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-pink">
            ♧
          </div>

          <div className="admin-stat-content">
            <span>
              JOB SEEKERS
            </span>

            <strong>
              {formatNumber(
                stats.jobSeekers
              )}
            </strong>

            <small>
              Registered candidates
            </small>
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-orange">
            ♙
          </div>

          <div className="admin-stat-content">
            <span>
              RECRUITERS
            </span>

            <strong>
              {formatNumber(
                stats.recruiters
              )}
            </strong>

            <small>
              Recruiter accounts
            </small>
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-purple">
            ▣
          </div>

          <div className="admin-stat-content">
            <span>
              COMPANIES
            </span>

            <strong>
              {formatNumber(
                stats.companies
              )}
            </strong>

            <small>
              Registered companies
            </small>
          </div>
        </div>


        <div className="admin-stat-card">
          <div className="admin-stat-icon admin-stat-icon-green">
            ▤
          </div>

          <div className="admin-stat-content">
            <span>
              ACTIVE JOBS
            </span>

            <strong>
              {formatNumber(
                stats.activeJobs
              )}
            </strong>

            <small>
              Currently active
            </small>
          </div>
        </div>


        <div className="admin-stat-card admin-stat-card-alert">
          <div className="admin-stat-icon admin-stat-icon-red">
            !
          </div>

          <div className="admin-stat-content">
            <span>
              PENDING APPROVALS
            </span>

            <strong>
              {formatNumber(
                stats.pendingApprovals
              )}
            </strong>

            <small>
              Require admin attention
            </small>
          </div>
        </div>

      </section>


      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <section className="admin-dashboard-grid">

        {/* PLATFORM OVERVIEW */}

        <div className="admin-dashboard-card admin-overview-card">

          <div className="admin-card-heading">
            <div>
              <span>
                PLATFORM
              </span>

              <h3>
                Platform Overview
              </h3>
            </div>
          </div>

          <div className="admin-overview-list">

            <div className="admin-overview-row">
              <div>
                <span className="overview-dot blue" />
                Total Users
              </div>

              <strong>
                {formatNumber(
                  stats.totalUsers
                )}
              </strong>
            </div>


            <div className="admin-overview-row">
              <div>
                <span className="overview-dot pink" />
                Job Seekers
              </div>

              <strong>
                {formatNumber(
                  stats.jobSeekers
                )}
              </strong>
            </div>


            <div className="admin-overview-row">
              <div>
                <span className="overview-dot orange" />
                Recruiters
              </div>

              <strong>
                {formatNumber(
                  stats.recruiters
                )}
              </strong>
            </div>


            <div className="admin-overview-row">
              <div>
                <span className="overview-dot green" />
                Active Jobs
              </div>

              <strong>
                {formatNumber(
                  stats.activeJobs
                )}
              </strong>
            </div>

          </div>
        </div>


        {/* APPROVAL CARD */}

        <div className="admin-dashboard-card admin-approval-summary">

          <div className="admin-card-heading">
            <div>
              <span>
                ACTION REQUIRED
              </span>

              <h3>
                Pending Approvals
              </h3>
            </div>

            <a
              href="/admin/approvals"
              className="admin-view-all"
            >
              View All →
            </a>
          </div>

          <div className="admin-approval-number">
            <strong>
              {formatNumber(
                stats.pendingApprovals
              )}
            </strong>

            <span>
              accounts waiting for review
            </span>
          </div>

          <a
            href="/admin/approvals"
            className="admin-review-button"
          >
            Review Approvals
          </a>

        </div>

      </section>


      {/* =====================================================
          RECENT USERS
      ===================================================== */}

      <section className="admin-dashboard-card admin-recent-users">

        <div className="admin-card-heading">
          <div>
            <span>
              RECENT ACTIVITY
            </span>

            <h3>
              Recently Registered Users
            </h3>
          </div>

          <a
            href="/admin/users"
            className="admin-view-all"
          >
            View All →
          </a>
        </div>


        {recentUsers.length === 0 ? (
          <div className="admin-empty-state">
            <div>
              ♙
            </div>

            <h4>
              No recent users
            </h4>

            <p>
              Newly registered users will
              appear here.
            </p>
          </div>
        ) : (
          <div className="admin-user-table-wrapper">

            <table className="admin-user-table">

              <thead>
                <tr>
                  <th>
                    USER
                  </th>

                  <th>
                    EMAIL
                  </th>

                  <th>
                    ROLE
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    CREATED
                  </th>
                </tr>
              </thead>

              <tbody>

                {recentUsers.map(
                  (user) => (
                    <tr key={user.id}>

                      <td>
                        <div className="admin-user-cell">

                          <div className="admin-user-avatar">
                            {(
                              user.full_name ||
                              "U"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {user.full_name ||
                              "Unnamed User"}
                          </strong>

                        </div>
                      </td>

                      <td>
                        {user.email || "—"}
                      </td>

                      <td>
                        <span className="admin-role">
                          {formatRole(
                            user.role
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-status ${getStatusClass(
                            user.status
                          )}`}
                        >
                          {user.status ||
                            "Unknown"}
                        </span>
                      </td>

                      <td>
                        {user.created_at
                          ? new Date(
                              user.created_at
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "—"}
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </section>

    </div>
  );
}