# Задачи для Dev 2 — Frontend Junior
## Проект: Конкурс студенческих проектов СочиГУ
## Стек: React 18 + Vite + TypeScript + Tailwind CSS + React Router v6 + Zustand + Recharts

---

> **Как работать с этим файлом:**
> Открой терминал в папке `sochigu-contest/frontend/`, запусти `claude` и вставляй промпты по одному.
> Каждый промпт — отдельная сессия Claude Code. Выполняй задачи строго по порядку.
> После каждой задачи делай коммит: `git add . && git commit -m "feat: <описание>"`

---

## НЕДЕЛЯ 1 — Публичный сайт

### Задача 1.1 — Установка зависимостей и настройка проекта

```
Мы работаем в папке sochigu-contest/frontend/ — это уже созданный React+Vite+TypeScript проект.

Сделай следующее:
1. Установи зависимости: npm install
2. Установи postcss.config.js для Tailwind:
   Создай файл postcss.config.js со следующим содержимым:
   export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
3. Убедись что файл src/index.css содержит @tailwind base; @tailwind components; @tailwind utilities;
4. Запусти npm run dev и убедись что проект стартует без ошибок.

Не меняй package.json, tailwind.config.js, vite.config.ts — они уже настроены.
```

---

### Задача 1.2 — Главная страница

```
Мы работаем в sochigu-contest/frontend/src/pages/public/HomePage.tsx

Реализуй полноценную Главную страницу конкурса студенческих проектов СочиГУ.

Цветовая схема уже задана в tailwind.config.js:
- primary-900: #1e3a8a (тёмно-синий, основной)
- primary-800, primary-700, primary-600 — оттенки синего
- accent-600: #059669, accent-500: #10b981 (зелёный, акцент)

Страница должна содержать следующие секции:

1. HERO-секция:
   - Большой заголовок: "Конкурс студенческих проектов СочиГУ 2026"
   - Подзаголовок: "Представь свой проект. Получи поддержку. Стань победителем."
   - Две кнопки: "Подать заявку" (ссылка /register, зелёный) и "Узнать подробнее" (ссылка /about, белый с рамкой)
   - Срок приёма заявок: до 30 октября
   - Фон: градиент от primary-900 до primary-700, текст белый

2. СТАТИСТИКА (карточки):
   - "2 номинации", "500+ участников", "Бесплатно", "Денежные призы"
   - Карточки белые с тенью, иконки в кружке primary-100

3. ЭТАПЫ конкурса:
   - 4 шага: Заочный отбор → Доработка проектов → Презентация → Награждение
   - Горизонтальный список с нумерацией, стрелками между ними

4. НОМИНАЦИИ:
   - Карточка 1: "Бизнес-проекты" — коммерциализация идей
   - Карточка 2: "Практико-ориентированные" — образовательные проекты
   - Кнопка "Все номинации" → /nominations

5. КЛЮЧЕВЫЕ ДАТЫ (таймлайн):
   - Приём заявок: с открытия до 30 октября
   - Доработка проектов: ноябрь
   - Презентация и защита: декабрь
   - Награждение: декабрь

6. CTA-блок внизу:
   - "Готов участвовать?" с кнопкой "Подать заявку" → /register
   - Синий фон

Требования:
- Полностью адаптивная вёрстка (320px — 1920px), используй Tailwind классы
- Используй только Link из react-router-dom для навигации
- Без внешних библиотек иконок — используй SVG inline или эмодзи
- Экспортируй как именованный экспорт: export function HomePage() {}
```

---

### Задача 1.3 — Страница "О конкурсе"

```
Реализуй страницу sochigu-contest/frontend/src/pages/public/AboutPage.tsx

Страница "О конкурсе" для конкурса студенческих проектов СочиГУ.

Содержимое:
1. Заголовок страницы с breadcrumb (Главная / О конкурсе)
2. Раздел "Миссия" — повышение компетенций в области проектной деятельности; формирование проектной системы в СочиГУ
3. Раздел "Цели" — маркированный список:
   - Развитие интереса к проектной деятельности
   - Профориентация студентов
   - Интеграция с проектным обучением
   - Развитие информационной платформы
   - Интеграция с инновационной инфраструктурой РФ
4. Раздел "Условия участия":
   - Участие бесплатное
   - Студенты и аспиранты СочиГУ всех курсов и форм обучения
   - Команда: 2–5 человек
   - Одна команда — один проект
5. Раздел "4 этапа конкурса" — детальное описание каждого этапа:
   - Заочный отбор: заполнение заявок, регистрация на сайте, отбор Экспертным советом
   - Доработка проектов: очно-заочная форма, консультации экспертов и менторов
   - Презентация: очная защита перед Экспертным советом
   - Награждение: дипломы 1-й, 2-й, 3-й степени и денежные премии
6. Блок "Организатор" — Стартап-студия СочиГУ
7. Кнопка "Подать заявку" в конце

Стиль:
- Структура: container mx-auto px-4, максимальная ширина max-w-4xl
- Цвета: primary-900 для заголовков, серый для текста
- Карточки этапов: нумерованные, с иконками
- Адаптивная вёрстка

Экспортируй как: export function AboutPage() {}
```

---

### Задача 1.4 — Страницы Номинации, Экспертный совет, Партнёры, Контакты

```
Реализуй четыре страницы в sochigu-contest/frontend/src/pages/public/:

1. NominationsPage.tsx — Номинации
   - Заголовок "Номинации конкурса"
   - Две карточки номинаций:
     * "1-я номинация: Бизнес-проекты" — коммерциализация, Pre-Seed/Seed стадии
     * "2-я номинация: Практико-ориентированные" — образовательные проекты
   - Для каждой: название, описание, критерии оценки (полнота профиля, качество презентации, актуальность)
   - Блок "Направления проектов": IT и цифровая экономика, Социальные проекты, Реальный сектор (транспорт, строительство, туризм, ТЭК), Политико-правовые, Культурные, Спортивные
   - Кнопка "Подать заявку" → /register

2. ExpertsPage.tsx — Экспертный совет
   - Заголовок "Экспертный совет"
   - Описание роли экспертов
   - Сетка 3 колонки (на мобиле 1): заглушки карточек экспертов с аватаром (серый кружок), именем "Эксперт", должностью "Должность"
   - Сделай 6 карточек-заглушек
   - Текст "Состав Экспертного совета утверждается приказом ректора"

3. PartnersPage.tsx — Партнёры
   - Заголовок "Наши партнёры"
   - Сетка логотипов-заглушек (серые прямоугольники с текстом "Партнёр")
   - Текст о партнёрстве

4. ContactsPage.tsx — Контакты
   - Заголовок "Контакты"
   - Карточка с данными:
     * Организация: ФГБОУ ВО «Сочинский государственный университет»
     * Подразделение: Стартап-студия СочиГУ
     * Сайт конкурса: https://PROJECT-Sochigu.sutr.ru
   - Форма обратной связи (только вёрстка, без отправки): Имя, Email, Сообщение, кнопка "Отправить"
   - Адаптивная вёрстка

Все компоненты: именованные экспорты, Tailwind, адаптив 320px–1920px.
```

---

### Задача 1.5 — Страницы Вход и Регистрация (только вёрстка)

```
Реализуй страницы авторизации в sochigu-contest/frontend/src/pages/auth/:

1. LoginPage.tsx — Вход в систему
   - Центрированная форма, максимальная ширина max-w-md
   - Логотип/название сверху
   - Поля: Email (type="email"), Пароль (type="password")
   - Кнопка "Войти" (полная ширина, синяя)
   - Ссылка "Нет аккаунта? Зарегистрироваться" → /register
   - Используй react-hook-form для управления формой
   - Состояния: loading (кнопка задисейблена + текст "Входим..."), error (красный alert под формой)
   - Данные пока не отправляй (заглушка onSubmit с console.log)

2. RegisterPage.tsx — Регистрация
   - Центрированная форма, max-w-lg
   - Заголовок "Регистрация участника"
   - Поля в двух колонках (на мобиле одна):
     * Фамилия (required), Имя (required), Отчество (optional)
     * Email (required, type="email"), Телефон, Пароль (required, min 8 символов)
     * Вуз, Факультет/кафедра, Курс (select: 1-6), Город
   - Чекбокс "Даю согласие на обработку персональных данных" (required)
   - Кнопка "Зарегистрироваться"
   - Ссылка "Уже есть аккаунт? Войти" → /login
   - Используй react-hook-form
   - Валидация: required поля, email format, password minLength 8
   - Показывай ошибки под каждым полем (text-red-500 text-xs)

Требования:
- Без логики API (только console.log в onSubmit)
- Красивый белый дизайн с тенями
- Адаптивность
- export function LoginPage() {} и export function RegisterPage() {}
```

---

## НЕДЕЛЯ 2 — Личный кабинет участника

### Задача 2.1 — Подключение авторизации к API

```
Подключи страницы логина и регистрации к API в sochigu-contest/frontend/

Уже готово (не трогай):
- src/api/client.ts — axios клиент с интерсепторами
- src/api/auth.ts — функции authApi.login() и authApi.register()
- src/store/auth.store.ts — Zustand store с user, accessToken, refreshToken

Задача:
1. В LoginPage.tsx замени заглушку onSubmit на реальный вызов:
   import { authApi } from '@/api/auth'
   В onSubmit: вызови authApi.login(data), при успехе navigate('/cabinet'), при ошибке покажи сообщение

2. В RegisterPage.tsx аналогично:
   В onSubmit: вызови authApi.register(data), при успехе navigate('/cabinet'), при ошибке покажи сообщение

3. Создай компонент src/components/ui/Spinner.tsx:
   Простой spinner — анимированный круг через Tailwind animate-spin
   export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {}

4. Создай компонент src/components/ui/Alert.tsx:
   Алерт с вариантами: 'error' | 'success' | 'info'
   Принимает: variant, children
   export function Alert({ variant, children }: AlertProps) {}

5. Обнови Header.tsx:
   Уже использует useAuthStore — убедись что кнопка "Выйти" вызывает authApi.logout()
   Импортируй authApi и замени просто logout() на async () => { await authApi.logout(); navigate('/') }

Не трогай файлы: api/client.ts, store/auth.store.ts, components/layout/PublicLayout.tsx
```

---

### Задача 2.2 — Личный кабинет: дашборд и страница заявки

```
Реализуй страницы личного кабинета в sochigu-contest/frontend/src/pages/cabinet/

1. CabinetDashboardPage.tsx — Обзор личного кабинета
   Импорты:
   - import { useAuthStore } from '@/store/auth.store'
   - import { useMyApplications } from '@/hooks/useApplications'
   - import { StatusBadge } from '@/components/shared/StatusBadge'
   - import { Link } from 'react-router-dom'

   Содержимое:
   - Приветствие: "Добро пожаловать, {user.firstName}!"
   - Блок "Мои данные" — карточка с полями: ФИО, Email, Вуз, Факультет, Курс, Город
   - Блок "Мои заявки":
     * Если заявок нет: текст "У вас ещё нет заявок" + кнопка "Подать заявку" → /cabinet/application/new
     * Если есть: список заявок с полями: Название проекта, Номинация, Статус (StatusBadge), дата подачи
     * Кнопка "Перейти к заявке" для каждой
   - Показывай Spinner пока loading=true

2. ApplicationPage.tsx — Страница управления заявкой
   Импорты: useMyApplications, StatusBadge, Link, applicationsApi

   Содержимое:
   - Если нет заявки: кнопка "Создать заявку" → /cabinet/application/new
   - Если заявка есть (берём первую):
     * Статус с цветным Badge
     * Данные: название, номинация, описание, команда, научрук
     * Список загруженных файлов с иконками
     * История изменений статуса (из app.logs)
     * Кнопки (условно по статусу):
       - status === 'draft': "Редактировать" → /cabinet/application/:id/edit, "Подать заявку" (вызов applicationsApi.submit)
       - status === 'draft': "Отозвать" (вызов applicationsApi.withdraw + confirm dialog)
   - Если adminComment: показывать его в жёлтом блоке "Комментарий администратора"
   - Spinner при загрузке

export function ApplicationPage() {} и export function CabinetDashboardPage() {}
```

