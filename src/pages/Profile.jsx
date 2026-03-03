import useProfile from "../hooks/useProfile.js";
import Button from "../components/Button.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

const Profile = () => {
  const { user, navigate } = useProfile();

  if (!user) {
    return null;
  }

  return (
    <MainLayout title="My Profile">
      <div className="p-4 border rounded-3 shadow-sm bg-light" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h5 className="mb-3">User Information</h5>
        <div className="mb-3">
          <strong>Name:</strong>
          <p className="mb-0">{user.displayName || ""}</p>
        </div>
        <div className="mb-3">
          <strong>Email:</strong>
          <p className="mb-0">{user.email || ""}</p>
        </div>

        <Button color="dark" onClick={() => navigate("/home")}>
          Back to Home
        </Button>
      </div>
    </MainLayout>
  );
};

export default Profile;