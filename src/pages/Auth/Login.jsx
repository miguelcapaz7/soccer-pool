import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import Form from "../../components/Auth/Form";
import { loginFields, loginUser } from "../../utils/Auth/authUtils";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    await loginUser(data);
    navigate("/home");
  };

  return (
    <AuthLayout title="Login">
      <Form fields={loginFields} onSubmit={handleLogin} buttonText="Login" 
        extraButton={
          <Button type="button" onClick={() => navigate("/createAccount")} color="dark">Create Account</Button>
        } 
      />
    </AuthLayout>
  );
};

export default Login;