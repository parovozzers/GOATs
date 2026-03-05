# Промпт для Lovable — Конкурс студенческих проектов СочиГУ

---



---

## ПРОМПТ:

Build a full-stack web platform for a Russian university student project competition called "Конкурс студенческих проектов СочиГУ" (SochiGU Student Project Competition). This is a real production app — implement all pages and features fully, no placeholders.

---

### TECH STACK
- React 18 + TypeScript + Vite
- Tailwind CSS for styling
- React Router v6 for routing
- React Hook Form for all forms
- Zustand for auth state
- Axios for API calls
- Recharts for analytics charts
- All text and UI must be in Russian language

---

### DESIGN SYSTEM

**Colors:**
- Primary (dark blue): `#1e3a8a` — main brand color, headers, nav
- Primary mid: `#1d4ed8` — hover states, accents
- Primary light: `#dbeafe` — backgrounds, chips
- Accent (green): `#059669` — CTA buttons, success states
- Accent hover: `#10b981`
- Background: `#f9fafb` (gray-50) for page backgrounds
- White: cards and containers

**Typography:** Inter font (Google Fonts)

**Style:** Modern academic. Clean, professional. Blue-white-green palette. Generous whitespace. Cards with subtle shadows (`shadow-sm` or `shadow-md`). Rounded corners (`rounded-xl` for cards, `rounded-lg` for buttons/inputs).

**Buttons:**
- Primary: `bg-[#059669] hover:bg-[#10b981] text-white font-semibold px-6 py-3 rounded-lg`
- Secondary: `border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-blue-50 px-6 py-3 rounded-lg`
- Danger: `bg-red-600 hover:bg-red-700 text-white`

**Inputs:** `w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`

---

### BACKEND API

All API calls go to `/api` prefix (proxy to `http://localhost:3000`).

**Auth endpoints:**
- `POST /api/auth/register` — body: `{ lastName, firstName, middleName?, email, password, phone?, university?, faculty?, department?, course?, city? }`
- `POST /api/auth/login` — body: `{ email, password }` → returns `{ accessToken, refreshToken, user }`
- `POST /api/auth/logout`
- `POST /api/auth/refresh` — body: `{ userId, refreshToken }`

**Public endpoints (no auth):**
- `GET /api/nominations` → `Nomination[]`
- `GET /api/news?page=1&limit=10` → `[News[], number]`
- `GET /api/news/:slug` → `News`
- `GET /api/documents` → `Document[]`
- `GET /api/winners?year=&nominationId=` → `Winner[]`
- `GET /api/winners/years` → `{ year: number }[]`

**Participant endpoints (Bearer token required):**
- `GET /api/users/me` → `User`
- `PATCH /api/users/me` → update profile
- `POST /api/applications` → create application
- `GET /api/applications/my` → `Application[]`
- `GET /api/applications/:id` → `Application`
- `PATCH /api/applications/:id` → update draft
- `POST /api/applications/:id/submit` → submit application
- `DELETE /api/applications/:id/withdraw` → withdraw
- `POST /api/files/upload/:applicationId` — multipart form: `file` + `category` (`project_file` | `document_scan` | `archive`)
- `GET /api/files/:id/download` → file blob

**Admin endpoints (admin/moderator role):**
- `GET /api/applications?nominationId=&status=&university=&search=&page=1&limit=20` → `[Application[], number]`
- `PATCH /api/applications/:id/status` — body: `{ status, comment? }`
- `GET /api/applications/export/excel` → xlsx blob
- `GET /api/users?role=&search=` → `User[]`
- `PATCH /api/users/:id/role` — body: `{ role }`
- `GET /api/analytics/summary` → `{ totalApplications, totalUsers, totalUniversities }`
- `GET /api/analytics/by-nomination` → `{ nomination, count }[]`
- `GET /api/analytics/timeline` → `{ date, count }[]`
- `GET /api/analytics/top-universities` → `{ university, count }[]`
- `GET /api/analytics/geography` → `{ city, count }[]`
- `GET /api/analytics/keywords` → `{ keyword, count }[]`
- CMS: CRUD for `/api/news`, `/api/documents`, `/api/winners`, `/api/nominations`

