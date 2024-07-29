import { useState } from "react";
import logo from "../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { label: "Features", href: "#" },
  { label: "Bible Studies", href: "https://www.youtube.com/watch?v=o_FplGpMczg" },
  {
    label: "Youtube Live Service",
    href: "https://www.youtube.com/@ItoreroADEPR",
  },
  { label: "Testimonials", href: "#" },
];

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
      } sticky-top`}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2"
          />
          ADEPR
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={!mobileDrawerOpen}
          aria-label="Toggle navigation"
        >
          {mobileDrawerOpen ? <FiX /> : <FiMenu />}
        </button>
        <div
          className={`collapse navbar-collapse ${
            mobileDrawerOpen ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex">
            <button
              className="btn btn-primary me-2"
              data-bs-theme="dark"
              onClick={toggleTheme}
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
            <button className="btn btn-primary">Welcome</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
