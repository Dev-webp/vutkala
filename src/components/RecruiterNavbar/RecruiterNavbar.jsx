import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/vjcvutkal.jpeg";

import "./RecruiterNavbar.css";

function RecruiterNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setMenuOpen(false);

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

  return (
    <header className="recruiter-navbar">

      {/* =====================================================
          NAVBAR INNER
      ===================================================== */}

      <div className="recruiter-navbar-inner">

        {/* =================================================
            LOGO
        ================================================= */}

        <NavLink
          to="/recruiter"
          className="recruiter-brand"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="Vutkala Global Technologies"
          />
        </NavLink>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="recruiter-nav-links">

          <NavLink
            to="/recruiter"
            end
            className={({ isActive }) =>
              `recruiter-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Dashboard
          </NavLink>


          <NavLink
            to="/recruiter/my-jobs"
            className={({ isActive }) =>
              `recruiter-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            My Jobs
          </NavLink>


          <NavLink
            to="/recruiter/post-job"
            className={({ isActive }) =>
              `recruiter-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Post Job
          </NavLink>


          <NavLink
            to="/recruiter/applications"
            className={({ isActive }) =>
              `recruiter-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Applications
          </NavLink>


          <NavLink
            to="/recruiter/company-profile"
            className={({ isActive }) =>
              `recruiter-nav-link ${
                isActive ? "active" : ""
              }`
            }
          >
            Company Profile
          </NavLink>

        </nav>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="recruiter-navbar-right">

          {/* USER */}

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


          {/* WEBSITE */}

          <button
            type="button"
            className="recruiter-website-btn"
            onClick={() => {
              closeMenu();
              navigate("/");
            }}
          >
            Website
          </button>


          {/* LOGOUT */}

          <button
            type="button"
            className="recruiter-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className={`recruiter-menu-toggle ${
            menuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMenuOpen((previous) => !previous)
          }
          aria-label={
            menuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

      </div>


      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <div
        className={`recruiter-mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >

        <NavLink
          to="/recruiter"
          end
          onClick={closeMenu}
          className={({ isActive }) =>
            `recruiter-mobile-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/recruiter/my-jobs"
          onClick={closeMenu}
          className={({ isActive }) =>
            `recruiter-mobile-link ${
              isActive ? "active" : ""
            }`
          }
        >
          My Jobs
        </NavLink>


        <NavLink
          to="/recruiter/post-job"
          onClick={closeMenu}
          className={({ isActive }) =>
            `recruiter-mobile-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Post Job
        </NavLink>


        <NavLink
          to="/recruiter/applications"
          onClick={closeMenu}
          className={({ isActive }) =>
            `recruiter-mobile-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Applications
        </NavLink>


        <NavLink
          to="/recruiter/company-profile"
          onClick={closeMenu}
          className={({ isActive }) =>
            `recruiter-mobile-link ${
              isActive ? "active" : ""
            }`
          }
        >
          Company Profile
        </NavLink>


        <button
          type="button"
          className="recruiter-mobile-link recruiter-mobile-website"
          onClick={() => {
            closeMenu();
            navigate("/");
          }}
        >
          Website
        </button>


        <button
          type="button"
          className="recruiter-mobile-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default RecruiterNavbar;