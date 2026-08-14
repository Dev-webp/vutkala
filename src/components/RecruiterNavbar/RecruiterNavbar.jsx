import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/vjcvutkal.jpeg";

import "./RecruiterNavbar.css";

function RecruiterNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="recruiter-navbar">

      {/* LEFT */}

      <div className="recruiter-navbar-left">

        <NavLink
          to="/recruiter"
          className="recruiter-brand"
        >
          <img
            src={logo}
            alt="Vutkala Global Technologies"
          />
        </NavLink>


        <nav className="recruiter-nav-links">

          <NavLink
            to="/recruiter"
            end
            className={({ isActive }) =>
              isActive
                ? "recruiter-nav-link active"
                : "recruiter-nav-link"
            }
          >
            Dashboard
          </NavLink>


          <NavLink
            to="/recruiter/my-jobs"
            className={({ isActive }) =>
              isActive
                ? "recruiter-nav-link active"
                : "recruiter-nav-link"
            }
          >
            My Jobs
          </NavLink>


          <NavLink
            to="/recruiter/post-job"
            className={({ isActive }) =>
              isActive
                ? "recruiter-nav-link active"
                : "recruiter-nav-link"
            }
          >
            Post Job
          </NavLink>


          <NavLink
            to="/recruiter/applications"
            className={({ isActive }) =>
              isActive
                ? "recruiter-nav-link active"
                : "recruiter-nav-link"
            }
          >
            Applications
          </NavLink>


          <NavLink
            to="/recruiter/company-profile"
            className={({ isActive }) =>
              isActive
                ? "recruiter-nav-link active"
                : "recruiter-nav-link"
            }
          >
            Company Profile
          </NavLink>

        </nav>

      </div>


      {/* RIGHT */}

      <div className="recruiter-navbar-right">

        <div className="recruiter-user">

          <div className="recruiter-avatar">
            {user?.fullName
              ? user.fullName
                  .charAt(0)
                  .toUpperCase()
              : "R"}
          </div>


          <div className="recruiter-user-info">

            <span className="recruiter-user-name">
              {user?.fullName || "Recruiter"}
            </span>

            <span className="recruiter-user-role">
              Recruiter
            </span>

          </div>

        </div>


        <button
          type="button"
          className="recruiter-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default RecruiterNavbar;