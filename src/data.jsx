/* ============================================================
   КОНТЕНТ САЙТА
   Все тексты, списки и данные — в одном месте, по языку.
   Правки текстов делаются здесь, не в разметке.
   Структура каждого языкового блока (ru/kk/en) одинаковая —
   при добавлении элемента добавляйте его во все три.
   ============================================================ */
import React from "react";
import {
  IconBag, IconCrossMed, IconBook, IconBuilding,
  IconBriefcase, IconSpa, IconFlower, IconCoffee,
  IconCamera, IconNote, IconAt, IconSearch, IconLike,
  IconAds, IconWebDev, IconDesign, IconAnalyticsP,
  IconConsultation, IconStrategy, IconKPI, IconTransparency,
} from "./icons.jsx";

/* ============================== RU ============================== */
const ru = {
  NICHE_DATA: {
    ecommerce: { label: "интернет-магазин", cpl: 4.2, roas: "310–420%" },
    clinic: { label: "клиника / медицина", cpl: 9.1, roas: "260–340%" },
    education: { label: "онлайн-обучение", cpl: 5.9, roas: "290–380%" },
    realestate: { label: "недвижимость", cpl: 12.4, roas: "220–300%" },
    b2b: { label: "b2b-услуги", cpl: 9.9, roas: "240–330%" },
    massage: { label: "массажный салон", cpl: 3.4, roas: "250–330%" },
    flower: { label: "цветочный магазин", cpl: 2.3, roas: "200–280%" },
    coffee: { label: "кофешоп", cpl: 1.7, roas: "180–250%" },
  },
  NICHES: [
    { icon: IconBag, label: "интернет-магазины" },
    { icon: IconCrossMed, label: "клиники" },
    { icon: IconBook, label: "онлайн-обучение" },
    { icon: IconBuilding, label: "недвижимость" },
    { icon: IconBriefcase, label: "b2b-услуги" },
    { icon: IconSpa, label: "массажный салон" },
    { icon: IconFlower, label: "цветочный магазин" },
    { icon: IconCoffee, label: "кофешоп" },
  ],
  SERVICES: [
    {
      title: "Таргетированная реклама", badge: "основное", badgeCls: "main", icon: IconAds,
      meta: "Instagram · Google · отчёты каждую неделю",
      chips: ["Настройка на нужную аудиторию", "Путь клиента до покупки", "Понятные еженедельные отчёты", "Слежу и улучшаю постоянно", "Показ тем, кто уже вас видел"],
    },
    {
      title: "Создание сайтов", badge: "дополнительно", badgeCls: "side", icon: IconWebDev,
      meta: "Лендинг · Визитка · Интернет-магазин",
      chips: ["Лендинг под рекламную кампанию", "Сайт-визитка", "Интернет-магазин с оплатой", "Сайт сразу проектируется под рекламу", "Вместе с рекламой — дешевле"],
    },
    {
      title: "Креативы", badge: null, badgeCls: "", icon: IconDesign,
      meta: "Картинки · Видео · Тексты объявлений",
      chips: ["Рекламные картинки", "Короткие видео", "Тексты, которые останавливают скролл"],
    },
    {
      title: "Аналитика и отчёты", badge: null, badgeCls: "", icon: IconAnalyticsP,
      meta: "Простые цифры без сложных слов",
      chips: ["Сколько людей написали", "Во сколько обошёлся каждый", "Что делать дальше — план"],
    },
  ],
  PRINCIPLES: [
    { n: "01", icon: IconStrategy, title: "Запуск на первой неделе.", front: "Первые объявления выходят в течение 7 дней после старта — без долгих согласований.", back: "На практике: созвон в понедельник — первые объявления крутятся уже к пятнице. Никаких «ждём согласования креативов третью неделю»." },
    { n: "02", icon: IconKPI, title: "Цифры вместо слов.", front: "Каждую неделю — понятный отчёт: сколько людей написали и во сколько это обошлось.", back: "На практике: каждую пятницу — 5 строк в мессенджер. Заявок: 34. Цена: $3.8. Что меняем: тестируем новое видео. Всё." },
    { n: "03", icon: IconConsultation, title: "Честно — даже если невыгодно.", front: "Скажу прямо, если вашему бизнесу реклама сейчас не поможет.", back: "На практике: примерно каждому четвёртому на диагностике я отказываю — и говорю, что исправить, чтобы реклама начала иметь смысл." },
    { n: "04", icon: IconTransparency, title: "Без договоров-ловушек.", front: "Можно уйти в любой момент. Остаюсь, потому что работает, а не потому что подписано.", back: "На практике: оплата помесячно. Не понравилось — не продлеваете, кабинет и все настройки остаются у вас." },
  ],
  FIT_YES: [
    "У вас уже есть товар или услуга, и хотя бы пара человек её купили",
    "Готовы платить за саму рекламу отдельно — от $600/мес (это не мне, а Instagram/Google)",
    "Есть кто-то, кто будет отвечать людям, которые напишут",
    "Готовы подождать 3-4 недели на первые результаты",
  ],
  FIT_NO: [
    "Товара или услуги пока нет, или его ещё никто не покупал",
    "Нет денег на саму рекламу — только на мою работу",
    "Некому отвечать людям, которые напишут",
    "Нужны клиенты уже завтра, без времени на проверку",
  ],
  PLANS: [
    {
      name: "Базовый", price: "$170", sub: "Одна площадка (например, только Instagram)", popular: false,
      features: ["Настрою или проверю рекламу на одной площадке", "До 2 новых объявлений в месяц", "Отчёт раз в 2 недели", "Связь в мессенджере"],
    },
    {
      name: "Оптимальный", price: "$290", sub: "Одна-две площадки, веду всё сам", popular: true,
      features: ["Всё из тарифа «Базовый»", "До 2 каналов (Instagram + Google)", "Еженедельные отчёты с цифрами", "Показ тем, кто уже вас видел", "Личные созвоны раз в неделю"],
    },
    {
      name: "Премиум", price: "$490", sub: "До трёх площадок + готовые картинки и видео", popular: false,
      features: ["Всё из тарифа «Оптимальный»", "До 3 каналов", "Картинки и видео — тоже делаю я", "Весь путь клиента — от рекламы до покупки", "Приоритетная связь 7 дней в неделю"],
    },
  ],
  WORK_CASES: [
    { tag: "КЕЙС / 01", title: "Заявки для клиники", name: "Клиника, Алматы", cat: "Медицина · Реклама", desc: "Рост выручки в 4.1 раза за 12 дней. Заявок за месяц больше, чем за предыдущие полгода.", bg: "radial-gradient(120% 100% at 20% 10%, #3E3A2C 0%, #191813 55%, #0E0E0C 100%)" },
    { tag: "КЕЙС / 02", title: "Дешевле почти вдвое", name: "Онлайн-школа", cat: "Обучение · Реклама", desc: "Цена заявки упала на 61% за месяц. Клиент наконец видит, куда уходит каждый доллар бюджета.", bg: "radial-gradient(120% 100% at 80% 15%, #2C3A3E 0%, #131919 55%, #0C0E0E 100%)" },
    { tag: "КЕЙС / 03", title: "Продажи за 5 дней", name: "Интернет-магазин", cat: "E-commerce · Реклама", desc: "$1 500 выручки с двух кампаний за первые 5 дней после запуска.", bg: "radial-gradient(120% 100% at 25% 80%, #3E2C38 0%, #191317 55%, #0E0C0E 100%)" },
    { tag: "СКОРО", title: "Первый сайт-проект", name: "Ваш проект?", cat: "Веб-разработка", desc: "Новое направление — здесь появится первый опубликованный сайт. Возможно, ваш.", bg: "radial-gradient(120% 100% at 75% 75%, #38381F 0%, #171712 55%, #0D0D0B 100%)" },
  ],
  METRIC_NOTES: [
    { tag: "КЛИНИКА / 12 ДНЕЙ", big: "×4.1", h: "Рост выручки", p: "«За месяц заявок больше, чем за предыдущие полгода».", glow: "radial-gradient(75% 60% at 30% 25%, rgba(236,234,13,0.35), transparent 65%)" },
    { tag: "ОНЛАЙН-ШКОЛА / МЕСЯЦ", big: "-61%", h: "Цена заявки", p: "«Наконец вижу, куда уходит рекламный бюджет».", glow: "radial-gradient(75% 60% at 60% 30%, rgba(120,110,255,0.4), transparent 65%)" },
    { tag: "МАГАЗИН / 5 ДНЕЙ", big: "$1 500", h: "Выручка с двух кампаний", p: "«Настроил и объяснил каждую цифру в отчёте».", glow: "radial-gradient(75% 60% at 40% 70%, rgba(217,106,69,0.4), transparent 65%)" },
  ],
  FAQS: [
    { q: "Как происходит оплата?", a: "Переводом на карту или через Wise/Stripe, если вы за границей. Договоримся заранее, без скрытых комиссий." },
    { q: "Сколько нужно бюджета на рекламу, отдельно от вашей оплаты?", a: "Обычно от $600 в месяц — это деньги, которые вы платите не мне, а напрямую Instagram/Google за показы. Точную цифру скажу на созвоне." },
    { q: "Можно заказать только сайт, без рекламы?", a: "Да. Но если делаем и то, и другое вместе — сайт сразу проектируется под рекламу, и это выходит дешевле, чем заказывать по отдельности." },
    { q: "Сколько стоит сайт?", a: "Зависит от сложности — от простого лендинга до интернет-магазина с оплатой. Цену и сроки скажу после короткого созвона." },
    { q: "Что если заявки есть, а продаж нет?", a: "Посмотрим вместе, что происходит после того, как человек написал. Иногда дело не в рекламе — скажу честно, если так." },
    { q: "А если не понравится через неделю?", a: "Просто разойдёмся, без штрафов и лишних вопросов." },
  ],
  KPI_PHRASES: [
    <>сегодня в работе: <b>оптимизация кампании</b></>,
    <>средний ROAS клиентов: <b>310%+</b></>,
    <>ответ на заявку: <b>в течение 24 ч</b></>,
    <>первая реклама: <b>на первой неделе</b></>,
  ],
  MARQUEE_ITEMS: [
    { label: "Таргет", icon: IconAds },
    { label: "Сайты", icon: IconWebDev },
    { label: "Креативы", icon: IconDesign },
    { label: "Аналитика", icon: IconAnalyticsP },
    { label: "Instagram", icon: IconCamera },
    { label: "Facebook", icon: IconLike },
    { label: "TikTok", icon: IconNote },
    { label: "Threads", icon: IconAt },
    { label: "Google", icon: IconSearch },
  ],
};

