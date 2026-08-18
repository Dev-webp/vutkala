import React, { useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowRight,
  FaLock,
} from "react-icons/fa";

import { resetPassword } from "../../services/authService";

import "./ResetPassword.css";

function ResetPassword() {

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const token = searchParams.get("token");

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
  // RESET PASSWORD
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // ===================================================
    // TOKEN VALIDATION
    // ===================================================

    if (!token) {

      setError(
        "Invalid or expired password reset link."
      );

      return;
    }


    // ===================================================
    // FIELD VALIDATION
    // ===================================================

    if (
      !formData.password ||
      !formData.confirmPassword
    ) {

      setError(
        "Please fill in both password fields."
      );

      return;
    }


    // ===================================================
    // PASSWORD MATCH
    // ===================================================

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    try {

      setLoading(true);


      const response = await resetPassword({

        token,

        password:
          formData.password,

        confirmPassword:
          formData.confirmPassword,

      });


      setSuccess(
        response.data.message ||
          "Password reset successfully."
      );


      // =================================================
      // REDIRECT TO LOGIN
      // =================================================

      setTimeout(() => {

        navigate("/login", {
          replace: true,
        });

      }, 2000);


    } catch (error) {

      console.error(
        "Reset password error:",
        error
      );


      if (error.response) {

        setError(
          error.response.data.message ||
            "Unable to reset password."
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


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="reset-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="reset-bg" />

      <div className="reset-overlay" />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="reset-content">


        {/* =================================================
            BRAND SIDE
        ================================================= */}

        <div className="reset-brand">

          <span className="reset-eyebrow">
            VUTKALA GLOBAL
          </span>


          <h1>

            Tech. Talent.

            <br />

            <span>
              Transformation.
            </span>

          </h1>


          <p>

            Connecting people, technology and
            opportunities to create meaningful
            growth and lasting impact.

          </p>


          <div className="reset-brand-line" />


          <div className="reset-brand-points">

            <span>
              PEOPLE
            </span>

            <span>
              TECHNOLOGY
            </span>

            <span>
              OPPORTUNITY
            </span>

          </div>

        </div>


        {/* =================================================
            RESET CARD
        ================================================= */}

        <div className="reset-card">


          {/* CARD HEADER */}

          <div className="reset-card-header">

            <span className="reset-card-eyebrow">
              ACCOUNT RECOVERY
            </span>


            <h2>

              Create <span>New Password</span>

            </h2>


            <p>

              Enter a new password for your
              Vutkala account.

            </p>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>


            {/* PASSWORD */}

            <div className="reset-input-group">

              <label htmlFor="password">

                New Password

              </label>


              <div className="reset-input-wrap">

                <FaLock
                  className="reset-input-icon"
                />


                <input
                  id="password"

                  type="password"

                  name="password"

                  placeholder="Enter new password"

                  value={
                    formData.password
                  }

                  onChange={
                    handleChange
                  }

                  disabled={loading}

                  autoComplete="new-password"
                />

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="reset-input-group">

              <label htmlFor="confirmPassword">

                Confirm Password

              </label>


              <div className="reset-input-wrap">

                <FaLock
                  className="reset-input-icon"
                />


                <input
                  id="confirmPassword"

                  type="password"

                  name="confirmPassword"

                  placeholder="Confirm new password"

                  value={
                    formData.confirmPassword
                  }

                  onChange={
                    handleChange
                  }

                  disabled={loading}

                  autoComplete="new-password"
                />

              </div>

            </div>


            {/* ERROR */}

            {error && (

              <div className="reset-message reset-error">

                {error}

              </div>

            )}


            {/* SUCCESS */}

            {success && (

              <div className="reset-message reset-success">

                {success}

              </div>

            )}


            {/* RESET BUTTON */}

            <button
              type="submit"
              className="reset-submit"
              disabled={loading}
            >

              <span>

                {loading
                  ? "Resetting..."
                  : "Reset Password"}

              </span>


              {!loading && (

                <FaArrowRight />

              )}

            </button>


          </form>


          {/* =================================================
              BACK TO LOGIN
          ================================================= */}

          <div className="reset-back">

            <span>
              Remember your password?
            </span>


            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >

              Back to Login

              <FaArrowRight />

            </button>

          </div>


        </div>

      </div>

    </div>

  );

}


export default ResetPassword;