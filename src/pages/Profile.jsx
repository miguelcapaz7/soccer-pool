import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import MainLayout from "../layouts/MainLayout";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const displayName = user.displayName || "";
  const email = user.email || "";

  return (
    <MainLayout title="My Profile">
      <div className="p-4 border rounded-3 shadow-sm bg-light" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h5 className="mb-3">User Information</h5>
        <div className="mb-3">
          <strong>Name:</strong>
          <p className="mb-0">{displayName}</p>
        </div>
        <div className="mb-3">
          <strong>Email:</strong>
          <p className="mb-0">{email}</p>
        </div>

        <Button color="dark" onClick={() => navigate("/home")}>
          Back to Home
        </Button>
      </div>
    </MainLayout>
  );
};

export default Profile;