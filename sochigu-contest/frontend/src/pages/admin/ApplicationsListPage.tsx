import { useState } from 'react';
import { applicationsApi } from '@/api/applications';

export function ApplicationsListPage() {
  const [currentFilters, setCurrentFilters] = useState<any>({});

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-4xl py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary-900">Заявки</h1>
          <button
            onClick={() => applicationsApi.exportExcel(currentFilters)}
            className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-500 transition-colors"
          >
            Экспорт Excel
          </button>
        </div>
        <p className="text-gray-600 mt-4">Раздел в разработке.</p>
      </div>
    </main>
  );
}
