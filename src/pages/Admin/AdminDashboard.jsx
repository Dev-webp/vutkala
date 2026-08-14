import React, { useEffect, useState } from "react";
import {
  getPendingRecruiters,
  approveRecruiter,
  rejectRecruiter,
} from "../../services/adminService";

function AdminDashboard() {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const loadPendingRecruiters = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPendingRecruiters();

      if (response.data.success) {
        setRecruiters(response.data.recruiters || []);
      } else {
        setError(
          response.data.message ||
            "Unable to load recruiters."
        );
      }
    } catch (error) {
      console.error(
        "Load pending recruiters error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load pending recruiters."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingRecruiters();
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);
      setError("");

      const response = await approveRecruiter(id);

      if (response.data.success) {
        setRecruiters((current) =>
          current.filter(
            (recruiter) => recruiter.id !== id
          )
        );
      } else {
        setError(
          response.data.message ||
            "Unable to approve recruiter."
        );
      }
    } catch (error) {
      console.error(
        "Approve recruiter error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to approve recruiter."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this recruiter?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(id);
      setError("");

      const response = await rejectRecruiter(id);

      if (response.data.success) {
        setRecruiters((current) =>
          current.filter(
            (recruiter) => recruiter.id !== id
          )
        );
      } else {
        setError(
          response.data.message ||
            "Unable to reject recruiter."
        );
      }
    } catch (error) {
      console.error(
        "Reject recruiter error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to reject recruiter."
      );
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <p>Loading pending recruiters...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      <p>
        Review and manage recruiter applications.
      </p>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      <div className="admin-section">

        <h2>
          Pending Recruiters
        </h2>

        {recruiters.length === 0 ? (
          <p>
            No pending recruiter applications.
          </p>
        ) : (
          <div className="recruiter-list">

            {recruiters.map((recruiter) => (

              <div
                className="recruiter-card"
                key={recruiter.id}
              >

                <h3>
                  {recruiter.full_name}
                </h3>

                <p>
                  <strong>Email:</strong>{" "}
                  {recruiter.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {recruiter.phone || "Not provided"}
                </p>

                <p>
                  <strong>Company:</strong>{" "}
                  {recruiter.company_name ||
                    "Not provided"}
                </p>

                <p>
                  <strong>Company Email:</strong>{" "}
                  {recruiter.company_email ||
                    "Not provided"}
                </p>

                <p>
                  <strong>Industry:</strong>{" "}
                  {recruiter.industry ||
                    "Not provided"}
                </p>

                <p>
                  <strong>Company Size:</strong>{" "}
                  {recruiter.company_size ||
                    "Not provided"}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {[
                    recruiter.city,
                    recruiter.country,
                  ]
                    .filter(Boolean)
                    .join(", ") ||
                    "Not provided"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {recruiter.status}
                </p>

                <div className="recruiter-actions">

                  <button
                    type="button"
                    onClick={() =>
                      handleApprove(recruiter.id)
                    }
                    disabled={
                      actionLoading === recruiter.id
                    }
                  >
                    {actionLoading === recruiter.id
                      ? "Processing..."
                      : "Approve"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleReject(recruiter.id)
                    }
                    disabled={
                      actionLoading === recruiter.id
                    }
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;