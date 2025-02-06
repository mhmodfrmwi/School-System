import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, requiredRole }) => {
  const isAuthenticated = useSelector((state) => state.login.token);
  const role = useSelector((state) => state.role.role) || localStorage.getItem("role");

  if (!isAuthenticated || role !== requiredRole) {
    return <Navigate to="/role" />;
  }

  return element; 
};

export default ProtectedRoute;
