import { useState, useEffect } from 'react';
import { documentsApi } from '@/api/documents';
import { Document } from '@/types';

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
  return `${Math.round(bytes / 1024)} КБ`;
}

function formatDate(str: string) {
  return new Date(str).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function FileIcon() {
  return (
    <svg className="w-8 h-8 text-primary-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-16" />
      <div className="w-20 h-8 bg-gray-200 rounded-lg" />
    </div>
  );
}

export function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    documentsApi.getAll().then(setDocs).finally(() => setLoading(false));
  }, []);

  const grouped = docs.reduce<Record<string, Document[]>>((acc, doc) => {
    const key = doc.category || 'Общие документы';
    if (!acc[key]) acc[key] = [];
    acc[key].push(doc);
    return acc;
  }, {});

  const hasCategories = docs.some(d => d.category);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl py-10">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">Документы</h1>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {Array.from({ length: 3 }).map((_, i) => <RowSkeleton key={i} />)}
          </div>
        ) : docs.length === 0 ? (
          <p className="text-gray-500 text-center py-20">Документов пока нет.</p>
        ) : hasCategories ? (
          <div className="space-y-8">
            {Object.entries(grouped).map(([category, items]) => (
              <section key={category}>
                <h2 className="text-lg font-semibold text-primary-900 mb-3">{category}</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                  {items.map(doc => <DocRow key={doc.id} doc={doc} />)}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {docs.map(doc => <DocRow key={doc.id} doc={doc} />)}
          </div>
        )}
      </div>
    </main>
  );
}

function DocRow({ doc }: { doc: Document }) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
      <FileIcon />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{doc.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate(doc.createdAt)}</p>
      </div>
      <span className="text-xs text-gray-400 hidden sm:block flex-shrink-0">{formatSize(doc.size)}</span>
      <a
        href={documentsApi.downloadUrl(doc.id)}
        download
        className="flex-shrink-0 px-4 py-1.5 rounded-lg bg-primary-900 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
      >
        Скачать
      </a>
    </div>
  );
}
