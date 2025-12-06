import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import Form from "../../components/Auth/Form.jsx";
import { createAccount } from "../../utils/Auth/authUtils.js";

const CreateAccount = () => {
  const navigate = useNavigate();

  const createAccountFields = [
    { name: "firstName", type: "text", placeholder: "First Name", required: true },
    { name: "lastName", type: "text", placeholder: "Last Name", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "password", type: "password", placeholder: "Password", required: true },
    { name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true, marginBottom: 4 },
  ];

  const handleCreateAccount = async (data) => {
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match.");
    }
    await createAccount(data);
    navigate("/home");
  };

  return (
    <AuthLayout title="Create Account">
      <Form
        fields={createAccountFields}
        onSubmit={handleCreateAccount}
        buttonText="Create Account"
        showDivider={false}
        footer={
          <>
            Already have an account?{" "}
            <button
              className="btn btn-link p-0 fw-bold"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </>
        }
      />
    </AuthLayout>
  );
};

export default CreateAccount;
