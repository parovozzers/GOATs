import { useState, useEffect, useMemo } from 'react';
import { analyticsApi } from '@/api/analytics';
import {
  AnalyticsSummary, AnalyticsByNomination, AnalyticsTimeline,
  AnalyticsGeography, AnalyticsByStatus, AnalyticsActivityItem,
} from '@/types';
import { Spinner } from '@/components/shared/Spinner';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ─── Палитра ─────────────────────────────────────────────────────────────────
const PALETTE = ['#002a7f', '#403e89', '#635392', '#826a9c', '#9f83a6', '#bb9cb2', '#d6b6be', '#efd2cd'];
const COLOR_TRACK = '#efd2cd';
const COLOR_BG    = '#f4f4fb';
const COLOR_TEXT  = '#2d2d3a';

// ─── Статус-лейблы ────────────────────────────────────────────────────────────
const STATUS_LABELS: Record<string, string> = {
  draft: 'Черновик',
  submitted: 'На проверке',
  accepted: 'Принято',
  rejected: 'Отклонено',
  admitted: 'К очному этапу',
  winner: 'Победитель',
  runner_up: 'Призёр',
};

const STATUS_DOT: Record<string, string> = {
  accepted: '#002a7f',
  submitted: '#826a9c',
  rejected: '#bb9cb2',
  admitted: '#403e89',
  draft: '#d6b6be',
  winner: '#635392',
  runner_up: '#635392',
};

// ─── Хелперы ─────────────────────────────────────────────────────────────────
function relativeTime(iso: string): string {
  const normalized = /Z|[+-]\d{2}:\d{2}$/.test(iso) ? iso : iso.replace(' ', 'T') + 'Z';
  const diff = Date.now() - new Date(normalized).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'только что';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин назад`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours} ч назад`;
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function safe(a: number, b: number): number {
  return b === 0 ? 0 : Math.round((a / b) * 100);
}

// ─── Тултип ───────────────────────────────────────────────────────────────────
function Tip({ children, content }: { children: React.ReactNode; content: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 text-xs rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          style={{ background: '#2d2d3a', color: '#fff' }}>
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#2d2d3a' }} />
        </div>
      )}
    </div>
  );
}

// ─── KPI-карточка ─────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, subColor, valueColor, bg, labelColor }: {
  label: string; value: string | number; sub?: string;
  subColor?: string; valueColor?: string; bg?: string; labelColor?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 shadow-sm p-5 analytics-kpi" style={{ background: bg ?? '#fff' }}>
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: labelColor ?? '#9ca3af' }}>{label}</p>
      <p className="text-3xl font-bold" style={{ color: valueColor ?? '#002a7f' }}>{value}</p>
      {sub && <p className="text-xs font-semibold mt-1" style={{ color: subColor ?? '#9ca3af' }}>{sub}</p>}
    </div>
  );
}

