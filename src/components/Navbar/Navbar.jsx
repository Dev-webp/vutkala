import { useState } from "react";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import AuthButtons from "./AuthButtons";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Logo />

      <NavigationMenu
        isMenuOpen={isMenuOpen}
        onNavigate={closeMenu}
      />

      <div className="nav-buttons">
        <AuthButtons />
      </div>

      <button
        type="button"
        className={`menu-toggle ${
          isMenuOpen ? "open" : ""
        }`}
        onClick={() =>
          setIsMenuOpen((prev) => !prev)
        }
        aria-label={
          isMenuOpen
            ? "Close menu"
            : "Open menu"
        }
        aria-expanded={isMenuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;