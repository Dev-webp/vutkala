import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaLock, FaEnvelope } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login(formData);

      console.log("Login response:", response.data);

      if (!response.data.success) {
        setError(
          response.data.message || "Login failed."
        );
        return;
      }

      const user = response.data.user;

      console.log("Logged-in user:", user);

      setSuccess("Login successful.");

      // =================================================
      // ROLE-BASED REDIRECT
      // =================================================

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else if (user.role === "RECRUITER") {
        navigate("/recruiter", {
          replace: true,
        });
      } else if (user.role === "JOB_SEEKER") {
        navigate("/seeker", {
          replace: true,
        });
      } else {
        navigate("/", {
          replace: true,
        });
      }

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Login failed."
        );
      } else {
        setError(
          "Unable to connect to the server."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="login-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="login-bg" />
      <div className="login-overlay" />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="login-content">

        {/* BRAND SIDE */}

        <div className="login-brand">

          <span className="login-eyebrow">
            VUTKALA GLOBAL TECHNOLOGIES
          </span>

          <h1>
            Connecting Talent.
            <br />
            <span>Creating Opportunity.</span>
          </h1>

          <p>
            Connect with people, technology and
            opportunities that move businesses forward.
          </p>

          <div className="login-brand-line" />

          <div className="login-brand-points">
            <span>PEOPLE</span>
            <span>TECHNOLOGY</span>
            <span>OPPORTUNITY</span>
          </div>

        </div>


        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="login-card">

          {/* CARD HEADER */}

          <div className="login-card-header">

            <span className="login-card-eyebrow">
              WELCOME BACK
            </span>

            <h2>
              Sign <span>In</span>
            </h2>

            <p>
              Login to continue to your Vutkala account.
            </p>

          </div>


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="login-input-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrap">

                <FaEnvelope className="login-input-icon" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-input-group">

              <div className="login-label-row">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot">
                  Forgot Password?
                </Link>

              </div>

              <div className="login-input-wrap">

                <FaLock className="login-input-icon" />

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="current-password"
                />

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-message login-error">
                {error}
              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="login-message login-success">
                {success}
              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Logging in..."
                  : "Login"}
              </span>

              {!loading && (
                <FaArrowRight />
              )}

            </button>

          </form>


          {/* REGISTER */}

          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create an account
              <FaArrowRight />
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;