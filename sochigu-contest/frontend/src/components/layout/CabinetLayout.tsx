import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuthStore } from '@/store/auth.store';

export function CabinetLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary-900 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="font-semibold">Личный кабинет</span>
          <span className="text-sm text-gray-300">{user?.lastName} {user?.firstName}</span>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 flex gap-6">
        <aside className="w-48 shrink-0">
          <nav className="space-y-1">
            {[
              { to: '/cabinet', label: 'Обзор', end: true },
              { to: '/cabinet/application', label: 'Моя заявка' },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  clsx(
                    'block px-3 py-2 rounded text-sm transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-100',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded"
            >
              Выйти
            </button>
          </nav>
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
