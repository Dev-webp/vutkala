import "./Navbar.css";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import AuthButtons from "./AuthButtons";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Logo />

      <NavigationMenu isMenuOpen={isMenuOpen} />

      <AuthButtons />

      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

export default Navbar;