/* ============================== KK ============================== */
const kk = {
  NICHE_DATA: {
    ecommerce: { label: "интернет-дүкен", cpl: 4.2, roas: "310–420%" },
    clinic: { label: "клиника / медицина", cpl: 9.1, roas: "260–340%" },
    education: { label: "онлайн-оқыту", cpl: 5.9, roas: "290–380%" },
    realestate: { label: "жылжымайтын мүлік", cpl: 12.4, roas: "220–300%" },
    b2b: { label: "b2b-қызметтер", cpl: 9.9, roas: "240–330%" },
    massage: { label: "массаж салоны", cpl: 3.4, roas: "250–330%" },
    flower: { label: "гүл дүкені", cpl: 2.3, roas: "200–280%" },
    coffee: { label: "кофехана", cpl: 1.7, roas: "180–250%" },
  },
  NICHES: [
    { icon: IconBag, label: "интернет-дүкендер" },
    { icon: IconCrossMed, label: "клиникалар" },
    { icon: IconBook, label: "онлайн-оқыту" },
    { icon: IconBuilding, label: "жылжымайтын мүлік" },
    { icon: IconBriefcase, label: "b2b-қызметтер" },
    { icon: IconSpa, label: "массаж салоны" },
    { icon: IconFlower, label: "гүл дүкені" },
    { icon: IconCoffee, label: "кофехана" },
  ],
  SERVICES: [
    {
      title: "Мақсатты жарнама", badge: "негізгі", badgeCls: "main", icon: IconAds,
      meta: "Instagram · Google · апта сайын есеп",
      chips: ["Керек аудиторияға баптау", "Клиенттің сатып алуға дейінгі жолы", "Түсінікті апта сайынғы есептер", "Үнемі қадағалап, жақсартамын", "Сізді бұрын көргендерге көрсету"],
    },
    {
      title: "Сайт жасау", badge: "қосымша", badgeCls: "side", icon: IconWebDev,
      meta: "Лендинг · Визитка · Интернет-дүкен",
      chips: ["Жарнама науқанына арналған лендинг", "Визитка-сайт", "Төлемі бар интернет-дүкен", "Сайт бірден жарнамаға лайықталып жобаланады", "Жарнамамен бірге — арзанырақ"],
    },
    {
      title: "Креативтер", badge: null, badgeCls: "", icon: IconDesign,
      meta: "Суреттер · Видео · Жарнама мәтіндері",
      chips: ["Жарнамалық суреттер", "Қысқа видеолар", "Скроллды тоқтататын мәтіндер"],
    },
    {
      title: "Аналитика және есептер", badge: null, badgeCls: "", icon: IconAnalyticsP,
      meta: "Күрделі сөздерсіз қарапайым цифрлар",
      chips: ["Қанша адам жазды", "Әрқайсысы қанша тұрды", "Әрі қарай не істеу керек — жоспар"],
    },
  ],
  PRINCIPLES: [
    { n: "01", icon: IconStrategy, title: "Бірінші аптада іске қосу.", front: "Алғашқы хабарландырулар бастаудан кейін 7 күн ішінде шығады — ұзақ келісусіз.", back: "Іс жүзінде: дүйсенбіде қоңырау — жұмада алғашқы хабарландырулар қосылады. «Креативтерді үшінші апта келісіп жатырмыз» деген жоқ." },
    { n: "02", icon: IconKPI, title: "Сөздің орнына цифрлар.", front: "Әр апта сайын түсінікті есеп: қанша адам жазды және бұл қанша тұрды.", back: "Іс жүзінде: әр жұма сайын мессенджерге 5 жол. Өтінімдер: 34. Баға: $3.8. Не өзгертеміз: жаңа видеоны сынаймыз. Бәрі осы." },
    { n: "03", icon: IconConsultation, title: "Тиімсіз болса да — адал.", front: "Егер қазір жарнама бизнесіңізге көмектеспейтін болса, тікелей айтамын.", back: "Іс жүзінде: диагностикада шамамен әрбір төртінші адамға бас тартамын — және жарнама мағыналы болу үшін нені түзету керектігін айтамын." },
    { n: "04", icon: IconTransparency, title: "Тұзақ келісімшартсыз.", front: "Кез келген уақытта кетуге болады. Мен қаламын, өйткені бұл жұмыс істейді, қол қойылғаны үшін емес.", back: "Іс жүзінде: ай сайынғы төлем. Ұнамаса — жаңартпайсыз, кабинет пен барлық баптаулар өзіңізде қалады." },
  ],
  FIT_YES: [
    "Тауарыңыз немесе қызметіңіз бар, және оны кем дегенде бірнеше адам сатып алған",
    "Жарнаманың өзіне бөлек төлеуге дайынсыз — айына $600-ден (бұл маған емес, Instagram/Google-ге)",
    "Жазған адамдарға жауап беретін біреу бар",
    "Алғашқы нәтижелерді 3-4 апта күтуге дайынсыз",
  ],
  FIT_NO: [
    "Тауар немесе қызмет әлі жоқ, немесе оны әлі ешкім сатып алған жоқ",
    "Жарнаманың өзіне ақша жоқ — тек менің жұмысыма ғана",
    "Жазған адамдарға жауап беретін ешкім жоқ",
    "Клиенттер ертең-ақ керек, тексеруге уақыт жоқ",
  ],
  PLANS: [
    {
      name: "Негізгі", price: "$170", sub: "Бір алаң (мысалы, тек Instagram)", popular: false,
      features: ["Бір алаңда жарнаманы баптаймын немесе тексеремін", "Айына 2-ге дейін жаңа хабарландыру", "2 аптада бір рет есеп", "Мессенджерде байланыс"],
    },
    {
      name: "Оптималды", price: "$290", sub: "Бір-екі алаң, бәрін өзім жүргіземін", popular: true,
      features: ["«Негізгі» тарифінің бәрі", "2 арнаға дейін (Instagram + Google)", "Цифрлары бар апта сайынғы есептер", "Сізді бұрын көргендерге көрсету", "Аптасына бір рет жеке қоңырау"],
    },
    {
      name: "Премиум", price: "$490", sub: "Үш алаңға дейін + дайын суреттер мен видео", popular: false,
      features: ["«Оптималды» тарифінің бәрі", "3 арнаға дейін", "Суреттер мен видеоны да мен жасаймын", "Клиенттің толық жолы — жарнамадан сатып алуға дейін", "Аптаның 7 күні басым байланыс"],
    },
  ],
  WORK_CASES: [
    { tag: "КЕЙС / 01", title: "Клиникаға өтінімдер", name: "Клиника, Алматы", cat: "Медицина · Жарнама", desc: "12 күнде түсім 4.1 есе өсті. Айына өтінімдер алдыңғы жарты жылдан да көп болды.", bg: "radial-gradient(120% 100% at 20% 10%, #3E3A2C 0%, #191813 55%, #0E0E0C 100%)" },
    { tag: "КЕЙС / 02", title: "Екі есе арзан дерлік", name: "Онлайн-мектеп", cat: "Оқыту · Жарнама", desc: "Өтінім бағасы бір айда 61%-ға түсті. Клиент әр доллардың қайда кететінін ақыры көреді.", bg: "radial-gradient(120% 100% at 80% 15%, #2C3A3E 0%, #131919 55%, #0C0E0E 100%)" },
    { tag: "КЕЙС / 03", title: "5 күнде сатылым", name: "Интернет-дүкен", cat: "E-commerce · Жарнама", desc: "Іске қосудан кейінгі алғашқы 5 күнде екі науқаннан $1 500 түсім.", bg: "radial-gradient(120% 100% at 25% 80%, #3E2C38 0%, #191317 55%, #0E0C0E 100%)" },
    { tag: "ЖАҚЫНДА", title: "Алғашқы сайт жобасы", name: "Сіздің жобаңыз ба?", cat: "Веб-дизайн", desc: "Жаңа бағыт — мұнда алғашқы жарияланған сайт пайда болады. Мүмкін, сіздікі.", bg: "radial-gradient(120% 100% at 75% 75%, #38381F 0%, #171712 55%, #0D0D0B 100%)" },
  ],
  METRIC_NOTES: [
    { tag: "КЛИНИКА / 12 КҮН", big: "×4.1", h: "Түсімнің өсуі", p: "«Айына өтінімдер алдыңғы жарты жылдан да көп».", glow: "radial-gradient(75% 60% at 30% 25%, rgba(236,234,13,0.35), transparent 65%)" },
    { tag: "ОНЛАЙН-МЕКТЕП / АЙ", big: "-61%", h: "Өтінім бағасы", p: "«Ақыры жарнама бюджетінің қайда кететінін көріп тұрмын».", glow: "radial-gradient(75% 60% at 60% 30%, rgba(120,110,255,0.4), transparent 65%)" },
    { tag: "ДҮКЕН / 5 КҮН", big: "$1 500", h: "Екі науқаннан түсім", p: "«Баптап, есептегі әр цифрды түсіндірді».", glow: "radial-gradient(75% 60% at 40% 70%, rgba(217,106,69,0.4), transparent 65%)" },
  ],
  FAQS: [
    { q: "Төлем қалай жүзеге асады?", a: "Картаға аударыммен немесе шетелдесеңіз Wise/Stripe арқылы. Алдын ала келісеміз, жасырын комиссиясыз." },
    { q: "Менің төлемімнен бөлек жарнамаға қанша бюджет керек?", a: "Әдетте айына $600-ден бастап — бұл маған емес, тікелей Instagram/Google-ге көрсетілім үшін төлейтін ақша. Нақты цифрды қоңырауда айтамын." },
    { q: "Тек сайтты ғана тапсырыс беруге бола ма, жарнамасыз?", a: "Иә. Бірақ екеуін бірге жасасақ — сайт бірден жарнамаға лайықталып жобаланады, бұл бөлек тапсырыс беруден арзанырақ шығады." },
    { q: "Сайт қанша тұрады?", a: "Күрделілігіне байланысты — қарапайым лендингтен төлемі бар интернет-дүкенге дейін. Баға мен мерзімді қысқа қоңыраудан кейін айтамын." },
    { q: "Өтінімдер бар, ал сатылым жоқ болса ше?", a: "Адам жазғаннан кейін не болатынын бірге қараймыз. Кейде мәселе жарнамада емес — солай болса, адал айтамын." },
    { q: "Ал бір аптадан кейін ұнамаса ше?", a: "Жай ғана тоқтатамыз, айыппұлсыз және артық сұрақсыз." },
  ],
  KPI_PHRASES: [
    <>бүгін жұмыста: <b>науқанды оңтайландыру</b></>,
    <>клиенттердің орташа ROAS: <b>310%+</b></>,
    <>өтінімге жауап: <b>24 сағат ішінде</b></>,
    <>алғашқы жарнама: <b>бірінші аптада</b></>,
  ],
  MARQUEE_ITEMS: [
    { label: "Таргет", icon: IconAds },
    { label: "Сайттар", icon: IconWebDev },
    { label: "Креативтер", icon: IconDesign },
    { label: "Аналитика", icon: IconAnalyticsP },
    { label: "Instagram", icon: IconCamera },
    { label: "Facebook", icon: IconLike },
    { label: "TikTok", icon: IconNote },
    { label: "Threads", icon: IconAt },
    { label: "Google", icon: IconSearch },
  ],
};

