import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usersApi } from '@/api/users';
import { User } from '@/types';
import { fadeUp, stagger, cardItem, hoverCardSm } from '@/utils/animations';

type PublicExpert = Pick<User, 'id' | 'firstName' | 'lastName' | 'middleName' | 'avatarUrl' | 'position' | 'bio'>;

export function ExpertsPage() {
  useEffect(() => { document.title = 'Экспертный совет — Конкурс СочиГУ'; }, []);
  const [experts, setExperts] = useState<PublicExpert[]>([]);

  useEffect(() => {
    usersApi.getPublicExperts().then(setExperts).catch(() => {});
  }, []);

  return (
    <div>
      <section className="bg-primary-light/50 py-12">
        <div className="container mx-auto px-4">
          <motion.nav
            className="mb-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          >
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Экспертный совет</span>
          </motion.nav>
          <motion.h1
            className="text-4xl font-bold text-foreground"
            initial="hidden" animate="show" variants={fadeUp}
          >
            Экспертный совет
          </motion.h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-center text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Эксперты оценивают заявки и проекты участников, проводят консультации
          и участвуют в защитах и награждении.
        </motion.p>

        {experts.length === 0 ? (
          <motion.p
            className="text-center text-muted-foreground py-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            Состав Экспертного совета утверждается приказом ректора
          </motion.p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {experts.map(expert => (
              <motion.div
                key={expert.id}
                className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm border border-border relative"
                variants={cardItem}
                {...hoverCardSm}
              >
                {expert.avatarUrl ? (
                  <img
                    src={expert.avatarUrl}
                    alt={`${expert.firstName} ${expert.lastName}`}
                    className="mb-4 h-40 w-40 rounded-full object-cover flex-shrink-0 border border-border"
                  />
                ) : (
                  <div className="mb-4 h-40 w-40 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                    {expert.firstName[0]}{expert.lastName[0]}
                  </div>
                )}
                <h3 className="font-semibold text-foreground">
                  {expert.lastName} {expert.firstName}{expert.middleName ? ` ${expert.middleName}` : ''}
                </h3>
                {expert.position && <p className="mt-1 text-sm text-muted-foreground">{expert.position}</p>}
                {expert.bio && <p className="mt-2 text-xs text-muted-foreground/80 line-clamp-3">{expert.bio}</p>}
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
