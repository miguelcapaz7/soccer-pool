import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const createAccount = async ({ firstName, lastName, email, password }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, { displayName: `${firstName} ${lastName}` });

  await setDoc(doc(db, "users", user.uid), {
    firstName,
    lastName,
    email,
    role: "User",
    picksSubmitted: false,
    createdAt: new Date(),
  });
};

export const loginUser = ({ email, password }) => 
  signInWithEmailAndPassword(auth, email, password).then((res) => res.user);

export const toAuthErrorMessage = (err, codeMap) =>
  codeMap[err?.code] || "Something went wrong. Please try again.";
