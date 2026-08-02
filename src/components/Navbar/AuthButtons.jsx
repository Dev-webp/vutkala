import { NavLink } from "react-router-dom";

function AuthButtons() {
  return (
    <div className="nav-buttons">
      <NavLink to="/login">
        <button className="login-btn">Login</button>
      </NavLink>

      <NavLink to="/register">
        <button className="register-btn">Get Started</button>
      </NavLink>
    </div>
  );
}

export default AuthButtons;