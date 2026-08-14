import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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


    // Validate
    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }


    try {
      setLoading(true);


      // Call AuthContext login
      const response = await login(formData);

      console.log(
        "Login response:",
        response.data
      );


      // Login failed
      if (!response.data.success) {
        setError(
          response.data.message ||
            "Login failed."
        );

        return;
      }


      // Logged-in user
      const user = response.data.user;

      console.log(
        "Logged-in user:",
        user
      );


      setSuccess(
        "Login successful."
      );


      // =================================================
      // ROLE-BASED REDIRECT
      // =================================================

      if (user.role === "ADMIN") {

        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );

      } else if (
        user.role === "RECRUITER"
      ) {

        navigate(
          "/recruiter",
          {
            replace: true,
          }
        );

      } else if (
        user.role === "JOB_SEEKER"
      ) {

        navigate(
          "/seeker",
          {
            replace: true,
          }
        );

      } else {

        navigate(
          "/",
          {
            replace: true,
          }
        );

      }

    } catch (error) {

      console.error(
        "Login error:",
        error
      );


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

      <div className="login-card">

        <h1>
          Login
        </h1>

        <p>
          Welcome Back
        </p>


        <form
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />


          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />


          {/* ERROR */}

          {error && (
            <p className="error">
              {error}
            </p>
          )}


          {/* SUCCESS */}

          {success && (
            <p className="success">
              {success}
            </p>
          )}


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        {/* =================================================
            LINKS
        ================================================= */}

        <div className="login-links">

          <Link to="/forgot">
            Forgot Password?
          </Link>


          <p>
            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;