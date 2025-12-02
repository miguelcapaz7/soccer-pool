import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import Form from "../../components/Auth/Form.jsx";
import { loginFields, loginUser } from "../../utils/Auth/authUtils.js";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await loginUser(data);
      navigate("/home");
    } catch (err) {
      throw new Error("Username or password is incorrect");
    }
  };

  return (
    <AuthLayout title="Login">
      <Form
        fields={loginFields}
        onSubmit={handleLogin}
        buttonText="Login"
        signUpLink={
          <span>
            Don't have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none fw-bold"
              onClick={() => navigate("/createAccount")}
            >
              Sign up
            </button>
          </span>
        }
        showDivider={true}
      />
    </AuthLayout>
  );
};

export default Login;
