# Задачи для Dev 3 — Fullstack Junior
## Проект: Конкурс студенческих проектов СочиГУ
## Стек: NestJS (backend) + React (frontend) + TypeORM + PostgreSQL

---

> **Как работать с этим файлом:**
> Открой терминал в папке `sochigu-contest/`, запусти `claude` и вставляй промпты по одному.
> Для backend-задач работай в папке `backend/`, для frontend — в `frontend/`.
> После каждой задачи коммит: `git add . && git commit -m "feat: <описание>"`
> **Важно:** не трогай файлы auth/, users/, config/ — это зона Dev 1.

---

## НЕДЕЛЯ 1 — Публичные страницы (Frontend)

### Задача 1.1 — Страница новостей

```
Реализуй страницы новостей в sochigu-contest/frontend/src/pages/public/

1. NewsPage.tsx — Лента новостей
   Импорты:
   - import { useState, useEffect } from 'react'
   - import { Link } from 'react-router-dom'
   - import { newsApi } from '@/api/news'
   - import { News } from '@/types'

   Содержимое:
   - Заголовок страницы "Новости конкурса"
   - Сетка карточек новостей: 3 колонки на десктопе, 2 на планшете, 1 на мобиле
   - Каждая карточка новости:
     * Обложка (img с object-cover, высота 200px; если coverImage нет — серый placeholder с текстом)
     * Дата публикации (publishedAt, форматировать через new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }))
     * Заголовок (font-semibold, 2 строки максимум через line-clamp-2)
     * Краткое описание (excerpt, 3 строки через line-clamp-3, text-gray-600)
     * Ссылка "Читать →" → /news/:slug
   - Пагинация внизу (10 на страницу): кнопки "Назад" / "Вперёд", текст "Страница X из Y"
   - Скелетон при загрузке: 6 карточек с animate-pulse блоками
   - Пустое состояние: "Новостей пока нет"

   Логика: newsApi.getPublished(page) возвращает [News[], number] (массив и total)

   export function NewsPage() {}

2. NewsDetailPage.tsx — Детальная новость
   Импорты: useParams, newsApi, useEffect, useState

   Содержимое:
   - Загружает новость по slug: useParams() → slug → newsApi.getBySlug(slug)
   - Breadcrumb: Главная / Новости / {title}
   - Обложка (если есть) — полная ширина, max-h-96, object-cover
   - Заголовок h1
   - Дата публикации
   - Полный контент (dangerouslySetInnerHTML={{ __html: news.content }} или просто текст)
   - Кнопка "← Все новости" → /news
   - При 404: "Новость не найдена" + ссылка назад

   export function NewsDetailPage() {}
```

---

### Задача 1.2 — Страница документов

```
Реализуй страницу sochigu-contest/frontend/src/pages/public/DocumentsPage.tsx

Импорты:
- import { useState, useEffect } from 'react'
- import { documentsApi } from '@/api/documents'
- import { Document } from '@/types'

Содержимое:
1. Заголовок "Документы конкурса"
2. Если документы разных категорий — группируй их по category с подзаголовком

3. Список документов:
   Каждый элемент — строка (flex):
   - Иконка файла слева (SVG иконки для PDF/DOC/ZIP или универсальная)
   - Название файла (font-medium)
   - Категория (text-sm text-gray-500)
   - Дата обновления (updatedAt)
   - Размер файла (форматировать в KB/MB: если size < 1024*1024 → '{n} KB', иначе '{n} MB')
   - Кнопка/ссылка "Скачать" → href={`/api/documents/${doc.id}/download`} target="_blank"
     (или если в документах нет эндпоинта download — пусть пока ссылка просто есть)

4. Скелетон: 5 строк при загрузке
5. Пустое состояние: "Документов пока нет"
6. Хелпер-функция formatFileSize(bytes: number): string — вынеси в src/utils/formatFileSize.ts

export function DocumentsPage() {}
```

---

### Задача 1.3 — Галерея победителей

```
Реализуй страницу sochigu-contest/frontend/src/pages/public/WinnersPage.tsx

Импорты:
- import { useState, useEffect } from 'react'
- import { winnersApi } from '@/api/winners'
- import { nominationsApi } from '@/api/nominations'
- import { Winner, Nomination } from '@/types'

Содержимое:

1. Заголовок "Победители конкурса"

2. Панель фильтров (flex, gap):
   - Select "Год": загружает winnersApi.getYears() → [{year: number}]
     Первый вариант: "Все годы" (value='')
   - Select "Номинация": загружает nominationsApi.getAll()
     Первый вариант: "Все номинации" (value='')
   - При изменении фильтра — перезагружать список

3. Сетка победителей (3 колонки на десктопе, 1 на мобиле):
   Каждая карточка:
   - Место: 🥇 (1-е место), 🥈 (2-е), 🥉 (3-е), остальные — просто номер
   - Если есть photoUrl — изображение, иначе серый placeholder
   - Год (badge)
   - Название проекта (font-bold)
   - Команда
   - Номинация (из winner.nomination.name)
   - Вуз (если есть)

4. Если победителей нет: "Победители пока не объявлены"
5. Скелетон при загрузке: 6 карточек

export function WinnersPage() {}
```

---

## НЕДЕЛЯ 2 — API заявок (Backend) + Форма (Frontend)

### Задача 2.1 — Проверка и доработка Applications API

```
Работаем в sochigu-contest/backend/

Скелет уже создан Dev 1. Твоя задача: убедиться что модуль работает и доделать детали.

1. Проверь что applications.module.ts, applications.service.ts, applications.controller.ts существуют

2. Добавь в applications.service.ts метод exportToExcel:
   Используй exceljs (уже в зависимостях).

   async exportToExcel(filters: any): Promise<Buffer> {
     const [applications] = await this.findAll({ ...filters, limit: 10000, page: 1 });
     const workbook = new ExcelJS.Workbook();
     const sheet = workbook.addWorksheet('Заявки');

     sheet.columns = [
       { header: '№', key: 'num', width: 5 },
       { header: 'Название проекта', key: 'title', width: 40 },
       { header: 'ФИО', key: 'fio', width: 30 },
       { header: 'Email', key: 'email', width: 25 },
       { header: 'Вуз', key: 'university', width: 30 },
       { header: 'Номинация', key: 'nomination', width: 20 },
       { header: 'Статус', key: 'status', width: 15 },
       { header: 'Дата подачи', key: 'submittedAt', width: 20 },
     ];

     const statusLabels = {
       draft: 'Черновик', submitted: 'На проверке', accepted: 'Принята',
       rejected: 'Отклонена', admitted: 'Допущена', winner: 'Победитель', runner_up: 'Призёр'
     };

     applications.forEach((app, i) => {
       sheet.addRow({
         num: i + 1,
         title: app.projectTitle,
         fio: app.user ? `${app.user.lastName} ${app.user.firstName}` : '',
         email: app.user?.email,
         university: app.user?.university,
         nomination: app.nomination?.name,
         status: statusLabels[app.status],
         submittedAt: app.submittedAt ? new Date(app.submittedAt).toLocaleDateString('ru-RU') : '',
       });
     });

     return workbook.xlsx.writeBuffer() as Promise<Buffer>;
   }

3. Добавь в applications.controller.ts эндпоинт экспорта:
   @Get('export/excel')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles(Role.ADMIN, Role.MODERATOR)
   async exportExcel(@Query() query: any, @Res() res: Response) {
     const buffer = await this.service.exportToExcel(query);
     res.set({
       'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
       'Content-Disposition': `attachment; filename="applications-${Date.now()}.xlsx"`,
     });
     res.send(buffer);
   }

4. Добавь в frontend/src/api/applications.ts метод:
   exportExcel: (params?: any) =>
     apiClient.get('/applications/export/excel', { params, responseType: 'blob' }).then(r => {
       const url = URL.createObjectURL(r.data);
       const a = document.createElement('a');
       a.href = url;
       a.download = `applications-${Date.now()}.xlsx`;
       a.click();
       URL.revokeObjectURL(url);
     }),

5. В ApplicationsListPage.tsx (создан Dev 2) подключи кнопку "Экспорт Excel":
   Найди кнопку "Экспорт Excel" и добавь onClick: () => applicationsApi.exportExcel(currentFilters)
```

---

### Задача 2.2 — Настройка почты (Nodemailer)

```
Работаем в sochigu-contest/backend/src/mail/

Файл mail.service.ts уже создан Dev 1. Твоя задача: расширить функциональность.

1. Добавь в MailService методы:

   async sendWelcome(user: { email: string; firstName: string }) {
     await this.transporter.sendMail({
       from: `"Конкурс СочиГУ" <${this.configService.get('SMTP_USER')}>`,
       to: user.email,
       subject: 'Добро пожаловать на конкурс проектов СочиГУ!',
       html: `
         <h2>Здравствуйте, ${user.firstName}!</h2>
         <p>Вы успешно зарегистрировались на платформе конкурса студенческих проектов СочиГУ.</p>
         <p>Теперь вы можете подать заявку на участие в конкурсе.</p>
         <p><a href="${this.configService.get('FRONTEND_URL')}/cabinet">Перейти в личный кабинет</a></p>
         <p>Организатор — Стартап-студия СочиГУ</p>
       `,
     });
   }

2. Подключи sendWelcome в auth.service.ts:
   В методе register после создания пользователя добавь (не blocking):
   this.mailService.sendWelcome({ email: user.email, firstName: user.firstName }).catch(() => {});

   Импортируй MailService в AuthModule и AuthService.

3. Проверь .env.example содержит все нужные переменные:
   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
   Если чего-то нет — добавь.

4. Добавь проверку: если SMTP_HOST не задан, MailService логирует предупреждение и не падает:
   В конструкторе:
   if (!configService.get('SMTP_HOST')) {
     console.warn('SMTP not configured, emails will be skipped');
     this.transporter = null;
   }
   В методах: if (!this.transporter) return;
```

---

## НЕДЕЛЯ 3 — Управление контентом (Fullstack)

### Задача 3.1 — CMS: Управление новостями (Frontend)

```
Реализуй страницу sochigu-contest/frontend/src/pages/admin/cms/NewsManagePage.tsx

Импорты:
- import { useState, useEffect } from 'react'
- import { useForm } from 'react-hook-form'
- import { newsApi } from '@/api/news'
- import { News } from '@/types'

Это CRUD-интерфейс для управления новостями.

Содержимое:
1. Шапка: заголовок "Управление новостями" + кнопка "Создать новость"

2. Таблица новостей:
   Колонки: Заголовок | Статус (Опубликована/Черновик) | Дата создания | Действия
   Действия: "Редактировать" (открывает форму), "Опубликовать/Снять" (toggle isPublished), "Удалить" (с confirm)

3. Модальное окно формы (создание/редактирование):
   Компонент Modal:
   - Создай src/components/ui/Modal.tsx — overlay + белый блок с крестиком закрытия
   - Props: isOpen, onClose, title, children

   Форма в модалке:
   - Поле: Заголовок (required)
   - Поле: Slug (required, автогенерируется из заголовка: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
   - Textarea: Краткое описание (excerpt)
   - Textarea: Полный текст (content, required)
   - Поле: URL обложки (coverImage)
   - Чекбокс: Опубликовать сразу
   - Кнопки: Сохранить / Отмена

4. Логика:
   - Создание: newsApi.create(data)
   - Редактирование: newsApi.update(id, data)
   - Удаление: newsApi.remove(id) после confirm("Удалить новость?")
   - Toggle публикации: newsApi.update(id, { isPublished: !news.isPublished, publishedAt: new Date() })
   - После каждого действия перезагружать список

export function NewsManagePage() {}
```

---

### Задача 3.2 — CMS: Управление документами и победителями (Frontend)

```
Реализуй две CMS-страницы в sochigu-contest/frontend/src/pages/admin/cms/

1. DocumentsManagePage.tsx — Управление документами

   Содержимое:
   - Список документов (как таблица): Название | Размер | Категория | Публикация | Действия
   - Форма в Modal:
     * Название (required)
     * Категория (text input, например "Положение о конкурсе", "Формы")
     * Поле для загрузки файла: <input type="file"> (отправлять на POST /api/documents с formData)
     * Чекбокс: опубликовать
   - При загрузке файла документ добавляется в БД
   - Backend уже принимает данные через POST /documents, но ВАЖНО:
     Добавить в documents.controller.ts метод для загрузки файла (используй Multer):

     @Post('upload')
     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(Role.ADMIN)
     @UseInterceptors(FileInterceptor('file', { storage: diskStorage({ destination: './uploads/docs', filename: (_, f, cb) => cb(null, `${Date.now()}-${f.originalname}`) }) }))
     uploadDocument(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
       return this.documentsService.create({
         title: body.title,
         fileName: file.originalname,
         storagePath: file.path,
         mimeType: file.mimetype,
         size: file.size,
         category: body.category,
         isPublished: body.isPublished === 'true',
       });
     }

   export function DocumentsManagePage() {}

2. WinnersManagePage.tsx — Управление победителями

   Содержимое:
   - Фильтр по году (Select)
   - Таблица: Место | Проект | Команда | Номинация | Год | Действия
   - Форма в Modal:
     * Место (number: 1, 2, 3)
     * Год (number, required)
     * Название проекта (required)
     * Команда (required)
     * Описание
     * Номинация (Select, загружает nominationsApi.getAll())
     * Вуз
     * URL фото
   - CRUD через winnersApi (create, update, remove)

   export function WinnersManagePage() {}
```

---

### Задача 3.3 — CMS: Управление номинациями + Страница экспертов (Frontend)

```
Реализуй две страницы:

1. sochigu-contest/frontend/src/pages/admin/cms/NominationsManagePage.tsx

   Содержимое:
   - Список номинаций (таблица): Название | Краткое имя | Активна | Порядок | Действия
   - Форма в Modal (создание/редактирование):
     * Название (required)
     * Краткое имя (shortName)
     * Описание (textarea)
     * Чекбокс: Активна
     * Порядок сортировки (number)
   - CRUD через nominationsApi
   - Предупреждение при удалении: "Удаление номинации может повлиять на существующие заявки"

   export function NominationsManagePage() {}

2. sochigu-contest/frontend/src/pages/admin/ExpertsPage.tsx — Управление экспертами

   Импорты: apiClient (для GET/PATCH /api/users?role=expert)

   Содержимое:
   - Заголовок "Управление экспертами"
   - Таблица экспертов (role='expert'): ФИО | Email | Дата регистрации | Активен | Действия
   - Кнопка "Назначить эксперта":
     * Modal с полем Email
     * Ищет пользователя по email через GET /api/users?search=email
     * Кнопка "Назначить" → PATCH /api/users/:id с { role: 'expert' }
   - Кнопка "Снять с роли" → PATCH /api/users/:id с { role: 'participant' }

   Для этого добавь в backend users.controller.ts эндпоинт:
   @Patch(':id/role')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles(Role.ADMIN)
   updateRole(@Param('id') id: string, @Body() body: { role: Role }) {
     return this.usersService.update(id, { role: body.role });
   }

   export function ExpertsPage() {}
```

---

## НЕДЕЛЯ 4 — Аналитика + Облако слов (Frontend)

### Задача 4.1 — Подключение графиков к API и облако ключевых слов

```
Работаем в sochigu-contest/frontend/

Страница AnalyticsPage.tsx создана Dev 2 (или создай сам если не сделано).
Твоя задача: добавить облако ключевых слов и убедиться что все данные реально приходят.

1. Добавь секцию "Облако ключевых слов" в AnalyticsPage.tsx:

   Установи пакет: уже есть react-wordcloud в package.json

   import ReactWordcloud from 'react-wordcloud';

   - Данные: analyticsApi.getKeywords() → [{keyword, count}]
   - Трансформируй в формат WordCloud: [{text: keyword, value: count}]
   - Настройки wordcloud:
     options = {
       rotations: 2,
       rotationAngles: [0, 90],
       fontSizes: [14, 60],
       colors: ['#1e3a8a', '#2563eb', '#059669', '#0284c7', '#7c3aed'],
     }
   - Высота контейнера: 300px
   - Если ключевых слов нет: "Ключевые слова появятся после подачи заявок"

2. Проверь что все 6 API-вызовов в AnalyticsPage работают корректно:
   - analyticsApi.getSummary() → KPI карточки
   - analyticsApi.getByNomination() → PieChart
   - analyticsApi.getTimeline() → LineChart
   - analyticsApi.getTopUniversities() → BarChart
   - analyticsApi.getGeography() → таблица
   - analyticsApi.getKeywords() → wordcloud

3. Добавь обработку пустых данных:
   - PieChart: если нет данных → текст "Заявок пока нет"
   - LineChart: если нет данных → текст "Нет данных для отображения"
   - BarChart: если нет данных → текст "Вузов пока нет"

4. Кнопка "Сгенерировать PDF-отчёт":
   - onClick: window.print()
   - Добавь CSS для печати в index.css:
     @media print {
       aside, nav, button, .no-print { display: none !important; }
       .print-content { width: 100% !important; }
     }
```

---

### Задача 4.2 — Генерация PDF-отчёта

```
Работаем в sochigu-contest/frontend/src/pages/admin/AnalyticsPage.tsx

Реализуй генерацию PDF-отчёта через window.print() с кастомной разметкой.

1. Создай компонент src/components/shared/PrintReport.tsx:
   Этот компонент виден ТОЛЬКО при печати (print:block, screen:hidden).

   interface PrintReportProps {
     summary: { totalApplications: number; totalUsers: number; totalUniversities: number }
     byNomination: { nomination: string; count: string }[]
     topUniversities: { university: string; count: string }[]
     geography: { city: string; count: string }[]
     generatedAt: string
   }

   Содержимое отчёта:
   - Шапка: Логотип (текстом), "Конкурс студенческих проектов СочиГУ", дата генерации
   - Раздел 1: Сводная статистика (таблица: метрика / значение)
   - Раздел 2: Заявки по номинациям (таблица: Номинация / Количество)
   - Раздел 3: Топ-10 вузов (таблица)
   - Раздел 4: География участников (таблица)
   - Подпись: "Отчёт сгенерирован системой конкурса СочиГУ"

2. Подключи в AnalyticsPage.tsx:
   - Рендери <PrintReport ... /> с реальными данными
   - При клике "Генерировать PDF-отчёт" вызывай window.print()
```

---

## НЕДЕЛЯ 5 — Тестирование и инструкция

### Задача 5.1 — Полный сквозной тест

```
Проведи полный сквозной тест платформы sochigu-contest/

Убедись что весь флоу участника работает:

1. Регистрация:
   - Перейди на /register
   - Заполни все поля: ФИО, Email, пароль (мин. 8 символов), вуз, факультет, курс, город
   - Нажми "Зарегистрироваться"
   - Ожидаемый результат: редирект на /cabinet

2. Создание черновика заявки:
   - На /cabinet/application/new заполни форму (все 4 шага)
   - Шаг 1: выбери номинацию (должна загружаться из API)
   - Шаг 2: заполни название, описание, добавь ключевые слова и участника команды
   - Шаг 3: загрузи тестовый файл (PDF)
   - Шаг 4: сохрани черновик
   - Ожидаемый результат: заявка создана со статусом "Черновик"

3. Подача заявки:
   - На /cabinet/application нажми "Подать заявку"
   - Ожидаемый результат: статус изменился на "На проверке"

4. Вход в админ-панель:
   - Через базу данных (psql или pgAdmin) измени role пользователя на 'admin'
   - Войди снова через /login
   - Ожидаемый результат: редирект на /admin

5. Работа с заявкой в админке:
   - В /admin/applications найди заявку
   - Измени статус на "Принята", добавь комментарий
   - Нажми "Сохранить статус"
   - Ожидаемый результат: статус изменился, участник получил email (проверить логи)

6. Проверь аналитику /admin/analytics:
   - KPI карточки должны показывать реальные данные
   - Должен быть хотя бы 1 элемент в "Заявки по номинациям"

Если что-то не работает — зафиксируй ошибку и исправь.
После каждого исправления делай коммит.
```

