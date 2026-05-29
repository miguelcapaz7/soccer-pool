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

  const StatusBadge = ({ submitted }) => (
    <span
      className={`badge rounded-pill ${
        submitted
          ? "bg-success-subtle text-success-emphasis border border-success-subtle"
          : "bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle"
      }`}
    >
      {submitted ? "Submitted" : "Pending"}
    </span>
  );

  const UserActions = ({ user, onView, onUnsubmit, onDelete }) => (
    <>
      <Button color="success" size="sm" onClick={() => onView(user)}>
        View Entry
      </Button>
      <Button
        color="warning"
        size="sm"
        onClick={() => onUnsubmit(user)}
        disabled={!user.picksSubmitted}
      >
        Unsubmit
      </Button>
      <Button color="danger" size="sm" onClick={() => onDelete(user)}>
        Delete
      </Button>
    </>
  );

  const displayName = (u) =>
    `${u.firstName || ""} ${u.lastName || ""}`.trim() || "User";

  const UserCard = ({ user, onView, onUnsubmit, onDelete }) => (
    <div
      className="rounded-3 border shadow-sm p-3 d-flex flex-column gap-3"
      style={{ backgroundColor: user.picksSubmitted ? "#e5f9cc" : "white" }}
    >
      <div className="d-flex align-items-start justify-content-between gap-2">
        <div style={{ minWidth: 0 }}>
          <div className="fw-semibold text-truncate">{displayName(user)}</div>
          <div className="small text-muted text-truncate">
            {user.email || "No email"}
          </div>
          <div className="small text-muted text-truncate">
            Date Joined:{" "}
            {user.createdAt?.toDate().toLocaleDateString() || "N/A"}
          </div>
        </div>
        <StatusBadge submitted={user.picksSubmitted} />
      </div>
      <div className="d-flex gap-2">
        <UserActions
          user={user}
          onView={onView}
          onUnsubmit={onUnsubmit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );

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
            <div className="d-none d-lg-block table-responsive rounded-3 shadow-sm border small">
              <table className="table align-middle mb-0">
                <thead
                  className="table-dark"
                  style={{ letterSpacing: "0.3px" }}
                >
                  <tr>
                    <th className="py-2 border-0">Name</th>
                    <th className="py-2 border-0">Email</th>
                    <th className="py-2 border-0 text-center">Status</th>
                    <th className="py-2 border-0 text-center text-truncate">
                      Date Joined
                    </th>
                    <th className="py-2 border-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      style={{
                        "--bs-table-bg": u.picksSubmitted
                          ? "#e5f9cc"
                          : "transparent",
                      }}
                    >
                      <td className="py-3 fw-semibold">{displayName(u)}</td>
                      <td className="py-3 text-muted">{u.email || "N/A"}</td>
                      <td className="py-3 text-center text-truncate">
                        <StatusBadge submitted={u.picksSubmitted} />
                      </td>
                      <td className="py-3 text-center text-muted">
                        {u.createdAt?.toDate().toLocaleDateString()}
                      </td>
                      <td className="py-2 text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <UserActions
                            user={u}
                            onView={handleViewPool}
                            onUnsubmit={handleUnsubmit}
                            onDelete={handleDeleteUser}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-lg-none d-flex flex-column gap-2">
              {users.map((u) => (
                <UserCard
                  key={u.id}
                  user={u}
                  onView={handleViewPool}
                  onUnsubmit={handleUnsubmit}
                  onDelete={handleDeleteUser}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Users;
