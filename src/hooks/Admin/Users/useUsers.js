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

  const handleUnsubmit = async (user) => {
    if (
      !window.confirm(
        `Are you sure you want to unsubmit entry for ${user.firstName} ${user.lastName}?`,
      )
    )
      return;

    try {
      await Promise.all([
        updateDoc(doc(db, "users", user.id), {
          picksSubmitted: false,
        }),
        deleteDoc(doc(db, "userPicks", user.id)),
        deleteDoc(doc(db, "leaderboard", user.id)),
      ]);

      alert(`Successfully unsubmitted entry for ${user.firstName} ${user.lastName}.`);
    } catch (err) {
      console.error(`Error unsubmitting entry for ${user.firstName} ${user.lastName}:`, err);
      alert(`Failed to unsubmit entry for ${user.firstName} ${user.lastName}.`);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) return;
    try {
      await Promise.all([
        deleteDoc(doc(db, "users", user.id)),
        deleteDoc(doc(db, "userPicks", user.id)),
        deleteDoc(doc(db, "leaderboard", user.id)),
      ]);
      alert(`${user.firstName} ${user.lastName} deleted successfully`);
    } catch (err) {
      console.error(`Error deleting ${user.firstName} ${user.lastName}:`, err);
      alert(`Failed to delete ${user.firstName} ${user.lastName}`);
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
