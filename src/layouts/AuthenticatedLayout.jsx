import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  BriefcaseBusiness,
  ClipboardList,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import logo from "../assets/vjcvutkal.jpeg";

import "./AuthenticatedLayout.css";


/* =========================================================
   NAVIGATION
========================================================= */

const navigation = {
  ADMIN: [
    {
      label: "Dashboard",
      to: "/Admin/dashboard",
      icon: LayoutDashboard,
    },
  ],

  RECRUITER: [
    {
      label: "Dashboard",
      to: "/recruiter",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "My Jobs",
      to: "/recruiter/my-jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Post Job",
      to: "/recruiter/post-job",
      icon: FilePlus2,
    },
    {
      label: "Applications",
      to: "/recruiter/applications",
      icon: ClipboardList,
    },
    {
      label: "Find Candidates",
      to: "/recruiter/candidates",
      icon: UsersRound,
    },
    {
      label: "Company Profile",
      to: "/recruiter/company-profile",
      icon: UserRound,
    },
  ],

  JOB_SEEKER: [
    {
      label: "Dashboard",
      to: "/seeker",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Find Jobs",
      to: "/seeker/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Applications",
      to: "/seeker/applications",
      icon: ClipboardList,
    },
    {
      label: "Saved Jobs",
      to: "/seeker/saved-jobs",
      icon: ShieldCheck,
    },
    {
      label: "My Profile",
      to: "/seeker/profile",
      icon: UserRound,
    },
  ],
};


/* =========================================================
   TITLES
========================================================= */

const titles = {
  ADMIN: "Admin workspace",
  RECRUITER: "Recruitment workspace",
  JOB_SEEKER: "Career workspace",
};


/* =========================================================
   AUTHENTICATED LAYOUT
========================================================= */

