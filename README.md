# LeadBoost — лендинг

## Структура

```
leadboost-final/
├── index.html          — прод-страница (подключает dist/)
├── package.json        — зависимости и скрипты
├── src/                — исходники (чистая архитектура)
│   ├── main.jsx        — точка входа
│   ├── App.jsx         — ТОЛЬКО композиция и разметка секций
│   ├── config.js       — НАСТРОЙКИ ВЛАДЕЛЬЦА: токены, места, часы работы
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

## Публикация

На хостинг (Vercel/Netlify/любой): залейте `index.html` + папку `dist/`.

## Перед запуском — src/config.js

1. `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — иначе форма покажет ошибку
2. `NOTIFY_EMAIL`
3. `SPOTS_LEFT` — честное число свободных мест
Тексты и цены правятся в `src/data.jsx`, имя в блоке «Обо мне» — там же.

⚠️ Токен бота в клиентском коде видят посетители. Для продакшена — серверная
функция (поможем при деплое).