/* ============================== EN ============================== */
const en = {
  NICHE_DATA: {
    ecommerce: { label: "online store", cpl: 4.2, roas: "310–420%" },
    clinic: { label: "clinic / medical", cpl: 9.1, roas: "260–340%" },
    education: { label: "online education", cpl: 5.9, roas: "290–380%" },
    realestate: { label: "real estate", cpl: 12.4, roas: "220–300%" },
    b2b: { label: "b2b services", cpl: 9.9, roas: "240–330%" },
    massage: { label: "massage salon", cpl: 3.4, roas: "250–330%" },
    flower: { label: "flower shop", cpl: 2.3, roas: "200–280%" },
    coffee: { label: "coffee shop", cpl: 1.7, roas: "180–250%" },
  },
  NICHES: [
    { icon: IconBag, label: "online stores" },
    { icon: IconCrossMed, label: "clinics" },
    { icon: IconBook, label: "online education" },
    { icon: IconBuilding, label: "real estate" },
    { icon: IconBriefcase, label: "b2b services" },
    { icon: IconSpa, label: "massage salons" },
    { icon: IconFlower, label: "flower shops" },
    { icon: IconCoffee, label: "coffee shops" },
  ],
  SERVICES: [
    {
      title: "Targeted advertising", badge: "core", badgeCls: "main", icon: IconAds,
      meta: "Instagram · Google · weekly reports",
      chips: ["Targeting the right audience", "Customer journey to purchase", "Clear weekly reports", "Ongoing monitoring & optimization", "Retargeting people who already saw you"],
    },
    {
      title: "Website development", badge: "add-on", badgeCls: "side", icon: IconWebDev,
      meta: "Landing page · Portfolio site · Online store",
      chips: ["A landing page built for an ad campaign", "A simple portfolio/business site", "An online store with payments", "Sites are designed for advertising from day one", "Cheaper when bundled with advertising"],
    },
    {
      title: "Creatives", badge: null, badgeCls: "", icon: IconDesign,
      meta: "Images · Video · Ad copy",
      chips: ["Ad images", "Short-form video", "Copy that stops the scroll"],
    },
    {
      title: "Analytics & reporting", badge: null, badgeCls: "", icon: IconAnalyticsP,
      meta: "Simple numbers, no jargon",
      chips: ["How many people messaged", "Cost per lead", "What to do next — a plan"],
    },
  ],
  PRINCIPLES: [
    { n: "01", icon: IconStrategy, title: "Live in the first week.", front: "The first ads go live within 7 days of kickoff — no lengthy approvals.", back: "In practice: a call on Monday — first ads are running by Friday. No \"we're still approving creatives in week three.\"" },
    { n: "02", icon: IconKPI, title: "Numbers, not words.", front: "Every week — a clear report: how many people messaged and what it cost.", back: "In practice: every Friday, 5 lines in a chat. Leads: 34. Cost: $3.8. What's changing: testing a new video. That's it." },
    { n: "03", icon: IconConsultation, title: "Honest, even when it costs me.", front: "I'll tell you straight if advertising won't help your business right now.", back: "In practice: roughly one in four people I screen, I turn away — and tell them what to fix first so advertising would actually make sense." },
    { n: "04", icon: IconTransparency, title: "No lock-in contracts.", front: "You can leave any time. I stay because it works, not because you signed something.", back: "In practice: month-to-month billing. Didn't like it — just don't renew; the ad account and every setting stay yours." },
  ],
  FIT_YES: [
    "You already have a product or service, and at least a couple of people have bought it",
    "You're ready to pay for the ads themselves separately — from $600/mo (that goes to Instagram/Google, not to me)",
    "There's someone who will respond to people who message you",
    "You're willing to wait 3-4 weeks for the first results",
  ],
  FIT_NO: [
    "You don't have a product or service yet, or nobody has bought it yet",
    "There's no budget for the ads themselves — only for my work",
    "There's nobody to respond to people who message you",
    "You need customers by tomorrow, with no time to test",
  ],
  PLANS: [
    {
      name: "Basic", price: "$170", sub: "One platform (e.g. Instagram only)", popular: false,
      features: ["Set up or audit ads on one platform", "Up to 2 new ads per month", "Report every 2 weeks", "Messenger support"],
    },
    {
      name: "Optimal", price: "$290", sub: "One or two platforms, fully managed by me", popular: true,
      features: ["Everything in Basic", "Up to 2 channels (Instagram + Google)", "Weekly reports with numbers", "Retargeting people who already saw you", "A personal call once a week"],
    },
    {
      name: "Premium", price: "$490", sub: "Up to three platforms + ready-made images and video", popular: false,
      features: ["Everything in Optimal", "Up to 3 channels", "I also produce the images and video", "The full customer journey — from ad to purchase", "Priority support, 7 days a week"],
    },
  ],
  WORK_CASES: [
    { tag: "CASE / 01", title: "Leads for a clinic", name: "Clinic, Almaty", cat: "Medical · Advertising", desc: "Revenue grew 4.1x in 12 days. More leads in a month than in the previous six.", bg: "radial-gradient(120% 100% at 20% 10%, #3E3A2C 0%, #191813 55%, #0E0E0C 100%)" },
    { tag: "CASE / 02", title: "Almost half the cost", name: "Online school", cat: "Education · Advertising", desc: "Lead cost dropped 61% in a month. The client can finally see where every dollar of budget goes.", bg: "radial-gradient(120% 100% at 80% 15%, #2C3A3E 0%, #131919 55%, #0C0E0E 100%)" },
    { tag: "CASE / 03", title: "Sales in 5 days", name: "Online store", cat: "E-commerce · Advertising", desc: "$1,500 in revenue from two campaigns in the first 5 days after launch.", bg: "radial-gradient(120% 100% at 25% 80%, #3E2C38 0%, #191317 55%, #0E0C0E 100%)" },
    { tag: "COMING SOON", title: "First website project", name: "Your project?", cat: "Web development", desc: "A new direction — the first published site will appear here. Maybe it'll be yours.", bg: "radial-gradient(120% 100% at 75% 75%, #38381F 0%, #171712 55%, #0D0D0B 100%)" },
  ],
  METRIC_NOTES: [
    { tag: "CLINIC / 12 DAYS", big: "×4.1", h: "Revenue growth", p: "\"More leads in a month than in the previous six.\"", glow: "radial-gradient(75% 60% at 30% 25%, rgba(236,234,13,0.35), transparent 65%)" },
    { tag: "ONLINE SCHOOL / MONTH", big: "-61%", h: "Cost per lead", p: "\"Finally I can see where the ad budget goes.\"", glow: "radial-gradient(75% 60% at 60% 30%, rgba(120,110,255,0.4), transparent 65%)" },
    { tag: "STORE / 5 DAYS", big: "$1 500", h: "Revenue from two campaigns", p: "\"Set everything up and explained every number in the report.\"", glow: "radial-gradient(75% 60% at 40% 70%, rgba(217,106,69,0.4), transparent 65%)" },
  ],
  FAQS: [
    { q: "How does payment work?", a: "By card transfer, or via Wise/Stripe if you're abroad. We agree on it upfront — no hidden fees." },
    { q: "How much ad budget do I need, separate from your fee?", a: "Usually from $600/month — that's money you pay directly to Instagram/Google for impressions, not to me. I'll give you an exact figure on a call." },
    { q: "Can I order just a website, without advertising?", a: "Yes. But if we do both together, the site is designed for advertising from the start — and it works out cheaper than ordering separately." },
    { q: "How much does a website cost?", a: "Depends on complexity — from a simple landing page to a full online store with payments. I'll give you a price and timeline after a short call." },
    { q: "What if I get leads but no sales?", a: "We'll look together at what happens after someone messages you. Sometimes the issue isn't the ads — I'll tell you honestly if that's the case." },
    { q: "What if I don't like it after a week?", a: "We simply part ways — no penalties, no awkward questions." },
  ],
  KPI_PHRASES: [
    <>today in progress: <b>campaign optimization</b></>,
    <>avg. client ROAS: <b>310%+</b></>,
    <>reply to requests: <b>within 24h</b></>,
    <>first ads live: <b>within the first week</b></>,
  ],
  MARQUEE_ITEMS: [
    { label: "Targeting", icon: IconAds },
    { label: "Websites", icon: IconWebDev },
    { label: "Creatives", icon: IconDesign },
    { label: "Analytics", icon: IconAnalyticsP },
    { label: "Instagram", icon: IconCamera },
    { label: "Facebook", icon: IconLike },
    { label: "TikTok", icon: IconNote },
    { label: "Threads", icon: IconAt },
    { label: "Google", icon: IconSearch },
  ],
};

export const CONTENT = { ru, kk, en };
