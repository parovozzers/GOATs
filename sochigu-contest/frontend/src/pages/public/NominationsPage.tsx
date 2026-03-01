import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const criteriaBusiness = [
  "Полнота и проработанность бизнес-модели",
  "Рыночный потенциал и конкурентные преимущества",
  "Реалистичность финансовых прогнозов",
  "Уровень презентации и качество защиты",
  "Готовность команды к реализации",
];

const criteriaPractical = [
  "Актуальность и социальная значимость проблемы",
  "Методическая ценность и новизна подхода",
  "Реализуемость в реальных условиях",
  "Обоснованность ожидаемых результатов",
  "Масштабируемость и потенциал тиражирования",
];

const directions = [
  "IT и цифровая экономика",
  "Социальные проекты",
  "Реальный сектор (транспорт, строительство, туризм, ТЭК)",
  "Политико-правовые",
  "Культурные",
  "Спортивные",
];

export function NominationsPage() {
  return (
    <div>
      <section className="bg-primary-light/50 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Номинации</span>
          </nav>
          <h1 className="text-4xl font-bold text-foreground">Номинации конкурса</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8 mb-12">
          <div className="rounded-xl bg-card border-l-4 border-primary p-6 shadow-sm">
            <div className="mb-3 inline-block rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
              Номинация 1
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Бизнес-проекты</h2>
            <p className="mb-5 text-muted-foreground">
              Коммерциализация, Pre-Seed/Seed стадии.
            </p>
            <p className="mb-3 text-sm font-semibold text-foreground">Критерии оценки:</p>
            <ul className="space-y-2">
              {criteriaBusiness.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-card border-l-4 border-accent p-6 shadow-sm">
            <div className="mb-3 inline-block rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              Номинация 2
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Практико-ориентированные</h2>
            <p className="mb-5 text-muted-foreground">
              Образовательные и социально значимые проекты.
            </p>
            <p className="mb-3 text-sm font-semibold text-foreground">Критерии оценки:</p>
            <ul className="space-y-2">
              {criteriaPractical.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Направления проектов</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {directions.map((d, i) => (
              <div
                key={i}
                className="rounded-lg bg-primary-light px-4 py-3 text-sm font-medium text-primary"
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-gradient px-4 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Выбери свою номинацию</h2>
          <p className="mb-8 text-primary-foreground/80">
            Подай заявку и представь свой проект экспертам
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent-hover"
          >
            Подать заявку <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
