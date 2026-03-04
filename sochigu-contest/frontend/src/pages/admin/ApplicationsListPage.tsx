import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applicationsApi } from '@/api/applications';
import { nominationsApi } from '@/api/nominations';
import { Application, Nomination, ApplicationStatus, APPLICATION_STATUS_LABELS } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Spinner } from '@/components/shared/Spinner';

const LIMIT = 20;
const STATUSES: ApplicationStatus[] = ['draft','submitted','accepted','rejected','admitted','winner','runner_up'];

function formatDate(str: string) { return new Date(str).toLocaleDateString('ru-RU'); }

function TableSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-gray-50">
          {Array.from({ length: 8 }).map((_, j) => (
            <td key={j} className="px-5 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function ApplicationsListPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [nominationId, setNominationId] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [university, setUniversity] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => { nominationsApi.getAll().then(setNominations); }, []);
  useEffect(() => { const t = setTimeout(() => setDebouncedSearch(search), 500); return () => clearTimeout(t); }, [search]);

  useEffect(() => {
    setLoading(true);
    applicationsApi.getAll({ nominationId: nominationId||undefined, status: status||undefined, search: debouncedSearch||undefined, university: university||undefined, page, limit: LIMIT })
      .then(data => {
        const [items, count] = Array.isArray(data) && Array.isArray(data[0]) ? data : [data, data.length];
        setApps(Array.isArray(items) ? items : []);
        setTotal(typeof count === 'number' ? count : 0);
      }).finally(() => setLoading(false));
  }, [nominationId, status, debouncedSearch, university, page]);

  const reset = () => { setNominationId(''); setStatus(''); setSearch(''); setUniversity(''); setPage(1); };

  const handleExport = async () => {
    const blob = await applicationsApi.exportExcel();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'applications.xlsx'; a.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-900">Заявки</h1>
        <button onClick={handleExport} className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold rounded-lg transition-colors">Экспорт Excel</button>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={nominationId} onChange={e => { setNominationId(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white">
          <option value="">Все номинации</option>
          {nominations.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
        </select>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white">
          <option value="">Все статусы</option>
          {STATUSES.map(s => <option key={s} value={s}>{APPLICATION_STATUS_LABELS[s]}</option>)}
        </select>
        <input type="text" placeholder="Поиск по названию..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none w-48" />
        <input type="text" placeholder="Вуз..." value={university} onChange={e => { setUniversity(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none w-36" />
        <button onClick={reset} className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Сбросить</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100">
              {['#','Название проекта','Участник','Вуз','Номинация','Статус','Дата','Действия'].map(h => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}
            </tr>
          </thead>
          {loading ? <TableSkeleton /> : (
            <tbody className="divide-y divide-gray-50">
              {apps.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">Заявок не найдено</td></tr>
              ) : apps.map((app, idx) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-400">{(page-1)*LIMIT+idx+1}</td>
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-[180px] truncate">{app.projectTitle}</td>
                  <td className="px-5 py-3 text-gray-600">{app.user ? `${app.user.lastName} ${app.user.firstName}` : '—'}</td>
                  <td className="px-5 py-3 text-gray-500 max-w-[120px] truncate">{app.user?.university ?? '—'}</td>
                  <td className="px-5 py-3 text-gray-500">{app.nomination?.shortName ?? app.nomination?.name ?? '—'}</td>
                  <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-5 py-3 text-gray-400">{app.submittedAt ? formatDate(app.submittedAt) : '—'}</td>
                  <td className="px-5 py-3"><Link to={`/admin/applications/${app.id}`} className="text-primary-700 hover:underline font-medium">Просмотр</Link></td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setPage(p => p-1)} disabled={page===1} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Назад</button>
          <span className="text-sm text-gray-600">Страница {page} из {totalPages}</span>
          <button onClick={() => setPage(p => p+1)} disabled={page===totalPages} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Вперёд</button>
        </div>
      )}
    </div>
  );
}
