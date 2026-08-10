import React, { useState } from "react";
import "./Register.css";
import { sendRegisterOTP } from "../../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "JOB_SEEKER",
  });

  // Error message
  const [error, setError] = useState("");

  // Success message
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle register
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {

      console.log("Sending registration data...");

      const response = await sendRegisterOTP(formData);

      console.log("Backend response:", response.data);

      setSuccess(response.data.message);

      // Go to OTP page
      navigate("/verify-otp", {
        state: formData,
      });

    } catch (error) {

      console.error("Registration error:", error);

      if (error.response) {

        setError(error.response.data.message);

      } else {

        setError("Something went wrong.");

      }

    }

  };

  return (

    <div className="register-container">

      <div className="register-card">

        <h1>Create Account</h1>

        <p>
          Register as a Job Seeker or Employer
        </p>

        <form onSubmit={handleSubmit}>

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
                value="EMPLOYER"
                checked={formData.role === "EMPLOYER"}
                onChange={handleChange}
              />

              Employer

            </label>

          </div>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          {success && (
            <p className="success">
              {success}
            </p>
          )}

          <button type="submit">
            Register
          </button>

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