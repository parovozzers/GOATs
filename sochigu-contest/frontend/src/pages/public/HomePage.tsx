import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from '@/store/auth.store';
import { useUiStore } from '@/store/ui.store';
import mascot from '../../../mascot-removebg-preview.png';
import { GraduationCap, Users, Gift, Trophy, ArrowRight, Calendar, CheckCircle, Presentation, Award } from "lucide-react";
import { fadeUp, fadeUpView, fadeIn, staggerView, cardItem } from '@/utils/animations';

export function HomePage() {
  useEffect(() => { document.title = 'Главная — Конкурс СочиГУ'; }, []);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { openAuthModal } = useUiStore();
  const handleApply = () => user ? navigate('/cabinet') : openAuthModal('register');

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-gradient relative overflow-hidden pt-20 pb-20 md:pt-20 md:pb-24 md:h-[520px]">
        <div className="container relative z-10 mx-auto px-4 h-full">
          {/* Mascot — float animation via CSS keyframe */}
          <motion.img
            src={mascot} alt="" aria-hidden
            className="absolute -top-28 right-[-130px] h-[720px] w-auto object-contain object-top pointer-events-none select-none hidden md:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            style={{ animation: 'mascotFloat 4s ease-in-out infinite' }}
          />

          <div className="w-full md:w-[58%] flex flex-col items-start text-left">
            {/* Badge */}
            <motion.div
              className="mb-6 self-start rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent-foreground"
              initial="hidden" animate="show" custom={0.1} variants={fadeUp}
            >
              <Calendar className="mr-1 inline-block h-4 w-4" /> Приём заявок до 30 октября
            </motion.div>

            <div className="pl-20">
              {/* Heading */}
              <motion.h1
                className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-5xl lg:text-5xl"
                initial="hidden" animate="show" custom={0.2} variants={fadeUp}
              >
                Конкурс студенческих<br />
                проектов <span className="text-accent">СочиГУ</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mb-8 text-lg text-primary-foreground/80 md:text-xl"
                initial="hidden" animate="show" custom={0.35} variants={fadeUp}
              >
                Представь свой проект. Получи поддержку.<br />
                <span className="font-bold text-primary-foreground">Стань победителем.</span>
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              className="self-start flex flex-col items-start gap-4 sm:flex-row sm:justify-start"
              initial="hidden" animate="show" custom={0.5} variants={fadeUp}
            >
              <button onClick={handleApply} className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent-hover">
                Подать заявку <ArrowRight size={18} />
              </button>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-mid">
                Узнать подробнее
              </Link>
            </motion.div>

            {/* Mobile mascot */}
            <motion.img
              src={mascot} alt="" aria-hidden
              className="mx-auto mt-8 h-auto max-h-[280px] w-auto object-contain pointer-events-none select-none block md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* ── Stat cards ── */}
      <section className="container relative z-10 mx-auto -mt-16 px-4">
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerView}
          initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { icon: Trophy, label: "2 номинации", desc: "Бизнес и практико-ориентированные" },
            { icon: Users, label: "500+ участников", desc: "Студенты со всей России" },
            { icon: Gift, label: "Бесплатное участие", desc: "Без взносов и платежей" },
            { icon: Award, label: "Денежные гранты", desc: "Для победителей и призёров" },
          ].map((stat) => (
            <motion.div key={stat.label} className="flex items-start gap-4 rounded-xl bg-card p-5 shadow-md" variants={cardItem}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Этапы ── */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="mb-10 text-center text-3xl font-bold text-foreground"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0} variants={fadeUpView}
        >
          Этапы конкурса
        </motion.h2>
        <motion.div
          className="grid gap-6 md:grid-cols-4"
          variants={staggerView}
          initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { num: 1, icon: CheckCircle, title: "Заочный отбор", desc: "Подача заявок" },
            { num: 2, icon: GraduationCap, title: "Доработка", desc: "Совершенствование" },
            { num: 3, icon: Presentation, title: "Презентация", desc: "Защита перед экспертами" },
            { num: 4, icon: Award, title: "Награждение", desc: "Победители" },
          ].map((stage) => (
            <motion.div key={stage.num} className="rounded-xl bg-card p-6 text-center shadow-sm" variants={cardItem}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {stage.num}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{stage.title}</h3>
              <p className="text-sm text-muted-foreground">{stage.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Номинации ── */}
      <section className="bg-primary-light/50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-10 text-center text-3xl font-bold text-foreground"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0} variants={fadeUpView}
          >
            Номинации
          </motion.h2>
          <motion.div
            className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2"
            variants={staggerView}
            initial="hidden"
            whileInView="show" viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="rounded-xl border-2 border-primary/10 bg-card p-6 shadow-sm" variants={cardItem}>
              <div className="mb-3 inline-block rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">Номинация 1</div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Бизнес-проекты</h3>
              <p className="text-muted-foreground">Коммерциализация, Pre-Seed и Seed стадии.</p>
            </motion.div>
            <motion.div className="rounded-xl border-2 border-accent/10 bg-card p-6 shadow-sm" variants={cardItem}>
              <div className="mb-3 inline-block rounded-lg bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Номинация 2</div>
              <h3 className="mb-2 text-xl font-bold text-foreground">Практико-ориентированные</h3>
              <p className="text-muted-foreground">Образовательные и социально значимые проекты.</p>
            </motion.div>
          </motion.div>
          <motion.div
            className="mt-8 text-center"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0.2} variants={fadeIn}
          >
            <Link to="/nominations" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
              Все номинации <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Ключевые даты ── */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="mb-10 text-center text-3xl font-bold text-foreground"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0} variants={fadeUpView}
        >
          Ключевые даты
        </motion.h2>
        <div className="mx-auto max-w-md">
          {[
            { date: "До 30 октября", label: "Приём заявок", active: true },
            { date: "Ноябрь", label: "Доработка проектов", active: false },
            { date: "Декабрь", label: "Очная презентация", active: false },
            { date: "Декабрь", label: "Награждение победителей", active: false },
          ].map((item, i) => (
            <motion.div
              key={i} className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.12 }}
            >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        className="hero-gradient px-4 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold text-primary-foreground"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Готов участвовать?
          </motion.h2>
          <motion.p
            className="mb-8 text-primary-foreground/80"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Подай заявку и покажи свой проект экспертам
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            <button onClick={handleApply} className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-all hover:bg-accent-hover">
              Подать заявку <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Float keyframe for mascot */}
      <style>{`
        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
