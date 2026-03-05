import { useState, useEffect } from 'react';
import { analyticsApi } from '@/api/analytics';
import { AnalyticsSummary } from '@/types';
import { Spinner } from '@/components/shared/Spinner';
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
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [byNomination, setByNomination] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [geography, setGeography] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;

  const maxKw = keywords.reduce((m, k) => Math.max(m, k.count ?? 0), 1);
  const minKw = keywords.reduce((m, k) => Math.min(m, k.count ?? 0), maxKw);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-900">Аналитика</h1>
        <button onClick={() => window.print()} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors print:hidden">
          Печать отчёта
        </button>
      </div>

      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <KpiCard label="Всего заявок" value={summary.totalApplications} />
          <KpiCard label="Участников" value={summary.totalUsers} />
          <KpiCard label="Вузов" value={summary.totalUniversities} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Заявки по номинациям</h2>
          {byNomination.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Нет данных</p> : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byNomination} dataKey="count" nameKey="nomination" cx="50%" cy="50%" outerRadius={80} label={({ nomination }) => nomination}>
                  {byNomination.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Динамика подачи заявок</h2>
          {timeline.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Нет данных</p> : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={d => new Date(d).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip labelFormatter={d => new Date(d).toLocaleDateString('ru-RU')} />
                <Line type="monotone" dataKey="count" stroke="#1d4ed8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Топ-10 вузов</h2>
        {universities.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Нет данных</p> : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={universities.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="university" width={160} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#059669" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">География</h2>
          {geography.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Нет данных</p> : (
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Город</th><th className="pb-2 font-medium text-right">Кол-во</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {geography.map((g, i) => (
                  <tr key={i}><td className="py-2 text-gray-700">{g.city}</td><td className="py-2 text-gray-600 text-right font-medium">{g.count}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Ключевые слова</h2>
          {keywords.length === 0 ? <p className="text-gray-400 text-sm text-center py-8">Нет данных</p> : (
            <div className="flex flex-wrap gap-2">
              {keywords.map((k, i) => {
                const ratio = maxKw === minKw ? 0.5 : (k.count - minKw) / (maxKw - minKw);
                const size = Math.round(14 + ratio * 34);
                return (
                  <span key={i} style={{ fontSize: size }} className="text-primary-700 font-medium leading-tight">{k.keyword}</span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
