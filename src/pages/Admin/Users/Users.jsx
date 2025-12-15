import React from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout.jsx";
import useManageUsers from "../../../hooks/Admin/Users/useUsers.js";
import Button from "../../../components/Button.jsx";

const Users = () => {
  const { user, profile } = useAuth();
  const { users, loading, error } = useManageUsers();
  const navigate = useNavigate();

  if (!user || !profile) {
    return null;
  }

  if (profile.role !== "Admin") {
    return (
      <div className="container py-5 mt-5">
        <h5 className="text-center mt-4">
          You do not have permission to view this page
        </h5>
      </div>
    );
  }

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

  return (
    <MainLayout title="Users">
      <div className="container mt-4">
        {loading && <p>Loading users...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && users.length === 0 && (
          <p className="text-center">No users found.</p>
        )}
        <p>Number of users: {users.length}</p>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u.id}>
                  <td>
                    {`${u.firstName || ""} ${u.lastName || ""}` || "User"}
                  </td>
                  <td>{u.email || "N/A"}</td>
                  <td>{u.picksSubmitted ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => handleViewPool(u.id)}
                    >
                      View Pool
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
