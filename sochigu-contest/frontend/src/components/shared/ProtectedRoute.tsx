import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

interface Props {
  roles?: string[];
}

export function ProtectedRoute({ roles }: Props) {
  const { isAuthenticated, hasRole } = useAuthStore();

  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (roles && !hasRole(roles)) return <Navigate to="/" replace />;

  return <Outlet />;
}