---

### Задача 2.3 — Многошаговая форма заявки

```
Реализуй ApplicationFormPage.tsx в sochigu-contest/frontend/src/pages/cabinet/

Это многошаговая форма подачи заявки на конкурс (4 шага).

Импорты:
- import { useForm } from 'react-hook-form'
- import { useState } from 'react'
- import { useNavigate, useParams } from 'react-router-dom'
- import { applicationsApi } from '@/api/applications'
- import { nominationsApi } from '@/api/nominations'

Шаг 1 — Номинация:
- Заголовок "Шаг 1 из 4: Выбор номинации"
- Загружает список номинаций через nominationsApi.getAll()
- Отображает их как карточки-radio кнопки (кликабельные карточки, не обычные radio)
- При выборе карточка выделяется синей рамкой
- Поле nominationId (required)

Шаг 2 — Описание проекта и команда:
- Заголовок "Шаг 2 из 4: Описание проекта"
- Поле: Название проекта (required, maxLength 200)
- Поле: Описание проекта (textarea, required, minLength 100, maxLength 2000)
- Поле: Ключевые слова (input, через запятую, hint: "Введите через запятую")
- Секция "Состав команды" (добавить/удалить участников динамически):
  * Для каждого участника: Имя, Роль в проекте, Email (опционально)
  * Кнопка "+ Добавить участника"
- Секция "Научный руководитель":
  * ФИО, Должность/звание, Email (опционально)

Шаг 3 — Загрузка файлов:
- Заголовок "Шаг 3 из 4: Загрузка файлов"
- Область drag-and-drop (можно упростить до обычного input file)
- Два типа файлов:
  * "Файлы проекта" (PDF/DOC/DOCX/PPT/ZIP/RAR) — category: 'project_file'
  * "Сканы документов" (PDF/JPG/PNG) — category: 'document_scan'
- Показывать список загруженных файлов с названием и размером
- Файлы загружаются ПОСЛЕ создания заявки (applicationId нужен для upload)

Шаг 4 — Подтверждение:
- Заголовок "Шаг 4 из 4: Подтверждение"
- Сводка всех данных для проверки
- Чекбокс "Подтверждаю корректность данных"
- Кнопка "Сохранить черновик" — создаёт/обновляет заявку без submit
- Кнопка "Подать заявку" — создаёт заявку + submit

Навигация между шагами:
- Прогресс-бар сверху (4 шага, закрашивается по мере продвижения)
- Кнопки "Назад" и "Далее"
- Валидация текущего шага перед переходом

Логика:
- При редактировании (есть :id в params): загружает данные через applicationsApi.getById(id)
- При создании: новая форма
- После сохранения черновика → navigate('/cabinet/application')
- После подачи → navigate('/cabinet/application')

export function ApplicationFormPage() {}
```

---

## НЕДЕЛЯ 3 — Админ-панель

### Задача 3.1 — Таблица заявок с фильтрами

