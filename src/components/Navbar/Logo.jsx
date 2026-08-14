import { NavLink } from "react-router-dom";
import logo from "../../assets/vjcvutkal.jpeg";

function Logo() {
  return (
    <NavLink
      to="/"
      className="brand-logo"
      aria-label="Vutkala Global Technologies home"
    >
      <img
        src={logo}
        alt="Vutkala Global Technologies"
        className="brand-logo__image"
      />
    </NavLink>
  );
}

export default Logo;