import { useEffect } from 'react';

export function PartnersPage() {
  useEffect(() => { document.title = 'Партнёры — Конкурс СочиГУ'; }, []);
  return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Наши партнёры
          </h1>
          <p className="text-gray-600 mb-8">
            Конкурс студенческих проектов СочиГУ проводится при поддержке партнёров. Партнёрство помогает развивать проекты участников и укреплять связи университета с бизнесом и обществом.
          </p>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium"
              >
                Партнёр
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }