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
      <Form fields={createAccountFields} onSubmit={handleCreateAccount} buttonText="Create Account"/>
    </AuthLayout>
  );
};

export default CreateAccount;