import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import Form from "../../components/Auth/Form.jsx";
import { loginUser } from "../../utils/Auth/authUtils.js";

const Login = () => {
  const navigate = useNavigate();

  const loginFields = [
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "password", type: "password", placeholder: "Password", required: true, marginBottom: 4 },
  ];

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
        showDivider={true}
        footer={
          <>
            Don't have an account?{" "}
            <button
              className="btn btn-link p-0 fw-bold"
              onClick={() => navigate("/createAccount")}
            >
              Sign up
            </button>
          </>
        }
      />
    </AuthLayout>
  );
};

export default Login;
