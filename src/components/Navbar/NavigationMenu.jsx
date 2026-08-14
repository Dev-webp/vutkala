import { NavLink } from "react-router-dom";
import menuItems from "./NavbarData";

function NavigationMenu({ isMenuOpen, onNavigate }) {
  return (
    <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
      {menuItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavigationMenu;