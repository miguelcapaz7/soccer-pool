import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const usersCollection = collection(db, "users");

      const unsubscribe = onSnapshot(
        usersCollection,
        (snapshot) => {
          const usersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching users:", err);
          setError("Failed to load users.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Unexpected error fetching users:", err);
      setError("Failed to load users.");
      setLoading(false);
    }
  }, []);

  return { users, loading, error };
};

export default useUsers;