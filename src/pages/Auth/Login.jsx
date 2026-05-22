import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import Form from "../../components/Auth/Form.jsx";
import useLogin from "../../hooks/Auth/useLogin.js";

const LOGIN_FIELDS = [
  { name: "email", type: "email", placeholder: "Email", required: true },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
    marginBottom: 4,
  },
];

const Login = () => {
  const navigate = useNavigate();
  const form = useLogin();

  return (
    <AuthLayout title="Login">
      <Form
        fields={LOGIN_FIELDS}
        form={form}
        buttonText="Login"
        showDivider
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
