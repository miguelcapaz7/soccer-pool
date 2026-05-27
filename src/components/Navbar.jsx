import { NavLink } from "react-router-dom";
import useNavbar from "../hooks/useNavbar";
import logo from "../assets/images/world-cup-2026-logo.jpg";
import "../assets/styles/Navbar.css"

const Navbar = () => {
  const { displayName, navItems, dropdownItems, handleNavLinkClick, handleToggle } =
    useNavbar();

  const getNavPath = (item) =>
    item === "View Your Picks" ? "/yourPicks" : `/${item.toLowerCase()}`;

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <nav className="navbar navbar-dark navbar-expand-lg fixed-top app-navbar">
      <div className="container-fluid px-3 px-md-4">
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2"
          to="/home"
          onClick={handleNavLinkClick}
        >
          <img
            src={logo}
            alt="WC 2026"
            className="rounded"
            style={{ height: "32px", width: "auto" }}
          />
        </NavLink>

        <button
          className="navbar-toggler border-0 p-1"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link app-nav-link px-3 ${isActive ? "active" : ""}`
                  }
                  to={getNavPath(item)}
                  onClick={handleNavLinkClick}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <button
                className="nav-link app-user-toggle d-flex align-items-center gap-2 bg-transparent border-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="user-avatar">{getInitials(displayName)}</span>
                <span className="d-none d-lg-inline">{displayName}</span>
                <i className="bi bi-chevron-down small" style={{ fontSize: "0.7rem" }} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                <li className="px-3 py-2 d-lg-none">
                  <div className="fw-semibold small">{displayName}</div>
                </li>
                <li className="d-lg-none">
                  <hr className="dropdown-divider my-0" />
                </li>
                {dropdownItems.map((item, idx) =>
                  item.type === "divider" ? (
                    <li key={idx}>
                      <hr className="dropdown-divider" />
                    </li>
                  ) : (
                    <li key={idx}>
                      <button
                        className="dropdown-item py-2"
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
