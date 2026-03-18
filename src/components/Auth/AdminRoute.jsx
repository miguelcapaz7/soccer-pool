import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return null
  }

  if (!profile || profile.role !== "Admin") {
    return (
      <div className="container py-5 mt-5">
        <h5 className="text-center mt-4">
          You do not have permission to view this page
        </h5>
      </div>
    );
  }

  return <Outlet />;
};
export default AdminRoute;