// ─── Карточка-секция ──────────────────────────────────────────────────────────
function Card({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-100 shadow-sm p-5 analytics-card flex flex-col ${className}`} style={{ background: COLOR_BG }}>
      <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#826a9c' }}>{title}</h2>
      {children}
    </div>
  );
}

// ─── Основной компонент ───────────────────────────────────────────────────────
export function AnalyticsPage() {
  useEffect(() => { document.title = 'Аналитика — Конкурс СочиГУ'; }, []);

  const [summary,     setSummary]     = useState<AnalyticsSummary | null>(null);
  const [byNomination,setByNomination]= useState<AnalyticsByNomination[]>([]);
  const [timeline,    setTimeline]    = useState<AnalyticsTimeline[]>([]);
  const [geography,   setGeography]   = useState<AnalyticsGeography[]>([]);
  const [byStatus,    setByStatus]    = useState<AnalyticsByStatus[]>([]);
  const [activity,    setActivity]    = useState<AnalyticsActivityItem[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [retryKey,    setRetryKey]    = useState(0);
  const [showAll,     setShowAll]     = useState(false);

  const fetchAll = () => Promise.all([
    analyticsApi.getSummary(),
    analyticsApi.getByNomination(),
    analyticsApi.getTimeline(),
    analyticsApi.getGeography(),
    analyticsApi.getByStatus(),
    analyticsApi.getActivity(),
  ]).then(([s, n, t, g, bs, a]) => {
    setSummary(s); setByNomination(n); setTimeline(t);
    setGeography(g); setByStatus(bs); setActivity(a);
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAll()
      .catch(() => setError('Ошибка при загрузке аналитики'))
      .finally(() => setLoading(false));

    const id = setInterval(() => { fetchAll().catch(() => {}); }, 15_000);
    return () => clearInterval(id);
  }, [retryKey]);

  // ── Вспомогательные вычисления ──────────────────────────────────────────────
  const statusCount = (s: string | string[]): number => {
    const arr = Array.isArray(s) ? s : [s];
    return arr.reduce((acc, st) => acc + (byStatus.find(x => x.status === st)?.count ?? 0), 0);
  };

  const total = summary?.totalApplications ?? 0;

  const funnelSteps = [
    { label: 'Все заявки',      count: total,                                      color: PALETTE[0] },
    { label: 'Подано',          count: total - statusCount('draft'),               color: PALETTE[1] },
    { label: 'На проверке',     count: statusCount('submitted'),                   color: PALETTE[2] },
    { label: 'Принято',         count: statusCount('accepted'),                    color: PALETTE[3] },
    { label: 'К очному этапу',  count: statusCount('admitted'),                    color: PALETTE[4] },
    { label: 'Победители',      count: statusCount(['winner', 'runner_up']),       color: PALETTE[5] },
  ];

  const statusGrid = [
    { label: 'Принято',         status: 'accepted',               color: PALETTE[0] },
    { label: 'На проверке',     status: 'submitted',              color: PALETTE[3] },
    { label: 'Отклонено',       status: 'rejected',               color: PALETTE[5] },
    { label: 'Черновики',       status: 'draft',                  color: PALETTE[4] },
    { label: 'К очному этапу',  status: 'admitted',               color: PALETTE[1] },
    { label: 'Победители',      statuses: ['winner', 'runner_up'],color: PALETTE[2] },
  ];


  // Timeline с заполнением пропусков нулями
  const filledTimeline = useMemo(() => {
    if (timeline.length === 0) return [];
    const map = new Map(timeline.map(t => [t.date.slice(0, 10), t.count]));
    const startKey = timeline[0].date.slice(0, 10);
    const lastDataKey = timeline[timeline.length - 1].date.slice(0, 10);
    // today in LOCAL time as YYYY-MM-DD
    const todayKey = new Date().toLocaleDateString('sv-SE');
    const endKey = lastDataKey > todayKey ? lastDataKey : todayKey;
    const result: { date: string; count: number }[] = [];
    // iterate using UTC dates to avoid DST/timezone shifts
    const cur = new Date(startKey + 'T12:00:00Z');
    const end = new Date(endKey + 'T12:00:00Z');
    while (cur <= end) {
      const key = cur.toISOString().slice(0, 10);
      result.push({ date: key, count: map.get(key) ?? 0 });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    return result;
  }, [timeline]);

  const maxY = filledTimeline.length > 0
    ? Math.ceil(Math.max(...filledTimeline.map(t => t.count)) * 1.2)
    : 5;

  // Суммы для проверки целостности
  const statusSum = byStatus.reduce((acc, s) => acc + s.count, 0);
  const integrityOk = total === 0 || statusSum === total;

  // ── Загрузка / ошибка ───────────────────────────────────────────────────────
  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (error) return (
    <div className="m-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-4">
      <span>{error}</span>
      <button onClick={() => setRetryKey(k => k + 1)}
        className="ml-auto px-3 py-1.5 rounded-lg border border-red-300 text-red-700 text-sm hover:bg-red-100 transition-colors">
        Повторить
      </button>
    </div>
  );

  // ── Рендер ──────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 analytics-page">

      {/* Шапка */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: COLOR_TEXT }}>Аналитика конкурса</h1>
        <button onClick={() => window.print()}
          className="px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors analytics-no-print"
          style={{ background: '#403e89' }}>
          Экспорт PDF
        </button>
      </div>

      {!integrityOk && (
        <div className="p-3 rounded-lg text-xs" style={{ background: '#fff3cd', color: '#856404' }}>
          ⚠ Сумма по статусам ({statusSum}) не совпадает с общим числом заявок ({total}) — возможна ошибка данных.
        </div>
      )}

      {/* KPI × 5 */}
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <KpiCard
            label="Всего заявок"
            value={total}
            sub={summary.newThisWeek > 0 ? `+${summary.newThisWeek} за неделю` : 'без изменений'}
            subColor={summary.newThisWeek > 0 ? '#635392' : '#9ca3af'}
          />
          <KpiCard
            label="Участников"
            value={summary.totalUsers}
            sub={`в ${total} заявках`}
          />
          <KpiCard
            label="Команд"
            value={summary.teamApplications}
            sub={`ср. ${summary.avgTeamSize} чел.`}
          />
          <KpiCard
            label="Вузов"
            value={summary.totalUniversities}
            sub={`городов: ${geography.length}`}
          />
          <KpiCard
            label="На проверке"
            value={summary.underReview}
            sub="ожидают ответа"
            bg="#fef9c3"
            labelColor="#92400e"
            valueColor="#92400e"
            subColor="#92400e"
          />
        </div>
      )}

      {/* Воронка + Статусы */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 analytics-grid-2">
        <Card title="Воронка заявок" className="h-full">
          {total === 0
            ? <p className="text-sm text-center py-6" style={{ color: '#9ca3af' }}>Данных пока нет</p>
            : (
              <div className="flex flex-col justify-between h-full gap-3">
                {funnelSteps.map((step, i) => {
                  const barPct = total > 0 ? (step.count / total) * 100 : 0;
                  const pct = safe(step.count, total);
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-right shrink-0" style={{ width: 130, color: COLOR_TEXT }}>{step.label}</span>
                      <Tip content={`${step.label}: ${step.count} заявок (${pct}%)`}>
                        <div className="relative rounded analytics-track" style={{ height: 34, background: COLOR_TRACK }}>
                          <div
                            className="absolute left-0 top-0 h-full rounded flex items-center transition-all duration-500 analytics-bar"
                            style={{ width: `${Math.max(barPct, 0)}%`, background: step.color, minWidth: step.count > 0 ? 4 : 0 }}
                          >
                            {barPct >= 14 && (
                              <span className="pl-2 text-white text-xs font-bold">{step.count}</span>
                            )}
                          </div>
                          {barPct < 14 && step.count > 0 && (
                            <span className="absolute text-xs font-bold"
                              style={{ left: `calc(${barPct}% + 6px)`, top: '50%', transform: 'translateY(-50%)', color: COLOR_TEXT }}>
                              {step.count}
                            </span>
                          )}
                        </div>
                      </Tip>
                      <span className="text-xs shrink-0 w-9 text-right font-medium" style={{ color: '#826a9c' }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            )
          }
        </Card>

        <Card title="Статусы">
          {byStatus.length === 0
            ? <p className="text-sm text-center py-6" style={{ color: '#9ca3af' }}>Данных пока нет</p>
            : (
              <div className="grid grid-cols-2 gap-3">
                {statusGrid.map((cell, i) => {
                  const count = 'statuses' in cell
                    ? statusCount(cell.statuses!)
                    : statusCount(cell.status!);
                  return (
                    <div key={i} className="rounded-lg p-4 flex flex-col gap-1 analytics-kpi"
                      style={{ background: cell.color + '22' }}>
                      <span className="text-4xl font-extrabold" style={{ color: cell.color }}>{count}</span>
                      <span className="text-xs font-semibold" style={{ color: cell.color }}>{cell.label}</span>
                    </div>
                  );
                })}
              </div>
            )
          }
        </Card>
      </div>

      {/* Номинации + География */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 analytics-grid-2">
        <Card title="Заявки по номинациям">
          {byNomination.length === 0
            ? <p className="text-sm text-center py-6" style={{ color: '#9ca3af' }}>Данных пока нет</p>
            : (() => {
              const maxCount = Math.max(...byNomination.map(n => n.count));
              const top = byNomination.slice(0, 10);
              const others = byNomination.slice(10).reduce((acc, n) => acc + n.count, 0);
              return (
                <div className="space-y-2">
                  {top.map((item, i) => {
                    const barPct = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                    const pct = safe(item.count, total);
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className="text-xs text-right shrink-0"
                          style={{ width: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: COLOR_TEXT }}
                          title={item.nomination}>
                          {item.nomination}
                        </div>
                        <Tip content={`${item.nomination}: ${item.count} заявок (${pct}%)`}>
                          <div className="relative rounded analytics-track" style={{ height: 26, background: COLOR_TRACK }}>
                            <div
                              className="absolute left-0 top-0 h-full rounded transition-all duration-500 flex items-center analytics-bar"
                              style={{ width: `${barPct}%`, background: PALETTE[i % PALETTE.length], minWidth: item.count > 0 ? 4 : 0 }}
                            >
                              {barPct >= 16 && (
                                <span className="pl-2 text-white text-xs font-semibold">{item.count}</span>
                              )}
                            </div>
                            {barPct < 16 && item.count > 0 && (
                              <span className="absolute text-xs font-semibold"
                                style={{ left: `calc(${barPct}% + 6px)`, top: '50%', transform: 'translateY(-50%)', color: COLOR_TEXT }}>
                                {item.count}
                              </span>
                            )}
                          </div>
                        </Tip>
                        <span className="text-xs shrink-0 w-9 text-right font-medium" style={{ color: '#826a9c' }}>{pct}%</span>
                      </div>
                    );
                  })}
                  {others > 0 && (
                    <div className="text-xs pt-1" style={{ color: '#9ca3af' }}>
                      Другие: {others} заявок
                    </div>
                  )}
                </div>
              );
            })()
          }
        </Card>

        <Card title="География">
          {geography.length === 0
            ? <p className="text-sm text-center py-6" style={{ color: '#9ca3af' }}>Данных пока нет</p>
            : (
              <div className="overflow-y-auto geo-scroll" style={{ maxHeight: 260, paddingRight: 6 }}>
                <table className="w-full text-sm">
                  <thead className="sticky top-0" style={{ background: COLOR_BG }}>
                    <tr className="text-left border-b border-gray-100">
                      <th className="pb-2 font-medium text-xs" style={{ color: '#9ca3af' }}>Город</th>
                      <th className="pb-2 font-medium text-xs text-right" style={{ color: '#9ca3af' }}>Участников</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {geography.map((g, i) => (
                      <tr key={i}>
                        <td className="py-2 flex items-center gap-2">
                          <span className="text-base leading-none" style={{ color: PALETTE[i % PALETTE.length] }}>●</span>
                          <span style={{ color: COLOR_TEXT }}>{g.city}</span>
                        </td>
                        <td className="py-2 text-right font-semibold" style={{ color: PALETTE[i % PALETTE.length] }}>{g.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        </Card>
      </div>

      {/* Динамика + Лента */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 analytics-grid-2">
        <Card title="Динамика подачи заявок">
          {filledTimeline.length === 0
            ? <p className="text-sm text-center py-6" style={{ color: '#9ca3af' }}>Данных пока нет</p>
            : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={filledTimeline} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={COLOR_TRACK} stopOpacity={0.5} />
                      <stop offset="95%" stopColor={COLOR_TRACK} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLOR_BG} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }}
                    tickFormatter={d => new Date(d).toLocaleDateString('ru-RU', { timeZone: 'UTC', day: 'numeric', month: 'short' })} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, maxY]} allowDecimals={false} />
                  <Tooltip labelFormatter={d => new Date(d).toLocaleDateString('ru-RU', { timeZone: 'UTC' })}
                    formatter={(v: number) => [v, 'Заявок']} />
                  <Area type="monotone" dataKey="count" stroke={PALETTE[0]} strokeWidth={2.5}
                    fill="url(#areaFill)" dot={{ fill: PALETTE[0], r: 3 }} activeDot={{ r: 5 }} />
                </AreaChart>
              </ResponsiveContainer>
            )
          }
        </Card>

        <Card title="Последние события">
          {activity.length === 0
            ? <p className="text-sm text-center py-6" style={{ color: '#9ca3af' }}>Событий пока нет</p>
            : (
              <div className="space-y-3">
                {(showAll ? activity : activity.slice(0, 5)).map((ev, i) => (
                  <div key={ev.id ?? i} className="flex gap-3 items-start">
                    <span className="mt-1 text-base leading-none shrink-0"
                      style={{ color: STATUS_DOT[ev.toStatus] ?? '#d6b6be' }}>●</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: COLOR_TEXT }}>
                        {ev.userName} — {STATUS_LABELS[ev.toStatus] ?? ev.toStatus}
                      </p>
                      <p className="text-xs truncate" style={{ color: '#9ca3af' }}>
                        {relativeTime(ev.createdAt)} · {ev.nominationName}
                      </p>
                    </div>
                  </div>
                ))}
                {activity.length > 5 && (
                  <button onClick={() => setShowAll(v => !v)}
                    className="text-xs font-medium mt-1 hover:underline"
                    style={{ color: PALETTE[2] }}>
                    {showAll ? 'Свернуть' : `Показать ещё ${activity.length - 5}`}
                  </button>
                )}
              </div>
            )
          }
        </Card>
      </div>

    </div>
  );
}
