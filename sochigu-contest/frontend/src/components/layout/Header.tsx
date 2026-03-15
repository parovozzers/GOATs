import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { authApi } from '@/api/auth';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoWhite from '@/logo_white.png';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О конкурсе' },
  { to: '/nominations', label: 'Номинации' },
  { to: '/experts', label: 'Экспертный совет' },
  { to: '/news', label: 'Новости' },
  { to: '/documents', label: 'Документы' },
  { to: '/winners', label: 'Победители' },
  { to: '/contacts', label: 'Контакты' },
];

export function Header() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => { await authApi.logout(); navigate('/'); };
  const cabinetPath = user?.role === 'admin' || user?.role === 'moderator' || user?.role === 'expert' ? '/admin' : '/cabinet';

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <img src={logoWhite} alt="СочиГУ" className="h-10 w-auto" />
          <span className="hidden text-sm font-medium text-primary-foreground/80 sm:inline">| Конкурс проектов</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-mid hover:text-primary-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link to={cabinetPath}
                className="rounded-lg border border-primary-foreground/30 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-mid">
                Личный кабинет
              </Link>
              <button onClick={handleLogout}
                className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="rounded-lg border border-primary-foreground/30 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-mid">
                Войти
              </Link>
              <Link to="/register"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover">
                Участвовать
              </Link>
            </>
          )}
        </div>

        <button className="text-primary-foreground lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-primary-mid bg-primary px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-mid">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-primary-mid pt-3">
            {user ? (
              <>
                <Link to={cabinetPath} onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-primary-foreground/30 px-4 py-2 text-center text-sm font-medium text-primary-foreground">
                  Личный кабинет
                </Link>
                <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="text-sm text-primary-foreground/70">Выйти</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-primary-foreground/30 px-4 py-2 text-center text-sm font-medium text-primary-foreground">Войти</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-accent px-4 py-2 text-center text-sm font-semibold text-accent-foreground">Участвовать</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
