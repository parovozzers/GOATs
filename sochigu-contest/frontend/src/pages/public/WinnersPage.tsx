import { useState, useEffect } from 'react';
import { winnersApi } from '@/api/winners';
import { nominationsApi } from '@/api/nominations';
import { Winner, Nomination } from '@/types';

const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function WinnerCard({ winner }: { winner: Winner }) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl">{medals[winner.place] ?? `${winner.place}-е место`}</span>
        <span className="text-xs font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
          {winner.year}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 leading-snug">{winner.projectTitle}</h3>
        <p className="text-sm text-gray-500 mt-1">{winner.teamName}</p>
      </div>
      {winner.nomination && (
        <p className="text-xs text-primary-700 font-medium">{winner.nomination.name}</p>
      )}
      {winner.university && (
        <p className="text-xs text-gray-400">{winner.university}</p>
      )}
      {winner.description && (
        <p className="text-sm text-gray-600 line-clamp-3">{winner.description}</p>
      )}
    </article>
  );
}

export function WinnersPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [yearFilter, setYearFilter] = useState('');
  const [nominationFilter, setNominationFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([winnersApi.getYears(), nominationsApi.getAll()]).then(([y, n]) => {
      setYears(y.map(item => item.year));
      setNominations(n);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    winnersApi
      .getAll({
        year: yearFilter ? Number(yearFilter) : undefined,
        nominationId: nominationFilter || undefined,
      })
      .then(setWinners)
      .finally(() => setLoading(false));
  }, [yearFilter, nominationFilter]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <h1 className="text-3xl font-bold text-primary-900 mb-6">Победители конкурса</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white"
          >
            <option value="">Все годы</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            value={nominationFilter}
            onChange={e => setNominationFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none bg-white"
          >
            <option value="">Все номинации</option>
            {nominations.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse space-y-3">
                <div className="h-8 w-8 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : winners.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Победителей по выбранным фильтрам нет.</p>
            {(yearFilter || nominationFilter) && (
              <button
                onClick={() => { setYearFilter(''); setNominationFilter(''); }}
                className="text-primary-700 hover:underline text-sm font-medium"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {winners.map(w => <WinnerCard key={w.id} winner={w} />)}
          </div>
        )}
      </div>
    </main>
  );
}
