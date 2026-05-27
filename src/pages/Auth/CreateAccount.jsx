import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout.jsx";
import Form from "../../components/Auth/Form.jsx";
import useCreateAccount from "../../hooks/Auth/useCreateAccount.js";

const CREATE_ACCOUNT_FIELDS = [
  {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    required: true,
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    required: true,
    autoComplete: "family-name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    required: true,
    autoComplete: "new-password",
  },
];

const CreateAccount = () => {
  const navigate = useNavigate();
  const form = useCreateAccount();

  return (
    <AuthLayout title="Create Account">
      <Form
        fields={CREATE_ACCOUNT_FIELDS}
        form={form}
        buttonText="Create Account"
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
