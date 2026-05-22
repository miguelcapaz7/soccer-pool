import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
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
          const usersData = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) =>
              (a.firstName || "").localeCompare(b.firstName || "", undefined, {
                sensitivity: "base",
              }),
            );
          setUsers(usersData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching users:", err);
          setError("Failed to load users.");
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Unexpected error fetching users:", err);
      setError("Failed to load users.");
      setLoading(false);
    }
  }, []);

  const handleViewPool = (user) => {
    navigate(`/admin/viewPool/${user.id}`, {
      state: {
        userName: `${user.firstName} ${user.lastName}`,
      },
    });
  };

  const handleUnsubmit = async (userId) => {
    if (!window.confirm("Are you sure you want to unsubmit this user's picks?"))
      return;

    try {
      await Promise.all([
        updateDoc(doc(db, "users", userId), {
          picksSubmitted: false,
        }),
        deleteDoc(doc(db, "userPicks", userId)),
        deleteDoc(doc(db, "leaderboard", userId)),
      ]);

      alert("User picks successfully unsubmitted.");
    } catch (err) {
      console.error("Error unsubmitting user picks:", err);
      alert("Failed to unsubmit user picks.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await Promise.all([
        deleteDoc(doc(db, "users", userId)),
        deleteDoc(doc(db, "userPicks", userId)),
        deleteDoc(doc(db, "leaderboard", userId)),
      ]);
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return {
    users,
    loading,
    error,
    handleViewPool,
    handleUnsubmit,
    handleDeleteUser,
  };
};

export default useUsers;
