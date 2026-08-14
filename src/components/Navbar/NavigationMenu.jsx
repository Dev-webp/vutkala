import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import menuItems from "./NavbarData";

function NavigationMenu({
  isMenuOpen,
  onNavigate,
}) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const handleNavigation = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    onNavigate();
  };

  return (
    <ul
      className={`nav-links ${
        isMenuOpen ? "active" : ""
      }`}
    >
      {menuItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={handleNavigation}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavigationMenu;