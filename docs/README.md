# Конкурс студенческих проектов — СочиГУ

Веб-платформа для проведения всероссийского конкурса студенческих проектов ФГБОУ ВО «Сочинский государственный университет».

## Стек

| Слой | Технология |
|------|-----------|
| Backend | NestJS 10, TypeORM, PostgreSQL |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS |
| Auth | JWT (access + refresh tokens), bcrypt |
| Файлы | Multer, локальное хранилище |
| Email | Nodemailer (SMTP) |
| Аналитика | Recharts, react-wordcloud |
| Экспорт | ExcelJS |
| Инфраструктура | Docker Compose, Nginx, Let's Encrypt |

## Структура репозитория

```
sochigu-contest/
├── backend/          # NestJS API
│   └── src/
│       ├── auth/           # JWT авторизация
│       ├── users/          # Пользователи
│       ├── nominations/    # Номинации
│       ├── applications/   # Заявки + история статусов
│       ├── files/          # Загрузка файлов (Multer)
│       ├── news/           # Новости
│       ├── documents/      # Документы
│       ├── winners/        # Победители
│       ├── analytics/      # Аналитические эндпоинты
│       ├── mail/           # Email-уведомления
│       └── common/         # Guards, decorators, enums, filters
├── frontend/         # React + Vite
│   └── src/
│       ├── api/            # Axios-клиент + методы по сущностям
│       ├── components/     # UI, layouts, shared
│       ├── pages/          # public/, auth/, cabinet/, admin/
│       ├── store/          # Zustand (auth)
│       ├── types/          # TypeScript типы
│       └── hooks/          # useApplications и др.
├── docker-compose.yml
├── DEV2_TASKS.md     # Задачи для Frontend-разработчика
├── DEV3_TASKS.md     # Задачи для Fullstack-разработчика
└── ADMIN_GUIDE.md    # Инструкция для администратора
```

## Быстрый старт

> **Требования:** Node.js 18+, npm, Docker Desktop

### 1 команда для нового разработчика

```bash
git clone <repo-url>
cd sochigu-contest

node setup.js     # установит зависимости, создаст .env, проверит Docker
npm run dev       # запустит БД + backend + frontend одновременно
```

Приложение будет доступно:
- **Frontend** → http://localhost:5173
- **Backend API** → http://localhost:3000/api

---

### Детали

**Что делает `npm run dev`:**
1. Поднимает PostgreSQL в Docker (из `docker-compose.dev.yml`)
2. Запускает NestJS с hot-reload (`nest start --watch`)
3. Запускает Vite dev-server

**Режимы запуска:**

| Команда | Где | Что запускает |
|---------|-----|---------------|
| `npm run dev` | Локальная разработка | PostgreSQL в Docker + NestJS hot-reload + Vite dev-server |
| `npm run prod` | Сервер / prod-like | Все три сервиса в Docker (`docker-compose.yml`) |

**Остальные команды:**

| Команда | Описание |
|---------|----------|
| `npm run setup` | Первоначальная настройка (= `node setup.js`) |
| `npm run db:down` | Остановить БД (dev) |
| `npm run db:reset` | Сбросить БД и данные (удалит volume!) |
| `npm run prod:down` | Остановить все prod-контейнеры |
| `npm run prod:logs` | Логи prod-контейнеров в реальном времени |
| `npm run install:all` | Переустановить все зависимости |
| `npm run build` | Сборка backend + frontend |

**При первом запуске** TypeORM автоматически создаст таблицы (`synchronize: true` в dev-режиме).

**Для production** использовать миграции:
```bash
cd backend
npm run migration:generate -- -n InitialMigration
npm run migration:run
```

---

### Деплой на сервер (production)

```bash
git clone https://github.com/parovozzers/GOATs.git
cd GOATs/sochigu-contest

# 1. Создать .env из шаблона и заполнить реальными значениями
cp backend/.env.prod.example backend/.env
nano backend/.env

# 2. Запустить все сервисы
docker compose -f docker-compose.prod.yml up -d --build
```

> **Важно:** `docker-compose.prod.yml` читает переменную `${DB_PASS}` из файла `sochigu-contest/.env`.
> Создай его рядом с `docker-compose.prod.yml`:
> ```
> echo "DB_PASS=ВАШ_ПАРОЛЬ" > .env
> ```
> Значение должно совпадать с `DB_PASS` в `backend/.env`.

## API эндпоинты

| Метод | Путь | Описание | Доступ |
|-------|------|----------|--------|
| POST | /api/auth/register | Регистрация | Публичный |
| POST | /api/auth/login | Вход | Публичный |
| POST | /api/auth/refresh | Обновление токена | Публичный |
| GET | /api/nominations | Список номинаций | Публичный |
| GET | /api/news | Новости (опубликованные) | Публичный |
| GET | /api/documents | Документы | Публичный |
| GET | /api/winners | Победители | Публичный |
| GET | /api/applications/my | Мои заявки | Участник |
| POST | /api/applications | Создать заявку | Участник |
| POST | /api/files/upload/:id | Загрузить файл | Участник |
| GET | /api/applications | Все заявки (с фильтрами) | Admin/Moderator |
| PATCH | /api/applications/:id/status | Сменить статус | Admin/Moderator |
| GET | /api/analytics/summary | Сводная статистика | Admin/Moderator |
| GET | /api/applications/export/excel | Экспорт Excel | Admin/Moderator |

## Роли пользователей

| Роль | Доступ |
|------|--------|
| `participant` | Личный кабинет, подача заявок |
| `expert` | Просмотр заявок (без смены статуса) |
| `moderator` | Просмотр и смена статуса заявок |
| `admin` | Полный доступ, CMS, аналитика, экспорт |

## Статусная машина заявки

```
DRAFT → SUBMITTED → ACCEPTED → ADMITTED → WINNER / RUNNER_UP
                  ↘ REJECTED
```

Каждое изменение статуса: логируется в `application_logs` + email участнику.

## Команда разработки

| Разработчик | Роль | Зона ответственности |
|-------------|------|---------------------|
| Dev 1 | Lead / Backend | Архитектура, Auth, деплой, безопасность |
| Dev 2 | Frontend Junior | Публичные страницы, ЛК, UI-компоненты, графики |
| Dev 3 | Fullstack Junior | Новости/Документы/Победители, CMS, экспорт, тесты |

Задачи для каждого разработчика: `DEV2_TASKS.md` и `DEV3_TASKS.md`
