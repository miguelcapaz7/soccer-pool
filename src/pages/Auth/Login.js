import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import Form from "../../components/Auth/Form";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/home");
  };

  const fields = [
    { name: "email", type: "email", placeholder: "Email", required: true},
    { name: "password", type: "password", placeholder: "Password", required: true, marginBottom: 5},
  ]

  return (
    <AuthLayout title="Login">
      <Form fields={fields} onSubmit={handleLogin} buttonText="Login" 
        extraButton={
          <Button type="button" onClick={() => navigate("/createAccount")} color="dark">Create Account</Button>
        } 
      />
    </AuthLayout>
  );
};

export default Login;