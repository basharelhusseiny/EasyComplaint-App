import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
