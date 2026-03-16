import { useState, useEffect, useRef } from 'react';
import { usersApi } from '@/api/users';
import { User } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import { Spinner } from '@/components/shared/Spinner';

export function ExpertsPage() {
  useEffect(() => { document.title = 'Эксперты — Конкурс СочиГУ'; }, []);
  const [experts, setExperts] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignOpen, setAssignOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [profileForm, setProfileForm] = useState({ avatarUrl: '', position: '', bio: '', isExpertVisible: false });
  const [uploading, setUploading] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const [saving, setSaving] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [found, setFound] = useState<User | null>(null);
  const [searching, setSearching] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const { showToast } = useToast();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = () => {
    setLoading(true);
    usersApi.getAll({ role: 'expert' }).then(setExperts).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAssign = () => { setSearchEmail(''); setFound(null); setResults([]); setAssignOpen(true); };

  const openProfile = (user: User) => {
    setEditingUser(user);
    setProfileForm({
      avatarUrl: user.avatarUrl ?? '',
      position: user.position ?? '',
      bio: user.bio ?? '',
      isExpertVisible: user.isExpertVisible ?? false,
    });
    setPhotoError('');
    setProfileOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError('');
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Файл слишком большой. Изображение должно быть не более 5 МБ.');
      e.target.value = '';
      return;
    }
    setUploading(true);
    try {
      const url = await usersApi.uploadPhoto(file);
      setProfileForm(f => ({ ...f, avatarUrl: url }));
      showToast('Фото загружено', 'success');
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setPhotoError(typeof msg === 'string' ? msg : 'Ошибка загрузки фото. Попробуйте ещё раз.');
    } finally { setUploading(false); e.target.value = ''; }
  };

  const handleSaveProfile = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      await usersApi.updateExpertProfile(editingUser.id, profileForm);
      showToast('Профиль обновлён', 'success');
      setProfileOpen(false);
      load();
    } catch { showToast('Ошибка при сохранении', 'error'); }
    finally { setSaving(false); }
  };

  const handleSearchInput = (value: string) => {
    setSearchEmail(value);
    setFound(null);
    setResults([]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) return;
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const users = await usersApi.getAll({ search: value.trim() });
        setResults(users.filter(u => u.role !== 'expert'));
      } catch { showToast('Ошибка поиска', 'error'); }
      finally { setSearching(false); }
    }, 400);
  };

  const handleAssign = async () => {
    if (!found) return;
    setAssigning(true);
    try {
      await usersApi.updateRole(found.id, 'expert');
      showToast(`${found.firstName} ${found.lastName} назначен экспертом`, 'success');
      setAssignOpen(false);
      load();
    } catch { showToast('Ошибка при назначении', 'error'); }
    finally { setAssigning(false); }
  };

  const handleRevoke = async (user: User) => {
    if (!confirm(`Снять роль эксперта у ${user.firstName} ${user.lastName}?`)) return;
    try {
      await usersApi.updateRole(user.id, 'participant');
      showToast('Роль снята', 'success');
      load();
    } catch { showToast('Ошибка', 'error'); }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-900">Управление экспертами</h1>
        <button onClick={openAssign} className="px-4 py-2 bg-primary hover:bg-primary-mid text-white text-sm font-semibold rounded-lg transition-colors">+ Назначить эксперта</button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div> : experts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Экспертов нет</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100">
              {['Фото', 'ФИО', 'Должность', 'Видим на сайте', 'Действия'].map(h => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {experts.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    {user.avatarUrl
                      ? <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover border border-gray-200" />
                      : <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400">{user.firstName[0]}{user.lastName[0]}</div>
                    }
                  </td>
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {user.lastName} {user.firstName}{user.middleName ? ` ${user.middleName}` : ''}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{user.position ?? '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.isExpertVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      {user.isExpertVisible ? 'Да' : 'Нет'}
                    </span>
                  </td>
                  <td className="px-5 py-3 flex gap-3">
                    <button onClick={() => openProfile(user)} className="text-primary-700 hover:underline text-xs font-medium">Профиль</button>
                    <button onClick={() => handleRevoke(user)} className="text-red-500 hover:underline text-xs font-medium">Снять с роли</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Модал: профиль эксперта */}
      <Modal isOpen={profileOpen} onClose={() => setProfileOpen(false)} title={`Профиль: ${editingUser?.lastName} ${editingUser?.firstName}`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
            <div className="flex gap-2 items-start">
              {profileForm.avatarUrl && (
                <img src={profileForm.avatarUrl} alt="preview" className="h-16 w-16 rounded-full object-cover border border-gray-200 shrink-0" />
              )}
              <div className="flex-1 space-y-2">
                <label className={`flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-primary-400 hover:text-primary-600 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  {uploading ? 'Загрузка...' : '📁 Загрузить файл'}
                </label>
                <input type="text" value={profileForm.avatarUrl} onChange={e => setProfileForm(f => ({ ...f, avatarUrl: e.target.value }))} className="input text-xs" placeholder="или вставьте URL..." />
                {photoError && <p className="text-xs text-red-500">{photoError}</p>}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Должность / звание</label>
            <input type="text" value={profileForm.position} onChange={e => setProfileForm(f => ({ ...f, position: e.target.value }))} className="input" placeholder="Например: к.э.н., доцент кафедры менеджмента" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Биография</label>
            <textarea rows={3} value={profileForm.bio} onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))} className="input" placeholder="Краткая биография (необязательно)" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={profileForm.isExpertVisible} onChange={e => setProfileForm(f => ({ ...f, isExpertVisible: e.target.checked }))} className="w-4 h-4 rounded border-gray-300" />
            <span className="text-sm text-gray-700">Показывать на публичной странице</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setProfileOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Отмена</button>
            <button onClick={handleSaveProfile} disabled={saving} className="px-4 py-2 bg-accent hover:bg-accent-hover disabled:opacity-60 text-accent-foreground text-sm font-semibold rounded-lg transition-colors">
              {saving ? 'Сохраняем...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Модал: назначить эксперта */}
      <Modal isOpen={assignOpen} onClose={() => setAssignOpen(false)} title="Назначить эксперта">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Поиск по email или имени</label>
            <div className="relative">
              <input type="text" value={searchEmail} onChange={e => handleSearchInput(e.target.value)} className="input pr-8" placeholder="Начните вводить..." autoFocus />
              {searching && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">...</span>}
            </div>
          </div>
          {results.length > 0 && !found && (
            <ul className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-48 overflow-y-auto">
              {results.map(u => (
                <li key={u.id} onClick={() => { setFound(u); setResults([]); }} className="px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-medium text-gray-900">{u.lastName} {u.firstName} {u.middleName ?? ''}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </li>
              ))}
            </ul>
          )}
          {searchEmail.trim() && !searching && results.length === 0 && !found && (
            <p className="text-sm text-gray-400 text-center py-1">Пользователи не найдены</p>
          )}
          {found && (
            <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900">{found.lastName} {found.firstName} {found.middleName ?? ''}</p>
                <p className="text-gray-500">{found.email}</p>
                <p className="text-gray-400 text-xs mt-1">Текущая роль: {found.role}</p>
              </div>
              <button onClick={() => { setFound(null); setSearchEmail(''); }} className="text-gray-400 hover:text-gray-600 text-xs ml-3">✕</button>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setAssignOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Отмена</button>
            <button onClick={handleAssign} disabled={!found || assigning} className="px-4 py-2 bg-accent hover:bg-accent-hover disabled:opacity-60 text-accent-foreground text-sm font-semibold rounded-lg transition-colors">
              {assigning ? 'Назначаем...' : 'Назначить'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
