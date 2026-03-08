import { useEffect } from 'react';
import { Link } from "react-router-dom";
// HERO_BG: удали эту строку чтобы убрать фото
import heroBg from '../../../first_page.png';
import { GraduationCap, Users, Gift, Trophy, ArrowRight, Calendar, CheckCircle, Presentation, Award } from "lucide-react";

export function HomePage() {
  useEffect(() => { document.title = 'Главная — Конкурс СочиГУ'; }, []);
  return (
    <div>
      {/* HERO_BG: замени эту section на закомментированную ниже чтобы вернуть чистый синий */}
      <section className="relative overflow-hidden px-4 pb-28 pt-20 md:pb-36 md:pt-28" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
        <div className="absolute inset-0 hero-gradient opacity-60" />
      {/* ОРИГИНАЛ (раскомментируй и удали 3 строки выше):
      <section className="hero-gradient relative overflow-hidden px-4 pb-28 pt-20 md:pb-36 md:pt-28"> */}
        <div className="container relative z-10 mx-auto text-center">
          <div className="mb-6 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            <Calendar className="mr-1 inline-block h-4 w-4" /> Приём заявок до 30 октября
          </div>
          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Конкурс студенческих проектов{" "}
            <span className="text-accent">СочиГУ 2026</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80 md:text-xl">
            Представь свой проект. Получи поддержку. Стань победителем.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent-hover">
              Подать заявку <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-mid">
              Узнать подробнее
            </Link>
          </div>
        </div>
      </section>

      <section className="container relative z-10 mx-auto -mt-16 px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Trophy, label: "2 номинации", desc: "Бизнес и практико-ориентированные" },
            { icon: Users, label: "500+ участников", desc: "Студенты со всей России" },
            { icon: Gift, label: "Бесплатное участие", desc: "Без взносов и платежей" },
            { icon: Award, label: "Денежные призы", desc: "Для победителей и призёров" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Этапы конкурса</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { num: 1, icon: CheckCircle, title: "Заочный отбор", desc: "Подача заявок" },
            { num: 2, icon: GraduationCap, title: "Доработка", desc: "Совершенствование" },
            { num: 3, icon: Presentation, title: "Презентация", desc: "Защита перед экспертами" },
            { num: 4, icon: Award, title: "Награждение", desc: "Победители" },
          ].map((stage) => (
            <div key={stage.num} className="rounded-xl bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {stage.num}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{stage.title}</h3>
              <p className="text-sm text-muted-foreground">{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-light/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Номинации</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-primary/10 bg-card p-6 shadow-sm">
              <div className="mb-3 inline-block rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">Номинация 1</div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Бизнес-проекты</h3>
              <p className="text-muted-foreground">Коммерциализация, Pre-Seed и Seed стадии.</p>
            </div>
            <div className="rounded-xl border-2 border-accent/10 bg-card p-6 shadow-sm">
              <div className="mb-3 inline-block rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Номинация 2</div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Практико-ориентированные</h3>
              <p className="text-muted-foreground">Образовательные и социально значимые проекты.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/nominations" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              Все номинации <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Ключевые даты</h2>
        <div className="mx-auto max-w-md">
          {[
            { date: "До 30 октября", label: "Приём заявок", active: true },
            { date: "Ноябрь", label: "Доработка проектов", active: false },
            { date: "Декабрь", label: "Очная презентация", active: false },
            { date: "Декабрь", label: "Награждение победителей", active: false },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${item.active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i + 1}
                </div>
                {i < 3 && <div className="h-12 w-0.5 bg-border" />}
              </div>
              <div className="pb-8">
                <p className="text-sm font-semibold text-accent">{item.date}</p>
                <p className="font-medium text-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="hero-gradient px-4 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">Готов участвовать?</h2>
          <p className="mb-8 text-primary-foreground/80">Подай заявку и покажи свой проект экспертам</p>
          <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent-hover">
            Подать заявку <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
