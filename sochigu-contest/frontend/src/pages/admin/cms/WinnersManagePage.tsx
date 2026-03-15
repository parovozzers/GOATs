import { useState, useEffect, useCallback } from 'react';
import { winnersApi } from '@/api/winners';
import { nominationsApi } from '@/api/nominations';
import { Winner, Nomination } from '@/types';
import { placeMedal } from '@/utils/placeMedal';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import { Spinner } from '@/components/shared/Spinner';

const EMPTY = { projectTitle: '', teamName: '', description: '', year: new Date().getFullYear(), place: 1, nominationId: '', university: '', photoUrl: '' };

export function WinnersManagePage() {
  useEffect(() => { document.title = 'Управление победителями — Конкурс СочиГУ'; }, []);
  const [items, setItems] = useState<Winner[]>([]);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('');
  const [years, setYears] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Winner | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await winnersApi.uploadPhoto(file);
      setForm(f => ({ ...f, photoUrl: url }));
      showToast('Фото загружено', 'success');
    } catch { showToast('Ошибка загрузки фото', 'error'); }
    finally { setUploading(false); e.target.value = ''; }
  };

  useEffect(() => {
    nominationsApi.getAll().then(setNominations);
    winnersApi.getYears().then(y => setYears(y.map(x => x.year)));
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    winnersApi.getAll({ year: yearFilter ? Number(yearFilter) : undefined }).then(setItems).finally(() => setLoading(false));
  }, [yearFilter]);
  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (item: Winner) => {
    setEditing(item);
    setForm({ projectTitle: item.projectTitle, teamName: item.teamName, description: item.description ?? '', year: item.year, place: item.place, nominationId: item.nominationId ?? '', university: item.university ?? '', photoUrl: item.photoUrl ?? '' });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) { await winnersApi.update(editing.id, form); showToast('Обновлено', 'success'); }
      else { await winnersApi.create(form); showToast('Создано', 'success'); }
      setModalOpen(false); load();
    } catch { showToast('Ошибка', 'error'); } finally { setSaving(false); }
  };

  const handleDelete = async (item: Winner) => {
    if (!confirm(`Удалить "${item.projectTitle}"?`)) return;
    try { await winnersApi.remove(item.id); showToast('Удалено', 'success'); load(); }
    catch { showToast('Ошибка', 'error'); }
  };

  const selectIc = 'w-full select-custom pl-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none';

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-900">Управление победителями</h1>
        <button onClick={openCreate} className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold rounded-lg transition-colors">+ Создать</button>
      </div>

      <div className="mb-5">
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="select-custom pl-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none">
          <option value="">Все годы</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {loading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div> : items.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Победителей нет</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100">
              {['Место', 'Проект', 'Команда', 'Номинация', 'Год', 'Действия'].map(h => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-xl">{placeMedal(item.place)}</td>
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-[180px] truncate">{item.projectTitle}</td>
                  <td className="px-5 py-3 text-gray-600">{item.teamName}</td>
                  <td className="px-5 py-3 text-gray-500">{item.nomination?.shortName ?? item.nomination?.name ?? '—'}</td>
                  <td className="px-5 py-3 text-gray-400">{item.year}</td>
                  <td className="px-5 py-3 flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-primary-700 hover:underline text-xs font-medium">Редактировать</button>
                    <button onClick={() => handleDelete(item)} className="text-red-500 hover:underline text-xs font-medium">Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Редактировать победителя' : 'Добавить победителя'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Место *</label>
              <select value={form.place} onChange={e => setForm(f => ({ ...f, place: Number(e.target.value) }))} className={selectIc}>
                <option value={1}>1 место</option><option value={2}>2 место</option><option value={3}>3 место</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Год *</label>
              <input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))} className="input" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название проекта *</label>
            <input type="text" value={form.projectTitle} onChange={e => setForm(f => ({ ...f, projectTitle: e.target.value }))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Команда *</label>
            <input type="text" value={form.teamName} onChange={e => setForm(f => ({ ...f, teamName: e.target.value }))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Номинация *</label>
            <select value={form.nominationId} onChange={e => setForm(f => ({ ...f, nominationId: e.target.value }))} className={selectIc}>
              <option value="">Выберите...</option>
              {nominations.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Вуз</label>
            <input type="text" value={form.university} onChange={e => setForm(f => ({ ...f, university: e.target.value }))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
            <div className="flex gap-2 items-start">
              {form.photoUrl && (
                <img src={form.photoUrl} alt="preview" className="h-16 w-16 rounded-lg object-cover border border-gray-200 shrink-0" />
              )}
              <div className="flex-1 space-y-2">
                <label className={`flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 cursor-pointer hover:border-primary-400 hover:text-primary-600 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  {uploading ? 'Загрузка...' : '📁 Загрузить файл'}
                </label>
                <input type="text" value={form.photoUrl} onChange={e => setForm(f => ({ ...f, photoUrl: e.target.value }))} className="input text-xs" placeholder="или вставьте URL..." />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Отмена</button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-accent-600 hover:bg-accent-500 disabled:opacity-60 text-white text-sm font-semibold rounded-lg transition-colors">
              {saving ? 'Сохраняем...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
