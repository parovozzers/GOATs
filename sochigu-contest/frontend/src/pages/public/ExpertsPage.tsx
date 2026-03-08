import { useEffect } from 'react';
import { Link } from "react-router-dom";

export function ExpertsPage() {
  useEffect(() => { document.title = 'Экспертный совет — Конкурс СочиГУ'; }, []);
  return (
    <div>
      <section className="bg-primary-light/50 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Экспертный совет</span>
          </nav>
          <h1 className="text-4xl font-bold text-foreground">Экспертный совет</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground">
          Эксперты оценивают заявки и проекты участников, проводят консультации
          и участвуют в защитах и награждении.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-sm border border-border"
            >
              <div className="mb-4 h-20 w-20 rounded-full bg-muted flex-shrink-0" />
              <h3 className="font-semibold text-foreground">Эксперт</h3>
              <p className="mt-1 text-sm text-muted-foreground">Должность</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm italic text-muted-foreground">
          Состав Экспертного совета утверждается приказом ректора
        </p>
      </section>
    </div>
  );
}
