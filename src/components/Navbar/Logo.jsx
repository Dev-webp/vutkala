import { NavLink } from "react-router-dom";
import logo from "../../assets/vjcvutkal.jpeg";


function Logo() {
  return (
    <NavLink to="/" className="brand-logo">
      <img
        src={logo}
        alt="VUTKAL Global Technologies"
        className="brand-logo__image"
      />
    </NavLink>
  );
}

export default Logo;