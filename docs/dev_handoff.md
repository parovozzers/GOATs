# Dev Handoff Log
## Проект: Конкурс студенческих проектов СочиГУ
## Стек: NestJS + React 18 + Vite + TypeScript + Tailwind + Recharts + Zustand

---

Date: 2026-03-07 / 2026-03-08
Developer: DEV1 (MSSAS — Matvei)

PR / Change:
PR #7 — feature/week3-cms-management (merged 2026-03-08)

What was implemented:
- NewsManagePage: полный CRUD новостей, Modal-форма, автогенерация slug, toggle публикации, react-hook-form
- DocumentsManagePage: загрузка файлов через Multer (POST /documents/upload), CRUD документов
- WinnersManagePage: фильтр по году, CRUD победителей, выбор номинации
- NominationsManagePage: CRUD номинаций с предупреждением при удалении
- ExpertsPage (admin): назначение/снятие роли эксперта через поиск по email
- Backend: PATCH /users/:id/role (Admin only), POST /documents/upload (Multer diskStorage)
- Modal.tsx: переиспользуемый компонент модалки
- api/users.ts: usersApi.updateRole()
- api/documents.ts: documentsApi.create(FormData)

Files changed:
- sochigu-contest/backend/src/documents/documents.controller.ts
- sochigu-contest/backend/src/documents/documents.service.ts
- sochigu-contest/backend/src/main.ts (mkdirSync ./uploads/docs при старте)
- sochigu-contest/backend/src/users/dto/update-role.dto.ts (новый UpdateRoleDto)
- sochigu-contest/backend/src/users/users.controller.ts
- sochigu-contest/frontend/src/App.tsx
- sochigu-contest/frontend/src/api/documents.ts
- sochigu-contest/frontend/src/api/users.ts
- sochigu-contest/frontend/src/components/layout/AdminLayout.tsx
- sochigu-contest/frontend/src/components/ui/Modal.tsx
- sochigu-contest/frontend/src/index.css
- sochigu-contest/frontend/src/pages/admin/ExpertsPage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/DocumentsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/NewsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/NominationsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/WinnersManagePage.tsx

Bug fixes:
- documents.controller.ts: uuid-имена файлов + latin1→utf8 конвертация имён
- users.controller.ts: UpdateRoleDto вместо any для типобезопасности
- documents.ts: типизирован update(), downloadUrl через готовый endpoint
- NewsManagePage: publishedAt проставляется только при публикации; editing в deps useEffect
- ExpertsPage: guard user.role !== 'expert' перед revoke
- DocumentsManagePage: импорт formatSize из @/utils/format
- WinnersManagePage: load в useCallback([yearFilter])
- index.css: убраны inline-стили, везде className="input"

