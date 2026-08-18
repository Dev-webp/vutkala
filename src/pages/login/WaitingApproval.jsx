import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyRegisterOTP } from "../../services/authService";
import "./VerifyOTP.css";
 
const VerifyOTP = () => {

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Get registration data sent from Register page
  const registrationData = location.state;

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {

      const response = await verifyRegisterOTP({
        email: registrationData.email,
        otp: otp,
      });

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

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
            maxLength="6"
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
};

export default VerifyOTP;