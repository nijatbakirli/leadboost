/* ============================================================
   КОНФИГУРАЦИЯ САЙТА
   Единственный файл, который нужно править владельцу сайта.
   ============================================================ */

/* --- Приём заявок в Telegram ---
   Токен и chat_id НЕ хранятся здесь (и вообще нигде в клиентском
   коде): их видел бы любой посетитель сайта через devtools. Форма
   отправляется на серверную функцию /api/telegram (см. api/telegram.js),
   а сами значения задаются как переменные окружения TELEGRAM_BOT_TOKEN
   и TELEGRAM_CHAT_ID в настройках проекта на Vercel (Settings → Environment
   Variables), см. README.md, раздел «Публикация».                       */

/* Прямые контакты: кнопки WhatsApp / Instagram на сайте и запасной
   вариант, если форма не отправилась.                                  */
export const CONTACTS = {
  whatsapp: "https://wa.me/message/7AFNG7HRORNYD1",
  instagram: "https://www.instagram.com/leadboost_agency/",
  instagramHandle: "@leadboost_agency",
};

/* Честный счётчик: сколько мест РЕАЛЬНО свободно в этом месяце.
   Обновляйте вручную: на честности держится доверие.            */
export const SPOTS_LEFT = 3;
export const SPOTS_TOTAL = 3;

/* Рабочие часы для статуса «на связи». Считаются по часовому поясу
   владельца (WORK_TZ), а не посетителя: иначе гость из другого часового
   пояса видел бы «на связи» глубокой ночью.                          */
export const WORK_HOURS = { from: 9, to: 21 };
export const WORK_TZ = "Asia/Baku";

/* Сколько попаданий нужно в мини-игре и кодовое слово-приз */
export const GAME = { hitsToWin: 5, promoWord: "МЕТКИЙ" };
