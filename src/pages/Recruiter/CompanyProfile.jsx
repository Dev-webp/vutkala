import React, { useEffect, useState } from "react";
import {
  getMyOrganization,
  updateMyOrganization,
} from "../../services/organizationService";

import "./CompanyProfile.css";

function CompanyProfile() {
  const [company, setCompany] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    website: "",
    industry: "",
    company_size: "",
    address: "",
    city: "",
    country: "",
    description: "",
    status: "",
  });

  const [originalCompany, setOriginalCompany] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  // =====================================================
  // LOAD COMPANY
  // =====================================================

  useEffect(() => {
    loadCompany();
  }, []);


  const loadCompany = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMyOrganization();

      if (!response.data.success) {
        setError(
          response.data.message ||
            "Unable to load company information."
        );
        return;
      }

      const organization =
        response.data.organization;

      if (!organization) {
        setError(
          "Company information was not found."
        );
        return;
      }

      const companyData = {
        company_name:
          organization.company_name || "",

        company_email:
          organization.company_email || "",

        company_phone:
          organization.company_phone || "",

        website:
          organization.website || "",

        industry:
          organization.industry || "",

        company_size:
          organization.company_size || "",

        address:
          organization.address || "",

        city:
          organization.city || "",

        country:
          organization.country || "",

        description:
          organization.description || "",

        status:
          organization.status || "",
      };

      setCompany(companyData);
      setOriginalCompany(companyData);

    } catch (error) {
      console.error(
        "Load company error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load company information."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setCompany((current) => ({
      ...current,
      [name]: value,
    }));
  };


  // =====================================================
  // START EDIT
  // =====================================================

  const handleEdit = () => {
    setError("");
    setIsEditing(true);
  };


  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    if (originalCompany) {
      setCompany(originalCompany);
    }

    setError("");
    setIsEditing(false);
  };


  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const response =
        await updateMyOrganization({
          company_name:
            company.company_name,

          company_email:
            company.company_email,

          company_phone:
            company.company_phone,

          website:
            company.website,

          industry:
            company.industry,

          company_size:
            company.company_size,

          address:
            company.address,

          city:
            company.city,

          country:
            company.country,

          description:
            company.description,
        });

      if (!response.data.success) {
        setError(
          response.data.message ||
            "Unable to update company profile."
        );

        return;
      }

      const updated =
        response.data.organization;

      const updatedCompany = {
        company_name:
          updated.company_name || "",

        company_email:
          updated.company_email || "",

        company_phone:
          updated.company_phone || "",

        website:
          updated.website || "",

        industry:
          updated.industry || "",

        company_size:
          updated.company_size || "",

        address:
          updated.address || "",

        city:
          updated.city || "",

        country:
          updated.country || "",

        description:
          updated.description || "",

        status:
          updated.status || "",
      };

      setCompany(updatedCompany);
      setOriginalCompany(updatedCompany);

      setIsEditing(false);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3500);

    } catch (error) {
      console.error(
        "Update company error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update company profile."
      );

    } finally {
      setSaving(false);
    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="company-profile-page">

        <div className="company-loading">
          <div className="company-loading-spinner" />
          <span>
            Loading company profile...
          </span>
        </div>

      </div>
    );
  }


  // =====================================================
  // INITIALS
  // =====================================================

  const companyInitials =
    company.company_name
      ? company.company_name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((word) =>
            word.charAt(0).toUpperCase()
          )
          .join("")
      : "CO";


  return (
    <div className="company-profile-page">


      {/* =================================================
          SUCCESS TOAST
      ================================================= */}

      {success && (
        <div className="company-success-toast">

          <div className="success-check">
            ✓
          </div>

          <div className="success-content">

            <strong>
              Update Successful
            </strong>

            <span>
              Company profile updated successfully.
            </span>

          </div>

          <button
            type="button"
            className="success-close"
            onClick={() =>
              setSuccess(false)
            }
          >
            ×
          </button>

        </div>
      )}


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="company-page-header">

        <div>

          <span className="company-eyebrow">
            ORGANIZATION
          </span>

          <h1>
            Company Profile
          </h1>

          <p>
            Manage how your organization
            appears to candidates and
            recruiters.
          </p>

        </div>


        <div className="company-header-actions">

          {!isEditing ? (

            <button
              type="button"
              className="company-edit-button"
              onClick={handleEdit}
            >
              <span>✎</span>
              Edit Profile
            </button>

          ) : (

            <>
              <button
                type="button"
                className="company-cancel-button"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                form="company-profile-form"
                className="company-save-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </>

          )}

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="company-error">
          <span>!</span>
          {error}
        </div>
      )}


      {/* =================================================
          COMPANY IDENTITY CARD
      ================================================= */}

      <div className="company-identity-card">

        <div className="company-identity-left">

          <div className="company-avatar">

            {companyInitials}

          </div>


          <div className="company-identity-info">

            <h2>
              {company.company_name ||
                "Company Name"}
            </h2>

            <div className="company-meta">

              <span>
                {company.industry ||
                  "Industry not specified"}
              </span>

              <i />

              <span>
                {company.city ||
                  "Location not specified"}
                {company.country
                  ? `, ${company.country}`
                  : ""}
              </span>

            </div>

            {company.website && (
              <a
                href={
                  company.website.startsWith(
                    "http"
                  )
                    ? company.website
                    : `https://${company.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="company-website"
              >
                {company.website}
                <span>↗</span>
              </a>
            )}

          </div>

        </div>


        <div
          className={`company-status ${
            company.status?.toLowerCase()
          }`}
        >

          <span className="status-dot" />

          {company.status ||
            "ACTIVE"}

        </div>

      </div>


      {/* =================================================
          FORM
      ================================================= */}

      <form
        id="company-profile-form"
        onSubmit={handleSave}
      >


        {/* =================================================
            COMPANY INFORMATION
        ================================================= */}

        <section className="company-card">

          <div className="company-card-header">

            <div className="card-icon">
              ◈
            </div>

            <div>

              <h2>
                Company Information
              </h2>

              <p>
                Basic information about your
                organization.
              </p>

            </div>

          </div>


          <div className="company-details-grid">


            {/* COMPANY NAME */}

            <div className="company-detail">

              <label>
                Company Name
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="company_name"
                  value={
                    company.company_name
                  }
                  onChange={handleChange}
                  placeholder="Company name"
                />

              ) : (

                <div className="detail-value">
                  {company.company_name ||
                    "Not provided"}
                </div>

              )}

            </div>


            {/* EMAIL */}

            <div className="company-detail">

              <label>
                Company Email
              </label>

              {isEditing ? (

                <input
                  type="email"
                  name="company_email"
                  value={
                    company.company_email
                  }
                  onChange={handleChange}
                  placeholder="company@example.com"
                />

              ) : (

                <div className="detail-value">
                  {company.company_email ||
                    "Not provided"}
                </div>

              )}

            </div>


            {/* PHONE */}

            <div className="company-detail">

              <label>
                Phone
              </label>

              {isEditing ? (

                <input
                  type="tel"
                  name="company_phone"
                  value={
                    company.company_phone
                  }
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />

              ) : (

                <div className="detail-value">
                  {company.company_phone ||
                    "Not provided"}
                </div>

              )}

            </div>


            {/* WEBSITE */}

            <div className="company-detail">

              <label>
                Website
              </label>

              {isEditing ? (

                <input
                  type="url"
                  name="website"
                  value={
                    company.website
                  }
                  onChange={handleChange}
                  placeholder="https://example.com"
                />

              ) : (

                <div className="detail-value">
                  {company.website ||
                    "Not provided"}
                </div>

              )}

            </div>


            {/* INDUSTRY */}

            <div className="company-detail">

              <label>
                Industry
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="industry"
                  value={
                    company.industry
                  }
                  onChange={handleChange}
                  placeholder="Information Technology"
                />

              ) : (

                <div className="detail-value">
                  {company.industry ||
                    "Not provided"}
                </div>

              )}

            </div>


            {/* COMPANY SIZE */}

            <div className="company-detail">

              <label>
                Company Size
              </label>

              {isEditing ? (

                <select
                  name="company_size"
                  value={
                    company.company_size
                  }
                  onChange={handleChange}
                >

                  <option value="">
                    Select company size
                  </option>

                  <option value="1-10">
                    1-10
                  </option>

                  <option value="11-50">
                    11-50
                  </option>

                  <option value="51-200">
                    51-200
                  </option>

                  <option value="201-500">
                    201-500
                  </option>

                  <option value="501-1000">
                    501-1000
                  </option>

                  <option value="1000+">
                    1000+
                  </option>

                </select>

              ) : (

                <div className="detail-value">
                  {company.company_size ||
                    "Not provided"}
                </div>

              )}

            </div>

          </div>

        </section>


        {/* =================================================
            LOCATION
        ================================================= */}

        <section className="company-card">

          <div className="company-card-header">

            <div className="card-icon">
              ◉
            </div>

            <div>

              <h2>
                Location
              </h2>

              <p>
                Where your organization is
                located.
              </p>

            </div>

          </div>


          <div className="company-details-grid">


            {/* ADDRESS */}

            <div className="company-detail full-width">

              <label>
                Address
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="address"
                  value={
                    company.address
                  }
                  onChange={handleChange}
                  placeholder="Company address"
                />

              ) : (

                <div className="detail-value">
                  {company.address ||
                    "Not provided"}
                </div>

              )}

            </div>


            {/* CITY */}

            <div className="company-detail">

              <label>
                City
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="city"
                  value={
                    company.city
                  }
                  onChange={handleChange}
                  placeholder="Hyderabad"
                />

              ) : (

                <div className="detail-value">
                  {company.city ||
                    "Not provided"}
                </div>

              )}

            </div>


            {/* COUNTRY */}

            <div className="company-detail">

              <label>
                Country
              </label>

              {isEditing ? (

                <input
                  type="text"
                  name="country"
                  value={
                    company.country
                  }
                  onChange={handleChange}
                  placeholder="India"
                />

              ) : (

                <div className="detail-value">
                  {company.country ||
                    "Not provided"}
                </div>

              )}

            </div>

          </div>

        </section>


        {/* =================================================
            ABOUT COMPANY
        ================================================= */}

        <section className="company-card">

          <div className="company-card-header">

            <div className="card-icon">
              ✦
            </div>

            <div>

              <h2>
                About Company
              </h2>

              <p>
                Tell candidates what makes
                your organization unique.
              </p>

            </div>

          </div>


          <div className="company-detail">

            <label>
              Company Description
            </label>

            {isEditing ? (

              <textarea
                name="description"
                value={
                  company.description
                }
                onChange={handleChange}
                placeholder="Tell candidates about your company..."
                rows="7"
              />

            ) : (

              <div className="detail-description">

                {company.description ||
                  "No company description has been added yet."}

              </div>

            )}

          </div>

        </section>


        {/* =================================================
            MOBILE SAVE AREA
        ================================================= */}

        {isEditing && (
          <div className="mobile-save-area">

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="company-cancel-button"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="company-save-button"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        )}

      </form>

    </div>
  );
}

export default CompanyProfile;