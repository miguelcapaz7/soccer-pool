import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const createAccount = async ({ firstName, lastName, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const currentUser = userCredential.user;

  await updateProfile(currentUser, { displayName: `${firstName} ${lastName}` });

  await setDoc(doc(db, "users", currentUser.uid), {
    firstName,
    lastName,
    email,
    role: "User",
    createdAt: new Date(),
  });

  return currentUser;
};

export const loginUser = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginFields = [
  { name: "email", type: "email", placeholder: "Email", required: true },
  { name: "password", type: "password", placeholder: "Password", required: true, marginBottom: 4 },
];

export const createAccountFields = [
  { name: "firstName", type: "text", placeholder: "First Name", required: true },
  { name: "lastName", type: "text", placeholder: "Last Name", required: true },
  { name: "email", type: "email", placeholder: "Email", required: true },
  { name: "password", type: "password", placeholder: "Password", required: true },
  { name: "confirmPassword", type: "password", placeholder: "Confirm Password", required: true, marginBottom: 4 },
];