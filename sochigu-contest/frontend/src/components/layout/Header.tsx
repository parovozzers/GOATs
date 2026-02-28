import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuthStore } from '@/store/auth.store';

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О конкурсе' },
  { to: '/nominations', label: 'Номинации' },
  { to: '/experts', label: 'Экспертный совет' },
  { to: '/partners', label: 'Партнёры' },
  { to: '/news', label: 'Новости' },
  { to: '/documents', label: 'Документы' },
  { to: '/winners', label: 'Победители' },
  { to: '/contacts', label: 'Контакты' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-primary-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <span className="text-accent-500">СочиГУ</span>
          <span className="hidden sm:inline">| Конкурс проектов</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'px-3 py-2 rounded text-sm transition-colors',
                  isActive ? 'bg-primary-700 text-white' : 'text-gray-200 hover:bg-primary-800',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {isAuthenticated() ? (
            <>
              <Link
                to={user?.role === 'admin' || user?.role === 'moderator' ? '/admin' : '/cabinet'}
                className="px-4 py-2 bg-accent-600 hover:bg-accent-500 rounded text-sm font-medium transition-colors"
              >
                Личный кабинет
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-gray-400 hover:bg-primary-800 rounded text-sm transition-colors"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-400 hover:bg-primary-800 rounded text-sm transition-colors"
              >
                Войти
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-accent-600 hover:bg-accent-500 rounded text-sm font-medium transition-colors"
              >
                Участвовать
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-primary-800 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-gray-200 hover:text-white"
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            {isAuthenticated() ? (
              <>
                <Link to="/cabinet" onClick={() => setMobileOpen(false)} className="text-sm text-accent-500">
                  Личный кабинет
                </Link>
                <button onClick={handleLogout} className="text-sm text-left text-gray-300">
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-gray-200">
                  Войти
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="text-sm text-accent-500 font-medium">
                  Участвовать
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
