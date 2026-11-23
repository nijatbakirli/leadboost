/* ============================================================
   КОНТЕНТ САЙТА
   Все тексты, списки и данные в одном месте, по языку.
   Правки текстов делаются здесь, не в разметке.
   Структура каждого языкового блока (ru/en) одинаковая:
   при добавлении элемента добавляйте его в оба. Казахскую версию
   владелец убрал 23.11.2026 (последняя в истории git, коммит a0949e6).

   Правило контента: только реальные цифры. Клиника ×4.1 и цитаты
   клиентов убраны (не были реальными). Скрины в PROOF, CASES и MORE настоящие,
   из Meta Ads Manager: цифры не правились, креативы клиентов размыты.
   ============================================================ */
/* крупные иконки услуг лежат файлами в img/icons/premium/*.svg
   (раньше были SVG внутри JS и утяжеляли и скрипт, и HTML) */
import { asset } from "./assets.js";

/* Скрины из кабинета (общие для всех языков: сами картинки на русском).
   Файлы лежат в img/results/, путь через asset() (см. src/assets.js).
   С четырёх скринов переписок срезана строка выбора периода (от неё
   оставалось обрезанное «…е 30 дней»), период указан в подписи. */
const SHOTS = {
  s4617: { src: asset("img/results/meta-4617-conversations.webp"), w: 764, h: 308 },
  s165: { src: asset("img/results/meta-165-conversations.webp"), w: 764, h: 308 },
  s52: { src: asset("img/results/meta-52-conversations.webp"), w: 764, h: 308 },
  s75: { src: asset("img/results/meta-75-conversations.webp"), w: 764, h: 336 },
  engagement: { src: asset("img/results/meta-campaign-engagement.webp"), w: 764, h: 235 },
  traffic: { src: asset("img/results/meta-campaign-traffic.webp"), w: 764, h: 214 },
  /* ноябрь 2026: карточка кампании «15 07» (превью креатива размыто) и лиды с сайта */
  s55: { src: asset("img/results/meta-campaign-55.webp"), w: 764, h: 235 },
  s22: { src: asset("img/results/meta-22-site-leads.webp"), w: 764, h: 348 },
};