---

### Задача 5.2 — Исправление багов backend

```
Проверь и исправь следующие потенциальные проблемы в sochigu-contest/backend/

1. Проверь что все модули импортированы в app.module.ts:
   - AuthModule, UsersModule, NominationsModule, ApplicationsModule
   - FilesModule, NewsModule, DocumentsModule, WinnersModule
   - AnalyticsModule, MailModule
   Если чего-то нет — добавь

2. Проверь что uploads папка существует и backend может в неё писать:
   Добавь в main.ts или app.module.ts:
   import * as fs from 'fs';
   const uploadDirs = ['./uploads', './uploads/docs'];
   uploadDirs.forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

3. Запусти backend в dev режиме (npm run start:dev) и проверь консоль на ошибки.
   Исправь все TypeScript ошибки которые найдёт компилятор.

4. Проверь что CORS настроен правильно (в main.ts):
   origin должен совпадать с FRONTEND_URL из .env

5. Проверь что документация маршрутов корректна — выполни curl-запросы:
   curl http://localhost:3000/api/nominations
   curl http://localhost:3000/api/news
   curl http://localhost:3000/api/winners
   Все должны вернуть [] (пустой массив) без ошибок авторизации.
```

---

### Задача 5.3 — Краткая инструкция для администратора

```
Создай файл sochigu-contest/ADMIN_GUIDE.md — краткая инструкция для администратора системы.

Содержимое файла:

# Инструкция администратора — Конкурс проектов СочиГУ

## Доступ к системе
- URL: https://PROJECT-Sochigu.sutr.ru
- Войти: /login (email + пароль)
- Для получения роли admin обратитесь к техническому администратору

## Основные разделы

### Заявки (/admin/applications)
- Просмотр всех заявок с фильтрами по номинации, статусу, вузу
- Изменение статуса с комментарием
- Скачивание файлов проектов
- Экспорт в Excel

### Статусная машина заявок
| Статус | Русское название | Когда использовать |
|--------|------------------|--------------------|
| draft | Черновик | Начальный статус |
| submitted | На проверке | После подачи участником |
| accepted | Принята | Заявка прошла первичный отбор |
| rejected | Отклонена | С обязательным комментарием-причиной |
| admitted | Допущена к очному этапу | Прошли заочный отбор |
| winner | Победитель | После очного этапа |
| runner_up | Призёр | Призовые места (2-е, 3-е) |

### Управление контентом (CMS)
- /admin/cms/news — Новости: создание, редактирование, публикация
- /admin/cms/documents — Документы: загрузка файлов для участников
- /admin/cms/winners — Победители: добавление с указанием года и места
- /admin/cms/nominations — Номинации: активация/деактивация, описания

### Аналитика (/admin/analytics)
- Сводная статистика в реальном времени
- Графики: по номинациям, динамика по дням, топ вузов
- Таблица географии участников
- Облако ключевых слов проектов
- Кнопка "Генерировать PDF-отчёт"

### Пользователи (/admin/users)
- Список всех зарегистрированных
- Назначение роли эксперта: /admin/experts

## Типичные задачи

### Как принять/отклонить заявку:
1. Открыть /admin/applications
2. Найти заявку (фильтры помогут)
3. Нажать "Просмотр"
4. В блоке "Смена статуса" выбрать новый статус
5. Если отклонение — обязательно заполнить поле "Комментарий"
6. Нажать "Сохранить статус"
7. Участник получит email автоматически

### Как добавить победителя:
1. /admin/cms/winners → "Добавить победителя"
2. Заполнить: место, год, название проекта, команда, номинация
3. Сохранить — победитель появится на публичной странице /winners

### Как опубликовать новость:
1. /admin/cms/news → "Создать новость"
2. Заполнить заголовок, slug, текст
3. Поставить галочку "Опубликовать"
4. Сохранить

## Техническая информация
- Backend API: http://localhost:3000/api
- База данных: PostgreSQL (sochigu_contest)
- Файлы загружаются в ./uploads/
- Email уведомления: настройте SMTP в .env
```
