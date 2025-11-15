import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Form from "../../components/Auth/Form";
import { createAccountFields, createAccount } from "../../utils/Auth/authUtils";

const CreateAccount = () => {
  const navigate = useNavigate();

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
        signUpLink={
          <span>
            Already have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none fw-bold"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </span>
        }
        showDivider={false}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
