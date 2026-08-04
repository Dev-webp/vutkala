import { NavLink } from "react-router-dom";
import menuItems from "./NavbarData";

function NavigationMenu({isMenuOpen }) {
  return (
    <ul
  className={`nav-links ${isMenuOpen ? "active" : ""}`}
>
      {menuItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            end={item.path === "/"}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
      
    </ul>
  );
}

export default NavigationMenu;