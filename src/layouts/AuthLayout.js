import logo from "../assets/images/world-cup-2026-logo.jpg";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center">
        <div className="row shadow-lg">
          <div className="col d-flex justify-content-center align-items-center bg-dark">
            <img
              src={logo}
              alt="FIFA World Cup 2026 Logo"
              className="img-fluid h-75"
            />
          </div>
          <div className="col-5 p-5 bg-white">
            <div className="form-group p-5">
              <h2 className="text-center my-5">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