---

### DATA TYPES

```typescript
type Role = 'participant' | 'expert' | 'moderator' | 'admin'

type ApplicationStatus = 'draft' | 'submitted' | 'accepted' | 'rejected' | 'admitted' | 'winner' | 'runner_up'

interface User {
  id: string; email: string; firstName: string; lastName: string;
  middleName?: string; phone?: string; university?: string;
  faculty?: string; course?: number; city?: string; role: Role;
}

interface Application {
  id: string; userId: string; nominationId: string;
  nomination?: Nomination; projectTitle: string; projectDescription: string;
  keywords?: string[]; teamMembers?: { name: string; role: string; email?: string }[];
  supervisor?: { name: string; title: string; email?: string };
  status: ApplicationStatus; adminComment?: string; submittedAt?: string;
  files?: AppFile[]; logs?: ApplicationLog[]; user?: User;
  createdAt: string; updatedAt: string;
}

interface Nomination { id: string; name: string; description?: string; shortName?: string; }
interface News { id: string; title: string; slug: string; content: string; excerpt?: string; coverImage?: string; isPublished: boolean; publishedAt?: string; createdAt: string; }
interface Document { id: string; title: string; fileName: string; mimeType: string; size: number; category?: string; createdAt: string; updatedAt: string; }
interface Winner { id: string; projectTitle: string; teamName: string; year: number; place: number; nomination?: Nomination; university?: string; photoUrl?: string; description?: string; }
interface AppFile { id: string; originalName: string; size: number; category: string; createdAt: string; }
interface ApplicationLog { id: string; fromStatus: ApplicationStatus | null; toStatus: ApplicationStatus; comment?: string; createdAt: string; }
```

**Status labels (Russian):**
```
draft → Черновик (gray)
submitted → На проверке (yellow)
accepted → Принята (green)
rejected → Отклонена (red)
admitted → Допущена к очному этапу (blue)
winner → Победитель (purple)
runner_up → Призёр (indigo)
```

---

### AUTH STATE (Zustand)

```typescript
// Persist to localStorage key 'sochigu-auth'
interface AuthStore {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setAuth(user, accessToken, refreshToken): void
  setTokens(accessToken, refreshToken): void
  logout(): void
}
```

Axios interceptor: attach `Authorization: Bearer {accessToken}` to every request. On 401 → call refresh endpoint → retry original request. On refresh fail → logout + redirect to /login.

---

### ROUTING STRUCTURE

```
/ → HomePage (public)
/about → AboutPage (public)
/nominations → NominationsPage (public)
/experts → ExpertsPage (public)
/partners → PartnersPage (public)
/contacts → ContactsPage (public)
/news → NewsPage (public)
/news/:slug → NewsDetailPage (public)
/documents → DocumentsPage (public)
/winners → WinnersPage (public)

/login → LoginPage
/register → RegisterPage

/cabinet → CabinetDashboard (protected: all authenticated)
/cabinet/application → ApplicationPage (protected)
/cabinet/application/new → ApplicationFormPage (protected)
/cabinet/application/:id/edit → ApplicationFormPage (protected)

/admin → AdminDashboard (protected: admin, moderator)
/admin/applications → ApplicationsListPage (protected)
/admin/applications/:id → ApplicationDetailPage (protected)
/admin/users → UsersPage (protected)
/admin/analytics → AnalyticsPage (protected)
/admin/cms/news → NewsManagePage (protected)
/admin/cms/documents → DocumentsManagePage (protected)
/admin/cms/winners → WinnersManagePage (protected)
/admin/cms/nominations → NominationsManagePage (protected)
```

---

### LAYOUTS

**PublicLayout:** Sticky header + Footer wrapping public pages via `<Outlet />`

