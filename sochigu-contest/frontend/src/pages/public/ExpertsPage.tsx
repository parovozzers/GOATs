export function ExpertsPage() {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Экспертный совет
          </h1>
          <p className="text-gray-600 mb-8">
            Эксперты оценивают заявки и проекты участников, проводят консультации и участвуют в защитах и награждении.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 flex-shrink-0" />
                <h3 className="font-semibold text-primary-900">Эксперт</h3>
                <p className="text-sm text-gray-600">Должность</p>
              </div>
            ))}
          </div>
  
          <p className="text-sm text-gray-600 italic">
            Состав Экспертного совета утверждается приказом ректора
          </p>
        </div>
      </main>
    );
  }