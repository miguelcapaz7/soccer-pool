import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const saveToFirestore = async (collection, data, user) => {
  if (!user) {
    console.warn("User not signed in — picks are not saved to Firestore.");
    return;
  }
  try {
    const ref = doc(db, collection, user.uid); // collection: 'picks' | doc: user.uid
    await setDoc(ref, data, { merge: true });
    console.log("Picks saved to Firestore!");
  } catch (err) {
    console.error("Error saving picks to Firebase:", err);
    throw err;
  }
};
