import React, { useState } from "react";
import "./Register.css";
import { sendRegisterOTP } from "../../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    // Personal details
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Account role
    role: "JOB_SEEKER",

    // Organization details
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
        setError("Please fill all required organization details.");
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
        response.data.message || "OTP sent successfully."
      );

      // =====================================================
      // GO TO OTP VERIFICATION
      // =====================================================

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
  // JSX
  // =========================================================

  return (
    <div className="register-container">

      <div className="register-card">

        <h1>Create Account</h1>

        <p>
          Register as a Job Seeker or Recruiter
        </p>

        <form onSubmit={handleSubmit}>

          {/* =================================================
              PERSONAL DETAILS
          ================================================= */}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* =================================================
              ROLE
          ================================================= */}

          <div className="role-section">

            <label>

              <input
                type="radio"
                name="role"
                value="JOB_SEEKER"
                checked={formData.role === "JOB_SEEKER"}
                onChange={handleChange}
              />

              Job Seeker

            </label>

            <label>

              <input
                type="radio"
                name="role"
                value="RECRUITER"
                checked={formData.role === "RECRUITER"}
                onChange={handleChange}
              />

              Recruiter

            </label>

          </div>

          {/* =================================================
              RECRUITER ORGANIZATION DETAILS
              ONLY DISPLAY FOR RECRUITER
          ================================================= */}

          {formData.role === "RECRUITER" && (
            <div className="organization-section">

              <h2>Organization Details</h2>

              <p className="organization-description">
                Provide your organization information for admin
                verification.
              </p>

              <input
                type="text"
                name="companyName"
                placeholder="Company Name *"
                value={formData.companyName}
                onChange={handleChange}
              />

              <input
                type="email"
                name="companyEmail"
                placeholder="Company Email *"
                value={formData.companyEmail}
                onChange={handleChange}
              />

              <input
                type="text"
                name="companyPhone"
                placeholder="Company Phone *"
                value={formData.companyPhone}
                onChange={handleChange}
              />

              <input
                type="url"
                name="website"
                placeholder="Company Website"
                value={formData.website}
                onChange={handleChange}
              />

              <input
                type="text"
                name="industry"
                placeholder="Industry *"
                value={formData.industry}
                onChange={handleChange}
              />

              <input
                type="text"
                name="companySize"
                placeholder="Company Size *"
                value={formData.companySize}
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Company Address *"
                value={formData.address}
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
              />

              <input
                type="text"
                name="country"
                placeholder="Country *"
                value={formData.country}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Company Description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {success && (
            <p className="success">
              {success}
            </p>
          )}

          {/* =================================================
              REGISTER BUTTON
          ================================================= */}

          <button type="submit">
            Register
          </button>

          {/* =================================================
              LOGIN LINK
          ================================================= */}

          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Register;