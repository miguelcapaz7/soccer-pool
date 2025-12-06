import logo from "../assets/images/world-cup-2026-logo.jpg";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container">
        <div className="row shadow-lg rounded overflow-hidden">
          <div className="col-md-7 bg-dark d-none d-md-flex justify-content-center align-items-center">
            <img
              src={logo}
              alt="WC 2026 Logo"
              className="img-fluid rounded h-75"
            />
          </div>
          <div className="col-12 col-md-5 bg-white d-flex justify-content-center align-items-center">
            <div className="p-5 w-100" style={{ maxWidth: "400px" }}>
              <h2 className="text-center mb-4">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