```
Реализуй страницу sochigu-contest/frontend/src/pages/admin/ApplicationsListPage.tsx

Это главная страница управления заявками в админ-панели.

Импорты:
- import { useState, useEffect } from 'react'
- import { Link } from 'react-router-dom'
- import { applicationsApi } from '@/api/applications'
- import { nominationsApi } from '@/api/nominations'
- import { StatusBadge } from '@/components/shared/StatusBadge'
- import { ApplicationStatus } from '@/types'

Компонент:
1. Панель фильтров (flex, wrap):
   - Select "Номинация" — загружает список через nominationsApi.getAll()
   - Select "Статус" — все варианты ApplicationStatus с русскими названиями
   - Input "Поиск по названию проекта"
   - Input "Вуз"
   - Кнопка "Сбросить фильтры"
   - Кнопка "Экспорт Excel" (пока просто кнопка, логику добавит Dev 3)

2. Таблица заявок:
   Колонки: # | Название проекта | Участник | Вуз | Номинация | Статус | Дата подачи | Действия
   - Каждая строка кликабельная → /admin/applications/:id
   - Кнопка "Просмотр" в колонке Действия → Link to={`/admin/applications/${app.id}`}
   - Пустое состояние: "Заявки не найдены"
   - Скелетон во время загрузки (5 строк с серыми прямоугольниками)

3. Пагинация:
   - Внизу таблицы: "Показано X из Y" + кнопки страниц (< 1 2 3 >)
   - Лимит: 20 заявок на страницу

4. Логика:
   - При изменении любого фильтра или страницы → вызов applicationsApi.getAll(params)
   - Дебаунс для поиска 500ms

Создай также вспомогательный компонент src/components/ui/Skeleton.tsx:
- Принимает className
- Рендерит div с animate-pulse и bg-gray-200

export function ApplicationsListPage() {}
```

---

### Задача 3.2 — Детальная страница заявки (Админ)

```
Реализуй страницу sochigu-contest/frontend/src/pages/admin/ApplicationDetailPage.tsx

Импорты:
- import { useState, useEffect } from 'react'
- import { useParams, useNavigate } from 'react-router-dom'
- import { applicationsApi } from '@/api/applications'
- import { StatusBadge } from '@/components/shared/StatusBadge'
- import { APPLICATION_STATUS_LABELS, ApplicationStatus } from '@/types'

Содержимое страницы:

1. Шапка:
   - Кнопка "← Назад к заявкам"
   - Название проекта как h1
   - StatusBadge со статусом

2. Блок "Смена статуса" (справа или сверху):
   - Select со всеми статусами
   - Textarea "Комментарий/причина" (required при rejection)
   - Кнопка "Сохранить статус" → вызывает applicationsApi.updateStatus(id, { status, comment })
   - После успеха: перезагружает данные + toast-нотификация

3. Основные данные (сетка 2 колонки):
   - Левая: Участник (ФИО, Email, Вуз, Факультет, Курс, Город, Телефон)
   - Правая: Проект (Номинация, Дата подачи, Черновик/Подан)

4. Описание проекта (полный текст)

5. Ключевые слова (pill-теги)

6. Состав команды (таблица: Имя, Роль, Email)

7. Научный руководитель (карточка)

8. Файлы проекта:
   - Список файлов с иконками
   - Кнопка "Скачать" для каждого → вызывает applicationsApi.downloadFile(fileId)
   - Показывать размер файла в читаемом формате (KB/MB)

9. История изменений статуса:
   - Таймлайн снизу вверх: дата, кто изменил, с какого на какой статус, комментарий

Создай toast-нотификацию:
src/components/ui/Toast.tsx — простой компонент для показа сообщений в углу экрана (top-right), 3 секунды, варианты success/error

export function ApplicationDetailPage() {}
```

---

### Задача 3.3 — Страницы пользователей и дашборд администратора

