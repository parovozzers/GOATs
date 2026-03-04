import { useState, useEffect, useCallback } from 'react';
import { usersApi } from '@/api/users';
import { User } from '@/types';
import { Spinner } from '@/components/shared/Spinner';

const ROLE_LABELS: Record<string, string> = {
  participant: 'Участник',
  expert: 'Эксперт',
  moderator: 'Модератор',
  admin: 'Администратор',
};

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('ru-RU');
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    usersApi.getAll({ search: debouncedSearch || undefined, role: role || undefined })
      .then(setUsers)
      .finally(() => setLoading(false));
  }, [debouncedSearch, role]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-primary-900 mb-6">Пользователи</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none w-64"
        />
        <select value={role} onChange={e => setRole(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white">
          <option value="">Все роли</option>
          {Object.entries(ROLE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Spinner size="lg" /></div>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Пользователей не найдено</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100">
                <th className="px-5 py-3 font-medium">ФИО</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Роль</th>
                <th className="px-5 py-3 font-medium">Вуз</th>
                <th className="px-5 py-3 font-medium">Дата регистрации</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{u.lastName} {u.firstName}</td>
                  <td className="px-5 py-3 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {ROLE_LABELS[u.role] ?? u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{u.university ?? '—'}</td>
                  <td className="px-5 py-3 text-gray-400">{(u as any).createdAt ? formatDate((u as any).createdAt) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