Important context for the next developer:
- Загруженные файлы хранятся в ./uploads/docs/ (создаётся при старте)
- Роли: participant | expert | moderator | admin — менять только через PATCH /users/:id/role
- Modal.tsx — глобальный компонент, используй его для новых модалок
- CMS-страницы находятся в /admin/cms/* (отдельный подраздел)

Next steps / suggested work:
- Неделя 4: AnalyticsPage — PieChart, LineChart, BarChart (recharts уже в package.json)
- Неделя 5: Полировка UI — скелетоны, 404, PageLoader, document.title

Known issues / technical debt:
- ExpertsPage: поиск по email — нет дебаунса, при быстром наборе много запросов

---

Date: 2026-03-08
Developer: DEV2 (parovozzers)

PR / Change:
commit 681cfad — feat: Неделя 4-5 DEV2 — аналитика, полировка UI, document.title
(branch: feature/week4-5-analytics-polish-dev2, ещё не влит в main)

What was implemented:
- AnalyticsPage: PieChart (заявки по номинациям), LineChart (динамика), BarChart horizontal (топ вузов), таблица географии
- AnalyticsPage: кастомное облако ключевых слов, кнопка PDF-печати (window.print())
- analytics.service.ts: метод getKeywords() — SQL UNNEST по массиву ключевых слов
- PageLoader.tsx: полноэкранный спиннер для Suspense
- NotFoundPage.tsx: страница 404 с кнопкой "На главную"
- App.tsx: Suspense + PageLoader, catch-all route <Route path="*" → NotFoundPage />
- ApplicationsListPage: 10 строк скелетона при загрузке вместо одного спиннера
- AdminDashboardPage: скелетоны KPI-карточек вместо спиннера
- LoginPage / RegisterPage: защита от рендера объектов в {error} (toString)
- vite.config.ts: manualChunks — react-vendor, charts (оптимизация бандла)
- index.css: @import Google Fonts перенесён перед @tailwind директивами (исправляет варнинг PostCSS)
- document.title на всех страницах (10+ страниц): публичные, кабинет, вся админка

Files changed:
- sochigu-contest/backend/src/analytics/analytics.service.ts
- sochigu-contest/frontend/src/App.tsx
- sochigu-contest/frontend/src/components/ui/PageLoader.tsx
- sochigu-contest/frontend/src/index.css
- sochigu-contest/frontend/src/pages/NotFoundPage.tsx
- sochigu-contest/frontend/src/pages/admin/AdminDashboardPage.tsx
- sochigu-contest/frontend/src/pages/admin/AnalyticsPage.tsx
- sochigu-contest/frontend/src/pages/admin/ApplicationDetailPage.tsx
- sochigu-contest/frontend/src/pages/admin/ApplicationsListPage.tsx
- sochigu-contest/frontend/src/pages/admin/ExpertsPage.tsx
- sochigu-contest/frontend/src/pages/admin/UsersPage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/DocumentsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/NewsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/NominationsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/WinnersManagePage.tsx
- sochigu-contest/frontend/src/pages/auth/LoginPage.tsx
- sochigu-contest/frontend/src/pages/auth/RegisterPage.tsx
- sochigu-contest/frontend/src/pages/cabinet/ApplicationFormPage.tsx
- sochigu-contest/frontend/src/pages/cabinet/CabinetDashboardPage.tsx
- sochigu-contest/frontend/src/pages/public/AboutPage.tsx
- sochigu-contest/frontend/src/pages/public/ContactsPage.tsx
- sochigu-contest/frontend/src/pages/public/ExpertsPage.tsx
- sochigu-contest/frontend/src/pages/public/HomePage.tsx
- sochigu-contest/frontend/src/pages/public/NominationsPage.tsx
- sochigu-contest/frontend/src/pages/public/PartnersPage.tsx
- sochigu-contest/frontend/vite.config.ts

Bug fixes:
- LoginPage/RegisterPage: объект ошибки больше не рендерится напрямую в JSX (React Objects as children)
- index.css: PostCSS-варнинг о порядке @import устранён

Important context for the next developer:
- Ветка feature/week4-5-analytics-polish-dev2 ЕЩЁ НЕ ВЛИТА В MAIN — нужен PR и code review
- AnalyticsPage требует endpoint GET /analytics/keywords (уже реализован в analytics.service.ts)
- manualChunks в vite.config.ts — react-vendor и charts разделены, не убирать без причины
- Все публичные страницы и страницы кабинета теперь задают document.title

Next steps / suggested work:
- Создать PR из feature/week4-5-analytics-polish-dev2 в main и пройти code review
- Проверить что npm run build проходит без ошибок после merge
- Финальное тестирование флоу: регистрация → заявка → смена статуса → аналитика
- При необходимости: добавить экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)

Known issues / technical debt:
- ExpertsPage: нет дебаунса на поиск по email (унаследовано от DEV1)
- AnalyticsPage: облако ключевых слов — простая реализация, без весов/размеров
- Форма обратной связи на ContactsPage — заглушка, без реальной отправки

---

Date: 2026-03-09
Developer: DEV2 (parovozzers)

PR / Change:
fix: исправление 8 замечаний code review (analytics, lazy loading, types)

What was implemented:
- analytics.service.ts: getKeywords() стал async, добавлена конвертация count в Number
- analytics.service.ts: getKeywords() — TRIM(keyword) фильтрует пробельные ключевые слова
- analytics.service.ts: getGeography() — захардкоженный 'participant' заменён на Role.PARTICIPANT (параметр)
- types/index.ts: добавлены типы AnalyticsByNomination, AnalyticsTimeline, AnalyticsTopUniversity, AnalyticsGeography, AnalyticsKeyword
- AnalyticsPage.tsx: useState<any[]> заменены на строго типизированные массивы
- AnalyticsPage.tsx: Promise.all получил .catch(() => setError(...)) — отображает ошибку вместо пустых графиков
- App.tsx: AnalyticsPage переведён на React.lazy() — Suspense теперь работает реально
- main.ts: console.log заменён на NestJS Logger

Files changed:
- sochigu-contest/backend/src/analytics/analytics.service.ts
- sochigu-contest/backend/src/main.ts
- sochigu-contest/frontend/src/App.tsx
- sochigu-contest/frontend/src/pages/admin/AnalyticsPage.tsx
- sochigu-contest/frontend/src/types/index.ts

Bug fixes:
- count из PostgreSQL приходил строкой — теперь явно конвертируется в Number везде
- SQL параметр роли был захардкожен строкой, теперь использует Role enum
- Пробельные ключевые слова ' ' теперь фильтруются через TRIM()
- При падении любого из 6 API-запросов пользователь видит сообщение об ошибке

Important context for the next developer:
- AnalyticsPage загружается лениво (React.lazy) — chunk выделяется в отдельный файл
- Кнопка печати называется "Распечатать / Сохранить PDF" — это браузерный window.print()

Next steps / suggested work:
- Создать PR из feature/week4-5-analytics-polish-dev2 в main
- Реализовать экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)

---

Date: 2026-03-09
Developer: DEV2 (parovozzers)

PR / Change:
fix: доп. правки после code review — analytics bugfix, ExpertsPage UX, hero-фото

What was implemented:
- analytics.service.ts: getSummary().totalUniversities — добавлен фильтр по Role.PARTICIPANT (раньше считались вузы всех ролей)
- ExpertsPage: живой поиск с дебаунсом 400ms вместо точного совпадения по email; список результатов с кликом для выбора; фильтрация уже-экспертов из результатов
- HomePage: hero-секция с фоновым фото first_page.png + полупрозрачный gradient overlay (opacity управляется в строке 13)
- src/vite-env.d.ts: добавлены type declarations для *.png / *.jpg / *.svg (убирает TS2307)

Files changed:
- sochigu-contest/backend/src/analytics/analytics.service.ts
- sochigu-contest/frontend/src/pages/admin/ExpertsPage.tsx
- sochigu-contest/frontend/src/pages/public/HomePage.tsx
- sochigu-contest/frontend/src/vite-env.d.ts
- docs/dev_handoff.md

Bug fixes:
- totalUniversities считал вузы экспертов/модераторов — теперь только participants
- ExpertsPage требовал точный email до символа — теперь достаточно частичного совпадения

Important context for the next developer:
- Фото hero-секции: sochigu-contest/frontend/first_page.png — НЕ в public/, импортируется как модуль
- Прозрачность overlay регулируется классом opacity-* в HomePage.tsx:13
- Чтобы убрать фото: инструкция в комментариях прямо в HomePage.tsx (строки 11–15)
- vite-env.d.ts нужен для подавления TS-ошибок при импорте изображений

Next steps / suggested work:
- Влить PR #8 в main после code review
- Реализовать экспорт Excel в ApplicationsListPage

---

Date: 2026-03-15
Developer: DEV2 (parovozzers)

PR / Change:
feature/week5-winners-photo-hero-polish → dev

What was implemented:
- WinnersManagePage: загрузка фото через файловый input (кнопка + превью) в дополнение к полю URL
- Backend: POST /winners/upload-photo — загрузка изображений через Multer memoryStorage; поддержка JPEG, PNG, GIF, WebP, HEIC/HEIF
- Backend: HEIC/HEIF конвертируется в JPEG на сервере через пакет heic-convert v1 (CommonJS)
- Backend: GET /winners/photo/:filename — раздача сохранённых фото
- api/winners.ts: метод uploadPhoto(file) через FormData с Content-Type: undefined (обход axios-дефолта)
- AllExceptionsFilter: расширен — теперь логирует 4xx как warn (раньше только 5xx как error)
- backend/src/types/heic-convert.d.ts: type declaration для heic-convert (CommonJS модуль без типов)
- HomePage: hero-секция переработана — маскот absolute внутри container (не в потоке текста), h-[720px], -top-10
- HomePage: px-4 перенесён с section на container — выравнивание левого края совпадает со stat-cards
- HomePage: бейдж и кнопки — явный self-start; текстовый блок — регулируемый pl-* отступ вправо
- HomePage: секция получила md:h-[520px] для консистентной высоты на всех экранах

Files changed:
- sochigu-contest/backend/package.json (heic-convert зависимость)
- sochigu-contest/backend/src/common/filters/http-exception.filter.ts
- sochigu-contest/backend/src/winners/winners.controller.ts
- sochigu-contest/backend/src/winners/winners.module.ts
- sochigu-contest/backend/src/types/heic-convert.d.ts (новый)
- sochigu-contest/frontend/mascot-removebg-preview.png (новый — маскот с прозрачным фоном)
- sochigu-contest/frontend/src/api/winners.ts
- sochigu-contest/frontend/src/pages/admin/cms/WinnersManagePage.tsx
- sochigu-contest/frontend/src/pages/public/HomePage.tsx

Bug fixes:
- 400 Bad Request при загрузке фото: убран fileFilter из Multer (NestJS не обрабатывает multer-ошибки стандартно), валидация перенесена в тело хендлера
- Windows отправляет HEIC как application/octet-stream — добавлена fallback-проверка по расширению файла
- heic-convert v2 (ESM) несовместим с NestJS CommonJS — откат к v1, используется require()
- Маскот прыгал по горизонтали: теперь absolute внутри container (right-0 = правый край контейнера, не viewport)
- Левый край hero-контента не совпадал с stat-cards: перенос px-4 с section на container

Important context for the next developer:
- heic-convert ОБЯЗАТЕЛЬНО v1 (CommonJS). v2 — ESM и не работает с NestJS. Не обновлять.
- Фото победителей хранятся в ./uploads/winners/ (создаётся автоматически)
- Маскот: sochigu-contest/frontend/mascot-removebg-preview.png — PNG с прозрачным фоном
- Размер маскота регулируется через h-[720px] в HomePage.tsx:13, отступ сверху — -top-10, справа — right-0
- Размер секции hero — md:h-[520px] в HomePage.tsx:10 — меняй синхронно с маскотом
- Текстовый блок (h1+p) имеет отступ вправо через pl-* на обёртке (HomePage.tsx:22)

Next steps / suggested work:
- Реализовать экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)
- Финальное тестирование флоу: регистрация → заявка → смена статуса → аналитика
- Проверить npm run build без ошибок перед merge в main

Known issues / technical debt:
- ExpertsPage: нет дебаунса на поиск по email (унаследовано)
- AnalyticsPage: облако ключевых слов без весов/размеров
- Форма обратной связи на ContactsPage — заглушка

---
