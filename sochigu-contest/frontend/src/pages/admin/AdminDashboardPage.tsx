import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyticsApi } from '@/api/analytics';
import { applicationsApi } from '@/api/applications';
import { Application, AnalyticsSummary } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function AdminDashboardPage() {
  useEffect(() => { document.title = 'Панель управления — Конкурс СочиГУ'; }, []);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsApi.getSummary(),
      applicationsApi.getAll({ limit: 5, page: 1 }),
    ]).then(([s, apps]) => {
      setSummary(s);
      setRecentApps(apps.data);
    }).finally(() => setLoading(false));
  }, []);

  const kpi = summary
    ? [
        { label: 'Всего заявок', value: summary.totalApplications },
        { label: 'Участников', value: summary.totalUsers },
        { label: 'Вузов', value: summary.totalUniversities },
      ]
    : [];

  const quickLinks = [
    { label: 'Заявки', to: '/admin/applications', desc: 'Просмотр и модерация заявок' },
    { label: 'Пользователи', to: '/admin/users', desc: 'Управление аккаунтами' },
    { label: 'Аналитика', to: '/admin/analytics', desc: 'Графики и статистика' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-primary-900">Панель управления</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {kpi.map(k => (
              <div key={k.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <p className="text-4xl font-bold text-primary-900">{k.value}</p>
                <p className="text-sm text-gray-500 mt-1">{k.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickLinks.map(l => (
              <Link key={l.to} to={l.to} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <p className="font-semibold text-primary-900">{l.label}</p>
                <p className="text-sm text-gray-500 mt-1">{l.desc}</p>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Последние заявки</h2>
              <Link to="/admin/applications" className="text-sm text-primary-700 hover:underline font-medium">Все заявки →</Link>
            </div>
            {recentApps.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Заявок пока нет</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100">
                      <th className="px-6 py-3 font-medium">Проект</th>
                      <th className="px-6 py-3 font-medium">Участник</th>
                      <th className="px-6 py-3 font-medium">Статус</th>
                      <th className="px-6 py-3 font-medium">Дата</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentApps.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-gray-900 truncate max-w-[200px]">{app.projectTitle}</td>
                        <td className="px-6 py-3 text-gray-600">{app.user ? `${app.user.lastName} ${app.user.firstName}` : '—'}</td>
                        <td className="px-6 py-3"><StatusBadge status={app.status} /></td>
                        <td className="px-6 py-3 text-gray-400">{app.submittedAt ? formatDate(app.submittedAt) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
