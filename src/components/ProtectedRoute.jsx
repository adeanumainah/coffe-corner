import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { isLogin, currentUser } = useContext(AuthContext);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
