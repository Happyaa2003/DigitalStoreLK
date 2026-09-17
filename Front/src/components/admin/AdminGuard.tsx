import { Navigate, Outlet } from 'react-router-dom';
import { useAdminStore } from '@/stores/adminStore';

export default function AdminGuard() {
  const { isAuthenticated } = useAdminStore();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
