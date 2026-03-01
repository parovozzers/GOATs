import { Link } from "react-router-dom";
import { Target, BookOpen, Users, Trophy, CheckCircle, ArrowRight } from "lucide-react";

export function AboutPage() {
  const goals = [
    "Развитие интереса к проектной деятельности",
    "Профориентация студентов",
    "Интеграция с проектным обучением",
    "Развитие информационной платформы",
    "Интеграция с инновационной инфраструктурой РФ",
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Образование",
      desc: "Развитие проектных компетенций и навыков у студентов всех направлений",
    },
    {
      icon: Users,
      title: "Сообщество",
      desc: "Объединение студентов, экспертов и наставников вокруг инновационных проектов",
    },
    {
      icon: Trophy,
      title: "Признание",
      desc: "Денежные призы и дипломы победителям, поддержка лучших проектов",
    },
  ];

  const stages = [
    {
      num: 1,
      title: "Заочный отбор",
      desc: "Заполнение заявок, регистрация на сайте, отбор Экспертным советом",
    },
    {
      num: 2,
      title: "Доработка проектов",
      desc: "Очно-заочная форма, консультации экспертов и менторов",
    },
    {
      num: 3,
      title: "Презентация",
      desc: "Очная защита перед Экспертным советом",
    },
    {
      num: 4,
      title: "Награждение",
      desc: "Дипломы 1-й, 2-й, 3-й степени и денежные премии",
    },
  ];

  return (
    <div>
      <section className="bg-primary-light/50 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">О конкурсе</span>
          </nav>
          <h1 className="text-4xl font-bold text-foreground">О конкурсе</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Миссия</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Повышение компетенций в области проектной деятельности; формирование
            проектной системы в СочиГУ.
          </p>
        </div>
      </section>

      <section className="bg-primary-light/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Цели конкурса</h2>
            </div>
            <ul className="space-y-3">
              {goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl bg-card p-6 shadow-sm border border-border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-light/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">4 этапа конкурса</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {stages.map((stage) => (
              <div key={stage.num} className="rounded-xl bg-card p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {stage.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{stage.title}</h3>
                <p className="text-sm text-muted-foreground">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Организатор</h2>
          <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
            <p className="font-semibold text-foreground">Стартап-студия СочиГУ</p>
            <p className="mt-1 text-muted-foreground">
              ФГБОУ ВО «Сочинский государственный университет»
            </p>
          </div>
        </div>
      </section>

      <section className="hero-gradient px-4 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Готов участвовать?</h2>
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
