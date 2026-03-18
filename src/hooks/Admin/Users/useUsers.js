import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleViewPool = (userId) => {
    navigate(`/admin/viewPool/${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return { users, loading, error, handleViewPool, handleDeleteUser };
};

export default useUsers;