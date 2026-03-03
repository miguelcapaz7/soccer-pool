import React from "react";
import MainLayout from "../../../layouts/MainLayout.jsx";
import useUsers from "../../../hooks/Admin/Users/useUsers.js";
import Button from "../../../components/Button.jsx";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const Users = () => {
  const {
    user,
    profile,
    users,
    loading,
    error,
    handleViewPool,
    handleDeleteUser,
  } = useUsers();

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

  return (
    <MainLayout title="Users">
      <div className="container mt-4">
        {loading && <LoadingSpinner />}
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
              {[...users]
                .sort((a, b) =>
                  (a.firstName || "").localeCompare(
                    b.firstName || "",
                    undefined,
                    {
                      sensitivity: "base",
                    },
                  ),
                )
                .map((u, index) => (
                  <tr key={u.id}>
                    <td>
                      {`${u.firstName || ""} ${u.lastName || ""}` || "User"}
                    </td>
                    <td>{u.email || "N/A"}</td>
                    <td>{u.picksSubmitted ? "Yes" : "No"}</td>
                    <td>
                      <Button
                        color="success"
                        className="me-2"
                        onClick={() => handleViewPool(u.id)}
                      >
                        View Pool
                      </Button>
                      <Button
                        color="danger"
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
