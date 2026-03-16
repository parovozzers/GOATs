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

Date: 2026-03-15
Developer: DEV2 (parovozzers)

PR / Change:
feature/week5-winners-photo-hero-polish (продолжение сессии)

What was implemented:
- Security audit: исправлены все 8 замечаний code review + 5 дополнительно найденных при аудите
- NewsManagePage: загрузка обложки через файловый input (кнопка + превью + URL fallback), аналогично winners
- Backend: POST /news/upload-photo + GET /news/photo/:filename — те же правила что у winners (HEIC, 5MB, path traversal)
- ExpertsPage (admin): таблица теперь показывает фото, должность, галочку видимости; кнопка «Профиль» открывает модал с загрузкой фото, должностью, биографией, чекбоксом «Показывать на сайте»
- ExpertsPage (public): заглушка заменена на реальные данные из GET /users/experts
- Users entity: добавлены 4 колонки — avatarUrl, position, bio, isExpertVisible (все nullable/default false)
- Backend: GET /users/experts — публичный эндпоинт без авторизации, возвращает ТОЛЬКО публичные поля (id, firstName, lastName, middleName, avatarUrl, position, bio)
- Backend: PATCH /users/:id/expert-profile (admin only), POST /users/upload-photo + GET /users/photo/:filename
- ApplicationFormPage: кнопка «Отменить» (красная, справа сверху), ведёт на /cabinet
- WinnersManagePage: валидация размера файла на клиенте (>5MB → ошибка под полем, запрос не уходит)
- Цветовая схема: primary → тёмно-синий лого (#0D1B6B), accent → голубой лого (#4DAED5), destructive → коралловый розовый

Files changed (backend):
- sochigu-contest/backend/src/users/entities/user.entity.ts
- sochigu-contest/backend/src/users/users.controller.ts
- sochigu-contest/backend/src/users/users.service.ts
- sochigu-contest/backend/src/news/news.controller.ts
- sochigu-contest/backend/src/files/files.controller.ts
- sochigu-contest/backend/src/files/files.module.ts
- sochigu-contest/backend/src/files/files.service.ts
- sochigu-contest/backend/src/documents/documents.controller.ts
- sochigu-contest/backend/src/winners/winners.controller.ts
- sochigu-contest/backend/src/winners/winners.module.ts

Files changed (frontend):
- sochigu-contest/frontend/src/types/index.ts
- sochigu-contest/frontend/src/api/users.ts
- sochigu-contest/frontend/src/api/news.ts
- sochigu-contest/frontend/src/api/winners.ts
- sochigu-contest/frontend/src/index.css
- sochigu-contest/frontend/tailwind.config.js
- sochigu-contest/frontend/src/pages/admin/ExpertsPage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/NewsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/WinnersManagePage.tsx
- sochigu-contest/frontend/src/pages/public/ExpertsPage.tsx
- sochigu-contest/frontend/src/pages/cabinet/ApplicationFormPage.tsx

Security fixes:
- Path traversal: winners/photo, news/photo, users/photo, documents/download, files/download — все защищены safePath.startsWith(DIR + sep)
- fs.writeFileSync → await fs.promises.writeFile во всех контроллерах
- fs.existsSync + fs.unlinkSync → await fs.promises.unlink (files.service.ts)
- fs.mkdirSync на уровне модуля → onModuleInit() в winners, news, documents, users контроллерах
- resolve('./') → resolve(__dirname, '../..') во всех контроллерах и files.module.ts
- require('heic-convert') вынесен на уровень модуля (один раз при старте)
- Дублированный import @nestjs/common в files.module.ts объединён
- Лишний MulterModule.register() в winners.module.ts удалён

Important context for the next developer:
- GET /users/experts — публичный (без JwtAuthGuard). Остальные /users/* — требуют авторизации. Не переставлять порядок guard'ов.
- Эксперты на публичной странице = users с role='expert' И isExpertVisible=true
- heic-convert ОБЯЗАТЕЛЬНО v1 (CommonJS). v2 — ESM, не работает с NestJS. Не обновлять.
- Цвета сайта в index.css: --primary (229 78% 27%), --primary-mid (225 70% 42%), --accent (195 90% 65%), --destructive (0 85% 70%)
- Фото хранятся в ./uploads/{winners|news|experts}/ — создаются автоматически в onModuleInit()
- Кнопка «Отменить» в ApplicationFormPage ведёт на /cabinet (не /cabinet/application)

Next steps / suggested work:
- Реализовать экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)
- Финальное тестирование флоу: регистрация → заявка → смена статуса → аналитика
- Проверить npm run build без ошибок перед merge в main
- Добавить сортировку экспертов по полю order (опционально)

Known issues / technical debt:
- AnalyticsPage: облако ключевых слов без весов/размеров
- Форма обратной связи на ContactsPage — заглушка

---

Date: 2026-03-15
Developer: DEV2 (parovozzers)

PR / Change:
feature/week5-winners-photo-hero-polish (сессия 2 — фикс анимаций при навигации)

What was implemented:
- ScrollToTop.tsx: новый компонент в shared/, использует useLayoutEffect(() => { window.scrollTo(0, 0); }, []) — должен быть ПЕРВЫМ дочерним элементом внутри keyed motion.div
- PublicLayout.tsx: ScrollToTop добавлен как первый child в motion.div (до <Outlet />); key={pathname} для корректной смены ключа AnimatePresence
- CabinetLayout.tsx: то же самое — ScrollToTop первым child в motion.div (до <Outlet />); убраны useState/useRef renderedPath — вернулись к простому key={location.pathname}
- App.tsx: убран импорт и рендер ScrollToTop (теперь обрабатывается внутри layouts)

Files changed:
- sochigu-contest/frontend/src/components/shared/ScrollToTop.tsx (новый)
- sochigu-contest/frontend/src/components/layout/PublicLayout.tsx
- sochigu-contest/frontend/src/components/layout/CabinetLayout.tsx
- sochigu-contest/frontend/src/App.tsx

Bug fixes:
- whileInView-анимации не срабатывали на нижней части новой страницы при переходе с прокрученной страницы: IntersectionObserver регистрировался при старом scrollY, элементы в зоне видимости помечались intersecting → once: true срабатывал навсегда → анимации застывали в состоянии show
- Scroll не сбрасывался при навигации: onExitComplete(() => scrollTo(0,0)) не работает — Framer Motion рендерит новый контент ДО вызова onExitComplete (setRenderedChildren вызывается на строке перед onExitComplete в исходниках AnimatePresence)

Important context for the next developer:
- Корень фикса: React useLayoutEffect выполняется depth-first по дереву. Первый sibling (ScrollToTop) отрабатывает раньше, чем глубокие children второго sibling (Outlet). Framer Motion регистрирует IntersectionObserver через useIsomorphicLayoutEffect (= useLayoutEffect в браузере) — он запускается ПОСЛЕ scroll=0 из ScrollToTop. Поэтому IO смотрит на координаты уже от 0, а не от старого scrollY.
- ScrollToTop ОБЯЗАН быть первым child внутри keyed motion.div — иначе эффект не гарантирован.
- whileInView с viewport={{ once: true }} на публичных страницах — оставлять, работает корректно с этим фиксом.
- Не добавлять onExitComplete для scroll — это НЕ работает с AnimatePresence mode="wait" (новая страница монтируется до коллбэка).

Next steps / suggested work:
- Реализовать экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)
- Финальное тестирование флоу: регистрация → заявка → смена статуса → аналитика
- Проверить npm run build без ошибок перед merge в main

Known issues / technical debt:
- AnalyticsPage: облако ключевых слов без весов/размеров
- Форма обратной связи на ContactsPage — заглушка

---

Date: 2026-03-15
Developer: DEV2 (parovozzers)

PR / Change:
feature/week5-winners-photo-hero-polish (сессия 3 — UX-полировка, роли, модалка авторизации)

What was implemented:

[BackToTopButton]
- BackToTopButton.tsx: новый shared-компонент, кнопка «↑» появляется при scrollY > 300px
- Умная смена цвета: document.elementsFromPoint() определяет цвет фона под кнопкой в реальном времени; вычисляется luminance (0.299R+0.587G+0.114B)/255; на тёмном фоне — белый круг + синяя стрелка, на светлом — синий круг + белая стрелка
- Поддержка gradient-фонов: дополнительно проверяется backgroundImage (backgroundColor у gradient-элементов = transparent)
- Добавлен во все три layout: PublicLayout, CabinetLayout, AdminLayout

[AuthModal — модальная авторизация]
- ui.store.ts: новый Zustand-стор (authModal: 'login'|'register'|null, openAuthModal, closeAuthModal)
- AuthModal.tsx: модальное окно с вкладками Войти/Регистрация поверх текущей страницы
  - Backdrop с blur, закрытие по клику на фон и по Escape
  - Блокировка прокрутки body при открытии
  - LoginForm и RegisterForm вынесены как внутренние компоненты со своей логикой
  - После успешного входа/регистрации — автоматический редирект + закрытие модалки
- Header.tsx: кнопки «Войти» и «Участвовать» (десктоп + мобильное меню) открывают модалку вместо перехода на страницу
- HomePage.tsx: обе кнопки «Подать заявку» (hero + CTA) открывают модалку регистрации; если пользователь уже залогинен — переход в /cabinet
- PublicLayout.tsx: <AuthModal /> добавлен один раз (не пересоздаётся при навигации)
- Страницы /login и /register остаются доступны по прямой ссылке

[Поля ВУЗ и Город — обязательные]
- RegisterPage.tsx и AuthModal.tsx: поля «ВУЗ» и «Город» стали обязательными (required + сообщение об ошибке)

[Роль эксперта — разграничение доступа]
- AccessDenied.tsx: новый shared-компонент — заглушка «Нет доступа» с иконкой ShieldOff
- RoleGuard.tsx: новый shared-компонент — обёртка, принимает roles[] и опциональный redirectTo; рендерит children или AccessDenied/Navigate
- App.tsx: все admin-страницы, недоступные эксперту, обёрнуты в RoleGuard; /admin для эксперта → redirectTo="/admin/applications"
- AdminLayout.tsx: sidebarLinks получили поле roles[]; для пользователя без доступа к ссылке — opacity-30 + cursor-not-allowed + tooltip «Нет доступа» (вместо Link рендерится <span>)
- LoginPage.tsx + AuthModal.tsx: эксперт после логина → /admin/applications (не /cabinet и не /admin)
- Доступно эксперту: /admin/applications, /admin/applications/:id, /admin/cms/winners
- Всё остальное в админке — RoleGuard показывает AccessDenied

[Фикс кнопки «Повторить» на страницах с ошибкой загрузки]
- NewsPage: setPage(1) при page===1 не перезапускал useEffect (React bail-out при неизменном state) → заменено на retryKey-счётчик в зависимостях
- WinnersPage: не было кнопки «Повторить» вообще → добавлена кнопка + retryKey в useEffect([filterYear, filterNomination, retryKey])
- AnalyticsPage: не было кнопки «Повторить» → добавлена inline-кнопка рядом с текстом ошибки + retryKey; также добавлен setLoading(true)/setError(null) в начало эффекта

Files changed (frontend):
- sochigu-contest/frontend/src/components/shared/BackToTopButton.tsx (новый)
- sochigu-contest/frontend/src/components/shared/AuthModal.tsx (новый)
- sochigu-contest/frontend/src/components/shared/AccessDenied.tsx (новый)
- sochigu-contest/frontend/src/components/shared/RoleGuard.tsx (новый)
- sochigu-contest/frontend/src/store/ui.store.ts (новый)
- sochigu-contest/frontend/src/components/layout/PublicLayout.tsx
- sochigu-contest/frontend/src/components/layout/CabinetLayout.tsx
- sochigu-contest/frontend/src/components/layout/AdminLayout.tsx
- sochigu-contest/frontend/src/components/layout/Header.tsx
- sochigu-contest/frontend/src/App.tsx
- sochigu-contest/frontend/src/pages/auth/LoginPage.tsx
- sochigu-contest/frontend/src/pages/auth/RegisterPage.tsx
- sochigu-contest/frontend/src/pages/public/HomePage.tsx
- sochigu-contest/frontend/src/pages/public/NewsPage.tsx
- sochigu-contest/frontend/src/pages/public/WinnersPage.tsx
- sochigu-contest/frontend/src/pages/admin/AnalyticsPage.tsx

Important context for the next developer:
- BackToTopButton: document.elementsFromPoint проверяет backgroundColor И backgroundImage (gradient). data-back-to-top атрибут нужен чтобы пропустить саму кнопку при проверке.
- AuthModal: страницы /login и /register НЕ удалены — они по-прежнему работают при прямом переходе. Модалка — дополнение, не замена.
- ui.store.ts: простой стор без persist, состояние сбрасывается при перезагрузке страницы — это правильно.
- RoleGuard: redirectTo используется только для /admin → /admin/applications для эксперта. Для всех остальных недоступных страниц — показывается AccessDenied.
- Эксперт: роли доступа определены в sidebarLinks (AdminLayout) и в RoleGuard-обёртках в App.tsx — оба места нужно обновлять синхронно при изменении прав.
- retryKey-паттерн: стандартное решение для retry useEffect с пустыми/неизменными deps — добавить retryKey в deps и инкрементировать при клике.

Next steps / suggested work:
- Реализовать экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)
- Финальное тестирование флоу: регистрация → заявка → смена статуса → аналитика
- Проверить npm run build без ошибок перед merge в main

Known issues / technical debt:
- AnalyticsPage: облако ключевых слов без весов/размеров
- Форма обратной связи на ContactsPage — заглушка

---

## Неделя 6 — UI-полировка, валидация телефона, модуль «Обращения»

### Изменения

[UI-полировка: этапы, анимации, кнопки, карточки]
- HomePage + AboutPage: карточки этапов — белый фон, кружок цвета #A6C5DC → #011145 при наведении, цифра внутри белая, hover-scale через hoverCard
- Ключевые даты (HomePage): hover-анимация через `whileHover="hovered"` на строке с вариантами только на кружке и тексте (линия-разделитель не смещается)
- Stat-карточки (HomePage): кружок bg-accent (#BEE3FE), иконка text-primary (#011145)
- Header: nav-ссылки, «Войти», «Личный кабинет» — hover:bg-white hover:text-primary; «Участвовать» — без изменений
- CSS: --accent-hover изменён с 205 90% 75% на 205 97% 85% — убрано синее свечение на кнопках
- NewsPage: весь блок карточки новости кликабелен (MotionLink = motion(Link))

[Валидация телефона]
- ContactsPage: поле «Номер телефона» рядом с email, авто-форматирование +7(XXX)XXX-XX-XX, валидация 11 цифр, обязательно хотя бы одно из email/phone
- AuthModal (RegisterForm): то же поле с той же логикой форматирования через register() + custom onChange

[Модуль «Обращения» — полный стек]
- Backend: ContactMessage entity (id, name, email?, phone?, message, status: pending/done, createdAt), DTO, service, controller, module
- POST /contact-messages — публичный эндпоинт (без авторизации)
- GET /contact-messages — только admin/moderator, фильтр по ?status=
- GET /contact-messages/:id — только admin/moderator
- PATCH /contact-messages/:id/status — только admin/moderator
- ContactsModule добавлен в AppModule, сущность — в database.config
- Frontend API: contactsApi (submit / getAll / getById / updateStatus)
- Admin: /admin/contacts — таблица (Имя, Email, Телефон, Дата, Статус, Действия), фильтр по статусу
- Admin: /admin/contacts/:id — детальный просмотр + смена статуса (pending ↔ done)
- AdminLayout: ссылка «Обращения» с иконкой MessageSquare
- App.tsx: маршруты /admin/contacts и /admin/contacts/:id
- types/index.ts: ContactMessageStatus, ContactMessage

Files changed:
- sochigu-contest/frontend/src/index.css
- sochigu-contest/frontend/src/utils/animations.ts
- sochigu-contest/frontend/src/components/layout/Header.tsx
- sochigu-contest/frontend/src/components/layout/AdminLayout.tsx
- sochigu-contest/frontend/src/pages/public/HomePage.tsx
- sochigu-contest/frontend/src/pages/public/AboutPage.tsx
- sochigu-contest/frontend/src/pages/public/NewsPage.tsx
- sochigu-contest/frontend/src/pages/public/ContactsPage.tsx
- sochigu-contest/frontend/src/components/shared/AuthModal.tsx
- sochigu-contest/frontend/src/App.tsx
- sochigu-contest/frontend/src/types/index.ts
- sochigu-contest/frontend/src/api/contacts.ts (новый)
- sochigu-contest/frontend/src/pages/admin/ContactMessagesPage.tsx (новый)
- sochigu-contest/frontend/src/pages/admin/ContactMessageDetailPage.tsx (новый)
- sochigu-contest/backend/src/contacts/entities/contact-message.entity.ts (новый)
- sochigu-contest/backend/src/contacts/dto/create-contact-message.dto.ts (новый)
- sochigu-contest/backend/src/contacts/dto/update-contact-status.dto.ts (новый)
- sochigu-contest/backend/src/contacts/contacts.service.ts (новый)
- sochigu-contest/backend/src/contacts/contacts.controller.ts (новый)
- sochigu-contest/backend/src/contacts/contacts.module.ts (новый)
- sochigu-contest/backend/src/app.module.ts
- sochigu-contest/backend/src/config/database.config.ts

Important context for the next developer:
- ContactMessage: TypeORM synchronize:true создаёт таблицу автоматически в dev-режиме
- Статусы: pending (по умолчанию при создании) и done
- Публичный POST защищён только class-validator DTO (no auth); GET/PATCH — JwtAuthGuard + RolesGuard (admin/moderator)
- formatPhone в ContactsPage и AuthModal — отдельные копии одной функции (не shared util)

Next steps / suggested work:
- Реализовать экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)
- Финальное тестирование флоу: регистрация → заявка → смена статуса → аналитика
- Проверить npm run build без ошибок перед merge в main

Known issues / technical debt:
- AnalyticsPage: облако ключевых слов без весов/размеров

---

Date: 2026-03-17
Developer: DEV2 (parovozzers)

PR / Change:
feature/week6-ui-polish-contacts (продолжение) — дашборд аналитики: фиксы, полировка, печать

What was implemented:

[Фикс временных зон — root cause]
- backend/.env: добавлен TZ=UTC — Node.js (Windows, UTC+3) интерпретировал timestamp without timezone из Docker PostgreSQL (UTC) как локальное время, сдвигая все метки на +3 часа. TZ=UTC устраняет баг без изменений в коде.
- backend/.env: SMTP-настройки очищены для локальной разработки (сервер ещё не выдан)

[AnalyticsPage — фиксы логики]
- newThisWeek: использует submittedAt вместо createdAt; окно — 6 дней назад (не 7), чтобы считать ровно 7 дней включая текущий
- teamApplications + avgTeamSize: порог изменён с > 1 на >= 1 (команда из одного человека валидна)
- avgTeamSize SQL: добавлен FILTER (WHERE jsonb_array_length >= 1) для корректного AVG
- Желтый KPI-виджет «На проверке»: valueColor + bg + labelColor пропсы у KpiCard, статус submitted выделен жёлтым фоном

[AnalyticsPage — фикс графика «Динамика»]
- filledTimeline: итерация через UTC noon (T12:00:00Z) и setUTCDate/toISOString().slice(0,10) — исключает баги смещения дня из-за DST/timezone-границ
- XAxis tickFormatter и Tooltip formatter: явный timeZone: 'UTC' для корректного отображения дат

[AnalyticsPage — фикс «Последние события»]
- relativeTime(): добавлена нормализация строки pg-timestamp: /Z|[+-]\d{2}:\d{2}$/.test(iso) ? iso : iso.replace(' ', 'T') + 'Z' — без этого new Date() создавал объект в локальном времени

[AnalyticsPage — UX/визуал]
- Таблица «География»: overflow-y-auto geo-scroll, maxHeight 260px, sticky-заголовок
- Custom scrollbar .geo-scroll (index.css): track #efd2cd, thumb #826a9c — вписывается в палитру дашборда
- Tooltip-компонент Tip: обёртка с hover-показом тёмного пузыря, применена на воронке и номинациях
- Номинации: добавлена колонка pct (%) после бара; процент также в tooltip
- Сетка статусов: числа text-4xl font-extrabold, фон cell.color + '22' (10% opacity от цвета)
- Polling interval: 15 секунд (было 60)
- Кнопка «Экспорт PDF»: цвет изменён на #9f83a6 (PALETTE[3]); класс analytics-no-print

[AnalyticsPage — печать/PDF]
- CSS @media print в index.css: analytics-grid-2 → 1 колонка, geo-scroll без ограничения высоты, analytics-no-print скрыт
- print-color-adjust: exact на .analytics-bar, .analytics-track, .analytics-card, .analytics-kpi — принудительный вывод фоновых цветов при печати

[Фикс цветов бейджей в adminке]
- UsersPage: ROLE_COLORS map (participant→blue, expert→purple, moderator→orange, admin→red); бейдж «Активен» → bg-green-100 text-green-800
- NewsManagePage, DocumentsManagePage, NominationsManagePage, ExpertsPage: бейджи isPublished/isActive/isExpertVisible → bg-green-100 text-green-800 (было bg-primary-100 text-primary-700 = стально-синий из-за override в tailwind.config.js)

Files changed:
- sochigu-contest/backend/.env
- sochigu-contest/backend/src/analytics/analytics.service.ts
- sochigu-contest/frontend/src/index.css
- sochigu-contest/frontend/src/pages/admin/AnalyticsPage.tsx
- sochigu-contest/frontend/src/pages/admin/UsersPage.tsx
- sochigu-contest/frontend/src/pages/admin/ExpertsPage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/NewsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/DocumentsManagePage.tsx
- sochigu-contest/frontend/src/pages/admin/cms/NominationsManagePage.tsx

Bug fixes:
- «3 часа назад» в ленте событий: TZ=UTC в .env + нормализация pg-строки в relativeTime()
- График «Динамика» показывал предыдущий день: UTC noon trick в filledTimeline
- teamApplications не считал одиночные заявки: порог >= 1
- newThisWeek считал 8 дней: окно 6 * 24h + текущий день
- Цветные бейджи в adminке выглядели синими: bg-primary-* переопределён в tailwind.config.js

Important context for the next developer:
- TZ=UTC в backend/.env — КРИТИЧНО для корректной работы временных зон. Не удалять.
- SMTP настройки пустые — email-отправка отключена до получения сервера. Заполнить при деплое.
- bg-primary-100 / text-primary-* в admin-таблицах = стально-синий (НЕ зелёный). Использовать Tailwind-семантику (green/blue/purple) для цветных бейджей.
- Tooltip-компонент Tip определён локально в AnalyticsPage.tsx — при необходимости вынести в shared/
- print-color-adjust: exact задан через index.css @media print, не инлайн

Next steps / suggested work:
- Реализовать экспорт Excel в ApplicationsListPage (кнопка-заглушка уже есть)
- Финальное тестирование флоу: регистрация → заявка → смена статуса → аналитика
- Проверить npm run build без ошибок перед merge в main
- Заполнить SMTP в backend/.env при получении серверного доступа
- Передать публичный SSH-ключ администратору сервера для деплоя

Known issues / technical debt:
- AnalyticsPage: облако ключевых слов без весов/размеров
- Форма обратной связи на ContactsPage — заглушка
- SMTP отключён локально — email-уведомления не отправляются

---
