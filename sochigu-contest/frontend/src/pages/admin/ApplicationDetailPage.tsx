import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationsApi } from '@/api/applications';
import { Application, ApplicationStatus, APPLICATION_STATUS_LABELS } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Spinner } from '@/components/shared/Spinner';
import { useToast } from '@/hooks/useToast';

const STATUSES: ApplicationStatus[] = ['draft','submitted','accepted','rejected','admitted','winner','runner_up'];

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    applicationsApi.getById(id).then(a => { setApp(a); setNewStatus(a.status); }).finally(() => setLoading(false));
  }, [id]);

  const handleStatusSave = async () => {
    if (!app) return;
    setSaving(true);
    try {
      const updated = await applicationsApi.updateStatus(app.id, { status: newStatus, comment: comment || undefined });
      setApp(updated);
      showToast('Статус обновлён', 'success');
    } catch {
      showToast('Ошибка при обновлении статуса', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (!app) return <div className="p-6 text-gray-500">Заявка не найдена</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700">← Назад</button>
        <h1 className="text-2xl font-bold text-primary-900 flex-1">{app.projectTitle}</h1>
        <StatusBadge status={app.status} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Изменить статус</h2>
        <div className="flex flex-wrap gap-3 items-end">
          <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_0.75rem]">
            {STATUSES.map(s => <option key={s} value={s}>{APPLICATION_STATUS_LABELS[s]}</option>)}
          </select>
          <textarea placeholder="Комментарий (необязательно)" value={comment} onChange={e => setComment(e.target.value)} rows={2}
            className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none" />
          <button onClick={handleStatusSave} disabled={saving}
            className="px-4 py-2 bg-accent-600 hover:bg-accent-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
            {saving ? 'Сохраняем...' : 'Сохранить статус'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Участник</h2>
          <dl className="space-y-2 text-sm">
            {[
              ['ФИО', app.user ? `${app.user.lastName} ${app.user.firstName} ${app.user.middleName ?? ''}`.trim() : '—'],
              ['Email', app.user?.email ?? '—'],
              ['Вуз', app.user?.university ?? '—'],
              ['Факультет', app.user?.faculty ?? '—'],
              ['Курс', app.user?.course?.toString() ?? '—'],
              ['Город', app.user?.city ?? '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="text-gray-400 w-24 flex-shrink-0">{k}</dt>
                <dd className="text-gray-800 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Проект</h2>
          <dl className="space-y-2 text-sm">
            {[
              ['Номинация', app.nomination?.name ?? '—'],
              ['Дата подачи', app.submittedAt ? formatDate(app.submittedAt) : '—'],
              ['Статус', APPLICATION_STATUS_LABELS[app.status]],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="text-gray-400 w-28 flex-shrink-0">{k}</dt>
                <dd className="text-gray-800 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Описание проекта</h2>
        <p className="text-gray-700 whitespace-pre-wrap text-sm">{app.projectDescription}</p>
        {app.keywords?.length ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {app.keywords.map((kw, i) => <span key={i} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium">{kw}</span>)}
          </div>
        ) : null}
      </div>

      {app.teamMembers?.length ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Команда</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Имя</th><th className="pb-2 font-medium">Роль</th><th className="pb-2 font-medium">Email</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {app.teamMembers.map((m, i) => (
                  <tr key={i}>
                    <td className="py-2 font-medium text-gray-800">{m.name}</td>
                    <td className="py-2 text-gray-600">{m.role}</td>
                    <td className="py-2 text-gray-500">{m.email ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {app.supervisor && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Научный руководитель</h2>
          <p className="font-medium text-gray-800">{app.supervisor.name}</p>
          <p className="text-sm text-gray-500">{app.supervisor.title}</p>
          {app.supervisor.email && <p className="text-sm text-gray-500">{app.supervisor.email}</p>}
        </div>
      )}

      {app.files?.length ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">Файлы</h2>
          <div className="space-y-2">
            {app.files.map(f => (
              <div key={f.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{f.originalName}</span>
                <a href={applicationsApi.downloadFileUrl(f.id)} download className="text-primary-700 hover:underline font-medium ml-4">Скачать</a>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {app.logs?.length ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-3">История статусов</h2>
          <ol className="relative border-l border-gray-200 space-y-4 pl-5">
            {app.logs.map(log => (
              <li key={log.id} className="relative">
                <div className="absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full bg-primary-600 border-2 border-white" />
                <p className="text-sm font-medium text-gray-800">{log.fromStatus ? `${log.fromStatus} → ` : ''}{log.toStatus}</p>
                {log.comment && <p className="text-xs text-gray-500 mt-0.5">{log.comment}</p>}
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(log.createdAt)}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
