import React, { useState } from "react";
import "./Register.css";
import { sendRegisterOTP } from "../../services/authService.js";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBuilding,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    role: "JOB_SEEKER",

    companyName: "",
    companyEmail: "",
    companyPhone: "",
    website: "",
    industry: "",
    companySize: "",
    address: "",
    city: "",
    country: "",
    description: "",
  });

  // =========================================================
  // MESSAGES
  // =========================================================

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE REGISTER
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // =======================================================
    // PERSONAL DETAILS VALIDATION
    // =======================================================

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all personal details.");
      return;
    }

    // =======================================================
    // PASSWORD VALIDATION
    // =======================================================

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // =======================================================
    // RECRUITER ORGANIZATION VALIDATION
    // =======================================================

    if (formData.role === "RECRUITER") {
      if (
        !formData.companyName.trim() ||
        !formData.companyEmail.trim() ||
        !formData.companyPhone.trim() ||
        !formData.industry.trim() ||
        !formData.companySize.trim() ||
        !formData.address.trim() ||
        !formData.city.trim() ||
        !formData.country.trim()
      ) {
        setError(
          "Please fill all required organization details."
        );
        return;
      }
    }

    // =======================================================
    // SEND OTP
    // =======================================================

    try {
      console.log("Sending registration data...");

      const response = await sendRegisterOTP(formData);

      console.log("Backend response:", response.data);

      setSuccess(
        response.data.message ||
          "OTP sent successfully."
      );

      navigate("/verify-otp", {
        state: formData,
      });

    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Unable to start registration."
        );
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="register-page">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="register-bg" />
      <div className="register-overlay" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="register-content">

        {/* ===================================================
            BRAND SIDE
        =================================================== */}

        <div className="register-brand">

          <span className="register-eyebrow">
            VUTKALA GLOBAL
          </span>

          <h1>
            Tech. Talent.
            <br />
            <span>Transformation.</span>
          </h1>

          <p>
            Connect with people, technology and
            opportunities that create meaningful
            growth and lasting impact.
          </p>

          <div className="register-brand-line" />

          <div className="register-brand-points">
            <span>PEOPLE</span>
            <span>TECHNOLOGY</span>
            <span>OPPORTUNITY</span>
          </div>

        </div>


        {/* ===================================================
            REGISTER CARD
        =================================================== */}

        <div className="register-card">

          {/* CARD HEADER */}

          <div className="register-card-header">

            <span className="register-card-eyebrow">
              GET STARTED
            </span>

            <h2>
              Create <span>Account</span>
            </h2>

            <p>
              Join Vutkala and start your journey with us.
            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            {/* =================================================
                PERSONAL DETAILS
            ================================================= */}

            <div className="register-field">

              <label htmlFor="fullName">
                Full Name
              </label>

              <div className="register-input-wrap">

                <FaUser className="register-input-icon" />

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="register-field">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="register-input-wrap">

                <FaEnvelope className="register-input-icon" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="register-field">

              <label htmlFor="phone">
                Phone Number
              </label>

              <div className="register-input-wrap">

                <FaPhone className="register-input-icon" />

                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PASSWORD ROW */}

            <div className="register-form-row">

              <div className="register-field">

                <label htmlFor="password">
                  Password
                </label>

                <div className="register-input-wrap">

                  <FaLock className="register-input-icon" />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="register-field">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="register-input-wrap">

                  <FaLock className="register-input-icon" />

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


            {/* =================================================
                ROLE
            ================================================= */}

            <div className="register-field">

              <label>
                Register As
              </label>

              <div className="role-section">

                <label
                  className={
                    formData.role === "JOB_SEEKER"
                      ? "role-active"
                      : ""
                  }
                >

                  <input
                    type="radio"
                    name="role"
                    value="JOB_SEEKER"
                    checked={
                      formData.role === "JOB_SEEKER"
                    }
                    onChange={handleChange}
                  />

                  <span>
                    Job Seeker
                  </span>

                </label>


                <label
                  className={
                    formData.role === "RECRUITER"
                      ? "role-active"
                      : ""
                  }
                >

                  <input
                    type="radio"
                    name="role"
                    value="RECRUITER"
                    checked={
                      formData.role === "RECRUITER"
                    }
                    onChange={handleChange}
                  />

                  <span>
                    Recruiter
                  </span>

                </label>

              </div>

            </div>


            {/* =================================================
                RECRUITER ORGANIZATION
            ================================================= */}

            {formData.role === "RECRUITER" && (

              <div className="organization-section">

                <div className="organization-header">

                  <div className="organization-icon">
                    <FaBuilding />
                  </div>

                  <div>
                    <h3>
                      Organization Details
                    </h3>

                    <p>
                      Provide your organization information
                      for admin verification.
                    </p>
                  </div>

                </div>


                <div className="register-field">

                  <label>
                    Company Name *
                  </label>

                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />

                </div>


                <div className="register-form-row">

                  <div className="register-field">

                    <label>
                      Company Email *
                    </label>

                    <input
                      type="email"
                      name="companyEmail"
                      placeholder="Company Email"
                      value={formData.companyEmail}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="register-field">

                    <label>
                      Company Phone *
                    </label>

                    <input
                      type="text"
                      name="companyPhone"
                      placeholder="Company Phone"
                      value={formData.companyPhone}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="register-form-row">

                  <div className="register-field">

                    <label>
                      Industry *
                    </label>

                    <input
                      type="text"
                      name="industry"
                      placeholder="Industry"
                      value={formData.industry}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="register-field">

                    <label>
                      Company Size *
                    </label>

                    <input
                      type="text"
                      name="companySize"
                      placeholder="Company Size"
                      value={formData.companySize}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="register-field">

                  <label>
                    Website
                  </label>

                  <input
                    type="url"
                    name="website"
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={handleChange}
                  />

                </div>


                <div className="register-field">

                  <label>
                    Address *
                  </label>

                  <input
                    type="text"
                    name="address"
                    placeholder="Company Address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                </div>


                <div className="register-form-row">

                  <div className="register-field">

                    <label>
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />

                  </div>


                  <div className="register-field">

                    <label>
                      Country *
                    </label>

                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="register-field">

                  <label>
                    Company Description
                  </label>

                  <textarea
                    name="description"
                    placeholder="Tell us about your organization"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                  />

                </div>

              </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <p className="register-message register-error">
                {error}
              </p>
            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <p className="register-message register-success">
                {success}
              </p>
            )}


            {/* =================================================
                REGISTER
            ================================================= */}

            <button
              type="submit"
              className="register-submit"
            >

              <span>
                Create Account
              </span>

              <FaArrowRight />

            </button>


            {/* =================================================
                LOGIN
            ================================================= */}

            <div className="register-login">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Login
                <FaArrowRight />
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;