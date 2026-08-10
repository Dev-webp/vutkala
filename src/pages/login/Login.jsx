import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      const response = await loginUser(formData);

      console.log(response.data);

      setSuccess(response.data.message);

    } catch (error) {

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.");
      }

    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Login</h1>

        <p>Welcome Back</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          {success && <p className="success">{success}</p>}

          <button type="submit">
            Login
          </button>

        </form>

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