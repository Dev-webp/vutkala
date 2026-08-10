import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const response = await forgotPassword({ email });

      setSuccess(
        response.data.message ||
          "Password reset link sent successfully."
      );
    } catch (error) {
      console.error("Forgot password error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Unable to process your request."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <h1>Forgot Password</h1>

        <p>Enter your registered email</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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
            Send Reset Link
          </button>

          <Link
            to="/login"
            className="back-login"
          >
            Back to Login
          </Link>

        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;