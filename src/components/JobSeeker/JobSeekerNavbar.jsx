import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./JobSeekerNavbar.css";

function JobSeekerNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const firstLetter =
    user?.fullName?.charAt(0)?.toUpperCase() || "J";

  const userName =
    user?.fullName || "Job Seeker";

  return (
    <header className="jobseeker-navbar">

      {/* =================================================
          BRAND
      ================================================= */}

      <NavLink
        to="/seeker"
        className="jobseeker-brand"
        onClick={closeMenu}
      >
        <span className="brand-main">
          VUTKAL
        </span>

        <span className="brand-sub">
          GLOBAL
        </span>
      </NavLink>


      {/* =================================================
          DESKTOP NAVIGATION
      ================================================= */}

      <nav
        className={`jobseeker-nav ${
          menuOpen ? "is-open" : ""
        }`}
        aria-label="Job seeker navigation"
      >

        <NavLink
          to="/seeker"
          end
          onClick={closeMenu}
          className={({ isActive }) =>
            `jobseeker-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/seeker/jobs"
          onClick={closeMenu}
          className={({ isActive }) =>
            `jobseeker-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Find Jobs
        </NavLink>


        <NavLink
          to="/seeker/applications"
          onClick={closeMenu}
          className={({ isActive }) =>
            `jobseeker-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Applications
        </NavLink>


        <NavLink
          to="/seeker/saved-jobs"
          onClick={closeMenu}
          className={({ isActive }) =>
            `jobseeker-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Saved Jobs
        </NavLink>


        <NavLink
          to="/seeker/profile"
          onClick={closeMenu}
          className={({ isActive }) =>
            `jobseeker-nav-link ${
              isActive ? "active" : ""
            }`
          }
        >
          My Profile
        </NavLink>


        {/* MOBILE AUTH */}

        <div className="mobile-auth">

          <div className="mobile-user">

            <div className="jobseeker-avatar">
              {firstLetter}
            </div>

            <div>
              <strong>{userName}</strong>

              <span>
                Job Seeker
              </span>
            </div>

          </div>


          <button
            type="button"
            className="mobile-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="jobseeker-navbar-right">

        {/* USER */}

        <div className="jobseeker-user">

          <div
            className="jobseeker-avatar"
            aria-hidden="true"
          >
            {firstLetter}
          </div>


          <div className="jobseeker-user-info">

            <span className="jobseeker-user-name">
              {userName}
            </span>

            <span className="jobseeker-user-role">
              Job Seeker
            </span>

          </div>

        </div>


        {/* LOGOUT */}

        <button
          type="button"
          className="jobseeker-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>


        {/* MOBILE MENU */}

        <button
          type="button"
          className={`jobseeker-menu-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

      </div>

    </header>
  );
}

export default JobSeekerNavbar;