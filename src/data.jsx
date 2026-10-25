/* ============================================================
   КОНТЕНТ САЙТА
   Все тексты, списки и данные в одном месте, по языку.
   Правки текстов делаются здесь, не в разметке.
   Структура каждого языкового блока (ru/kk/en) одинаковая:
   при добавлении элемента добавляйте его во все три.

   Правило контента: только реальные цифры. Клиника ×4.1 и цитаты
   клиентов убраны (не были реальными). Скрины в RESULTS настоящие,
   из Meta Ads Manager: цифры не правились, креативы клиентов размыты.
   ============================================================ */
import {
  IconBag, IconCrossMed, IconBook, IconBuilding,
  IconBriefcase, IconSpa, IconFlower, IconCoffee,
  IconAds, IconWebDev, IconDesign, IconAnalyticsP,
  IconConsultation, IconStrategy, IconKPI, IconTransparency,
} from "./icons.jsx";

/* Скрины из кабинета (общие для всех языков: сами картинки на русском).
   Файлы лежат в img/results/ рядом с index.html, путь относительный. */
const SHOTS = {
  s4617: { src: "./img/results/meta-4617-conversations.webp", w: 764, h: 431 },
  s165: { src: "./img/results/meta-165-conversations.webp", w: 764, h: 431 },
  s52: { src: "./img/results/meta-52-conversations.webp", w: 764, h: 431 },
  s75: { src: "./img/results/meta-75-conversations.webp", w: 764, h: 459 },
  engagement: { src: "./img/results/meta-campaign-engagement.webp", w: 764, h: 235 },
  traffic: { src: "./img/results/meta-campaign-traffic.webp", w: 764, h: 214 },
};

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
      meta: "Instagram · Google · отчёт каждую неделю",
      chips: ["Настройка на нужную аудиторию", "Путь клиента до покупки", "Понятные еженедельные отчёты", "Слежу и улучшаю постоянно", "Показ тем, кто уже тебя видел"],
    },
    {
      title: "Создание сайтов", badge: "дополнительно", badgeCls: "side", icon: IconWebDev,
      meta: "Лендинг · Визитка · Интернет-магазин",
      chips: ["Лендинг под рекламную кампанию", "Сайт-визитка", "Интернет-магазин с оплатой", "Сайт сразу проектируется под рекламу", "Вместе с рекламой дешевле"],
    },
    {
      title: "Креативы", badge: null, badgeCls: "", icon: IconDesign,
      meta: "Картинки · Видео · Тексты объявлений",
      chips: ["Рекламные картинки", "Короткие видео", "Тексты, которые останавливают скролл"],
    },
    {
      title: "Аналитика и отчёты", badge: null, badgeCls: "", icon: IconAnalyticsP,
      meta: "Простые цифры без сложных слов",
      chips: ["Сколько людей написали", "Во сколько обошёлся каждый", "План, что делать дальше"],
    },
  ],
  PRINCIPLES: [
    { icon: IconStrategy, title: "Запуск на первой неделе", front: "Первые объявления выходят в течение 7 дней после старта, без долгих согласований.", back: "Созвон в понедельник, к пятнице первые объявления уже крутятся. Никаких «ждём согласования креативов третью неделю»." },
    { icon: IconKPI, title: "Цифры вместо слов", front: "Каждую неделю понятный отчёт: сколько людей написали и во сколько это обошлось.", back: "Каждую пятницу 5 строк в мессенджер. Например: заявок 34, цена $3,8, тестируем новое видео. Всё." },
    { icon: IconConsultation, title: "Честно, даже если невыгодно", front: "Скажу прямо, если твоему бизнесу реклама сейчас не поможет.", back: "Если вижу, что реклама сейчас не окупится, говорю это на первом созвоне и объясняю, что поправить сначала." },
    { icon: IconTransparency, title: "Без договоров-ловушек", front: "Можно уйти в любой момент. Остаюсь, потому что работает, а не потому что подписано.", back: "Оплата помесячно. Не понравилось, просто не продлеваешь. Кабинет и все настройки остаются у тебя." },
  ],
  FIT_YES: [
    "Есть товар или услуга, и хотя бы пара человек их уже купили",
    "Есть бюджет на саму рекламу, от $600 в месяц (он идёт не мне, а Instagram и Google)",
    "Есть кто-то, кто будет отвечать людям, которые напишут",
    "Можешь подождать 3-4 недели до первых результатов",
  ],
  FIT_NO: [
    "Товара или услуги пока нет, или их ещё никто не покупал",
    "Нет денег на саму рекламу, только на мою работу",
    "Некому отвечать людям, которые напишут",
    "Клиенты нужны уже завтра, без времени на проверку",
  ],
  PLANS: [
    {
      name: "Базовый", price: "$170", sub: "Одна площадка (например, только Instagram)", popular: false,
      features: ["Настрою или проверю рекламу на одной площадке", "До 2 новых объявлений в месяц", "Отчёт раз в 2 недели", "Связь в мессенджере"],
    },
    {
      name: "Оптимальный", price: "$290", sub: "Одна-две площадки, веду всё сам", popular: true,
      features: ["Всё из тарифа «Базовый»", "До 2 каналов (Instagram + Google)", "Отчёт с цифрами каждую неделю", "Показ тем, кто уже тебя видел", "Созвон раз в неделю"],
    },
    {
      name: "Премиум", price: "$490", sub: "До трёх площадок, плюс картинки и видео", popular: false,
      features: ["Всё из тарифа «Оптимальный»", "До 3 каналов", "Картинки и видео тоже делаю я", "Весь путь клиента, от рекламы до покупки", "Связь 7 дней в неделю, отвечаю в приоритете"],
    },
  ],
  WORK_CASES: [
    { name: "Онлайн-школа", cat: "Обучение, реклама", big: "−61%", h: "цена заявки", desc: "Цена заявки упала на 61% за месяц." },
    { name: "Интернет-магазин", cat: "E-commerce, реклама", big: "$1 500", h: "выручки за 5 дней", desc: "Две кампании, первые 5 дней после запуска." },
    { name: "Скоро", cat: "Веб-разработка", big: null, h: "Первый сайт-проект", desc: "Новое направление: здесь появится первый опубликованный сайт. Возможно, твой.", soon: true },
  ],
  RESULTS: [
    {
      label: "Переписки, весь период", big: "4 617", unit: "переписок", sub: "по $0,57 за каждую, потрачено $2 626",
      shots: [{ ...SHOTS.s4617, alt: "Скрин Meta Ads Manager, период «Максимум»: 4 617 начатых переписок, $0,57 за переписку, потрачено $2 626,17, охват 325 552, показы 1 098 477" }],
    },
    {
      label: "Переписки", big: "$0,21", unit: "за переписку", sub: "165 переписок за $35",
      shots: [{ ...SHOTS.s165, alt: "Скрин Meta Ads Manager: 165 начатых переписок, $0,21 за переписку, потрачено $35,06, охват 7 599, показы 10 852" }],
    },
    {
      label: "Переписки", big: "$0,25", unit: "за переписку", sub: "52 переписки за $12,79",
      shots: [{ ...SHOTS.s52, alt: "Скрин Meta Ads Manager: 52 начатые переписки, $0,25 за переписку, потрачено $12,79, охват 2 789, показы 3 694" }],
    },
    {
      label: "Бюджет $10 в день", big: "75", unit: "переписок", sub: "по $0,67 за каждую, потрачено $50",
      shots: [{ ...SHOTS.s75, alt: "Скрин Meta Ads Manager: 75 начатых переписок, $0,67 за переписку, потрачено $50,12, дневной бюджет $10, охват 20 572, показы 29 456" }],
    },
    {
      label: "Трафик в Instagram", big: "$0,05", unit: "за посещение профиля", sub: "6,7 тыс. посещений профиля за $361. Рядом вторая кампания: 189 переписок по $1,74.",
      shots: [
        { ...SHOTS.traffic, alt: "Скрин кампании «Трафик» в Meta Ads Manager: 6,7 тыс. посещений профиля Instagram, $0,05 за посещение, затраты $361,48" },
        { ...SHOTS.engagement, alt: "Скрин кампании «Вовлеченность» в Meta Ads Manager: 189 начатых переписок, $1,74 за переписку, затраты $329,11" },
      ],
    },
  ],
  FAQS: [
    { q: "Как происходит оплата?", a: "Переводом на карту или через Wise/Stripe, если ты за границей. Договоримся заранее, без скрытых комиссий." },
    { q: "Сколько нужно на саму рекламу, помимо оплаты работы?", a: "Обычно от $600 в месяц. Эти деньги ты платишь не мне, а напрямую Instagram и Google за показы. Точную цифру скажу на созвоне." },
    { q: "Можно заказать только сайт, без рекламы?", a: "Да. Но если делаем и то и другое, сайт сразу проектируется под рекламу, и вместе выходит дешевле, чем по отдельности." },
    { q: "Сколько стоит сайт?", a: "Зависит от сложности: от простого лендинга до интернет-магазина с оплатой. Цену и сроки скажу после короткого созвона." },
    { q: "Что если заявки есть, а продаж нет?", a: "Посмотрим вместе, что происходит после того, как человек написал. Иногда дело не в рекламе, и если так, скажу честно." },
    { q: "А если через неделю не понравится?", a: "Просто разойдёмся, без штрафов и лишних вопросов." },
  ],
  /* ленты под первым экраном: что делаю × где */
  TAPE_WHAT: ["Таргет", "Сайты", "Креативы", "Аналитика"],
  TAPE_WHERE: ["Instagram", "Facebook", "TikTok", "Threads", "Google"],
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
      title: "Таргеттелген жарнама", badge: "негізгі", badgeCls: "main", icon: IconAds,
      meta: "Instagram · Google · апта сайын есеп",
      chips: ["Керек аудиторияға баптау", "Клиенттің сатып алуға дейінгі жолы", "Түсінікті апта сайынғы есептер", "Үнемі қадағалап, жақсартамын", "Сізді бұрын көргендерге көрсету"],
    },
    {
      title: "Сайт жасау", badge: "қосымша", badgeCls: "side", icon: IconWebDev,
      meta: "Лендинг · Визитка · Интернет-дүкен",
      chips: ["Жарнама науқанына арналған лендинг", "Визитка-сайт", "Төлемі бар интернет-дүкен", "Сайт бірден жарнамаға лайықталып жобаланады", "Жарнамамен бірге арзанырақ"],
    },
    {
      title: "Креативтер", badge: null, badgeCls: "", icon: IconDesign,
      meta: "Суреттер · Видео · Жарнама мәтіндері",
      chips: ["Жарнамалық суреттер", "Қысқа видеолар", "Скроллды тоқтататын мәтіндер"],
    },
    {
      title: "Аналитика және есептер", badge: null, badgeCls: "", icon: IconAnalyticsP,
      meta: "Күрделі сөздерсіз қарапайым цифрлар",
      chips: ["Қанша адам жазды", "Әрқайсысы қанша тұрды", "Әрі қарай не істеу керегі туралы жоспар"],
    },
  ],
  PRINCIPLES: [
    { icon: IconStrategy, title: "Бірінші аптада іске қосу", front: "Алғашқы хабарландырулар бастаудан кейін 7 күн ішінде шығады, ұзақ келісусіз.", back: "Дүйсенбіде қоңырау, жұмаға қарай алғашқы хабарландырулар қосылады. «Креативтерді үшінші апта келісіп жатырмыз» деген жоқ." },
    { icon: IconKPI, title: "Сөздің орнына цифрлар", front: "Апта сайын түсінікті есеп: қанша адам жазды және бұл қанша тұрды.", back: "Әр жұма сайын мессенджерге 5 жол. Мысалы: өтінімдер 34, баға $3,8, жаңа видеоны сынаймыз. Бәрі осы." },
    { icon: IconConsultation, title: "Тиімсіз болса да адал", front: "Егер қазір жарнама бизнесіңізге көмектеспейтін болса, тікелей айтамын.", back: "Жарнама қазір өзін ақтамайтынын көрсем, мұны бірінші қоңырауда айтамын және алдымен нені түзету керектігін түсіндіремін." },
    { icon: IconTransparency, title: "Тұзақ келісімшартсыз", front: "Кез келген уақытта кетуге болады. Мен қаламын, өйткені бұл жұмыс істейді, қол қойылғаны үшін емес.", back: "Ай сайынғы төлем. Ұнамаса, жай ғана жаңартпайсыз. Кабинет пен барлық баптаулар өзіңізде қалады." },
  ],
  FIT_YES: [
    "Тауарыңыз немесе қызметіңіз бар, және оны кем дегенде бірнеше адам сатып алған",
    "Жарнаманың өзіне бюджет бар, айына $600-ден (ол маған емес, Instagram мен Google-ге кетеді)",
    "Жазған адамдарға жауап беретін біреу бар",
    "Алғашқы нәтижелерді 3-4 апта күте аласыз",
  ],
  FIT_NO: [
    "Тауар немесе қызмет әлі жоқ, немесе оны әлі ешкім сатып алған жоқ",
    "Жарнаманың өзіне ақша жоқ, тек менің жұмысыма ғана",
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
      features: ["«Негізгі» тарифінің бәрі", "2 арнаға дейін (Instagram + Google)", "Апта сайын цифрлары бар есеп", "Сізді бұрын көргендерге көрсету", "Аптасына бір рет қоңырау"],
    },
    {
      name: "Премиум", price: "$490", sub: "Үш алаңға дейін, плюс суреттер мен видео", popular: false,
      features: ["«Оптималды» тарифінің бәрі", "3 арнаға дейін", "Суреттер мен видеоны да мен жасаймын", "Клиенттің толық жолы, жарнамадан сатып алуға дейін", "Аптаның 7 күні байланыс, басымдықпен жауап беремін"],
    },
  ],
  WORK_CASES: [
    { name: "Онлайн-мектеп", cat: "Оқыту, жарнама", big: "−61%", h: "өтінім бағасы", desc: "Өтінім бағасы бір айда 61%-ға түсті." },
    { name: "Интернет-дүкен", cat: "E-commerce, жарнама", big: "$1 500", h: "5 күндегі түсім", desc: "Екі науқан, іске қосудан кейінгі алғашқы 5 күн." },
    { name: "Жақында", cat: "Веб-әзірлеу", big: null, h: "Алғашқы сайт жобасы", desc: "Жаңа бағыт: мұнда алғашқы жарияланған сайт пайда болады. Мүмкін, сіздікі.", soon: true },
  ],
  RESULTS: [
    {
      label: "Хат алмасулар, бүкіл кезең", big: "4 617", unit: "хат алмасу", sub: "әрқайсысы $0,57, жұмсалғаны $2 626",
      shots: [{ ...SHOTS.s4617, alt: "Meta Ads Manager скрині, «Максимум» кезеңі: 4 617 басталған хат алмасу, әрқайсысы $0,57, жұмсалғаны $2 626,17, қамту 325 552, көрсетілім 1 098 477" }],
    },
    {
      label: "Хат алмасулар", big: "$0,21", unit: "бір хат алмасу", sub: "165 хат алмасу $35-ға",
      shots: [{ ...SHOTS.s165, alt: "Meta Ads Manager скрині: 165 басталған хат алмасу, әрқайсысы $0,21, жұмсалғаны $35,06, қамту 7 599, көрсетілім 10 852" }],
    },
    {
      label: "Хат алмасулар", big: "$0,25", unit: "бір хат алмасу", sub: "52 хат алмасу $12,79-ға",
      shots: [{ ...SHOTS.s52, alt: "Meta Ads Manager скрині: 52 басталған хат алмасу, әрқайсысы $0,25, жұмсалғаны $12,79, қамту 2 789, көрсетілім 3 694" }],
    },
    {
      label: "Күніне $10 бюджет", big: "75", unit: "хат алмасу", sub: "әрқайсысы $0,67, жұмсалғаны $50",
      shots: [{ ...SHOTS.s75, alt: "Meta Ads Manager скрині: 75 басталған хат алмасу, әрқайсысы $0,67, жұмсалғаны $50,12, күндік бюджет $10, қамту 20 572, көрсетілім 29 456" }],
    },
    {
      label: "Instagram-ға трафик", big: "$0,05", unit: "профильге бір кіру", sub: "6,7 мың профильге кіру $361-ға. Жанында екінші науқан: 189 хат алмасу, әрқайсысы $1,74.",
      shots: [
        { ...SHOTS.traffic, alt: "Meta Ads Manager-дегі «Трафик» науқанының скрині: Instagram профиліне 6,7 мың кіру, әрқайсысы $0,05, шығын $361,48" },
        { ...SHOTS.engagement, alt: "Meta Ads Manager-дегі «Вовлеченность» науқанының скрині: 189 басталған хат алмасу, әрқайсысы $1,74, шығын $329,11" },
      ],
    },
  ],
  FAQS: [
    { q: "Төлем қалай жүзеге асады?", a: "Картаға аударыммен немесе шетелде болсаңыз Wise/Stripe арқылы. Алдын ала келісеміз, жасырын комиссиясыз." },
    { q: "Жұмыс төлемінен бөлек жарнаманың өзіне қанша керек?", a: "Әдетте айына $600-ден бастап. Бұл ақшаны маған емес, тікелей Instagram мен Google-ге көрсетілім үшін төлейсіз. Нақты цифрды қоңырауда айтамын." },
    { q: "Тек сайтқа ғана, жарнамасыз тапсырыс беруге бола ма?", a: "Иә. Бірақ екеуін бірге жасасақ, сайт бірден жарнамаға лайықталып жобаланады және бөлек тапсырыс беруден арзанырақ шығады." },
    { q: "Сайт қанша тұрады?", a: "Күрделілігіне байланысты: қарапайым лендингтен төлемі бар интернет-дүкенге дейін. Баға мен мерзімді қысқа қоңыраудан кейін айтамын." },
    { q: "Өтінімдер бар, ал сатылым жоқ болса ше?", a: "Адам жазғаннан кейін не болатынын бірге қараймыз. Кейде мәселе жарнамада емес, солай болса, адал айтамын." },
    { q: "Ал бір аптадан кейін ұнамаса ше?", a: "Жай ғана тоқтатамыз, айыппұлсыз және артық сұрақсыз." },
  ],
  TAPE_WHAT: ["Таргет", "Сайттар", "Креативтер", "Аналитика"],
  TAPE_WHERE: ["Instagram", "Facebook", "TikTok", "Threads", "Google"],
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
      meta: "Instagram · Google · weekly report",
      chips: ["Targeting the right audience", "Customer journey to purchase", "Clear weekly reports", "Ongoing monitoring and optimization", "Retargeting people who already saw you"],
    },
    {
      title: "Website development", badge: "add-on", badgeCls: "side", icon: IconWebDev,
      meta: "Landing page · Business site · Online store",
      chips: ["A landing page built for an ad campaign", "A simple business site", "An online store with payments", "Sites are designed for advertising from day one", "Cheaper when bundled with advertising"],
    },
    {
      title: "Creatives", badge: null, badgeCls: "", icon: IconDesign,
      meta: "Images · Video · Ad copy",
      chips: ["Ad images", "Short-form video", "Copy that stops the scroll"],
    },
    {
      title: "Analytics and reporting", badge: null, badgeCls: "", icon: IconAnalyticsP,
      meta: "Simple numbers, no jargon",
      chips: ["How many people messaged", "Cost per lead", "A plan for what to do next"],
    },
  ],
  PRINCIPLES: [
    { icon: IconStrategy, title: "Live in the first week", front: "The first ads go live within 7 days of kickoff, no lengthy approvals.", back: "A call on Monday, first ads running by Friday. No “we're still approving creatives in week three.”" },
    { icon: IconKPI, title: "Numbers, not words", front: "A clear report every week: how many people messaged and what it cost.", back: "Every Friday, 5 lines in a chat. For example: leads 34, cost $3.8, testing a new video. That's it." },
    { icon: IconConsultation, title: "Honest, even when it costs me", front: "I'll tell you straight if advertising won't help your business right now.", back: "If I see that ads won't pay off right now, I say so on the first call and explain what to fix first." },
    { icon: IconTransparency, title: "No lock-in contracts", front: "You can leave any time. I stay because it works, not because you signed something.", back: "Month-to-month billing. Didn't like it, just don't renew. The ad account and every setting stay yours." },
  ],
  FIT_YES: [
    "You already have a product or service, and at least a couple of people have bought it",
    "There's a budget for the ads themselves, from $600 a month (it goes to Instagram and Google, not to me)",
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
      name: "Basic", price: "$170", sub: "One platform (e.g. Instagram only)", popular: false,
      features: ["Set up or audit ads on one platform", "Up to 2 new ads per month", "Report every 2 weeks", "Messenger support"],
    },
    {
      name: "Optimal", price: "$290", sub: "One or two platforms, fully managed by me", popular: true,
      features: ["Everything in Basic", "Up to 2 channels (Instagram + Google)", "Weekly report with numbers", "Retargeting people who already saw you", "A call once a week"],
    },
    {
      name: "Premium", price: "$490", sub: "Up to three platforms, plus images and video", popular: false,
      features: ["Everything in Optimal", "Up to 3 channels", "I also produce the images and video", "The full customer journey, from ad to purchase", "Support 7 days a week, priority replies"],
    },
  ],
  WORK_CASES: [
    { name: "Online school", cat: "Education, advertising", big: "−61%", h: "cost per lead", desc: "Cost per lead dropped 61% in a month." },
    { name: "Online store", cat: "E-commerce, advertising", big: "$1,500", h: "revenue in 5 days", desc: "Two campaigns, the first 5 days after launch." },
    { name: "Coming soon", cat: "Web development", big: null, h: "First website project", desc: "A new direction: the first published site will appear here. Maybe it'll be yours.", soon: true },
  ],
  RESULTS: [
    {
      label: "Conversations, all time", big: "4,617", unit: "conversations", sub: "$0.57 each, $2,626 spent",
      shots: [{ ...SHOTS.s4617, alt: "Meta Ads Manager screenshot, lifetime period: 4,617 conversations started, $0.57 per conversation, $2,626.17 spent, reach 325,552, impressions 1,098,477" }],
    },
    {
      label: "Conversations", big: "$0.21", unit: "per conversation", sub: "165 conversations for $35",
      shots: [{ ...SHOTS.s165, alt: "Meta Ads Manager screenshot: 165 conversations started, $0.21 per conversation, $35.06 spent, reach 7,599, impressions 10,852" }],
    },
    {
      label: "Conversations", big: "$0.25", unit: "per conversation", sub: "52 conversations for $12.79",
      shots: [{ ...SHOTS.s52, alt: "Meta Ads Manager screenshot: 52 conversations started, $0.25 per conversation, $12.79 spent, reach 2,789, impressions 3,694" }],
    },
    {
      label: "$10 a day budget", big: "75", unit: "conversations", sub: "$0.67 each, $50 spent",
      shots: [{ ...SHOTS.s75, alt: "Meta Ads Manager screenshot: 75 conversations started, $0.67 per conversation, $50.12 spent, daily budget $10, reach 20,572, impressions 29,456" }],
    },
    {
      label: "Instagram traffic", big: "$0.05", unit: "per profile visit", sub: "6.7k profile visits for $361. Next to it, a second campaign: 189 conversations at $1.74.",
      shots: [
        { ...SHOTS.traffic, alt: "Meta Ads Manager screenshot of a Traffic campaign: 6.7k Instagram profile visits, $0.05 per visit, $361.48 spent" },
        { ...SHOTS.engagement, alt: "Meta Ads Manager screenshot of an Engagement campaign: 189 conversations started, $1.74 per conversation, $329.11 spent" },
      ],
    },
  ],
  FAQS: [
    { q: "How does payment work?", a: "By card transfer, or via Wise/Stripe if you're abroad. We agree on it upfront, no hidden fees." },
    { q: "How much do the ads themselves cost, on top of your fee?", a: "Usually from $600 a month. You pay that directly to Instagram and Google for impressions, not to me. I'll give you an exact figure on a call." },
    { q: "Can I order just a website, without advertising?", a: "Yes. But if we do both, the site is designed for advertising from the start, and together it works out cheaper than separately." },
    { q: "How much does a website cost?", a: "Depends on complexity: from a simple landing page to an online store with payments. I'll give you a price and timeline after a short call." },
    { q: "What if I get leads but no sales?", a: "We'll look together at what happens after someone messages you. Sometimes the issue isn't the ads, and if so, I'll tell you honestly." },
    { q: "What if I don't like it after a week?", a: "We simply part ways, no penalties and no awkward questions." },
  ],
  TAPE_WHAT: ["Targeting", "Websites", "Creatives", "Analytics"],
  TAPE_WHERE: ["Instagram", "Facebook", "TikTok", "Threads", "Google"],
};

export const CONTENT = { ru, kk, en };
