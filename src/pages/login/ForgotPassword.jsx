import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaEnvelope,
} from "react-icons/fa";

import { forgotPassword } from "../../services/authService";

import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword({
        email,
      });

      setSuccess(
        response.data.message ||
          "Password reset link sent successfully."
      );

    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      if (error.response) {
        setError(
          error.response.data.message ||
            "Unable to process your request."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="forgot-bg" />

      <div className="forgot-overlay" />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="forgot-content">

        {/* =================================================
            BRAND SIDE
        ================================================= */}

        <div className="forgot-brand">

          <span className="forgot-eyebrow">
            VUTKALA GLOBAL
          </span>

          <h1>
            Tech. Talent.
            <br />
            <span>Transformation.</span>
          </h1>

          <p>
            Connecting people, technology and
            opportunities to create meaningful
            growth and lasting impact.
          </p>

          <div className="forgot-brand-line" />

          <div className="forgot-brand-points">

            <span>PEOPLE</span>

            <span>TECHNOLOGY</span>

            <span>OPPORTUNITY</span>

          </div>

        </div>


        {/* =================================================
            FORGOT PASSWORD CARD
        ================================================= */}

        <div className="forgot-card">

          {/* CARD HEADER */}

          <div className="forgot-card-header">

            <span className="forgot-card-eyebrow">
              ACCOUNT RECOVERY
            </span>

            <h2>
              Reset <span>Password</span>
            </h2>

            <p>
              Enter your registered email and
              we'll send you a password reset link.
            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>

            <div className="forgot-input-group">

              <label htmlFor="forgot-email">
                Email Address
              </label>

              <div className="forgot-input-wrap">

                <FaEnvelope className="forgot-input-icon" />

                <input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={loading}
                  autoComplete="email"
                />

              </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="forgot-message forgot-error">
                {error}
              </div>
            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <div className="forgot-message forgot-success">
                {success}
              </div>
            )}


            {/* =================================================
                SEND RESET LINK
            ================================================= */}

            <button
              type="submit"
              className="forgot-submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </span>

              {!loading && (
                <FaArrowRight />
              )}

            </button>

          </form>


          {/* =================================================
              BACK TO LOGIN
          ================================================= */}

          <div className="forgot-back">

            <span>
              Remember your password?
            </span>

            <Link to="/login">

              Back to Login

              <FaArrowRight />

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;