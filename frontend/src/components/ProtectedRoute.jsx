import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  return user ? children : <Navigate to="/client-portal" state={{ from: location }} replace />;
}
