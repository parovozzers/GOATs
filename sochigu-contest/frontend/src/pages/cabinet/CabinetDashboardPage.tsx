import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useMyApplications } from '@/hooks/useApplications';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Spinner } from '@/components/shared/Spinner';

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function CabinetDashboardPage() {
  useEffect(() => { document.title = 'Личный кабинет — Конкурс СочиГУ'; }, []);
  const { user } = useAuthStore();
  const { applications: apps, loading } = useMyApplications();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">
        Добро пожаловать, {user?.firstName}!
      </h1>

      {/* Мои данные */}
      <section className="rounded-xl bg-card border border-border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Мои данные</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">ФИО</dt>
            <dd className="font-medium text-foreground mt-0.5">
              {[user?.lastName, user?.firstName, user?.middleName].filter(Boolean).join(' ')}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium text-foreground mt-0.5">{user?.email}</dd>
          </div>
          {user?.university && (
            <div>
              <dt className="text-muted-foreground">Вуз</dt>
              <dd className="font-medium text-foreground mt-0.5">{user.university}</dd>
            </div>
          )}
          {user?.faculty && (
            <div>
              <dt className="text-muted-foreground">Факультет</dt>
              <dd className="font-medium text-foreground mt-0.5">{user.faculty}</dd>
            </div>
          )}
          {user?.course && (
            <div>
              <dt className="text-muted-foreground">Курс</dt>
              <dd className="font-medium text-foreground mt-0.5">{user.course}</dd>
            </div>
          )}
          {user?.city && (
            <div>
              <dt className="text-muted-foreground">Город</dt>
              <dd className="font-medium text-foreground mt-0.5">{user.city}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* Мои заявки */}
      <section className="rounded-xl bg-card border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Мои заявки</h2>
          <Link
            to="/cabinet/application/new"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
          >
            + Подать заявку
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : apps.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground mb-4">У вас ещё нет заявок.</p>
            <Link
              to="/cabinet/application/new"
              className="inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
            >
              Подать заявку
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {apps.map(app => (
              <div
                key={app.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{app.projectTitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {app.nomination?.name}
                    {app.submittedAt && ` · Подана ${formatDate(app.submittedAt)}`}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={app.status} />
                  <Link
                    to="/cabinet/application"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Перейти →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
