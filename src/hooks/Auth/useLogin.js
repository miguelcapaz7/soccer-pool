import { useNavigate } from "react-router-dom";
import useForm from "./useForm";
import { loginUser, toAuthErrorMessage } from "../../utils/Auth/authUtils";

const LOGIN_ERROR_MESSAGES = {
  "auth/invalid-credential": "Username or password is incorrect.",
  "auth/invalid-email": "Username or password is incorrect.",
  "auth/wrong-password": "Username or password is incorrect.",
  "auth/user-not-found": "Username or password is incorrect.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
};

const useLogin = () => {
  const navigate = useNavigate();

  return useForm(
    { email: "", password: "" },
    async (data) => {
      try {
        await loginUser(data);
        navigate("/home");
      } catch (err) {
        throw new Error(toAuthErrorMessage(err, LOGIN_ERROR_MESSAGES));
      }
    }
  );
};

export default useLogin;