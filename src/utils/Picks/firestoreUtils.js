import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const saveToFirestore = (collection, data, user, savingTimer) => {
  if (savingTimer.current) {
    clearTimeout(savingTimer.current);
  }
  savingTimer.current = setTimeout(async () => {
    if (!user) {
    console.warn("User not signed in — picks are not saved to Firestore.");
    return;
    }
    try {
    const ref = doc(db, collection, user.uid);
    await setDoc(ref, data, { merge: true });
    } catch (err) {
    console.error("Error saving picks to Firebase:", err);
    }
  }, 600);
};