function AuthenticatedLayout({ role, children }) {

  const { user, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = navigation[role] || [];

  /*
    ADMIN = sidebar
    RECRUITER / JOB_SEEKER = top navbar
  */
  const usesTopNavigation =
    role === "RECRUITER" ||
    role === "JOB_SEEKER";


  const userName =
    user?.fullName ||
    (role === "ADMIN"
      ? "Administrator"
      : "Vutkala Member");


  const initial =
    userName
      .charAt(0)
      .toUpperCase() || "U";


  /* =====================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ===================================================== */

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);


  /* =====================================================
     LOCK BODY WHEN DRAWER OPEN
  ===================================================== */

  useEffect(() => {

    document.body.style.overflow =
      drawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };

  }, [drawerOpen]);


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {

    try {

      await logout();

      navigate("/login", {
        replace: true,
      });

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    }

  };


  /* =====================================================
     SIDEBAR
  ===================================================== */

  const sidebar = (

    <aside
      className="authenticated-sidebar"
      aria-label={`${titles[role]} navigation`}
    >

      {/* LOGO */}

      <Link
        to={
          role === "ADMIN"
            ? "/Admin/dashboard"
            : links[0]?.to || "/"
        }
        className="authenticated-brand"
        aria-label="Vutkala dashboard home"
      >

        <img
          src={logo}
          alt="Vutkala Global Technologies"
        />

      </Link>


      {/* ROLE */}

      <p className="authenticated-role-label">
        {role.replace("_", " ")}
      </p>


      {/* NAVIGATION */}

      <nav className="authenticated-nav">

        {links.map(
          ({
            label,
            to,
            icon: Icon,
            end,
          }) => (

            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `authenticated-nav-link${
                  isActive
                    ? " is-active"
                    : ""
                }`
              }
            >

              <Icon
                aria-hidden="true"
                size={18}
              />

              <span>
                {label}
              </span>

            </NavLink>

          )
        )}

      </nav>


      {/* SIDEBAR FOOTER */}

      <div className="authenticated-sidebar-footer">

        <Link
          to="/"
          className="authenticated-website-link"
        >
          Visit Website
        </Link>


        <button
          type="button"
          className="authenticated-logout"
          onClick={handleLogout}
        >

          <LogOut
            aria-hidden="true"
            size={18}
          />

          Logout

        </button>

      </div>

    </aside>

  );


  /* =====================================================
     RETURN
  ===================================================== */

  return (

    <div
      className={`authenticated-layout ${
        usesTopNavigation
          ? "authenticated-layout--top"
          : "authenticated-layout--sidebar"
      }`}
    >

      {/* ADMIN SIDEBAR */}

      {!usesTopNavigation && sidebar}


      <div className="authenticated-panel">


        {/* =================================================
            TOP NAVBAR
        ================================================= */}

        <header
          className={`authenticated-topbar ${
            usesTopNavigation
              ? "authenticated-topbar--product"
              : ""
          }`}
        >


          {/* LOGO */}

          {usesTopNavigation && (

            <Link
              to={links[0]?.to || "/"}
              className="authenticated-topbar-brand"
              aria-label="Vutkala dashboard home"
            >

              <img
                src={logo}
                alt="Vutkala Global Technologies"
              />

            </Link>

          )}


          {/* MOBILE MENU */}

          {usesTopNavigation && (

            <button
              type="button"
              className="authenticated-menu-button"
              onClick={() =>
                setDrawerOpen(true)
              }
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
            >

              <Menu size={22} />

            </button>

          )}


          {/* ADMIN MENU BUTTON */}

          {!usesTopNavigation && (

            <button
              type="button"
              className="authenticated-menu-button"
              onClick={() =>
                setDrawerOpen(true)
              }
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
            >

              <Menu size={22} />

            </button>

          )}


          {/* TITLE */}

          <div className="authenticated-topbar-title">

            <p>
              {titles[role]}
            </p>

            <h1>
              {
                links.find(
                  (link) =>
                    location.pathname ===
                    link.to
                )?.label ||
                "Dashboard"
              }
            </h1>

          </div>


          {/* =================================================
              TOP NAVIGATION
          ================================================= */}

          {usesTopNavigation && (

            <nav
              className="authenticated-topnav"
              aria-label={`${titles[role]} navigation`}
            >

              {links.map(
                ({
                  label,
                  to,
                  end,
                }) => (

                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                  >
                    {label}
                  </NavLink>

                )
              )}

            </nav>

          )}


          {/* USER */}

          <div className="authenticated-user">

            <span className="authenticated-avatar">
              {initial}
            </span>

            <span className="authenticated-user-copy">

              <strong>
                {userName}
              </strong>

              <small>
                {role.replace("_", " ")}
              </small>

            </span>

          </div>


          {/* MY ACCOUNT */}

          {usesTopNavigation && (

            <Link
              className="authenticated-account-link"
              to={links[0]?.to || "/"}
            >
              My Account
            </Link>

          )}


          {/* WEBSITE */}

          {usesTopNavigation && (

            <Link
              className="authenticated-website-top"
              to="/"
            >
              Website
            </Link>

          )}


          {/* LOGOUT */}

          {usesTopNavigation && (

            <button
              type="button"
              className="authenticated-top-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          )}

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="authenticated-content">

          {children || <Outlet />}

        </main>

      </div>


      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <div
        className={`authenticated-drawer ${
          drawerOpen
            ? "is-open"
            : ""
        }`}
        aria-hidden={!drawerOpen}
      >

        <button
          type="button"
          className="authenticated-drawer-overlay"
          aria-label="Close navigation"
          onClick={() =>
            setDrawerOpen(false)
          }
        />


        <div className="authenticated-drawer-panel">

          <button
            type="button"
            className="authenticated-drawer-close"
            onClick={() =>
              setDrawerOpen(false)
            }
            aria-label="Close navigation"
          >

            <X size={22} />

          </button>


          {sidebar}

        </div>

      </div>

    </div>

  );
}


export default AuthenticatedLayout;
