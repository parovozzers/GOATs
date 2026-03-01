import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. HERO */}
      <section className="bg-gradient-to-b from-primary-900 to-primary-700 text-white px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Конкурс студенческих проектов СочиГУ 2026
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Представь свой проект. Получи поддержку. Стань победителем.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/register"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-colors"
            >
              Подать заявку
            </Link>
            <Link
              to="/about"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 font-semibold transition-colors"
            >
              Узнать подробнее
            </Link>
          </div>
          <p className="text-sm md:text-base text-blue-200">
            Срок приёма заявок: до 30 октября
          </p>
        </div>
      </section>

      {/* 2. СТАТИСТИКА */}
      <section className="px-4 py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '📋', title: '2 номинации' },
              { icon: '👥', title: '500+ участников' },
              { icon: '🎁', title: 'Бесплатно' },
              { icon: '🏆', title: 'Денежные призы' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ЭТАПЫ КОНКУРСА */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-8 text-center">
            Этапы конкурса
          </h2>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4 overflow-x-auto pb-4">
            {[
              'Заочный отбор',
              'Доработка проектов',
              'Презентация',
              'Награждение',
            ].map((label, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <span className="mt-2 text-sm md:text-base font-medium text-gray-800 text-center max-w-[140px]">
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div className="hidden md:flex mx-2 lg:mx-4 flex-shrink-0" aria-hidden>
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. НОМИНАЦИИ */}
      <section className="px-4 py-12 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-8 text-center">
            Номинации
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Бизнес-проекты</h3>
              <p className="text-gray-600">Коммерциализация идей.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Практико-ориентированные</h3>
              <p className="text-gray-600">Образовательные проекты.</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              to="/nominations"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold transition-colors"
            >
              Все номинации
            </Link>
          </div>
        </div>
      </section>

      {/* 5. КЛЮЧЕВЫЕ ДАТЫ */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-8 text-center">
            Ключевые даты
          </h2>
          <div className="space-y-0 border-l-2 border-primary-600 pl-6">
            {[
              { title: 'Приём заявок', desc: 'с открытия до 30 октября' },
              { title: 'Доработка проектов', desc: 'ноябрь' },
              { title: 'Презентация и защита', desc: 'декабрь' },
              { title: 'Награждение', desc: 'декабрь' },
            ].map((item, i) => (
              <div key={i} className="relative pb-8 last:pb-0">
                <span className="absolute -left-6 top-0 w-3 h-3 rounded-full bg-primary-600 -translate-x-1/2" />
                <h3 className="font-semibold text-primary-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-primary-800 text-white px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Готов участвовать?</h2>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-colors"
          >
            Подать заявку
          </Link>
        </div>
      </section>
    </main>
  );
}