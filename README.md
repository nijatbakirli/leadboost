# LeadBoost — лендинг

## Структура

```
leadboost-final/
├── index.html          — прод-страница (подключает dist/)
├── package.json        — зависимости и скрипты
├── api/
│   └── telegram.js     — серверная функция (Vercel): форма → Telegram,
│                          токен только тут, как переменная окружения
├── src/                — исходники (чистая архитектура)
│   ├── main.jsx        — точка входа
│   ├── App.jsx         — ТОЛЬКО композиция и разметка секций
│   ├── config.js       — НАСТРОЙКИ ВЛАДЕЛЬЦА: места, часы работы, почта
│   ├── data.jsx        — ВЕСЬ КОНТЕНТ: тексты, тарифы, кейсы, FAQ
│   ├── interactions.jsx— вся императивная логика (хуки с JSDoc)
│   ├── styles.css      — все стили
│   ├── icons.jsx       — SVG-иконки
│   ├── hooks.jsx       — базовые хуки (useReveal / Reveal / useTween)
│   ├── widgets.jsx     — Scramble, WordReveal, счётчики, мини-игра
│   └── logo.png        — логотип
├── dist/               — минифицированная сборка (~60 КБ js + ~7 КБ css в gzip)
└── docs/
    └── CODE_REVIEW.md  — отчёт код-ревью
```

## Запуск

**Локально:**
```bash
npx serve .
```
и откройте выданный адрес — загрузится index.html + dist/.

**Разработка (правки кода):**
```bash
npm install
npm run dev       # http://localhost:8000, автопересборка
npm run build     # свежая минифицированная сборка в dist/
```

## Публикация (Vercel)

1. Импортировать GitHub-репозиторий в Vercel (New Project → выбрать репо).
2. В настройках проекта: Settings → Environment Variables → добавить
   `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` (значения — из @BotFather и
   `getUpdates`, см. историю переписки/чата). Без них форма отправки
   вернёт ошибку 500 — это единственное место, где токен теперь хранится.
3. Deploy — Vercel сам подхватит `npm run build` и папку `api/` как
   серверные функции.

Локально (`npm run dev`) папка `api/` не выполняется — esbuild это просто
статический сервер, серверные функции работают только на Vercel (или через
`vercel dev`, если он установлен). Форма в dev-режиме уйдёт в mailto-фолбэк
— это ожидаемо, не баг.

## Перед запуском — src/config.js

1. `NOTIFY_EMAIL` — сейчас плейсхолдер `you@example.com`
2. `SPOTS_LEFT` — честное число свободных мест
Тексты и цены правятся в `src/data.jsx`, имя в блоке «Обо мне» — там же.
