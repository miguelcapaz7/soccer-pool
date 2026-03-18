import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  return loading ? null : user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