/* ============================== RU ============================== */
const ru = {
  /* ниши в форме заявки (калькулятор убран в ноябре 2026) */
  NICHE_DATA: {
    ecommerce: { label: "Интернет-магазин" },
    clinic: { label: "Клиника / медицина" },
    education: { label: "Онлайн-обучение" },
    realestate: { label: "Недвижимость" },
    b2b: { label: "B2B-услуги" },
    massage: { label: "Массажный салон" },
    flower: { label: "Цветочный магазин" },
    coffee: { label: "Кофешоп" },
  },
  /* блок «С кем работаю»: ниша и что реклама в ней приводит (без иконок) */
  NICHES: [
    { label: "Интернет-магазины", desc: "заказы из Instagram и с сайта" },
    { label: "Клиники", desc: "запись на приём" },
    { label: "Онлайн-обучение", desc: "заявки на курсы и вебинары" },
    { label: "Недвижимость", desc: "заявки на просмотр и звонки" },
    { label: "B2B-услуги", desc: "заявки для отдела продаж" },
    { label: "Массажные салоны", desc: "запись на сеансы" },
    { label: "Цветочные магазины", desc: "заказы букетов" },
    { label: "Кофейни", desc: "гости из ближайших кварталов" },
  ],
  SERVICES: [
    {
      title: "Таргетированная реклама", badge: "основное", badgeCls: "main", icon: "ads",
      meta: "Instagram · Facebook · Threads · TikTok · Google",
      chips: ["Настройка на нужную аудиторию", "Путь клиента до покупки", "Слежу и улучшаю постоянно", "Показ тем, кто уже тебя видел"],
    },
    {
      title: "Создание сайтов", badge: "дополнительно", badgeCls: "side", icon: "webdev",
      meta: "Лендинг · Визитка · Интернет-магазин",
      chips: ["Лендинг под рекламную кампанию", "Сайт-визитка", "Интернет-магазин с оплатой", "Сайт сразу проектируется под рекламу", "Вместе с рекламой дешевле"],
    },
    {
      title: "Креативы", badge: null, badgeCls: "", icon: "design",
      meta: "Картинки · Видео · Тексты объявлений",
      chips: ["Рекламные картинки", "Короткие видео", "Тексты, которые останавливают скролл"],
    },
    {
      title: "Аналитика и отчёты", badge: null, badgeCls: "", icon: "analytics",
      meta: "Цифры по каждой кампании",
      chips: ["Сколько людей написали", "Во сколько обошёлся каждый", "План, что делать дальше"],
    },
  ],
  PRINCIPLES: [
    { title: "Запуск на первой неделе", front: "Первые объявления выходят в течение 7 дней после старта, без долгих согласований.", back: "Созвон в понедельник, к пятнице первые объявления уже крутятся. Никаких «ждём согласования креативов третью неделю»." },
    { title: "Цифры вместо слов", front: "Понятный отчёт каждую неделю или раз в 2 недели, по тарифу: сколько людей написали и во сколько это обошлось.", back: "Отчёт приходит в мессенджер, 5 строк. Условный пример: заявок 34, цена $3,8, тестируем новое видео." },
    { title: "Честно, даже если невыгодно", front: "Скажу прямо, если твоему бизнесу реклама сейчас не поможет.", back: "Если вижу, что реклама сейчас не окупится, говорю это на первом созвоне и объясняю, что поправить сначала." },
    { title: "Без договоров-ловушек", front: "Можно уйти в любой момент, без штрафов.", back: "Оплата помесячно. Не понравилось, просто не продлеваешь. Кабинет и все настройки остаются у тебя." },
  ],
  FIT_YES: [
    "Есть товар или услуга, и хотя бы пара человек их уже купили",
    "Есть бюджет на саму рекламу, от $600 в месяц (его ты платишь напрямую площадкам: Meta, TikTok, Google)",
    "Есть кто-то, кто будет отвечать людям, которые напишут",
    "Можешь подождать 3-4 недели до первых результатов",
  ],
  FIT_NO: [
    "Товара или услуги пока нет, или их ещё никто не покупал",
    "Нет денег на саму рекламу, только на мою работу",
    "Некому отвечать людям, которые напишут",
    "Клиенты нужны уже завтра, без времени на проверку",
  ],
  /* тарифы: слова в духе прайса clickforge.group/pricing (владелец, 22.11.2026):
     ситуация клиента одной строкой (sub), конкретные пункты, «Не входит» (excl).
     Оформление карточки прежнее. Только факты, которые уже есть на сайте; «до 4
     объявлений в месяц» не обещать, пока владелец не подтвердит */
  PLANS: [
    {
      name: "Базовый", price: "$350", popular: false,
      sub: "Нужны заявки из Instagram и Facebook, а вести рекламу некому.",
      features: ["Разбор текущей рекламы или запуск с нуля за 7 дней", "До запуска считаю, сколько тебе можно платить за заявку", "Каждую неделю проверяю цену заявки и отключаю слабые объявления", "Отчёт с цифрами раз в 2 недели", "Рекламный кабинет остаётся на твоё имя"],
      excl: "бюджет на рекламу",
    },
    {
      name: "Оптимальный", price: "$550", popular: true,
      sub: "Реклама уже даёт заявки, и ты хочешь больше по той же цене.",
      features: ["Всё из тарифа «Базовый»", "Вторая площадка: Google или TikTok", "Реклама на тех, кто уже был на сайте или писал тебе", "Отчёт с цифрами каждую неделю", "Созвон раз в неделю: что сработало и что меняем"],
      excl: "бюджет на рекламу",
    },
    {
      name: "Премиум", price: "$850", popular: false,
      sub: "Хочешь видеть, какие заявки стали продажами.",
      features: ["Всё из тарифа «Оптимальный», до трёх площадок", "Продажи из CRM передаю в Meta (CAPI), чтобы реклама училась на покупателях", "Связь 7 дней в неделю, отвечаю в приоритете"],
      excl: "бюджет на рекламу",
    },
  ],
  /* первый экран: цифра из кабинета (подробный разбор этого кейса первым в CASES) */
  PROOF: { big: "4 617", unit: "переписок", sub: "по $0,57 за каждую, $2 626 за 45 дней", shot: { ...SHOTS.s4617, alt: "Скрин Meta Ads Manager за весь период: 4 617 начатых переписок, $0,57 за переписку, потрачено $2 626,17, охват 325 552, показы 1 098 477" } },
  /* кейсы со скринами: ниша, срок (города убраны 23.11.2026), что было до, что сделал. Тексты из
     отчётов владельца по каждому скрину (ноябрь 2026), бренды скрыты по NDA */
  CASES: [
    {
      niche: "Интернет-магазин домашнего текстиля с доставкой по всей стране", period: "45 дней",
      big: "$0,57", unit: "за переписку", sub: "4 617 переписок, потрачено $2 626",
      before: "Когда дневной бюджет поднимали выше $15, цена заявки росла до $1,50 и выше, а объявления выгорали за неделю. Масштабировать рекламу на всю страну не получалось.",
      steps: [
        "Одна кампания с общим бюджетом на всю страну, без искусственного сужения аудитории.",
        "Шесть видео: распаковка комплектов, ткань крупным планом, отзывы. Первые 3 секунды обновлял каждые 10-14 дней.",
        "В чате настроил вопросы про комплект и город доставки, чтобы магазин успевал отвечать на 100+ переписок в день.",
      ],
      shots: [{ ...SHOTS.s4617, alt: "Скрин Meta Ads Manager за весь период: 4 617 начатых переписок, $0,57 за переписку, потрачено $2 626,17, охват 325 552, показы 1 098 477" }],
    },
    {
      niche: "Магазин женской одежды и обуви", period: "5 дней",
      big: "$0,21", unit: "за переписку", sub: "165 переписок за $35",
      before: "В рекламе стояли студийные фото с ценами в описании. Переписка стоила от $0,95 до $1,20, люди в примерочные приходили неровно.",
      steps: [
        "Вместо студийных фото живые видео примерок в шоуруме, размер и цену уточняют в чате.",
        "Широкая аудитория: женщины 20-45 лет, без узких интересов.",
        "Лучшее объявление поднял до $7 в день, цена переписки упала с $0,25 до $0,21.",
      ],
      shots: [{ ...SHOTS.s165, alt: "Скрин Meta Ads Manager: 165 начатых переписок, $0,21 за переписку, потрачено $35,06, охват 7 599, показы 10 852" }],
    },
    {
      niche: "Доставка готовой еды: суши и пицца", period: "2 дня",
      big: "$0,25", unit: "за переписку", sub: "52 переписки за $12,79",
      before: "Посты продвигали кнопкой «Продвигать» без ограничений по району. Переписка стоила от $1,10 до $1,40, и до 45% заявок приходило из районов, куда быстрая доставка не едет.",
      steps: [
        "Показ только в радиусе 3 км от кухни.",
        "Предложение: вечерний сет со скидкой 20% на первый заказ, вертикальные видео.",
        "В чате три кнопки: меню сетов, условия доставки, купон на скидку.",
      ],
      shots: [{ ...SHOTS.s52, alt: "Скрин Meta Ads Manager: 52 начатые переписки, $0,25 за переписку, потрачено $12,79, охват 2 789, показы 3 694" }],
    },
    {
      niche: "Павильон сезонной одежды, опт и розница", period: "5 дней",
      big: "$0,69", unit: "за переписку", sub: "55 переписок за $37,74",
      before: "Покупатели приходили только с рынка и из старой базы в мессенджерах. Новых клиентов из рекламы не было.",
      steps: [
        "Видео: проход по ряду до павильона и новая партия товара вживую.",
        "Кампания на переписки, широкая аудитория без узких интересов.",
        "Автоответ со схемой, как найти точку, и каталогом.",
      ],
      shots: [{ ...SHOTS.s55, alt: "Скрин кампании «Вовлеченность» в Meta Ads Manager: 55 начатых переписок, $0,69 за переписку, затраты $37,74" }],
    },
    {
      niche: "Студия аппаратной косметологии и эпиляции", period: "5 дней",
      big: "$0,67", unit: "за переписку", sub: "75 переписок за $50, по $10 в день",
      before: "В рекламе были стоковые картинки и сложные описания процедур. Заявка стоила от $2,50 до $3,20, и до 60% обращений не доходили до записи: администратор отвечал долго.",
      steps: [
        "Предложение на первый визит: три зоны по фиксированной цене.",
        "Картинки со списком выгод и живые видео кабинета.",
        "Ровно $10 в день и скрипт для администратора: запись за 3 сообщения.",
      ],
      shots: [{ ...SHOTS.s75, alt: "Скрин Meta Ads Manager: 75 начатых переписок, $0,67 за переписку, потрачено $50,12, дневной бюджет $10, охват 20 572, показы 29 456" }],
    },
    {
      niche: "Корпусная мебель и кухни на заказ", period: "3 дня",
      big: "$0,65", unit: "за заявку с сайта", sub: "22 заявки с телефоном за $14,35",
      before: "Реклама вела в переписку, и 80% диалогов заканчивались вопросом «сколько стоит метр?» без номера телефона.",
      steps: [
        "Реклама ведёт на сайт-квиз: расчёт стоимости кухни или шкафа за минуту и 3D-проект.",
        "Заявка засчитывается только после отправки формы с телефоном, так реклама учится на настоящих заказчиках.",
        "В объявлениях готовые кухни в интерьерах и цены в трёх комплектациях.",
      ],
      shots: [{ ...SHOTS.s22, alt: "Скрин Meta Ads Manager: 22 лида с сайта, $0,65 за лид, потрачено $14,35, охват 1 320, показы 2 280" }],
    },
  ],
  /* ещё результаты: два кейса без скринов (подтверждены владельцем) и трафик */
  MORE: [
    { label: "Онлайн-школа", big: "−61%", unit: "цена заявки", sub: "Цена заявки упала на 61% за месяц." },
    { label: "Интернет-магазин", big: "$1 500", unit: "выручки за 5 дней", sub: "Две кампании, первые 5 дней после запуска." },
    {
      label: "Трафик в Instagram", big: "$0,05", unit: "за визит в профиль", sub: "6,7 тыс. посещений профиля за $361. Рядом вторая кампания: 189 переписок по $1,74.",
      shots: [{ ...SHOTS.traffic, alt: "Скрин кампании «Трафик» в Meta Ads Manager: 6,7 тыс. посещений профиля Instagram, $0,05 за посещение, затраты $361,48" }, { ...SHOTS.engagement, alt: "Скрин кампании «Вовлеченность» в Meta Ads Manager: 189 начатых переписок, $1,74 за переписку, затраты $329,11" }],
    },
  ],
  /* что будет после заявки: 4 шага (пункт 29 разбора, ноябрь 2026; по методике
     таргетолога и фактам сайта: ответ в течение дня, запуск за 7 дней, отчёт по тарифу) */
  AFTER_STEPS: [
    { title: "Отвечаю в течение дня", text: "Пишешь в WhatsApp, Telegram или оставляешь заявку. Отвечаю сам и договариваемся о созвоне в удобное время." },
    { title: "Созвон 20-30 минут", text: "Разбираем, что ты продаёшь, кто покупает и кто отвечает людям после заявки. Считаем, сколько можно платить за заявку, чтобы реклама окупалась. Если сейчас не окупится, скажу сразу." },
    { title: "План и доступ", text: "Присылаю план первого месяца. Ты выбираешь тариф и добавляешь меня в свой рекламный кабинет: он остаётся твоим, бюджет на рекламу списывается с твоей карты." },
    { title: "Запуск и отчёты", text: "Первые объявления выходят в течение 7 дней. Первые 3 дня ничего не трогаю, реклама учится. Дальше убираю слабое, усиливаю сильное и присылаю отчёт каждую неделю или раз в 2 недели, по тарифу." },
  ],
  FAQS: [
    { q: "Как происходит оплата?", a: "Помесячно, переводом на карту или через Wise/Stripe, если ты за границей." },
    { q: "Сколько нужно на саму рекламу, помимо оплаты работы?", a: "Обычно от $600 в месяц. Эти деньги ты платишь напрямую площадкам (Meta, TikTok, Google) за показы. Точную цифру скажу на созвоне." },
    { q: "На каких площадках ведёшь рекламу?", a: "Instagram, Facebook и Threads (это один рекламный кабинет Meta), TikTok и Google. С какой площадки начать, решаем по нише и бюджету." },
    { q: "Можно заказать только сайт, без рекламы?", a: "Да. Но если делаем и то и другое, сайт сразу проектируется под рекламу, и вместе выходит дешевле, чем по отдельности." },
    { q: "Сколько стоит сайт?", a: "Зависит от сложности: от простого лендинга до интернет-магазина с оплатой. Цену и сроки скажу после короткого созвона." },
    { q: "Что если заявки есть, а продаж нет?", a: "Посмотрим вместе, что происходит после того, как человек написал. Иногда дело не в рекламе, и тогда я так и скажу." },
    { q: "А если через неделю не понравится?", a: "Просто разойдёмся, без штрафов и лишних вопросов." },
  ],
  /* ленты под первым экраном: что делаю × где */
  TAPE_WHAT: ["Таргет", "Сайты", "Креативы", "Аналитика"],
  TAPE_WHERE: ["Instagram", "Facebook", "TikTok", "Threads", "Google"],
};

