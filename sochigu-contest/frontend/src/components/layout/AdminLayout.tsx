import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuthStore } from '@/store/auth.store';

const ADMIN_LINKS = [
  { to: '/admin', label: 'Дашборд', end: true },
  { to: '/admin/applications', label: 'Заявки' },
  { to: '/admin/users', label: 'Пользователи' },
  { to: '/admin/analytics', label: 'Аналитика' },
  { to: '/admin/cms/news', label: 'Новости' },
  { to: '/admin/cms/documents', label: 'Документы' },
  { to: '/admin/cms/winners', label: 'Победители' },
  { to: '/admin/cms/nominations', label: 'Номинации' },
];

export function AdminLayout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-56 bg-primary-900 text-white flex flex-col shrink-0">
        <div className="p-4 font-bold text-lg border-b border-primary-800">
          Админ-панель
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {ADMIN_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                clsx(
                  'block px-3 py-2 rounded text-sm transition-colors',
                  isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-800',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-primary-800">
          <NavLink to="/" className="block text-xs text-gray-400 hover:text-white mb-2">
            ← Публичный сайт
          </NavLink>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full text-left text-xs text-gray-400 hover:text-white"
          >
            Выйти
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
