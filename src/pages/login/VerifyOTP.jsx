import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyRegisterOTP } from "../../services/authService.js";

function VerifyOTP() {

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Data received from Register.jsx
  const registrationData = location.state;

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Check registration data
    if (!registrationData || !registrationData.email) {
      setError("Registration information is missing. Please register again.");
      return;
    }

    // Check OTP
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    try {

      console.log("Verifying OTP...");

      const response = await verifyRegisterOTP({
        email: registrationData.email,
        otp: otp,
      });

      console.log("OTP verification response:", response.data);

      setSuccess(response.data.message);

      // Go to login after successful verification
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      console.error("OTP verification error:", error);

      if (error.response) {

        setError(error.response.data.message);

      } else {

        setError("Something went wrong.");

      }

    }
  };

  return (

    <div className="verify-container">

      <div className="verify-card">

        <h1>Verify Your Email</h1>

        <p>
          Enter the OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
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
            Verify OTP
          </button>

        </form>

      </div>

    </div>

  );
}

export default VerifyOTP;