```
Реализуй две страницы в sochigu-contest/frontend/src/pages/admin/

1. UsersPage.tsx — Список пользователей

   Импорт: import { apiClient } from '@/api/client'

   Содержимое:
   - Заголовок "Пользователи системы"
   - Фильтры: Select роли (participant/expert/moderator/admin), поиск по email
   - Таблица: ФИО | Email | Роль | Вуз | Дата регистрации | Статус (активен/нет)
   - Загружает данные через GET /api/users?role=...&search=...
   - Пустое состояние и скелетон

   export function UsersPage() {}

2. AdminDashboardPage.tsx — Главный дашборд администратора

   Импорты:
   - import { useEffect, useState } from 'react'
   - import { analyticsApi } from '@/api/analytics'
   - import { Link } from 'react-router-dom'

   Содержимое:
   - Заголовок "Панель управления"
   - 3 KPI-карточки (сверху): "Всего заявок", "Участников", "Вузов"
   - Данные загружаются через analyticsApi.getSummary()
   - Показывать Spinner пока грузится
   - Секция "Быстрые ссылки":
     * Карточки: Заявки → /admin/applications, Пользователи → /admin/users, Аналитика → /admin/analytics
   - Секция "Последние заявки" (5 штук):
     * Загружает через applicationsApi.getAll({ limit: 5 })
     * Таблица с колонками: Название, Участник, Статус, Дата
     * Ссылка "Все заявки" → /admin/applications

   export function AdminDashboardPage() {}
```

---

## НЕДЕЛЯ 4 — Дашборд аналитики

### Задача 4.1 — Страница аналитики с графиками

```
Реализуй страницу sochigu-contest/frontend/src/pages/admin/AnalyticsPage.tsx

Зависимость уже установлена: recharts (в package.json)

Импорты:
- import { useEffect, useState } from 'react'
- import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from 'recharts'
- import { analyticsApi } from '@/api/analytics'

Секции страницы:

1. KPI-карточки (уже на AdminDashboardPage, здесь тоже дублируй):
   - "Всего заявок" | "Участников" | "Вузов"
   - Стиль: белые карточки с тенью, большое число, подпись

2. Круговая диаграмма "Заявки по номинациям":
   - PieChart из recharts
   - Данные: analyticsApi.getByNomination() → [{nomination, count}]
   - Цвета: первая номинация primary-700, вторая accent-600 + ещё 3-4 цвета
   - Легенда снизу
   - Высота 300px

3. Линейный график "Динамика подачи заявок":
   - LineChart
   - Данные: analyticsApi.getTimeline() → [{date, count}]
   - Ось X: дата (форматировать через new Date(date).toLocaleDateString('ru-RU'))
   - Ось Y: количество
   - Цвет линии: primary-600
   - Высота 300px

4. Bar-chart "Топ-10 вузов":
   - BarChart горизонтальный (layout="vertical")
   - Данные: analyticsApi.getTopUniversities() → [{university, count}]
   - Цвет баров: accent-600
   - Высота: 400px

5. Таблица "География участников":
   - Данные: analyticsApi.getGeography() → [{city, count}]
   - Колонки: Город | Количество участников
   - Отсортировано по убыванию

6. Кнопка "Сгенерировать PDF-отчёт":
   - onClick: window.print()
   - Добавь print-стили: @media print { скрыть sidebar, показывать только контент }

Все графики в ResponsiveContainer width="100%"
Показывай Spinner пока данные загружаются.

export function AnalyticsPage() {}
```

---

## НЕДЕЛЯ 5 — Полировка

### Задача 5.1 — UI-компоненты, скелетоны и адаптивность

