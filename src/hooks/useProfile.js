import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const useProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      setPasswordMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);

      if (err.code === "auth/wrong-password") {
        setPasswordMessage("Current password is incorrect.");
      } else if (err.code === "auth/weak-password") {
        setPasswordMessage("Password should be at least 6 characters.");
      } else {
        setPasswordMessage("Failed to update password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    navigate,
    currentPassword,
    setCurrentPassword,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handlePasswordReset,
    passwordMessage,
    loading,
    showResetPassword,
    setShowResetPassword,
  };
};

export default useProfile;
