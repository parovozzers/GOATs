import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LayoutDashboard, FileText, Users, BarChart3, Newspaper, FolderOpen, Trophy, Tag, ExternalLink, LogOut } from 'lucide-react';

const sidebarLinks = [
  { to: '/admin', label: 'Дашборд', icon: LayoutDashboard, exact: true },
  { to: '/admin/applications', label: 'Заявки', icon: FileText },
  { to: '/admin/users', label: 'Пользователи', icon: Users },
  { to: '/admin/analytics', label: 'Аналитика', icon: BarChart3 },
  { to: '/admin/cms/news', label: 'Новости', icon: Newspaper },
  { to: '/admin/cms/documents', label: 'Документы', icon: FolderOpen },
  { to: '/admin/cms/winners', label: 'Победители', icon: Trophy },
  { to: '/admin/cms/nominations', label: 'Номинации', icon: Tag },
];

export function AdminLayout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="flex min-h-screen">
      <aside className="sidebar-print-hide fixed left-0 top-0 z-40 flex h-screen w-56 flex-col bg-primary text-primary-foreground">
        <div className="border-b border-primary-mid p-4">
          <span className="text-lg font-bold text-accent">СочиГУ</span>
          <p className="text-xs text-primary-foreground/70">Панель управления</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {sidebarLinks.map((link) => {
            const isActive = link.exact
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            return (
              <Link key={link.to} to={link.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-primary-foreground/70 hover:bg-primary-mid hover:text-primary-foreground'
                }`}>
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-primary-mid p-3">
          <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary-foreground/70 hover:bg-primary-mid">
            <ExternalLink size={16} /> Публичный сайт
          </Link>
          <button onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary-foreground/70 hover:bg-primary-mid">
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </aside>
      <main className="print-full ml-56 flex-1 bg-background p-6">
        <Outlet />
      </main>
    </div>
  );
}
