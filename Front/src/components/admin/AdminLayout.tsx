import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Settings,
  Palette,
  CreditCard,
  ImageIcon,
  LogOut,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';
import { cn } from '@/utils/cn';

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Store Settings', to: '/admin/settings', icon: Settings },
  { label: 'Branding', to: '/admin/branding', icon: Palette },
  { label: 'Payments', to: '/admin/payments', icon: CreditCard },
  { label: 'Media', to: '/admin/media', icon: ImageIcon },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAdminStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside className={cn(
      'flex flex-col h-full bg-white border-r border-gray-100',
      mobile ? 'w-64' : 'w-64 hidden lg:flex'
    )}>
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
            <Package size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900">DigitalStoreLK</div>
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => mobile && setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={17} className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={13} className="text-blue-400" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          id="admin-logout"
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={17} />
          Log Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar mobile />
          </div>
        </>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-5 sm:px-7 py-4 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600"
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-base font-bold text-gray-900 hidden sm:block">Admin Panel</h2>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-blue-600 transition-colors font-medium"
          >
            View Store →
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 sm:p-7 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
