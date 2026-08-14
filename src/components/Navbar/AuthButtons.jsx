import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AuthButtons.css";

function AuthButtons() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  // LOGGED IN
  if (user) {
    const firstLetter =
      user.fullName?.charAt(0).toUpperCase() || "U";

    return (
      <div className="auth-buttons logged-in">
        <div className="user-profile">
          <div className="user-avatar">
            {firstLetter}
          </div>

          <div className="user-details">
            <span className="user-greeting">
              Welcome
            </span>

            <span className="user-name">
              {user.fullName}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10 17L15 12L10 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M15 12H3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M21 19V5C21 3.9 20.1 3 19 3H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <span>Logout</span>
        </button>
      </div>
    );
  }

  // LOGGED OUT
  return (
    <div className="auth-buttons">
      <NavLink
        to="/login"
        className={({ isActive }) =>
          `login-btn ${isActive ? "active" : ""}`
        }
      >
        Login
      </NavLink>

      <NavLink
        to="/register"
        className="get-started-btn"
      >
        Get Started
        <span className="arrow">→</span>
      </NavLink>
    </div>
  );
}

export default AuthButtons;