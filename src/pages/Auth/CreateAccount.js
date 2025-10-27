import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AuthLayout from "../../layouts/AuthLayout";
import Form from "../../components/Auth/Form";

const CreateAccount = () => {
  const navigate = useNavigate();

  const handleCreateAccount = async ({ firstName, lastName, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = userCredential.user

    await updateProfile(currentUser, {
      displayName: `${firstName} ${lastName}`,
    });

    await setDoc(doc(db, "users", currentUser.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: "User",
      createdAt: new Date(),
    });

    navigate("/home");
  };

  const fields = [
    { name: "firstName", type: "text", placeholder: "First Name", required: true },
    { name: "lastName", type: "text", placeholder: "Last Name", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "password", type: "password", placeholder: "Password", required: true },
    { name: "confirmPassword", type: "password", placeholder: "Password Confirmation", required: true, marginBottom: 5},
  ];

  return (
    <AuthLayout title="Create Account">
      <Form fields={fields} onSubmit={handleCreateAccount} buttonText="Create Account"/>
    </AuthLayout>
  );
};

export default CreateAccount;