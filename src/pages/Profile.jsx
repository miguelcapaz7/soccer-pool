import useProfile from "../hooks/useProfile.js";
import Button from "../components/Button.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

const Profile = () => {
  const {
    user,
    navigate,
    currentPassword,
    setCurrentPassword,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    handlePasswordReset,
    passwordMessage,
    loading,
    showResetPassword,
    setShowResetPassword,
  } = useProfile();

  return (
    <MainLayout title="My Profile">
      <div
        className="bg-white border shadow-sm rounded-4 p-4"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        {/* User Information */}
        <div className="mb-4">
          <h5 className="fw-bold mb-3">User Information</h5>

          <div className="mb-3">
            <div className="text-muted small mb-1">Name:</div>
            <div className="fw-semibold">{user.displayName || "N/A"}</div>
          </div>

          <div>
            <div className="text-muted small mb-1">Email:</div>
            <div className="fw-semibold">{user.email || "N/A"}</div>
          </div>
        </div>

        {/* Reset Password Toggle */}
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={() => setShowResetPassword((prev) => !prev)}
          >
            {showResetPassword ? "Hide Reset Password" : "Reset Password"}
          </button>
        </div>

        {/* Reset Password Form */}
        {showResetPassword && (
          <div className="border rounded-4 p-3 bg-light mb-4">
            <div className="mb-3">
              <label className="form-label fw-semibold">Current Password</label>

              <input
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">New Password</label>

              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Confirm New Password
              </label>

              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            {passwordMessage && (
              <div className="alert alert-info py-2 mb-3">
                {passwordMessage}
              </div>
            )}

            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={handlePasswordReset}
              disabled={loading}
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </div>
        )}

        {/* Back Button */}
        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </MainLayout>
  );
};

export default Profile;
