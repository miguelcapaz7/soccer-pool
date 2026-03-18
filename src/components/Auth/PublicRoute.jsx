import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  return loading ? null : user ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;
