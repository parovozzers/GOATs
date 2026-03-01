import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMyApplications } from '@/hooks/useApplications';
import { applicationsApi } from '@/api/applications';
import { Application, ApplicationLog } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Spinner } from '@/components/shared/Spinner';

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
  return `${Math.round(bytes / 1024)} КБ`;
}

function StatusTimeline({ logs }: { logs: ApplicationLog[] }) {
  if (!logs.length) return null;
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">История статусов</h3>
      <ol className="relative space-y-4 border-l border-border pl-5">
        {logs.map(log => (
          <li key={log.id} className="relative">
            <div className="absolute -left-[1.35rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-primary" />
            <p className="text-sm font-medium text-foreground">
              {log.fromStatus ? `${log.fromStatus} → ` : ''}{log.toStatus}
            </p>
            {log.comment && <p className="mt-0.5 text-xs text-muted-foreground">{log.comment}</p>}
            <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(log.createdAt)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ApplicationPage() {
  const { applications, loading: appsLoading } = useMyApplications();
  const [app, setApp] = useState<Application | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Синхронизируем локальное состояние с хуком
  useEffect(() => {
    setApp(applications[0] ?? null);
  }, [applications]);

  const handleSubmit = async () => {
    if (!app || !confirm('Подать заявку? После подачи редактирование будет недоступно.')) return;
    setSubmitting(true);
    try {
      const updated = await applicationsApi.submit(app.id);
      setApp(updated);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    if (!app || !confirm('Отозвать заявку?')) return;
    setSubmitting(true);
    try {
      await applicationsApi.withdraw(app.id);
      setApp(null);
    } finally {
      setSubmitting(false);
    }
  };

  if (appsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-muted-foreground">У вас нет заявки.</p>
        <Link
          to="/cabinet/application/new"
          className="inline-flex rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
        >
          Создать заявку
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Шапка */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">{app.projectTitle}</h1>
        <StatusBadge status={app.status} />
      </div>

      {/* Комментарий администратора */}
      {app.adminComment && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          <strong>Комментарий администратора:</strong> {app.adminComment}
        </div>
      )}

      {/* Кнопки действий (только черновик) */}
      {app.status === 'draft' && (
        <div className="flex flex-wrap gap-3">
          <Link
            to={`/cabinet/application/${app.id}/edit`}
            className="rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
          >
            Редактировать
          </Link>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent-hover disabled:opacity-60"
          >
            Подать заявку
          </button>
          <button
            onClick={handleWithdraw}
            disabled={submitting}
            className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-colors hover:opacity-90 disabled:opacity-60"
          >
            Отозвать
          </button>
        </div>
      )}

      {/* Основные данные */}
      <div className="space-y-4 rounded-xl bg-card border border-border p-6 shadow-sm">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Номинация</p>
          <p className="font-medium text-foreground">{app.nomination?.name ?? '—'}</p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Описание проекта</p>
          <p className="whitespace-pre-wrap text-foreground">{app.projectDescription}</p>
        </div>
        {app.keywords?.length ? (
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Ключевые слова</p>
            <div className="flex flex-wrap gap-2">
              {app.keywords.map((kw, i) => (
                <span key={i} className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Команда */}
      {app.teamMembers?.length ? (
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
          <h3 className="mb-3 font-semibold text-foreground">Состав команды</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Имя</th>
                  <th className="pb-2 font-medium">Роль</th>
                  <th className="pb-2 font-medium">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {app.teamMembers.map((m, i) => (
                  <tr key={i}>
                    <td className="py-2 font-medium text-foreground">{m.name}</td>
                    <td className="py-2 text-muted-foreground">{m.role}</td>
                    <td className="py-2 text-muted-foreground">{m.email ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Научный руководитель */}
      {app.supervisor && (
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
          <h3 className="mb-3 font-semibold text-foreground">Научный руководитель</h3>
          <p className="font-medium text-foreground">{app.supervisor.name}</p>
          <p className="text-sm text-muted-foreground">{app.supervisor.title}</p>
          {app.supervisor.email && (
            <p className="text-sm text-muted-foreground">{app.supervisor.email}</p>
          )}
        </div>
      )}

      {/* Файлы */}
      {app.files?.length ? (
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
          <h3 className="mb-3 font-semibold text-foreground">Файлы</h3>
          <div className="space-y-2">
            {app.files.map(f => (
              <div key={f.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-foreground">{f.originalName}</span>
                <span className="flex-shrink-0 text-muted-foreground">{formatSize(f.size)}</span>
                <a
                  href={applicationsApi.downloadFileUrl(f.id)}
                  download
                  className="flex-shrink-0 font-medium text-primary hover:underline"
                >
                  Скачать
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* История статусов */}
      {app.logs?.length ? (
        <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
          <StatusTimeline logs={app.logs} />
        </div>
      ) : null}
    </div>
  );
}
