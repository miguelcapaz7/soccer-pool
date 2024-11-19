import useAuth from '../hooks/useAuth';
import Navbar from '../components/Navbar';

const ProtectedRoute = ({ children }) => {
  useAuth();
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
};

export default ProtectedRoute;