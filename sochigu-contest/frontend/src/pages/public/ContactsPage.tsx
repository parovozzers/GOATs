export function ContactsPage() {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 max-w-4xl py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">
            Контакты
          </h1>
  
          <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 mb-8">
            <h2 className="text-lg font-bold text-primary-900 mb-4">Данные</h2>
            <dl className="space-y-3 text-gray-600">
              <div>
                <dt className="font-semibold text-primary-900 text-sm">Организация</dt>
                <dd>ФГБОУ ВО «Сочинский государственный университет»</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary-900 text-sm">Подразделение</dt>
                <dd>Стартап-студия СочиГУ</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary-900 text-sm">Сайт конкурса</dt>
                <dd>
                  <a
                    href="https://PROJECT-Sochigu.sutr.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    https://PROJECT-Sochigu.sutr.ru
                  </a>
                </dd>
              </div>
            </dl>
          </section>
  
          <section>
            <h2 className="text-xl font-bold text-primary-900 mb-4">Обратная связь</h2>
            <form className="space-y-4 max-w-xl">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-900 mb-1">
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-900 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-900 mb-1">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-y"
                  placeholder="Текст сообщения"
                />
              </div>
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-colors"
              >
                Отправить
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }