import { useNavigate } from "react-router-dom";
import useForm from "./useForm";
import { createAccount, toAuthErrorMessage } from "../../utils/Auth/authUtils";

const CREATE_ACCOUNT_ERROR_MESSAGES = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/operation-not-allowed": "Account creation is currently unavailable.",
  "auth/network-request-failed":
    "Network error. Check your connection and try again.",
};

const useCreateAccount = () => {
  const navigate = useNavigate();

  return useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    async (data) => {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match.");
      }
      try {
        await createAccount(data);
        navigate("/home");
      } catch (err) {
        throw new Error(toAuthErrorMessage(err, CREATE_ACCOUNT_ERROR_MESSAGES));
      }
    },
  );
};

export default useCreateAccount;