```
Полировка UI в sochigu-contest/frontend/

1. Создай глобальный компонент src/components/ui/PageLoader.tsx:
   - Полноэкранный лоадер с Spinner в центре
   - Используется при первичной загрузке приложения

2. Обнови App.tsx:
   - Добавь Suspense с fallback={<PageLoader />} вокруг Routes

3. Добавь скелетоны в таблицы:
   - ApplicationsListPage: при loading показывай 10 строк с Skeleton в каждой ячейке
   - AdminDashboardPage: при loading KPI-карточки заменяй на Skeleton

4. Проверь адаптивность ВСЕХ страниц при следующих breakpoints:
   - 320px (мобиль маленький)
   - 375px (iPhone SE)
   - 768px (планшет)
   - 1024px (ноутбук)
   - 1440px (десктоп)

   Исправь любые переполнения, обрезанные тексты, сломанные сетки.
   В таблицах на мобиле: добавь horizontal scroll (overflow-x-auto)

5. Добавь 404 страницу:
   src/pages/NotFoundPage.tsx — "Страница не найдена", кнопка "На главную"
   В App.tsx добавь <Route path="*" element={<NotFoundPage />} />

6. Добавь обработку ошибок в формы:
   - Во всех формах при ошибке API показывай Alert компонент с текстом ошибки
   - Если сервер вернул { message: 'Email уже зарегистрирован' } — показывай именно этот текст

7. Протестируй весь флоу:
   - Регистрация нового пользователя
   - Вход
   - Создание заявки (черновик)
   - Подача заявки
   - Просмотр статуса
```

---

### Задача 5.2 — Финальные правки и кросс-браузерное тестирование

```
Финальная проверка sochigu-contest/frontend/

1. Проверь что все страницы перечисленные в App.tsx существуют и не выдают ошибок:
   - GET / → HomePage
   - GET /about → AboutPage
   - GET /nominations → NominationsPage
   - GET /experts → ExpertsPage
   - GET /partners → PartnersPage
   - GET /news → NewsPage
   - GET /documents → DocumentsPage
   - GET /winners → WinnersPage
   - GET /contacts → ContactsPage
   - GET /login → LoginPage
   - GET /register → RegisterPage
   - GET /cabinet → CabinetDashboardPage (требует авторизацию)
   - GET /admin → AdminDashboardPage (требует admin/moderator)

2. Исправь TypeScript ошибки:
   Запусти npm run build и исправь все TypeScript ошибки до успешной сборки.

3. Проверь что в Header корректно работает:
   - Для неавторизованных: кнопки Войти и Участвовать
   - Для участника: кнопка Личный кабинет → /cabinet
   - Для admin/moderator: кнопка Личный кабинет → /admin
   - Мобильное меню открывается и закрывается

4. Добавь title для каждой страницы через useEffect:
   useEffect(() => { document.title = 'Главная — Конкурс СочиГУ' }, [])
   (разные заголовки для каждой страницы)

5. Убедись что build проходит без ошибок: npm run build
```

---

## ДОПОЛНИТЕЛЬНО (если осталось время)

### Задача — Страница новостей и победителей (заглушки)

```
Создай страницы в sochigu-contest/frontend/src/pages/public/ которых ещё нет:

1. NewsPage.tsx — Лента новостей
   - Импорт: newsApi из @/api/news
   - Сетка карточек новостей (3 колонки на десктопе)
   - Каждая карточка: обложка (если нет — серый placeholder), заголовок, дата, краткое описание
   - Пагинация (10 новостей на страницу)
   - Загружает: newsApi.getPublished(page)
   - Скелетоны при загрузке (6 карточек)
   - export function NewsPage() {}

2. NewsDetailPage.tsx — Детальная страница новости
   - Загружает по slug: useParams → newsApi.getBySlug(slug)
   - Заголовок, дата, обложка, полный контент
   - Кнопка "← Все новости"
   - export function NewsDetailPage() {}

3. DocumentsPage.tsx — Документы для скачивания
   - Загружает: documentsApi.getAll()
   - Список/таблица: Название, Дата обновления, Размер, кнопка "Скачать"
   - Размер файла форматировать: bytes → KB/MB
   - Группировка по category (если есть)
   - export function DocumentsPage() {}

4. WinnersPage.tsx — Галерея победителей
   - ФИЛЬТРЫ: Select года (winnersApi.getYears()), Select номинации (nominationsApi.getAll())
   - При изменении фильтра перезагружать список
   - Сетка карточек: место (🥇🥈🥉), название проекта, команда, номинация, вуз
   - export function WinnersPage() {}
```
