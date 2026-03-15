import { useState, useEffect, useMemo } from 'react';
import { analyticsApi } from '@/api/analytics';
import {
  AnalyticsSummary, AnalyticsByNomination, AnalyticsTimeline,
  AnalyticsTopUniversity, AnalyticsGeography, AnalyticsKeyword,
} from '@/types';
import { Spinner } from '@/components/shared/Spinner';
import { PrintReport } from '@/components/shared/PrintReport';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Legend,
} from 'recharts';

const COLORS = ['#1e3a8a', '#059669', '#0284c7', '#7c3aed', '#dc2626', '#d97706'];


function KpiCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <p className="text-4xl font-bold text-primary-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

export function AnalyticsPage() {
  useEffect(() => { document.title = 'Аналитика — Конкурс СочиГУ'; }, []);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [byNomination, setByNomination] = useState<AnalyticsByNomination[]>([]);
  const [timeline, setTimeline] = useState<AnalyticsTimeline[]>([]);
  const [universities, setUniversities] = useState<AnalyticsTopUniversity[]>([]);
  const [geography, setGeography] = useState<AnalyticsGeography[]>([]);
  const [keywords, setKeywords] = useState<AnalyticsKeyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const generatedAt = useMemo(
    () => new Date().toLocaleString('ru-RU', { dateStyle: 'long', timeStyle: 'short' }),
    [],
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      analyticsApi.getSummary(),
      analyticsApi.getByNomination(),
      analyticsApi.getTimeline(),
      analyticsApi.getTopUniversities(),
      analyticsApi.getGeography(),
      analyticsApi.getKeywords(),
    ]).then(([s, n, t, u, g, k]) => {
      setSummary(s); setByNomination(n); setTimeline(t);
      setUniversities(u); setGeography(g); setKeywords(k);
    }).catch(() => {
      setError('Ошибка при загрузке аналитики');
    }).finally(() => setLoading(false));
  }, [retryKey]);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (error) return (
    <div className="m-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-4">
      <span>{error}</span>
      <button onClick={() => setRetryKey(k => k + 1)}
        className="ml-auto px-3 py-1.5 rounded-lg border border-red-300 text-red-700 text-sm hover:bg-red-100 transition-colors whitespace-nowrap">
        Повторить
      </button>
    </div>
  );

  return (
    <>
    <div className="p-6 max-w-6xl mx-auto space-y-8 print:hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">Аналитика</h1>
        <button onClick={() => window.print()} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors print-hide">
          Сгенерировать PDF-отчёт
        </button>
      </div>

      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 print-no-break">
          <KpiCard label="Всего заявок" value={summary.totalApplications} />
          <KpiCard label="Участников" value={summary.totalUsers} />
          <KpiCard label="Вузов" value={summary.totalUniversities} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 print-no-break">
          <h2 className="font-semibold text-gray-900 mb-4">Заявки по номинациям</h2>
          {byNomination.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Заявок пока нет</p> : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={byNomination} dataKey="count" nameKey="nomination" cx="50%" cy="45%" outerRadius={90}>
                  {byNomination.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 print-no-break">
          <h2 className="font-semibold text-gray-900 mb-4">Динамика подачи заявок</h2>
          {timeline.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Нет данных для отображения</p> : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={d => new Date(d).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip labelFormatter={d => new Date(d).toLocaleDateString('ru-RU')} />
                <Line type="monotone" dataKey="count" name="Количество заявок" stroke="#1d4ed8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 print-no-break">
        <h2 className="font-semibold text-gray-900 mb-4">Топ-10 вузов</h2>
        {universities.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Вузов пока нет</p> : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={universities.slice(0, 10)} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="university" width={180} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" name="Количество заявок" fill="#059669" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 print-no-break">
          <h2 className="font-semibold text-gray-900 mb-4">География участников</h2>
          {geography.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Нет данных</p> : (
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Город</th><th className="pb-2 font-medium text-right">Участников</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {geography.map((g, i) => (
                  <tr key={i}><td className="py-2 text-gray-700">{g.city}</td><td className="py-2 text-gray-600 text-right font-medium">{g.count}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 print-no-break">
          <h2 className="font-semibold text-gray-900 mb-4">Ключевые слова</h2>
          {keywords.length === 0
            ? <p className="text-gray-400 text-sm text-center py-8">Ключевые слова появятся после подачи заявок</p>
            : (
              <div className="flex flex-wrap items-center justify-center" style={{ minHeight: 220, padding: '12px 8px', gap: '6px 10px' }}>
                {keywords.map((k, i) => {
                  const ratio = k.count / Math.max(...keywords.map(x => x.count));
                  const size = Math.round(13 + ratio * 40);
                  const isVertical = (i * 7 + (k.keyword.charCodeAt(0) || 0)) % 3 === 0;
                  const colors = ['#1e3a8a', '#2563eb', '#059669', '#0284c7', '#7c3aed', '#dc2626', '#d97706'];
                  return (
                    <span
                      key={k.keyword}
                      data-wc-tip={k.count}
                      className="wc-word"
                      style={{
                        fontSize: size,
                        color: colors[i % colors.length],
                        fontWeight: ratio > 0.6 ? 700 : ratio > 0.3 ? 500 : 400,
                        writingMode: isVertical ? 'vertical-rl' : 'horizontal-tb',
                        display: 'inline-block',
                        lineHeight: 1.1,
                        padding: '2px 3px',
                        cursor: 'default',
                        position: 'relative',
                        alignSelf: 'center',
                        transition: 'opacity 0.18s, transform 0.18s',
                      }}
                    >
                      {k.keyword}
                    </span>
                  );
                })}
              </div>
            )
          }
        </div>
      </div>

    </div>

    {summary && (
      <PrintReport
        summary={summary}
        byNomination={byNomination}
        topUniversities={universities}
        geography={geography}
        keywords={keywords}
        generatedAt={generatedAt}
      />
    )}
    </>
  );
}