/* ============================== EN ============================== */
const en = {
  NICHE_DATA: {
    ecommerce: { label: "Online store" },
    clinic: { label: "Clinic / medical" },
    education: { label: "Online education" },
    realestate: { label: "Real estate" },
    b2b: { label: "B2B services" },
    massage: { label: "Massage salon" },
    flower: { label: "Flower shop" },
    coffee: { label: "Coffee shop" },
  },
  NICHES: [
    { label: "Online stores", desc: "orders from Instagram and your site" },
    { label: "Clinics", desc: "appointment bookings" },
    { label: "Online education", desc: "sign-ups for courses and webinars" },
    { label: "Real estate", desc: "viewing requests and calls" },
    { label: "B2B services", desc: "leads for your sales team" },
    { label: "Massage salons", desc: "session bookings" },
    { label: "Flower shops", desc: "bouquet orders" },
    { label: "Coffee shops", desc: "guests from the neighborhood" },
  ],
  SERVICES: [
    {
      title: "Targeted advertising", badge: "core", badgeCls: "main", icon: "ads",
      meta: "Instagram · Facebook · Threads · TikTok · Google",
      chips: ["Targeting the right audience", "Customer journey to purchase", "Ongoing monitoring and optimization", "Retargeting people who already saw you"],
    },
    {
      title: "Website development", badge: "add-on", badgeCls: "side", icon: "webdev",
      meta: "Landing page · Business site · Online store",
      chips: ["A landing page built for an ad campaign", "A simple business site", "An online store with payments", "Sites are designed for advertising from day one", "Cheaper when bundled with advertising"],
    },
    {
      title: "Creatives", badge: null, badgeCls: "", icon: "design",
      meta: "Images · Video · Ad copy",
      chips: ["Ad images", "Short-form video", "Copy that stops the scroll"],
    },
    {
      title: "Analytics and reporting", badge: null, badgeCls: "", icon: "analytics",
      meta: "Numbers for every campaign",
      chips: ["How many people messaged", "Cost per lead", "A plan for what to do next"],
    },
  ],
  PRINCIPLES: [
    { title: "Live in the first week", front: "The first ads go live within 7 days of kickoff, no lengthy approvals.", back: "A call on Monday, first ads running by Friday. No “we're still approving creatives in week three.”" },
    { title: "Numbers, not words", front: "A clear report every week or every 2 weeks, depending on the plan: how many people messaged and what it cost.", back: "The report arrives in a chat, 5 lines. Illustrative example: leads 34, cost $3.8, testing a new video." },
    { title: "Honest, even when it costs me", front: "I'll tell you straight if advertising won't help your business right now.", back: "If I see that ads won't pay off right now, I say so on the first call and explain what to fix first." },
    { title: "No lock-in contracts", front: "You can leave any time, with no penalties.", back: "Month-to-month billing. Didn't like it, just don't renew. The ad account and every setting stay yours." },
  ],
  FIT_YES: [
    "You already have a product or service, and at least a couple of people have bought it",
    "There's a budget for the ads themselves, from $600 a month (you pay it directly to the platforms: Meta, TikTok, Google)",
    "There's someone who will respond to people who message you",
    "You can wait 3-4 weeks for the first results",
  ],
  FIT_NO: [
    "You don't have a product or service yet, or nobody has bought it yet",
    "There's no budget for the ads themselves, only for my work",
    "There's nobody to respond to people who message you",
    "You need customers by tomorrow, with no time to test",
  ],
  PLANS: [
    {
      name: "Basic", price: "$350", popular: false,
      sub: "You need leads from Instagram and Facebook and no one to run the ads.",
      features: ["An audit of your current ads or a launch from scratch within 7 days", "Before launch I work out what you can afford to pay per lead", "Cost per lead checked every week, weak ads switched off", "A report with numbers every 2 weeks", "The ad account stays in your name"],
      excl: "ad budget",
    },
    {
      name: "Optimal", price: "$550", popular: true,
      sub: "Your ads already bring leads and you want more at the same cost.",
      features: ["Everything in Basic", "A second platform: Google or TikTok", "Ads to people who already visited your site or messaged you", "A report with numbers every week", "A weekly call: what worked and what changes next"],
      excl: "ad budget",
    },
    {
      name: "Premium", price: "$850", popular: false,
      sub: "You want to see which leads turned into sales.",
      features: ["Everything in Optimal, up to three platforms", "Sales from your CRM sent to Meta (CAPI), so the ads learn from buyers", "Contact 7 days a week, priority replies"],
      excl: "ad budget",
    },
  ],
  /* первый экран: цифра из кабинета (подробный разбор этого кейса первым в CASES) */
  PROOF: { big: "4,617", unit: "conversations", sub: "$0.57 each, $2,626 over 45 days", shot: { ...SHOTS.s4617, alt: "Meta Ads Manager screenshot, all time: 4,617 conversations started, $0.57 per conversation, $2,626.17 spent, reach 325,552, impressions 1,098,477" } },
  /* кейсы со скринами: ниша, срок (города убраны 23.11.2026), что было до, что сделал. Тексты из
     отчётов владельца по каждому скрину (ноябрь 2026), бренды скрыты по NDA */
  CASES: [
    {
      niche: "Online store for home textiles, shipping nationwide", period: "45 days",
      big: "$0.57", unit: "per conversation", sub: "4,617 conversations, $2,626 spent",
      before: "Whenever the daily budget went above $15, the cost per lead jumped to $1.50 or more, and ads burned out within a week. Scaling to the whole country wasn't working.",
      steps: [
        "One campaign with a shared budget for the whole country, without artificially narrowing the audience.",
        "Six videos: unboxing the sets, close-ups of the fabric, reviews. I refreshed the first 3 seconds every 10-14 days.",
        "Set up questions in the chat about the set and the delivery city, so the store could keep up with 100+ conversations a day.",
      ],
      shots: [{ ...SHOTS.s4617, alt: "Meta Ads Manager screenshot, all time: 4,617 conversations started, $0.57 per conversation, $2,626.17 spent, reach 325,552, impressions 1,098,477" }],
    },
    {
      niche: "Women's clothing and shoe store", period: "5 days",
      big: "$0.21", unit: "per conversation", sub: "165 conversations for $35",
      before: "The ads used studio photos with prices in the caption. A conversation cost $0.95 to $1.20, and fitting-room traffic was uneven.",
      steps: [
        "Live try-on videos in the showroom instead of studio photos; size and price are clarified in the chat.",
        "Broad audience: women aged 20-45, no narrow interests.",
        "Scaled the best ad to $7 a day; the cost per conversation dropped from $0.25 to $0.21.",
      ],
      shots: [{ ...SHOTS.s165, alt: "Meta Ads Manager screenshot: 165 conversations started, $0.21 per conversation, $35.06 spent, reach 7,599, impressions 10,852" }],
    },
    {
      niche: "Food delivery: sushi and pizza", period: "2 days",
      big: "$0.25", unit: "per conversation", sub: "52 conversations for $12.79",
      before: "Posts were promoted with the “Boost” button without any area limits. A conversation cost $1.10 to $1.40, and up to 45% of requests came from areas that fast delivery doesn't reach.",
      steps: [
        "Ads shown only within 3 km of the kitchen.",
        "Offer: an evening set with 20% off the first order, vertical videos.",
        "Three buttons in the chat: set menu, delivery terms, discount coupon.",
      ],
      shots: [{ ...SHOTS.s52, alt: "Meta Ads Manager screenshot: 52 conversations started, $0.25 per conversation, $12.79 spent, reach 2,789, impressions 3,694" }],
    },
    {
      niche: "Seasonal clothing stall, wholesale and retail", period: "5 days",
      big: "$0.69", unit: "per conversation", sub: "55 conversations for $37.74",
      before: "Buyers came only from foot traffic at the market and an old contact list in messengers. The ads brought in no new customers.",
      steps: [
        "Video: a walk down the row to the stall and the new stock shown live.",
        "A campaign optimized for conversations, broad audience without narrow interests.",
        "An auto-reply with a map of how to find the stall and a catalog.",
      ],
      shots: [{ ...SHOTS.s55, alt: "Screenshot of an Engagement campaign in Meta Ads Manager: 55 conversations started, $0.69 per conversation, $37.74 spent" }],
    },
    {
      niche: "Hardware cosmetology and hair removal studio", period: "5 days",
      big: "$0.67", unit: "per conversation", sub: "75 conversations for $50, at $10 a day",
      before: "The ads used stock images and complicated procedure descriptions. A lead cost $2.50 to $3.20, and up to 60% of inquiries never turned into bookings because the admin replied slowly.",
      steps: [
        "A first-visit offer: three areas at a fixed price.",
        "Images listing the benefits and live videos of the treatment room.",
        "A steady $10 a day and a script for the admin: a booking in 3 messages.",
      ],
      shots: [{ ...SHOTS.s75, alt: "Meta Ads Manager screenshot: 75 conversations started, $0.67 per conversation, $50.12 spent, daily budget $10, reach 20,572, impressions 29,456" }],
    },
    {
      niche: "Custom cabinet furniture and kitchens", period: "3 days",
      big: "$0.65", unit: "per website lead", sub: "22 leads with a phone number for $14.35",
      before: "Ads led to chats, and 80% of conversations ended with “how much per meter?” and no phone number.",
      steps: [
        "The ads lead to a quiz website: a kitchen or wardrobe price estimate in a minute and a 3D design.",
        "A lead only counts once the form with a phone number is sent, so the ads learn from real buyers.",
        "The ads show finished kitchens in real interiors and prices in three packages.",
      ],
      shots: [{ ...SHOTS.s22, alt: "Meta Ads Manager screenshot: 22 website leads, $0.65 per lead, $14.35 spent, reach 1,320, impressions 2,280" }],
    },
  ],
  /* ещё результаты: два кейса без скринов (подтверждены владельцем) и трафик */
  MORE: [
    { label: "Online school", big: "−61%", unit: "cost per lead", sub: "Cost per lead dropped 61% in a month." },
    { label: "Online store", big: "$1,500", unit: "revenue in 5 days", sub: "Two campaigns, the first 5 days after launch." },
    {
      label: "Instagram traffic", big: "$0.05", unit: "per profile visit", sub: "6.7k profile visits for $361. Next to it, a second campaign: 189 conversations at $1.74.",
      shots: [{ ...SHOTS.traffic, alt: "Meta Ads Manager screenshot of a Traffic campaign: 6.7k Instagram profile visits, $0.05 per visit, $361.48 spent" }, { ...SHOTS.engagement, alt: "Meta Ads Manager screenshot of an Engagement campaign: 189 conversations started, $1.74 per conversation, $329.11 spent" }],
    },
  ],
  /* что будет после заявки: 4 шага (пункт 29 разбора, ноябрь 2026; по методике
     таргетолога и фактам сайта: ответ в течение дня, запуск за 7 дней, отчёт по тарифу) */
  AFTER_STEPS: [
    { title: "I reply within a day", text: "Message me on WhatsApp or Telegram, or send a request. I reply myself and we set up a call at a time that suits you." },
    { title: "A 20-30 minute call", text: "We go over what you sell, who buys it and who answers people after they get in touch. We work out how much you can pay per lead for the ads to pay off. If they won't pay off right now, I'll tell you straight away." },
    { title: "Plan and access", text: "I send a plan for the first month. You choose a tier and add me to your ad account: it stays yours, and the ad budget is charged to your card." },
    { title: "Launch and reports", text: "The first ads go live within 7 days. For the first 3 days I change nothing while the ads learn. Then I cut what's weak, scale what works, and send a report every week or every 2 weeks, depending on the tier." },
  ],
  FAQS: [
    { q: "How does payment work?", a: "Monthly, by card transfer, or via Wise/Stripe if you're abroad." },
    { q: "How much do the ads themselves cost, on top of your fee?", a: "Usually from $600 a month. You pay that directly to the platforms (Meta, TikTok, Google) for impressions. I'll give you an exact figure on a call." },
    { q: "Which platforms do you run ads on?", a: "Instagram, Facebook and Threads (all in one Meta ad account), TikTok and Google. We pick where to start based on the niche and the budget." },
    { q: "Can I order just a website, without advertising?", a: "Yes. But if we do both, the site is designed for advertising from the start, and together it works out cheaper than separately." },
    { q: "How much does a website cost?", a: "Depends on complexity: from a simple landing page to an online store with payments. I'll give you a price and timeline after a short call." },
    { q: "What if I get leads but no sales?", a: "We'll look together at what happens after someone messages you. Sometimes the issue isn't the ads, and if so, I'll say so." },
    { q: "What if I don't like it after a week?", a: "We simply part ways, no penalties and no awkward questions." },
  ],
  TAPE_WHAT: ["Targeting", "Websites", "Creatives", "Analytics"],
  TAPE_WHERE: ["Instagram", "Facebook", "TikTok", "Threads", "Google"],
};

export const CONTENT = { ru, en };
