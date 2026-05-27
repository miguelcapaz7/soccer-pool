import logo from "../assets/images/world-cup-2026-logo.jpg";
import "../assets/styles/Auth.css"

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-shell d-flex align-items-center justify-content-center bg-light py-4 py-lg-0">
      <div className="container px-3">
        <div
          className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white mx-auto auth-card"
          style={{ maxWidth: "1050px" }}
        >
          <div className="col-lg-7 d-none d-lg-flex bg-dark align-items-center justify-content-center p-5">
            <img
              src={logo}
              alt="WC 2026"
              className="img-fluid rounded-4"
              style={{ maxHeight: "370px" }}
            />
          </div>

          <div className="col-12 col-lg-5 d-flex align-items-center">
            <div className="p-4 p-lg-5 w-100">
              <div className="d-lg-none text-center mb-4">
                <img src={logo} className="rounded-3" alt="WC 2026" style={{ height: "48px" }} />
              </div>

              <h1 className="h3 fw-semibold text-center mb-1">{title}</h1>
              {subtitle ? (
                <p className="text-muted text-center mb-4 small">{subtitle}</p>
              ) : (
                <div className="mb-4" />
              )}

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
