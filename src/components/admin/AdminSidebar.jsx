import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../../styles/admin/AdminSidebar.css";

// LOGO
import logo from "../../assets/vjcvutkal.jpeg";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const menuSections = [
    {
      title: "MAIN",
      items: [
        {
          label: "Dashboard",
          path: "/admin",
          icon: "⌂",
          end: true,
        },
        {
          label: "Users",
          path: "/admin/users",
          icon: "♙",
        },
        {
          label: "Companies",
          path: "/admin/companies",
          icon: "▣",
        },
        {
          label: "Jobs",
          path: "/admin/jobs",
          icon: "▤",
        },
        {
          label: "Applications",
          path: "/admin/applications",
          icon: "▥",
        },
        {
          label: "Candidates",
          path: "/admin/candidates",
          icon: "⌕",
        },
      ],
    },

    {
      title: "MANAGEMENT",
      items: [
        {
          label: "Pending Approvals",
          path: "/admin/approvals",
          icon: "✓",
        },
        {
          label: "Reports",
          path: "/admin/reports",
          icon: "▥",
        },
        {
          label: "Activity Logs",
          path: "/admin/activity",
          icon: "◷",
        },
      ],
    },

    {
      title: "SYSTEM",
      items: [
        {
          label: "Settings",
          path: "/admin/settings",
          icon: "⚙",
        },
        {
          label: "My Account",
          path: "/admin/account",
          icon: "♙",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">

      {/* =========================================
          BRAND
      ========================================= */}
      <div className="admin-sidebar-brand">

        <div className="admin-brand-text">
          <img
            src={logo}
            alt="Vutkala Global Technologies"
            className="admin-brand-logo"
          />
        </div>

        

      </div>


      {/* =========================================
          NAVIGATION
      ========================================= */}
      <nav className="admin-sidebar-nav">

        {menuSections.map((section) => (

          <div
            className="admin-nav-section"
            key={section.title}
          >

            <div className="admin-nav-section-title">
              {section.title}
            </div>

            {section.items.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `admin-nav-item ${
                    isActive
                      ? "admin-nav-item-active"
                      : ""
                  }`
                }
              >

                <span className="admin-nav-icon">
                  {item.icon}
                </span>

                <span className="admin-nav-label">
                  {item.label}
                </span>

              </NavLink>

            ))}

          </div>

        ))}

      </nav>


      {/* =========================================
          LOGOUT
      ========================================= */}
      <div className="admin-sidebar-bottom">

        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >

          <span className="admin-nav-icon">
            ↪
          </span>

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}