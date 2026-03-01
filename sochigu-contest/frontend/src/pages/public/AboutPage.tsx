import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
        {/* 1. Заголовок страницы с breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4" aria-label="Хлебные крошки">
          <Link to="/" className="hover:text-primary-600">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">О конкурсе</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
          О конкурсе
        </h1>

        {/* 2. Миссия */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Миссия</h2>
          <p className="text-gray-600 leading-relaxed">
            Повышение компетенций в области проектной деятельности; формирование проектной системы в СочиГУ.
          </p>
        </section>

        {/* 3. Цели */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Цели</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
            <li>Развитие интереса к проектной деятельности</li>
            <li>Профориентация студентов</li>
            <li>Интеграция с проектным обучением</li>
            <li>Развитие информационной платформы</li>
            <li>Интеграция с инновационной инфраструктурой РФ</li>
          </ul>
        </section>

        {/* 4. Условия участия */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Условия участия</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
            <li>Участие бесплатное</li>
            <li>Студенты и аспиранты СочиГУ всех курсов и форм обучения</li>
            <li>Команда: 2–5 человек</li>
            <li>Одна команда — один проект</li>
          </ul>
        </section>

        {/* 5. 4 этапа конкурса */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">4 этапа конкурса</h2>
          <div className="space-y-6">
            {[
              {
                num: 1,
                title: 'Заочный отбор',
                desc: 'Заполнение заявок, регистрация на сайте, отбор Экспертным советом',
              },
              {
                num: 2,
                title: 'Доработка проектов',
                desc: 'Очно-заочная форма, консультации экспертов и менторов',
              },
              {
                num: 3,
                title: 'Презентация',
                desc: 'Очная защита перед Экспертным советом',
              },
              {
                num: 4,
                title: 'Награждение',
                desc: 'Дипломы 1-й, 2-й, 3-й степени и денежные премии',
              },
            ].map((stage) => (
              <div
                key={stage.num}
                className="flex gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50/50"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                  {stage.num}
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">{stage.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Организатор */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">Организатор</h2>
          <p className="text-gray-600">Стартап-студия СочиГУ</p>
        </section>

        {/* 7. Кнопка "Подать заявку" */}
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