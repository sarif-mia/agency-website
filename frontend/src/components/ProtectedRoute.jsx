import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
export default function ProtectedRoute({ children }) {
  const { user, restoring } = useAuth();
  const location = useLocation();
  if (restoring)
    return (
      <div className="page-loading" role="status">
        <span className="spinner" /> Checking your session…
      </div>
    );
  return user ? (
    children
  ) : (
    <Navigate to="/client-portal" state={{ from: location }} replace />
  );
}
