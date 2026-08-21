import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import "../../styles/admin/AdminUsers.css";

const adminApi = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});

export default function AdminUsers() {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("ALL");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await adminApi.get("/users");

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to load users."
        );
      }

      setUsers(
        response.data.users || []
      );

    } catch (err) {
      console.error(
        "Admin users error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load users."
      );

    } finally {
      setLoading(false);
    }
  };

  const filteredUsers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return users.filter(
        (user) => {
          const matchesSearch =
            !query ||
            String(
              user.full_name || ""
            )
              .toLowerCase()
              .includes(query) ||
            String(
              user.email || ""
            )
              .toLowerCase()
              .includes(query) ||
            String(
              user.phone || ""
            )
              .toLowerCase()
              .includes(query);

          const matchesRole =
            roleFilter === "ALL" ||
            String(
              user.role || ""
            ).toUpperCase() ===
              roleFilter;

          const matchesStatus =
            statusFilter === "ALL" ||
            String(
              user.status || ""
            ).toUpperCase() ===
              statusFilter;

          return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
          );
        }
      );
    }, [
      users,
      search,
      roleFilter,
      statusFilter,
    ]);

  const formatRole = (role) => {
    return String(role || "")
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getInitial = (name) => {
    return String(
      name || "U"
    )
      .charAt(0)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="admin-users-page">
        <div className="admin-users-loading">
          Loading users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users-page">
        <div className="admin-users-error">
          <h2>
            Unable to load users
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={loadUsers}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">

      {/* PAGE HEADER */}

      <div className="admin-users-heading">
        <div>
          <span>
            USER MANAGEMENT
          </span>

          <h2>
            Users
          </h2>

          <p>
            Manage job seekers,
            recruiters and administrators.
          </p>
        </div>

        <button
          type="button"
          className="admin-users-refresh"
          onClick={loadUsers}
        >
          ↻ Refresh
        </button>
      </div>


      {/* FILTER BAR */}

      <div className="admin-users-toolbar">

        <div className="admin-users-search">
          <span>
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search name, email or phone..."
          />
        </div>


        <select
          value={roleFilter}
          onChange={(event) =>
            setRoleFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Roles
          </option>

          <option value="JOB_SEEKER">
            Job Seeker
          </option>

          <option value="RECRUITER">
            Recruiter
          </option>

          <option value="ADMIN">
            Admin
          </option>
        </select>


        <select
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

          <option value="APPROVED">
            Approved
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="BLOCKED">
            Blocked
          </option>

          <option value="SUSPENDED">
            Suspended
          </option>
        </select>

      </div>


      {/* SUMMARY */}

      <div className="admin-users-summary">
        <strong>
          {filteredUsers.length}
        </strong>

        <span>
          {filteredUsers.length === 1
            ? "user found"
            : "users found"}
        </span>
      </div>


      {/* TABLE */}

      <div className="admin-users-card">

        {filteredUsers.length === 0 ? (
          <div className="admin-users-empty">
            <div>
              ⌕
            </div>

            <h3>
              No users found
            </h3>

            <p>
              Try changing your search
              or filters.
            </p>
          </div>
        ) : (
          <div className="admin-users-table-wrapper">

            <table className="admin-users-table">

              <thead>
                <tr>
                  <th>
                    USER
                  </th>

                  <th>
                    EMAIL
                  </th>

                  <th>
                    PHONE
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

                  <th>
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredUsers.map(
                  (user) => (
                    <tr key={user.id}>

                      <td>
                        <div className="admin-users-user">

                          <div className="admin-users-avatar">
                            {getInitial(
                              user.full_name
                            )}
                          </div>

                          <div>
                            <strong>
                              {user.full_name ||
                                "Unnamed User"}
                            </strong>

                            <small>
                              {user.id}
                            </small>
                          </div>

                        </div>
                      </td>

                      <td>
                        {user.email || "—"}
                      </td>

                      <td>
                        {user.phone || "—"}
                      </td>

                      <td>
                        <span className="admin-users-role">
                          {formatRole(
                            user.role
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`admin-users-status admin-users-status-${String(
                            user.status || ""
                          ).toLowerCase()}`}
                        >
                          {user.status ||
                            "UNKNOWN"}
                        </span>
                      </td>

                      <td>
                        {formatDate(
                          user.created_at
                        )}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="admin-users-action"
                          onClick={() =>
                            alert(
                              `User details for ${
                                user.full_name ||
                                user.email
                              }`
                            )
                          }
                        >
                          View
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

    </div>
  );
}