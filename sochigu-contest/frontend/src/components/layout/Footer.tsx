import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Конкурс проектов СочиГУ</h3>
            <p className="text-sm text-gray-400">
              Всероссийский конкурс студенческих проектов. Организатор — Стартап-студия СочиГУ.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Навигация</h4>
            <ul className="space-y-1 text-sm">
              {[
                ['/about', 'О конкурсе'],
                ['/nominations', 'Номинации'],
                ['/experts', 'Экспертный совет'],
                ['/news', 'Новости'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Участникам</h4>
            <ul className="space-y-1 text-sm">
              {[
                ['/documents', 'Документы'],
                ['/winners', 'Победители'],
                ['/register', 'Подать заявку'],
                ['/contacts', 'Контакты'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Контакты</h4>
            <p className="text-sm">ФГБОУ ВО «Сочинский государственный университет»</p>
            <p className="text-sm mt-2">Стартап-студия СочиГУ</p>
            <p className="text-sm mt-1 text-accent-500">
              <a href="https://PROJECT-Sochigu.sutr.ru">PROJECT-Sochigu.sutr.ru</a>
            </p>
          </div>
        </div>
        <div className="border-t border-primary-800 mt-8 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Сочинский государственный университет. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