**Header (sticky, bg #1e3a8a, white text):**
- Left: Logo "СочиГУ | Конкурс проектов" (white, accent green for "СочиГУ")
- Center nav links: Главная / О конкурсе / Номинации / Экспертный совет / Новости / Документы / Победители / Контакты
- Right: If NOT logged in → "Войти" (outlined) + "Участвовать" (green button). If logged in → "Личный кабинет" (→ /cabinet or /admin based on role) + "Выйти"
- Mobile: hamburger menu, all nav links in dropdown

**Footer (bg #1e3a8a, white text):** 4 columns — About, Navigation, For participants, Contacts. Copyright at bottom.

**AdminLayout:** Fixed left sidebar (bg #1e3a8a, white text, 224px wide) with nav links + main content area. Sidebar links: Дашборд / Заявки / Пользователи / Аналитика / Новости / Документы / Победители / Номинации. Bottom of sidebar: link to public site + Выйти button.

**CabinetLayout:** Top bar with username + sidebar with: Обзор / Моя заявка / Выйти.

---

### PUBLIC PAGES

**HomePage — full landing page with these sections:**
1. **Hero**: Full-width gradient (#1e3a8a → #1d4ed8), white text. H1: "Конкурс студенческих проектов СочиГУ 2026". Subtitle: "Представь свой проект. Получи поддержку. Стань победителем." Two buttons: "Подать заявку" (green → /register) + "Узнать подробнее" (outlined white → /about). Badge: "Приём заявок до 30 октября"
2. **Stats**: 4 cards — "2 номинации" / "500+ участников" / "Бесплатное участие" / "Денежные призы". White cards, icon in blue circle.
3. **Stages**: 4 numbered steps with arrows between: Заочный отбор → Доработка проектов → Презентация → Награждение. Horizontal on desktop, vertical on mobile.
4. **Nominations**: 2 cards side by side — "1. Бизнес-проекты" (коммерциализация) + "2. Практико-ориентированные" (образовательные). Button "Все номинации" → /nominations.
5. **Key dates**: Vertical timeline — Приём заявок (до 30 октября) / Доработка (ноябрь) / Презентация (декабрь) / Награждение (декабрь).
6. **CTA block**: Dark blue bg, "Готов участвовать?" heading, green "Подать заявку" button.

**AboutPage:** Breadcrumb. Sections: Миссия / Цели (list) / Условия участия (бесплатно, студенты СочиГУ, команда 2-5 человек) / 4 этапа (cards with numbers) / Организатор — Стартап-студия СочиГУ. CTA button at bottom.

**NominationsPage:** Two detailed nomination cards:
- Номинация 1 "Бизнес-проекты": коммерциализация, Pre-Seed/Seed. Criteria: полнота профиля, проработанность бизнес-модели, уровень презентации, потенциал проекта.
- Номинация 2 "Практико-ориентированные": образовательные. Criteria: актуальность, методическая ценность, реализуемость.
Directions section: IT и цифровая экономика / Социальные / Реальный сектор / Политико-правовые / Культурные / Спортивные. CTA button.

**NewsPage:** Fetch `GET /api/news`. Grid of news cards (3 col desktop, 2 tablet, 1 mobile). Each card: cover image (gray placeholder if none), date, title (2-line clamp), excerpt (3-line clamp), "Читать →" link. Pagination: 10 per page with prev/next. Loading: 6 skeleton cards.

**NewsDetailPage:** Fetch by slug. Breadcrumb. Cover image full width. H1 title. Date. Full content. Back button.

**DocumentsPage:** Fetch `GET /api/documents`. List with icon + title + category + date + size (format bytes to KB/MB) + "Скачать" link to `/api/documents/{id}/download`. Group by category if exists. Skeletons on load.

**WinnersPage:** Fetch winners + years + nominations. Two filter selects: year + nomination. Grid of winner cards: medal emoji (🥇🥈🥉 for places 1-3), year badge, project title, team, nomination, university. Empty state if no winners.

**ExpertsPage:** Title + description of expert council role. Grid of 6 placeholder expert cards (gray circle avatar, "Эксперт" name, "Должность" subtitle). Note: "Состав утверждается приказом ректора".

**PartnersPage:** Title + partner logo grid (gray rectangles as placeholders) + partnership description.

**ContactsPage:** Title. Info card: organization name, startup studio, website link. Contact form (layout only, no submit): Имя / Email / Сообщение / Отправить button.

---

### AUTH PAGES

**LoginPage:** Centered white card (max-w-md). Logo/title. Email + password inputs. Error alert (red box) on failure. "Входим..." disabled button state on loading. "Зарегистрироваться" link. On success → redirect to /cabinet (or /admin if role is admin/moderator).

**RegisterPage:** Centered white card (max-w-lg). Title "Регистрация участника". Two-column grid fields:
- Фамилия* / Имя* / Отчество
- Email* / Телефон
- Пароль* (min 8) / [empty]
- Вуз / Факультет/кафедра
- Курс (select 1-6) / Город
Consent checkbox: "Даю согласие на обработку персональных данных"*. Validation errors under each field. Loading + error states. On success → /cabinet.

---

### PERSONAL CABINET (participant)

**CabinetDashboard (/cabinet):**
- Welcome: "Добро пожаловать, {firstName}!"
- "Мои данные" card: show user ФИО, email, вуз, факультет, курс, город
- "Мои заявки" section: fetch GET /api/applications/my. If empty → "Заявок нет" + green "Подать заявку" button. If exist → list with project title, nomination name, StatusBadge, submission date, "Перейти" link.

**ApplicationPage (/cabinet/application):**
Fetch user's applications. Show first application:
- StatusBadge (colored pill based on status)
- Project title, nomination, description
- Team members table
- Supervisor card
- Files list with download buttons (GET /api/files/:id/download)
- Action buttons based on status:
  - `draft`: "Редактировать" → edit form, "Подать заявку" → POST submit, "Отозвать" → DELETE (with confirm dialog)
- Yellow alert box if adminComment exists
- Status history timeline (from logs array)
If no application → "У вас нет заявки" + create button.

**ApplicationFormPage — 4-step wizard:**

Progress bar at top showing steps 1-4.

Step 1 "Номинация": Fetch GET /api/nominations. Show as clickable selection cards (border highlights on select). Required.

Step 2 "Описание и команда":
- Название проекта* (maxLength 200)
- Описание проекта* (textarea, min 100 chars, max 2000, show char counter)
- Ключевые слова (comma-separated input with hint)
- Team members section: dynamic add/remove rows (Имя / Роль / Email)
- Supervisor section: ФИО / Должность / Email

Step 3 "Файлы":
- Two upload zones:
  - "Файлы проекта" (PDF/DOC/DOCX/PPT/ZIP/RAR) — category: project_file
  - "Сканы документов" (PDF/JPG/PNG) — category: document_scan
- Show uploaded file list with name, size, remove button
- Files upload AFTER application is created (need applicationId first)

Step 4 "Подтверждение":
- Summary of all entered data
- Confirm checkbox
- "Сохранить черновик" → create/update without submit → navigate to /cabinet/application
- "Подать заявку" → create + submit → navigate to /cabinet/application

On edit mode (/:id/edit): preload existing application data.

---

### ADMIN PANEL

**AdminDashboard (/admin):**
- 3 KPI cards (fetch /api/analytics/summary): Всего заявок / Участников / Вузов. Large number + label.
- Quick links section: cards for Заявки / Пользователи / Аналитика
- Last 5 applications table (fetch /api/applications?limit=5): project name, participant, status badge, date. "Все заявки →" link.

**ApplicationsListPage (/admin/applications):**
Filter panel (flex wrap):
- Nomination select (fetch nominations)
- Status select (all ApplicationStatus values with Russian labels)
- Search input (debounced 500ms) — by project title
- University input
- "Сбросить" button
- "Экспорт Excel" button → GET /api/applications/export/excel → download blob

Table columns: # / Название проекта / Участник / Вуз / Номинация / Статус / Дата подачи / Действия (Просмотр link).
Pagination: 20 per page with page buttons.
Skeleton rows on load.

**ApplicationDetailPage (/admin/applications/:id):**
- Back button + project title h1 + StatusBadge
- Status change panel (top right or top): status select + comment textarea + "Сохранить статус" button → PATCH /api/applications/:id/status. Show success toast on save.
- Two-column info grid: Left — participant (ФИО, email, вуз, факультет, курс, город, телефон). Right — project (nomination, date, current status).
- Full project description
- Keywords as pills (bg-blue-100 text-blue-800 rounded-full px-3 py-1)
- Team members table
- Supervisor card
- Files list: filename + size + "Скачать" button (GET /api/files/:id/download)
- Status history timeline (from logs)

**UsersPage (/admin/users):**
Filters: role select + search input.
Table: ФИО / Email / Роль / Вуз / Дата регистрации / Активен.
Fetch GET /api/users.

**AnalyticsPage (/admin/analytics):**
All data fetched from analytics endpoints. Layout:

Row 1: 3 KPI cards (summary)

Row 2 (2 columns):
- Pie chart "Заявки по номинациям" (Recharts PieChart) — colors: #1e3a8a, #059669, #0284c7, #7c3aed
- Line chart "Динамика подачи заявок" (Recharts LineChart) — X: date formatted ru-RU, Y: count, line color #1d4ed8

Row 3: Bar chart "Топ-10 вузов" (horizontal BarChart, layout="vertical") — bar color #059669

Row 4 (2 columns):
- Geography table: Город / Количество
- Word cloud: keywords from /api/analytics/keywords — use simple tag cloud layout (flex wrap of pills with varying font sizes based on count value — min 14px, max 48px)

"Печать отчёта" button → window.print(). Add print CSS: hide sidebar, show only content.

**CMS Pages (admin/cms/*):**

Each CMS page follows the same pattern: Title + "Создать" button → Table → Edit/Delete actions → Modal form.

**NewsManagePage:**
- Table: Заголовок / Статус / Дата / Действия
- Modal form: Заголовок* / Slug* (auto-generate from title: transliterate+slugify) / Краткое описание / Контент (textarea)* / URL обложки / Опубликовать checkbox
- Actions: Edit (open modal prefilled) / Toggle publish / Delete (confirm)

**DocumentsManagePage:**
- Table: Название / Категория / Размер / Статус / Дата / Действия
- Form: Название* / Категория / Файл upload (multipart to POST /api/documents/upload) / Опубликовать

**WinnersManagePage:**
- Year filter select
- Table: Место / Проект / Команда / Номинация / Год / Действия
- Modal form: Место (1/2/3)* / Год* / Название проекта* / Команда* / Описание / Номинация select* / Вуз / URL фото

**NominationsManagePage:**
- Table: Название / Краткое имя / Активна / Порядок / Действия
- Modal form: Название* / Краткое имя / Описание / Активна checkbox / Порядок сортировки

---

### SHARED COMPONENTS

**StatusBadge:** Colored pill based on status. Colors:
- draft: gray, submitted: yellow, accepted: green, rejected: red, admitted: blue, winner: purple, runner_up: indigo

**Modal:** Dark overlay + white centered box with title + close button (X). Trap focus inside. Close on overlay click or Escape key.

**Toast notifications:** Top-right corner, 3 second auto-dismiss. Variants: success (green) / error (red) / info (blue).

**Skeleton:** Gray animated pulse block `animate-pulse bg-gray-200 rounded`.

**Spinner:** Animated circle `animate-spin border-2 border-gray-200 border-t-primary-600 rounded-full`.

**ProtectedRoute:** Check auth + role. Redirect to /login if not authenticated. Redirect to / if wrong role.

---

### IMPORTANT REQUIREMENTS

1. All text in Russian
2. Fully responsive: 320px → 1920px. Tables must be horizontally scrollable on mobile (`overflow-x-auto`).
3. Forms must show validation errors under each field
4. All loading states must show skeletons or spinners
5. All empty states must show friendly message + action button
6. Error states from API must show error alert
7. No placeholder pages — implement all pages fully
8. Do not add unnecessary comments to code
9. `document.title` should be set for each page in Russian
10. Add `"type": "module"` to package.json

---

### VITE CONFIG (proxy for API)

```js
server: {
  proxy: {
    '/api': { target: 'http://localhost:3000', changeOrigin: true }
  }
}
```
