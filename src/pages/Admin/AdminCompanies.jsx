import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "./AdminCompanies.css";


/* =========================================================
   API
========================================================= */

const companiesApi = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
});


/* =========================================================
   ADMIN COMPANIES
========================================================= */

function AdminCompanies() {

  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [selectedCompany, setSelectedCompany] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(null);


  /* =======================================================
     LOAD COMPANIES
  ======================================================= */

  const loadCompanies = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await companiesApi.get(
          "/companies"
        );

      if (
        response.data?.success
      ) {

        setCompanies(
          Array.isArray(
            response.data.companies
          )
            ? response.data.companies
            : []
        );

      } else {

        setError(
          response.data?.message ||
            "Unable to load companies."
        );

      }

    } catch (err) {

      console.error(
        "Admin companies error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load companies."
      );

    } finally {

      setLoading(false);

    }
  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    loadCompanies();

  }, []);


  /* =======================================================
     FILTER COMPANIES
  ======================================================= */

  const filteredCompanies =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();


      return companies.filter(
        (company) => {

          const companyName =
            String(
              company.company_name ||
                company.name ||
                ""
            ).toLowerCase();


          const email =
            String(
              company.company_email ||
                company.email ||
                ""
            ).toLowerCase();


          const industry =
            String(
              company.industry ||
                company.company_industry ||
                ""
            ).toLowerCase();


          const city =
            String(
              company.city ||
                company.company_city ||
                ""
            ).toLowerCase();


          const country =
            String(
              company.country ||
                company.company_country ||
                ""
            ).toLowerCase();


          const status =
            String(
              company.status ||
                company.organization_status ||
                ""
            ).toUpperCase();


          const matchesSearch =
            !searchValue ||
            companyName.includes(
              searchValue
            ) ||
            email.includes(
              searchValue
            ) ||
            industry.includes(
              searchValue
            ) ||
            city.includes(
              searchValue
            ) ||
            country.includes(
              searchValue
            );


          const matchesStatus =
            statusFilter === "ALL" ||
            status === statusFilter;


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );

    }, [
      companies,
      search,
      statusFilter,
    ]);


  /* =======================================================
     COUNTS
  ======================================================= */

  const companyCounts =
    useMemo(() => {

      return {
        total: companies.length,

        approved:
          companies.filter(
            (company) =>
              String(
                company.status ||
                  company.organization_status ||
                  ""
              ).toUpperCase() ===
              "APPROVED"
          ).length,

        pending:
          companies.filter(
            (company) =>
              String(
                company.status ||
                  company.organization_status ||
                  ""
              ).toUpperCase() ===
              "PENDING"
          ).length,

        blocked:
          companies.filter(
            (company) =>
              String(
                company.status ||
                  company.organization_status ||
                  ""
              ).toUpperCase() ===
              "BLOCKED"
          ).length,
      };

    }, [companies]);


  /* =======================================================
     GET STATUS
  ======================================================= */

  const getStatus = (company) => {

    return String(
      company.status ||
        company.organization_status ||
        "PENDING"
    ).toUpperCase();

  };


  /* =======================================================
     GET COMPANY NAME
  ======================================================= */

  const getCompanyName = (company) => {

    return (
      company.company_name ||
      company.name ||
      "Unnamed Company"
    );

  };


  /* =======================================================
     GET LOCATION
  ======================================================= */

  const getLocation = (company) => {

    const city =
      company.city ||
      company.company_city ||
      "";

    const country =
      company.country ||
      company.company_country ||
      "";

    if (city && country) {
      return `${city}, ${country}`;
    }

    return (
      city ||
      country ||
      "Location not provided"
    );

  };


  /* =======================================================
     BLOCK COMPANY
  ======================================================= */

  const handleBlock = async (company) => {

    const companyId =
      company.id ||
      company.organization_id;


    if (!companyId) {
      return;
    }


    const confirmed =
      window.confirm(
        `Block "${getCompanyName(
          company
        )}"?\n\nThis will prevent the company from posting new jobs.`
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(
        `block-${companyId}`
      );

      setError("");


      await companiesApi.put(
        `/companies/${companyId}/block`
      );


      await loadCompanies();

    } catch (err) {

      console.error(
        "Block company error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to block company."
      );

    } finally {

      setActionLoading(null);

    }
  };


  /* =======================================================
     UNBLOCK COMPANY
  ======================================================= */

  const handleUnblock =
    async (company) => {

      const companyId =
        company.id ||
        company.organization_id;


      if (!companyId) {
        return;
      }


      try {

        setActionLoading(
          `unblock-${companyId}`
        );

        setError("");


        await companiesApi.put(
          `/companies/${companyId}/unblock`
        );


        await loadCompanies();

      } catch (err) {

        console.error(
          "Unblock company error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to unblock company."
        );

      } finally {

        setActionLoading(null);

      }
    };


  /* =======================================================
     DELETE COMPANY
  ======================================================= */

  const handleDelete =
    async (company) => {

      const companyId =
        company.id ||
        company.organization_id;


      if (!companyId) {
        return;
      }


      const confirmed =
        window.confirm(
          `Delete "${getCompanyName(
            company
          )}" permanently?\n\nThis action cannot be undone.`
        );


      if (!confirmed) {
        return;
      }


      try {

        setActionLoading(
          `delete-${companyId}`
        );

        setError("");


        await companiesApi.delete(
          `/companies/${companyId}`
        );


        setSelectedCompany(null);


        await loadCompanies();

      } catch (err) {

        console.error(
          "Delete company error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to delete company."
        );

      } finally {

        setActionLoading(null);

      }
    };


  /* =======================================================
     VIEW COMPANY
  ======================================================= */

  const handleView =
    (company) => {

      setSelectedCompany(
        company
      );

    };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (
      <div className="admin-companies-page">

        <div className="admin-companies-loading">

          <div className="admin-companies-spinner" />

          <h2>
            Loading Companies
          </h2>

          <p>
            Please wait while company
            information is loaded.
          </p>

        </div>

      </div>
    );

  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (

    <div className="admin-companies-page">

      <div className="admin-companies-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="admin-companies-header">

          <div>

            <span className="admin-companies-eyebrow">
              ADMINISTRATION
            </span>

            <h1>
              Companies
            </h1>

            <p>
              Manage organizations,
              recruiters and company
              job-posting access.
            </p>

          </div>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="admin-companies-error">

            <span>!</span>

            <div>
              {error}
            </div>

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
            STATISTICS
        ================================================= */}

        <div className="admin-companies-stats">

          <div className="admin-company-stat">

            <span>
              Total Companies
            </span>

            <strong>
              {companyCounts.total}
            </strong>

          </div>


          <div className="admin-company-stat">

            <span>
              Approved
            </span>

            <strong>
              {companyCounts.approved}
            </strong>

          </div>


          <div className="admin-company-stat">

            <span>
              Pending
            </span>

            <strong>
              {companyCounts.pending}
            </strong>

          </div>


          <div className="admin-company-stat">

            <span>
              Blocked
            </span>

            <strong>
              {companyCounts.blocked}
            </strong>

          </div>

        </div>


        {/* =================================================
            SEARCH / FILTER
        ================================================= */}

        <div className="admin-companies-toolbar">

          <div className="admin-company-search">

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
              placeholder="Search company, email, industry or location..."
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

            <option value="APPROVED">
              Approved
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="BLOCKED">
              Blocked
            </option>

            <option value="REJECTED">
              Rejected
            </option>

          </select>


          <button
            type="button"
            className="admin-companies-refresh"
            onClick={loadCompanies}
            disabled={loading}
          >
            Refresh
          </button>

        </div>


        {/* =================================================
            RESULTS
        ================================================= */}

        <div className="admin-companies-results-header">

          <div>

            <span>
              COMPANY DIRECTORY
            </span>

            <h2>
              {filteredCompanies.length}
              {" "}
              {filteredCompanies.length === 1
                ? "Company"
                : "Companies"}
            </h2>

          </div>

        </div>


        {/* =================================================
            EMPTY
        ================================================= */}

        {filteredCompanies.length === 0 ? (

          <div className="admin-companies-empty">

            <div className="admin-companies-empty-icon">
              🏢
            </div>

            <h3>
              No companies found
            </h3>

            <p>
              No companies match your
              current search or filter.
            </p>

            <button
              type="button"
              onClick={() => {

                setSearch("");

                setStatusFilter(
                  "ALL"
                );

              }}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          /* =================================================
             COMPANY TABLE
          ================================================= */

          <div className="admin-companies-table-card">

            <div className="admin-companies-table">


              {/* HEADER */}

              <div className="admin-companies-table-header">

                <span>
                  COMPANY
                </span>

                <span>
                  INDUSTRY
                </span>

                <span>
                  LOCATION
                </span>

                <span>
                  CONTACT
                </span>

                <span>
                  STATUS
                </span>

                <span>
                  ACTIONS
                </span>

              </div>


              {/* ROWS */}

              {filteredCompanies.map(
                (company) => {

                  const companyId =
                    company.id ||
                    company.organization_id;

                  const status =
                    getStatus(
                      company
                    );

                  const companyName =
                    getCompanyName(
                      company
                    );

                  return (

                    <div
                      className="admin-company-row"
                      key={companyId}
                    >


                      {/* COMPANY */}

                      <div className="admin-company-main">

                        <div className="admin-company-logo">

                          {(
                            company.logo_url ||
                            company.logo
                          ) ? (

                            <img
                              src={
                                company.logo_url ||
                                company.logo
                              }
                              alt={
                                companyName
                              }
                            />

                          ) : (

                            companyName
                              .charAt(0)
                              .toUpperCase()

                          )}

                        </div>


                        <div>

                          <h3>
                            {companyName}
                          </h3>

                          <p>
                            {company.company_email ||
                              company.email ||
                              "No email"}
                          </p>

                        </div>

                      </div>


                      {/* INDUSTRY */}

                      <div className="admin-company-cell">

                        {
                          company.industry ||
                          company.company_industry ||
                          "—"
                        }

                      </div>


                      {/* LOCATION */}

                      <div className="admin-company-cell">

                        {getLocation(
                          company
                        )}

                      </div>


                      {/* CONTACT */}

                      <div className="admin-company-cell">

                        <strong>
                          {
                            company.company_email ||
                            company.email ||
                            "—"
                          }
                        </strong>

                        <small>
                          {
                            company.phone ||
                            company.company_phone ||
                            "No phone"
                          }
                        </small>

                      </div>


                      {/* STATUS */}

                      <div>

                        <span
                          className={`admin-company-status ${status.toLowerCase()}`}
                        >
                          {status}
                        </span>

                      </div>


                      {/* ACTIONS */}

                      <div className="admin-company-actions">


                        <button
                          type="button"
                          className="admin-company-view-btn"
                          onClick={() =>
                            handleView(
                              company
                            )
                          }
                        >
                          View
                        </button>


                        {status === "BLOCKED" ? (

                          <button
                            type="button"
                            className="admin-company-unblock-btn"
                            disabled={
                              actionLoading ===
                              `unblock-${companyId}`
                            }
                            onClick={() =>
                              handleUnblock(
                                company
                              )
                            }
                          >

                            {actionLoading ===
                            `unblock-${companyId}`
                              ? "..."
                              : "Unblock"}

                          </button>

                        ) : (

                          <button
                            type="button"
                            className="admin-company-block-btn"
                            disabled={
                              actionLoading ===
                              `block-${companyId}`
                            }
                            onClick={() =>
                              handleBlock(
                                company
                              )
                            }
                          >

                            {actionLoading ===
                            `block-${companyId}`
                              ? "..."
                              : "Block"}

                          </button>

                        )}


                        <button
                          type="button"
                          className="admin-company-delete-btn"
                          disabled={
                            actionLoading ===
                            `delete-${companyId}`
                          }
                          onClick={() =>
                            handleDelete(
                              company
                            )
                          }
                        >

                          {actionLoading ===
                          `delete-${companyId}`
                            ? "..."
                            : "Delete"}

                        </button>


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
          COMPANY DETAILS MODAL
      ================================================= */}

      {selectedCompany && (

        <div
          className="admin-company-modal-overlay"
          onClick={() =>
            setSelectedCompany(null)
          }
        >

          <div
            className="admin-company-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            <div className="admin-company-modal-header">

              <div>

                <span>
                  COMPANY DETAILS
                </span>

                <h2>
                  {
                    getCompanyName(
                      selectedCompany
                    )
                  }
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedCompany(
                    null
                  )
                }
              >
                ×
              </button>

            </div>


            <div className="admin-company-modal-body">


              <div className="admin-company-detail">

                <span>
                  Company Name
                </span>

                <strong>
                  {
                    getCompanyName(
                      selectedCompany
                    )
                  }
                </strong>

              </div>


              <div className="admin-company-detail">

                <span>
                  Email
                </span>

                <strong>
                  {
                    selectedCompany.company_email ||
                    selectedCompany.email ||
                    "Not provided"
                  }
                </strong>

              </div>


              <div className="admin-company-detail">

                <span>
                  Phone
                </span>

                <strong>
                  {
                    selectedCompany.phone ||
                    selectedCompany.company_phone ||
                    "Not provided"
                  }
                </strong>

              </div>


              <div className="admin-company-detail">

                <span>
                  Industry
                </span>

                <strong>
                  {
                    selectedCompany.industry ||
                    selectedCompany.company_industry ||
                    "Not provided"
                  }
                </strong>

              </div>


              <div className="admin-company-detail">

                <span>
                  Location
                </span>

                <strong>
                  {
                    getLocation(
                      selectedCompany
                    )
                  }
                </strong>

              </div>


              <div className="admin-company-detail">

                <span>
                  Website
                </span>

                <strong>
                  {
                    selectedCompany.website ||
                    "Not provided"
                  }
                </strong>

              </div>


              <div className="admin-company-detail">

                <span>
                  Company Size
                </span>

                <strong>
                  {
                    selectedCompany.company_size ||
                    "Not provided"
                  }
                </strong>

              </div>


              <div className="admin-company-detail">

                <span>
                  Status
                </span>

                <strong>

                  <span
                    className={`admin-company-status ${getStatus(
                      selectedCompany
                    ).toLowerCase()}`}
                  >
                    {
                      getStatus(
                        selectedCompany
                      )
                    }
                  </span>

                </strong>

              </div>


              <div className="admin-company-detail-full">

                <span>
                  Description
                </span>

                <p>
                  {
                    selectedCompany.description ||
                    selectedCompany.company_description ||
                    "No description provided."
                  }
                </p>

              </div>

            </div>


            <div className="admin-company-modal-footer">

              <button
                type="button"
                onClick={() =>
                  setSelectedCompany(
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


export default AdminCompanies;