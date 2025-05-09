import logo from "../../assets/images/world-cup-2026-logo.jpg";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center">
        <div className="row shadow-lg">
          <div className="col d-flex justify-content-center align-items-center bg-primary">
            <img
              src={logo}
              alt="FIFA World Cup 2026 Logo"
              className="img-fluid"
            />
          </div>
          <div className="col-5 p-5">
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
