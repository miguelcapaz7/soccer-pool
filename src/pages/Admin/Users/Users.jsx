import MainLayout from "../../../layouts/MainLayout.jsx";
import useUsers from "../../../hooks/Admin/Users/useUsers.js";
import Button from "../../../components/Button.jsx";
import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const Users = () => {
  const {
    users,
    loading,
    error,
    handleViewPool,
    handleUnsubmit,
    handleDeleteUser,
  } = useUsers();

  return (
    <MainLayout title="Users">
      <div className="container mt-4">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center">No users found.</p>
        ) : (
          <>
            <p>Number of users: {users.length}</p>
            <div className="table-responsive rounded-3 shadow-sm border small">
              <table className="table align-middle mb-0">
                <thead
                  className="table-dark"
                  style={{ letterSpacing: "0.3px" }}
                >
                  <tr>
                    <th className="py-2 border-0 text-center">Name</th>
                    <th className="py-2 border-0 text-center">Email</th>
                    <th className="py-2 border-0 text-center">Submitted</th>
                    <th className="py-2 border-0 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      style={{
                        backgroundColor: u.picksSubmitted
                          ? "#fff3cd"
                          : "transparent",
                      }}
                    >
                      <td className="py-3 fw-semibold text-center">
                        {`${u.firstName || ""} ${u.lastName || ""}`.trim() ||
                          "User"}
                      </td>

                      <td className="py-3 text-muted text-center">
                        {u.email || "N/A"}
                      </td>

                      <td
                        className={`py-3 text-center fw-bold ${
                          u.picksSubmitted ? "text-success" : "text-danger"
                        }`}
                      >
                        {u.picksSubmitted ? "YES" : "NO"}
                      </td>

                      <td className="py-2 text-center">
                        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                          <Button
                            color="success"
                            size="sm"
                            onClick={() => handleViewPool(u)}
                          >
                            View Entry
                          </Button>
                          <Button
                            color="warning"
                            size="sm"
                            onClick={() => handleUnsubmit(u)}
                            disabled={!u.picksSubmitted}
                          >
                            Unsubmit
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDeleteUser(u)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Users;
