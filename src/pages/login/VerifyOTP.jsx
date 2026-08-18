import React, { useState } from "react";
import {
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

import {
  FaArrowRight,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

import { verifyRegisterOTP } from "../../services/authService.js";

import "./VerifyOTP.css";

function VerifyOTP() {

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // =====================================================
  // REGISTRATION DATA
  // =====================================================

  const registrationData = location.state;


  // =====================================================
  // OTP CHANGE
  // =====================================================

  const handleOtpChange = (e) => {

    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);

  };


  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // ===================================================
    // REGISTRATION DATA
    // ===================================================

    if (
      !registrationData ||
      !registrationData.email
    ) {

      setError(
        "Registration information is missing. Please register again."
      );

      return;
    }


    // ===================================================
    // OTP VALIDATION
    // ===================================================

    if (!otp) {

      setError(
        "Please enter the OTP."
      );

      return;
    }


    if (otp.length !== 6) {

      setError(
        "Please enter the complete 6-digit OTP."
      );

      return;
    }


    try {

      setLoading(true);

      console.log(
        "Verifying OTP..."
      );


      const response =
        await verifyRegisterOTP({

          email:
            registrationData.email,

          otp: otp,

        });


      console.log(
        "OTP verification response:",
        response.data
      );


      setSuccess(
        response.data.message ||
          "Email verified successfully."
      );


      // =================================================
      // GO TO LOGIN
      // =================================================

      setTimeout(() => {

        navigate("/login", {
          replace: true,
        });

      }, 2000);


    } catch (error) {

      console.error(
        "OTP verification error:",
        error
      );


      if (error.response) {

        setError(
          error.response.data.message ||
            "Invalid or expired OTP."
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

    <div className="verify-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="verify-bg" />

      <div className="verify-overlay" />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="verify-content">


        {/* =================================================
            BRAND SIDE
        ================================================= */}

        <div className="verify-brand">

          <span className="verify-eyebrow">
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


          <div className="verify-brand-line" />


          <div className="verify-brand-points">

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
            VERIFY CARD
        ================================================= */}

        <div className="verify-card">


          {/* CARD HEADER */}

          <div className="verify-card-header">

            <span className="verify-card-eyebrow">
              EMAIL VERIFICATION
            </span>


            <div className="verify-icon">

              <FaShieldAlt />

            </div>


            <h2>

              Verify <span>Email</span>

            </h2>


            <p>

              Enter the 6-digit verification code
              sent to your registered email address.

            </p>

          </div>


          {/* =================================================
              EMAIL DISPLAY
          ================================================= */}

          {registrationData?.email && (

            <div className="verify-email">

              <FaEnvelope />

              <span>
                {registrationData.email}
              </span>

            </div>

          )}


          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit}>


            <div className="verify-input-group">

              <label htmlFor="otp">
                Verification Code
              </label>


              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                disabled={loading}
              />

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

              <div className="verify-message verify-error">

                {error}

              </div>

            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (

              <div className="verify-message verify-success">

                {success}

              </div>

            )}


            {/* =================================================
                VERIFY BUTTON
            ================================================= */}

            <button
              type="submit"
              className="verify-submit"
              disabled={loading}
            >

              <span>

                {loading
                  ? "Verifying..."
                  : "Verify OTP"}

              </span>


              {!loading && (

                <FaArrowRight />

              )}

            </button>


          </form>


          {/* =================================================
              LOGIN
          ================================================= */}

          <div className="verify-back">

            <span>
              Already verified?
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

export default VerifyOTP;