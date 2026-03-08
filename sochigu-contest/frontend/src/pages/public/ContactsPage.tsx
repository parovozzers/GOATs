import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { MapPin, Mail, Globe } from "lucide-react";

export function ContactsPage() {
  useEffect(() => { document.title = 'Контакты — Конкурс СочиГУ'; }, []);
  return (
    <div>
      <section className="bg-primary-light/50 py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Контакты</span>
          </nav>
          <h1 className="text-4xl font-bold text-foreground">Контакты</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Организатор</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Организация</p>
                  <p className="text-muted-foreground">
                    ФГБОУ ВО «Сочинский государственный университет»
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">Стартап-студия СочиГУ</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <a
                    href="mailto:info@sutr.ru"
                    className="text-primary hover:underline"
                  >
                    info@sutr.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Сайт конкурса</p>
                  <a
                    href="https://PROJECT-Sochigu.sutr.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    PROJECT-Sochigu.sutr.ru
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Обратная связь</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Текст сообщения"
                  className="w-full resize-y rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="button"
                className="rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-all hover:bg-accent-hover"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
