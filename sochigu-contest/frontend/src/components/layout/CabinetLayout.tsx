import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';
import logo from '@/logo.png';

const sidebarLinks = [
  { to: '/cabinet', label: 'Обзор', icon: LayoutDashboard, exact: true },
  { to: '/cabinet/application', label: 'Моя заявка', icon: FileText },
];

export function CabinetLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="СочиГУ" className="h-9 w-auto" />
            <span className="text-sm text-muted-foreground">| Личный кабинет</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">{user?.firstName} {user?.lastName}</span>
            <button onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={16} /> Выйти
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex gap-6 px-4 py-6">
        <aside className="hidden w-48 shrink-0 md:block">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = link.exact
                ? location.pathname === link.to
                : location.pathname.startsWith(link.to);
              return (
                <Link key={link.to} to={link.to}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary-light text-primary' : 'text-muted-foreground hover:bg-muted'
                  }`}>
                  <link.icon size={18} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
