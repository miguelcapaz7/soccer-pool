import { NavLink } from "react-router-dom";
import useNavbar from "../hooks/useNavbar";
import logo from "../assets/images/world-cup-2026-logo.jpg";

const Navbar = () => {
  const { displayName, navItems, dropdownItems, handleNavLinkClick } =
    useNavbar();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to="/home"
          onClick={handleNavLinkClick}
        >
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-top rounded"
            style={{ height: "35px", width: "auto" }}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  className="nav-link mx-3 text-white"
                  to={`/${item.toLowerCase()}`}
                  onClick={handleNavLinkClick}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown mx-3">
              <button
                className="nav-link dropdown-toggle text-white bg-transparent border-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {displayName}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {dropdownItems.map((item, idx) =>
                  item.type === "divider" ? (
                    <li key={idx}>
                      <hr className="dropdown-divider" />
                    </li>
                  ) : (
                    <li key={idx}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          handleNavLinkClick();
                          item.onClick();
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
