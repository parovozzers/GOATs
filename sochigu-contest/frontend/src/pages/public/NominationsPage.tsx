import { Link } from 'react-router-dom';

const criteria = ['полнота профиля', 'качество презентации', 'актуальность'];

const directions = [
  'IT и цифровая экономика',
  'Социальные проекты',
  'Реальный сектор (транспорт, строительство, туризм, ТЭК)',
  'Политико-правовые',
  'Культурные',
  'Спортивные',
];

export function NominationsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
          Номинации конкурса
        </h1>

        <div className="space-y-8 mb-10">
          <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-2">
              1-я номинация: Бизнес-проекты
            </h2>
            <p className="text-gray-600 mb-4">
              Коммерциализация, Pre-Seed/Seed стадии.
            </p>
            <p className="text-sm font-semibold text-primary-900 mb-2">Критерии оценки:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2">
              {criteria.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
            <h2 className="text-xl font-bold text-primary-900 mb-2">
              2-я номинация: Практико-ориентированные
            </h2>
            <p className="text-gray-600 mb-4">
              Образовательные проекты.
            </p>
            <p className="text-sm font-semibold text-primary-900 mb-2">Критерии оценки:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 pl-2">
              {criteria.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Направления проектов</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
            {directions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </section>

        <div className="pt-4">
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-colors"
          >
            Подать заявку
          </Link>
        </div>
      </div>
    </main>
  );
}