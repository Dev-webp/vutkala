import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "../../styles/admin/AdminApprovals.css";

const adminApi = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // SELECTED RECRUITER
  // =====================================================

  const [selectedRecruiter, setSelectedRecruiter] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [detailsError, setDetailsError] =
    useState("");


  // =====================================================
  // LOAD APPROVALS
  // =====================================================

  const loadApprovals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminApi.get(
        "/approvals"
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to load approvals."
        );
      }

      setApprovals(
        response.data.approvals || []
      );

    } catch (err) {
      console.error(
        "Admin approvals error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load approvals."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // LOAD ON PAGE OPEN
  // =====================================================

  useEffect(() => {
    loadApprovals();
  }, []);


  // =====================================================
  // VIEW COMPLETE RECRUITER / COMPANY DETAILS
  // =====================================================

  const viewCompleteDetails = async (user) => {
    try {
      setDetailsLoading(true);
      setDetailsError("");
      setSelectedRecruiter(null);

      const response = await adminApi.get(
        `/recruiters/${user.id}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to load recruiter details."
        );
      }

      setSelectedRecruiter(
        response.data.recruiter
      );

    } catch (err) {
      console.error(
        "Recruiter details error:",
        err
      );

      setDetailsError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load complete details."
      );

    } finally {
      setDetailsLoading(false);
    }
  };


  // =====================================================
  // CLOSE DETAILS MODAL
  // =====================================================

  const closeDetails = () => {
    setSelectedRecruiter(null);
    setDetailsError("");
  };


  // =====================================================
  // APPROVE
  // =====================================================

  const approveRecruiter = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to approve ${user.full_name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await adminApi.put(
        `/recruiters/${user.id}/approve`
      );

      alert(
        "Recruiter approved successfully."
      );

      closeDetails();

      await loadApprovals();

    } catch (err) {
      console.error(
        "Approve recruiter error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Unable to approve recruiter."
      );
    }
  };


  // =====================================================
  // REJECT
  // =====================================================

  const rejectRecruiter = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to reject ${user.full_name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await adminApi.put(
        `/recruiters/${user.id}/reject`
      );

      alert(
        "Recruiter rejected successfully."
      );

      closeDetails();

      await loadApprovals();

    } catch (err) {
      console.error(
        "Reject recruiter error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Unable to reject recruiter."
      );
    }
  };


  // =====================================================
  // FORMAT ROLE
  // =====================================================

  const formatRole = (role) => {
    return String(role || "")
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
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
  // INITIAL
  // =====================================================

  const getInitial = (name) => {
    return String(name || "U")
      .charAt(0)
      .toUpperCase();
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="admin-approvals-page">
        <div className="admin-approvals-loading">
          Loading approvals...
        </div>
      </div>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="admin-approvals-page">

        <div className="admin-approvals-error">

          <h2>
            Unable to load approvals
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={loadApprovals}
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
    <div className="admin-approvals-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="admin-approvals-heading">

        <div>

          <span>
            ACCOUNT MANAGEMENT
          </span>

          <h2>
            Pending Approvals
          </h2>

          <p>
            Review recruiter and company
            accounts waiting for approval.
          </p>

        </div>

        <button
          type="button"
          className="admin-approvals-refresh"
          onClick={loadApprovals}
        >
          ↻ Refresh
        </button>

      </div>


      {/* =================================================
          COUNT
      ================================================= */}

      <div className="admin-approval-count">

        <strong>
          {approvals.length}
        </strong>

        <span>
          pending{" "}
          {approvals.length === 1
            ? "approval"
            : "approvals"}
        </span>

      </div>


      {/* =================================================
          APPROVAL CARD
      ================================================= */}

      <div className="admin-approvals-card">

        {approvals.length === 0 ? (

          <div className="admin-approvals-empty">

            <div>
              ✓
            </div>

            <h3>
              All caught up
            </h3>

            <p>
              There are no accounts waiting
              for approval.
            </p>

          </div>

        ) : (

          <div className="admin-approvals-list">

            {approvals.map((user) => (

              <div
                className="admin-approval-item"
                key={user.id}
              >

                {/* =================================================
                    USER
                ================================================= */}

                <div className="admin-approval-user">

                  <div className="admin-approval-avatar">
                    {getInitial(
                      user.full_name
                    )}
                  </div>

                  <div>

                    <strong>
                      {user.full_name ||
                        "Unnamed User"}
                    </strong>

                    <span>
                      {user.email ||
                        "No email"}
                    </span>

                    <small>
                      {formatRole(
                        user.role
                      )}

                      {" • "}

                      Registered{" "}

                      {formatDate(
                        user.created_at
                      )}
                    </small>

                  </div>

                </div>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="admin-approval-actions">

                  {/* VIEW COMPLETE DETAILS */}

                  <button
                    type="button"
                    className="admin-approval-review"
                    onClick={() =>
                      viewCompleteDetails(user)
                    }
                  >
                    View Complete Details
                  </button>


                  {/* APPROVE */}

                  <button
                    type="button"
                    className="admin-approval-approve"
                    onClick={() =>
                      approveRecruiter(user)
                    }
                  >
                    Approve
                  </button>


                  {/* REJECT */}

                  <button
                    type="button"
                    className="admin-approval-reject"
                    onClick={() =>
                      rejectRecruiter(user)
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


      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {(detailsLoading ||
        detailsError ||
        selectedRecruiter) && (

        <div
          className="admin-approval-modal-overlay"
          onClick={closeDetails}
        >

          <div
            className="admin-approval-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="admin-approval-modal-header">

              <div>

                <span>
                  RECRUITER / COMPANY REVIEW
                </span>

                <h2>
                  Complete Details
                </h2>

              </div>

              <button
                type="button"
                className="admin-approval-modal-close"
                onClick={closeDetails}
              >
                ×
              </button>

            </div>


            {/* =================================================
                LOADING
            ================================================= */}

            {detailsLoading && (

              <div className="admin-approval-modal-loading">
                Loading complete details...
              </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {!detailsLoading &&
              detailsError && (

              <div className="admin-approval-modal-error">

                <h3>
                  Unable to load details
                </h3>

                <p>
                  {detailsError}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    closeDetails()
                  }
                >
                  Close
                </button>

              </div>

            )}


            {/* =================================================
                COMPLETE DETAILS
            ================================================= */}

            {!detailsLoading &&
              !detailsError &&
              selectedRecruiter && (

              <>

                <div className="admin-approval-modal-body">

                  {/* =================================================
                      RECRUITER INFORMATION
                  ================================================= */}

                  <section className="admin-detail-section">

                    <div className="admin-detail-section-title">

                      <h3>
                        Recruiter Information
                      </h3>

                    </div>


                    <div className="admin-detail-grid">

                      <div className="admin-detail-field">

                        <label>
                          Full Name
                        </label>

                        <strong>
                          {selectedRecruiter.full_name ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Email
                        </label>

                        <strong>
                          {selectedRecruiter.email ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Phone
                        </label>

                        <strong>
                          {selectedRecruiter.phone ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Role
                        </label>

                        <strong>
                          {formatRole(
                            selectedRecruiter.role
                          )}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Account Status
                        </label>

                        <strong>
                          {selectedRecruiter.status ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Email Verified
                        </label>

                        <strong>
                          {selectedRecruiter
                            .is_email_verified
                            ? "Yes"
                            : "No"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Registered On
                        </label>

                        <strong>
                          {formatDate(
                            selectedRecruiter.created_at
                          )}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Last Updated
                        </label>

                        <strong>
                          {formatDate(
                            selectedRecruiter.updated_at
                          )}
                        </strong>

                      </div>

                    </div>

                  </section>


                  {/* =================================================
                      COMPANY INFORMATION
                  ================================================= */}

                  <section className="admin-detail-section">

                    <div className="admin-detail-section-title">

                      <h3>
                        Company Information
                      </h3>

                    </div>


                    <div className="admin-detail-grid">

                      <div className="admin-detail-field admin-detail-field-wide">

                        <label>
                          Company Name
                        </label>

                        <strong>
                          {selectedRecruiter.company_name ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Company Email
                        </label>

                        <strong>
                          {selectedRecruiter.company_email ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Company Phone
                        </label>

                        <strong>
                          {selectedRecruiter.company_phone ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Website
                        </label>

                        {selectedRecruiter.website ? (

                          <a
                            href={
                              selectedRecruiter.website.startsWith(
                                "http"
                              )
                                ? selectedRecruiter.website
                                : `https://${selectedRecruiter.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedRecruiter.website}
                          </a>

                        ) : (

                          <strong>
                            —
                          </strong>

                        )}

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Industry
                        </label>

                        <strong>
                          {selectedRecruiter.industry ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Company Size
                        </label>

                        <strong>
                          {selectedRecruiter.company_size ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          City
                        </label>

                        <strong>
                          {selectedRecruiter.city ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field">

                        <label>
                          Country
                        </label>

                        <strong>
                          {selectedRecruiter.country ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field admin-detail-field-wide">

                        <label>
                          Address
                        </label>

                        <strong>
                          {selectedRecruiter.address ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field admin-detail-field-wide">

                        <label>
                          Organization Status
                        </label>

                        <strong>
                          {selectedRecruiter.organization_status ||
                            "—"}
                        </strong>

                      </div>


                      <div className="admin-detail-field admin-detail-field-wide">

                        <label>
                          Company Description
                        </label>

                        <p>
                          {selectedRecruiter.description ||
                            "No company description provided."}
                        </p>

                      </div>

                    </div>

                  </section>

                </div>


                {/* =================================================
                    MODAL FOOTER
                ================================================= */}

                <div className="admin-approval-modal-footer">

                  <button
                    type="button"
                    className="admin-modal-cancel-button"
                    onClick={closeDetails}
                  >
                    Close
                  </button>


                  <button
                    type="button"
                    className="admin-modal-reject-button"
                    onClick={() =>
                      rejectRecruiter(
                        selectedRecruiter
                      )
                    }
                  >
                    Reject
                  </button>


                  <button
                    type="button"
                    className="admin-modal-approve-button"
                    onClick={() =>
                      approveRecruiter(
                        selectedRecruiter
                      )
                    }
                  >
                    Approve Recruiter
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}