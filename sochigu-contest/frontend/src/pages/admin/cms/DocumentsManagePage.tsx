import { useState, useEffect, useRef } from 'react';
import { documentsApi } from '@/api/documents';
import { Document } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import { Spinner } from '@/components/shared/Spinner';

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
  return `${Math.round(bytes / 1024)} КБ`;
}

const EMPTY_FORM = { title: '', category: '', isPublished: true };

export function DocumentsManagePage() {
  const [items, setItems] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Document | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const load = () => { setLoading(true); documentsApi.getAllAdmin().then(setItems).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setFile(null); setModalOpen(true); };
  const openEdit = (item: Document) => {
    setEditing(item);
    setForm({ title: item.title, category: item.category ?? '', isPublished: item.isPublished });
    setFile(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await documentsApi.update(editing.id, { title: form.title, category: form.category, isPublished: form.isPublished });
        showToast('Обновлено', 'success');
      } else {
        if (!file) { showToast('Выберите файл', 'error'); setSaving(false); return; }
        const fd = new FormData();
        fd.append('file', file);
        fd.append('title', form.title);
        if (form.category) fd.append('category', form.category);
        fd.append('isPublished', String(form.isPublished));
        await documentsApi.create(fd);
        showToast('Документ загружен', 'success');
      }
      setModalOpen(false); load();
    } catch { showToast('Ошибка при сохранении', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (item: Document) => {
    if (!confirm(`Удалить "${item.title}"?`)) return;
    try { await documentsApi.remove(item.id); showToast('Удалено', 'success'); load(); }
    catch { showToast('Ошибка', 'error'); }
  };

  const ic = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none';

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-900">Управление документами</h1>
        <button onClick={openCreate} className="px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold rounded-lg transition-colors">+ Загрузить</button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Spinner size="lg" /></div> : items.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Документов нет</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-gray-400 text-xs uppercase border-b border-gray-100">
              {['Название', 'Размер', 'Категория', 'Публикация', 'Действия'].map(h => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-[220px] truncate">{item.title}</td>
                  <td className="px-5 py-3 text-gray-400">{formatSize(item.size)}</td>
                  <td className="px-5 py-3 text-gray-500">{item.category ?? '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.isPublished ? 'Опубликован' : 'Черновик'}
                    </span>
                  </td>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Редактировать документ' : 'Загрузить документ'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={ic} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
            <input type="text" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={ic} placeholder="Например: Положение о конкурсе, Формы..." />
          </div>
          {!editing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Файл *</label>
              <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-xl p-4 text-center cursor-pointer transition-colors">
                {file ? <p className="text-sm text-gray-700">{file.name}</p> : <p className="text-sm text-gray-400">Нажмите для выбора файла</p>}
              </div>
              <input ref={fileRef} type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} className="hidden" />
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span className="text-sm text-gray-700">Опубликовать</span>
          </label>
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
