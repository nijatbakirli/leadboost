/* ============================================================
   КОНТЕНТ САЙТА
   Все тексты, списки и данные в одном месте, по языку.
   Правки текстов делаются здесь, не в разметке.
   Структура каждого языкового блока (ru/kk/en) одинаковая:
   при добавлении элемента добавляйте его во все три.

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
  PLANS: [
    {
      name: "Базовый", price: "$350", sub: "Одна площадка: Instagram и Facebook", popular: false,
      features: ["Настрою рекламу с нуля или проверю текущую", "До 4 новых объявлений в месяц", "Отчёт раз в 2 недели", "Связь в мессенджере"],
    },
    {
      name: "Оптимальный", price: "$550", sub: "Две площадки, например Meta и Google", popular: true,
      features: ["Всё из тарифа «Базовый»", "Отчёт с цифрами каждую неделю", "Показ тем, кто уже тебя видел", "Созвон раз в неделю"],
    },
    {
      name: "Премиум", price: "$850", sub: "До трёх площадок, плюс картинки и видео", popular: false,
      features: ["Всё из тарифа «Оптимальный»", "Картинки и видео тоже делаю я", "Передаю продажи из твоей CRM в Meta (CAPI), чтобы реклама искала покупателей", "Связь 7 дней в неделю, отвечаю в приоритете"],
    },
  ],
  /* первый экран: цифра из кабинета (подробный разбор этого кейса первым в CASES) */
  PROOF: { big: "4 617", unit: "переписок", sub: "по $0,57 за каждую, $2 626 за 45 дней", shot: { ...SHOTS.s4617, alt: "Скрин Meta Ads Manager за весь период: 4 617 начатых переписок, $0,57 за переписку, потрачено $2 626,17, охват 325 552, показы 1 098 477" } },
  /* кейсы со скринами: ниша, город, срок, что было до, что сделал. Тексты из
     отчётов владельца по каждому скрину (ноябрь 2026), бренды скрыты по NDA */
  CASES: [
    {
      niche: "Интернет-магазин домашнего текстиля с доставкой по всему Узбекистану", place: "Ташкент", period: "45 дней",
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
      niche: "Магазин женской одежды и обуви", place: "Баку", period: "5 дней",
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
      niche: "Доставка готовой еды: суши и пицца", place: "Алматы", period: "2 дня",
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
      niche: "Павильон сезонной одежды, опт и розница", place: "Бишкек", period: "5 дней",
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
      niche: "Студия аппаратной косметологии и эпиляции", place: "Астана", period: "5 дней",
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
      niche: "Корпусная мебель и кухни на заказ", place: "Баку", period: "3 дня",
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
    { q: "Работаешь только с Казахстаном?", a: "Нет. Работаю удалённо с бизнесом из Казахстана (Алматы, Астана и другие города), Азербайджана и других стран СНГ. Всё общение в мессенджере и на созвонах." },
  ],
  /* ленты под первым экраном: что делаю × где */
  TAPE_WHAT: ["Таргет", "Сайты", "Креативы", "Аналитика"],
  TAPE_WHERE: ["Instagram", "Facebook", "TikTok", "Threads", "Google"],
};

/* ============================== KK ============================== */
const kk = {
  NICHE_DATA: {
    ecommerce: { label: "Интернет-дүкен" },
    clinic: { label: "Клиника / медицина" },
    education: { label: "Онлайн-оқыту" },
    realestate: { label: "Жылжымайтын мүлік" },
    b2b: { label: "B2B-қызметтер" },
    massage: { label: "Массаж салоны" },
    flower: { label: "Гүл дүкені" },
    coffee: { label: "Кофехана" },
  },
  NICHES: [
    { label: "Интернет-дүкендер", desc: "Instagram мен сайттан тапсырыстар" },
    { label: "Клиникалар", desc: "қабылдауға жазылу" },
    { label: "Онлайн-оқыту", desc: "курстар мен вебинарларға өтінімдер" },
    { label: "Жылжымайтын мүлік", desc: "көруге өтінімдер мен қоңыраулар" },
    { label: "B2B-қызметтер", desc: "сату бөліміне өтінімдер" },
    { label: "Массаж салондары", desc: "сеанстарға жазылу" },
    { label: "Гүл дүкендері", desc: "гүл шоқтарына тапсырыстар" },
    { label: "Кофеханалар", desc: "жақын маңдағы қонақтар" },
  ],
  SERVICES: [
    {
      title: "Таргеттелген жарнама", badge: "негізгі", badgeCls: "main", icon: "ads",
      meta: "Instagram · Facebook · Threads · TikTok · Google",
      chips: ["Керек аудиторияға баптау", "Клиенттің сатып алуға дейінгі жолы", "Үнемі қадағалап, жақсартамын", "Сізді бұрын көргендерге көрсету"],
    },
    {
      title: "Сайт жасау", badge: "қосымша", badgeCls: "side", icon: "webdev",
      meta: "Лендинг · Визитка · Интернет-дүкен",
      chips: ["Жарнама науқанына арналған лендинг", "Визитка-сайт", "Төлемі бар интернет-дүкен", "Сайт бірден жарнамаға лайықталып жобаланады", "Жарнамамен бірге арзанырақ"],
    },
    {
      title: "Креативтер", badge: null, badgeCls: "", icon: "design",
      meta: "Суреттер · Видео · Жарнама мәтіндері",
      chips: ["Жарнамалық суреттер", "Қысқа видеолар", "Скроллды тоқтататын мәтіндер"],
    },
    {
      title: "Аналитика және есептер", badge: null, badgeCls: "", icon: "analytics",
      meta: "Әр науқан бойынша цифрлар",
      chips: ["Қанша адам жазды", "Әрқайсысы қанша тұрды", "Әрі қарай не істеу керегі туралы жоспар"],
    },
  ],
  PRINCIPLES: [
    { title: "Бірінші аптада іске қосу", front: "Алғашқы хабарландырулар бастаудан кейін 7 күн ішінде шығады, ұзақ келісусіз.", back: "Дүйсенбіде қоңырау, жұмаға қарай алғашқы хабарландырулар қосылады. «Креативтерді үшінші апта келісіп жатырмыз» деген жоқ." },
    { title: "Сөздің орнына цифрлар", front: "Тарифке қарай апта сайын немесе 2 аптада бір рет түсінікті есеп: қанша адам жазды және бұл қанша тұрды.", back: "Есеп мессенджерге келеді, 5 жол. Шартты мысал: өтінімдер 34, баға $3,8, жаңа видеоны сынаймыз." },
    { title: "Тиімсіз болса да адал", front: "Егер қазір жарнама бизнесіңізге көмектеспейтін болса, тікелей айтамын.", back: "Жарнама қазір өзін ақтамайтынын көрсем, мұны бірінші қоңырауда айтамын және алдымен нені түзету керектігін түсіндіремін." },
    { title: "Тұзақ келісімшартсыз", front: "Кез келген уақытта айыппұлсыз кетуге болады.", back: "Ай сайынғы төлем. Ұнамаса, жай ғана жаңартпайсыз. Кабинет пен барлық баптаулар өзіңізде қалады." },
  ],
  FIT_YES: [
    "Тауарыңыз немесе қызметіңіз бар, және оны кем дегенде бірнеше адам сатып алған",
    "Жарнаманың өзіне бюджет бар, айына $600-ден (оны тікелей алаңдарға төлейсіз: Meta, TikTok, Google)",
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
      name: "Негізгі", price: "$350", sub: "Бір алаң: Instagram және Facebook", popular: false,
      features: ["Жарнаманы нөлден баптаймын немесе қазіргісін тексеремін", "Айына 4-ке дейін жаңа хабарландыру", "2 аптада бір рет есеп", "Мессенджерде байланыс"],
    },
    {
      name: "Оптималды", price: "$550", sub: "Екі алаң, мысалы Meta және Google", popular: true,
      features: ["«Негізгі» тарифінің бәрі", "Апта сайын цифрлары бар есеп", "Сізді бұрын көргендерге көрсету", "Аптасына бір рет қоңырау"],
    },
    {
      name: "Премиум", price: "$850", sub: "Үш алаңға дейін, плюс суреттер мен видео", popular: false,
      features: ["«Оптималды» тарифінің бәрі", "Суреттер мен видеоны да мен жасаймын", "Жарнама сатып алушыларды іздеуі үшін сатылымдарды CRM-іңізден Meta-ға беремін (CAPI)", "Аптаның 7 күні байланыс, басымдықпен жауап беремін"],
    },
  ],
  /* первый экран: цифра из кабинета (подробный разбор этого кейса первым в CASES) */
  PROOF: { big: "4 617", unit: "хат алмасу", sub: "әрқайсысы $0,57, 45 күнде $2 626", shot: { ...SHOTS.s4617, alt: "Meta Ads Manager скрині, бүкіл кезең: 4 617 басталған хат алмасу, әрқайсысы $0,57, жұмсалғаны $2 626,17, қамту 325 552, көрсетілім 1 098 477" } },
  /* кейсы со скринами: ниша, город, срок, что было до, что сделал. Тексты из
     отчётов владельца по каждому скрину (ноябрь 2026), бренды скрыты по NDA */
  CASES: [
    {
      niche: "Бүкіл Өзбекстанға жеткізетін үй тоқыма бұйымдарының интернет-дүкені", place: "Ташкент", period: "45 күн",
      big: "$0,57", unit: "бір хат алмасу", sub: "4 617 хат алмасу, жұмсалғаны $2 626",
      before: "Күндік бюджетті $15-тан асырғанда өтінім бағасы $1,50-ге дейін және одан да жоғары өсті, ал жарнамалар бір аптада тозды. Жарнаманы бүкіл елге кеңейту мүмкін болмады.",
      steps: [
        "Бүкіл елге ортақ бюджеті бар бір науқан, аудиторияны жасанды тарылтусыз.",
        "Алты видео: жиынтықтарды ашу, матаны жақыннан көрсету, пікірлер. Алғашқы 3 секундты әр 10-14 күн сайын жаңарттым.",
        "Дүкен күніне 100+ хат алмасуға үлгеруі үшін чатта жиынтық пен жеткізу қаласы туралы сұрақтарды баптадым.",
      ],
      shots: [{ ...SHOTS.s4617, alt: "Meta Ads Manager скрині, бүкіл кезең: 4 617 басталған хат алмасу, әрқайсысы $0,57, жұмсалғаны $2 626,17, қамту 325 552, көрсетілім 1 098 477" }],
    },
    {
      niche: "Әйелдер киімі мен аяқ киім дүкені", place: "Баку", period: "5 күн",
      big: "$0,21", unit: "бір хат алмасу", sub: "165 хат алмасу $35-ға",
      before: "Жарнамада сипаттамасында бағалары бар студиялық фотолар тұрды. Хат алмасу $0,95-тен $1,20-ға дейін тұрды, киім өлшейтін бөлмеге адамдар тұрақсыз келді.",
      steps: [
        "Студиялық фотолардың орнына шоурумда киімді өлшеп көрудің тірі видеолары, өлшем мен бағаны чатта нақтылайды.",
        "Кең аудитория: 20-45 жастағы әйелдер, тар қызығушылықтарсыз.",
        "Ең жақсы жарнаманы күніне $7-ға дейін көтердім, хат алмасу бағасы $0,25-тен $0,21-ге түсті.",
      ],
      shots: [{ ...SHOTS.s165, alt: "Meta Ads Manager скрині: 165 басталған хат алмасу, әрқайсысы $0,21, жұмсалғаны $35,06, қамту 7 599, көрсетілім 10 852" }],
    },
    {
      niche: "Дайын тамақ жеткізу: суши мен пицца", place: "Алматы", period: "2 күн",
      big: "$0,25", unit: "бір хат алмасу", sub: "52 хат алмасу $12,79-ға",
      before: "Посттарды аудан шектеуінсіз «Жарнамалау» батырмасымен жылжытты. Хат алмасу $1,10-нан $1,40-қа дейін тұрды, өтінімдердің 45%-ына дейіні жылдам жеткізу бармайтын аудандардан келді.",
      steps: [
        "Тек асханадан 3 км радиуста көрсету.",
        "Ұсыныс: алғашқы тапсырысқа 20% жеңілдігі бар кешкі сет, тік видеолар.",
        "Чатта үш батырма: сеттер мәзірі, жеткізу шарттары, жеңілдік купоны.",
      ],
      shots: [{ ...SHOTS.s52, alt: "Meta Ads Manager скрині: 52 басталған хат алмасу, әрқайсысы $0,25, жұмсалғаны $12,79, қамту 2 789, көрсетілім 3 694" }],
    },
    {
      niche: "Маусымдық киім павильоны, көтерме және бөлшек сауда", place: "Бішкек", period: "5 күн",
      big: "$0,69", unit: "бір хат алмасу", sub: "55 хат алмасу $37,74-ке",
      before: "Сатып алушылар тек базардан және мессенджерлердегі ескі базадан келді. Жарнамадан жаңа клиенттер болмады.",
      steps: [
        "Видео: қатар бойымен павильонға дейін жүру және жаңа партия тауарды тікелей көрсету.",
        "Хат алмасуға арналған науқан, тар қызығушылықтарсыз кең аудитория.",
        "Нүктені қалай табу сызбасы мен каталогы бар автожауап.",
      ],
      shots: [{ ...SHOTS.s55, alt: "Meta Ads Manager-дегі «Тартылу» науқанының скрині: 55 басталған хат алмасу, бір хат алмасу $0,69, шығын $37,74" }],
    },
    {
      niche: "Аппараттық косметология және эпиляция студиясы", place: "Астана", period: "5 күн",
      big: "$0,67", unit: "бір хат алмасу", sub: "75 хат алмасу $50-ға, күніне $10",
      before: "Жарнамада стоктық суреттер мен процедуралардың күрделі сипаттамалары болды. Өтінім $2,50-ден $3,20-ға дейін тұрды, ал әкімші ұзақ жауап бергендіктен өтініштердің 60%-ына дейіні жазылуға жетпеді.",
      steps: [
        "Алғашқы келуге ұсыныс: белгіленген бағамен үш аймақ.",
        "Артықшылықтар тізімі бар суреттер және кабинеттің тірі видеолары.",
        "Күніне дәл $10 және әкімшіге скрипт: 3 хабарламада жазылу.",
      ],
      shots: [{ ...SHOTS.s75, alt: "Meta Ads Manager скрині: 75 басталған хат алмасу, әрқайсысы $0,67, жұмсалғаны $50,12, күндік бюджет $10, қамту 20 572, көрсетілім 29 456" }],
    },
    {
      niche: "Корпустық жиһаз бен тапсырыспен жасалатын ас үйлер", place: "Баку", period: "3 күн",
      big: "$0,65", unit: "сайттан бір өтінім", sub: "телефоны бар 22 өтінім $14,35-ке",
      before: "Жарнама хат алмасуға апарды, диалогтардың 80%-ы телефон нөмірінсіз «метрі қанша тұрады?» деген сұрақпен аяқталды.",
      steps: [
        "Жарнама квиз-сайтқа апарады: ас үйдің немесе шкафтың бағасын бір минутта есептеу және 3D-жоба.",
        "Өтінім телефоны бар форма жіберілгеннен кейін ғана есептеледі, осылайша жарнама нақты тапсырыс берушілерден үйренеді.",
        "Жарнамаларда интерьердегі дайын ас үйлер және үш жиынтықтағы бағалар.",
      ],
      shots: [{ ...SHOTS.s22, alt: "Meta Ads Manager скрині: сайттан 22 лид, бір лид $0,65, жұмсалғаны $14,35, қамту 1 320, көрсетілім 2 280" }],
    },
  ],
  /* ещё результаты: два кейса без скринов (подтверждены владельцем) и трафик */
  MORE: [
    { label: "Онлайн-мектеп", big: "−61%", unit: "өтінім бағасы", sub: "Өтінім бағасы бір айда 61%-ға түсті." },
    { label: "Интернет-дүкен", big: "$1 500", unit: "5 күндегі түсім", sub: "Екі науқан, іске қосудан кейінгі алғашқы 5 күн." },
    {
      label: "Instagram-ға трафик", big: "$0,05", unit: "профильге бір кіру", sub: "6,7 мың профильге кіру $361-ға. Жанында екінші науқан: 189 хат алмасу, әрқайсысы $1,74.",
      shots: [{ ...SHOTS.traffic, alt: "Meta Ads Manager-дегі «Трафик» науқанының скрині: Instagram профиліне 6,7 мың кіру, әрқайсысы $0,05, шығын $361,48" }, { ...SHOTS.engagement, alt: "Meta Ads Manager-дегі «Вовлеченность» науқанының скрині: 189 басталған хат алмасу, әрқайсысы $1,74, шығын $329,11" }],
    },
  ],
  /* что будет после заявки: 4 шага (пункт 29 разбора, ноябрь 2026; по методике
     таргетолога и фактам сайта: ответ в течение дня, запуск за 7 дней, отчёт по тарифу) */
  AFTER_STEPS: [
    { title: "Бір күн ішінде жауап беремін", text: "WhatsApp-қа, Telegram-ға жазасыз немесе өтінім қалдырасыз. Өзім жауап беремін және ыңғайлы уақытқа қоңырау белгілейміз." },
    { title: "20-30 минуттық қоңырау", text: "Не сататыныңызды, кім сатып алатынын және өтінімнен кейін адамдарға кім жауап беретінін талдаймыз. Жарнама өтелуі үшін бір өтінімге қанша төлеуге болатынын есептейміз. Қазір өтелмейтін болса, бірден айтамын." },
    { title: "Жоспар және қолжетімділік", text: "Бірінші айдың жоспарын жіберемін. Сіз тарифті таңдап, мені өз жарнама кабинетіңізге қосасыз: ол сіздікі болып қалады, жарнама бюджеті сіздің картаңыздан алынады." },
    { title: "Іске қосу және есептер", text: "Алғашқы жарнамалар 7 күн ішінде шығады. Алғашқы 3 күн ештеңе өзгертпеймін, жарнама үйренеді. Содан кейін әлсізін алып тастап, күштісін күшейтемін және тарифке қарай апта сайын немесе 2 аптада бір рет есеп жіберемін." },
  ],
  FAQS: [
    { q: "Төлем қалай жүзеге асады?", a: "Ай сайын, картаға аударыммен немесе шетелде болсаңыз Wise/Stripe арқылы." },
    { q: "Жұмыс төлемінен бөлек жарнаманың өзіне қанша керек?", a: "Әдетте айына $600-ден бастап. Бұл ақшаны көрсетілім үшін тікелей алаңдарға (Meta, TikTok, Google) төлейсіз. Нақты цифрды қоңырауда айтамын." },
    { q: "Қай алаңдарда жарнама жүргізесіз?", a: "Instagram, Facebook және Threads (бұл бір Meta жарнама кабинеті), TikTok және Google. Қай алаңнан бастау керектігін сала мен бюджетке қарай шешеміз." },
    { q: "Тек сайтқа ғана, жарнамасыз тапсырыс беруге бола ма?", a: "Иә. Бірақ екеуін бірге жасасақ, сайт бірден жарнамаға лайықталып жобаланады және бөлек тапсырыс беруден арзанырақ шығады." },
    { q: "Сайт қанша тұрады?", a: "Күрделілігіне байланысты: қарапайым лендингтен төлемі бар интернет-дүкенге дейін. Баға мен мерзімді қысқа қоңыраудан кейін айтамын." },
    { q: "Өтінімдер бар, ал сатылым жоқ болса ше?", a: "Адам жазғаннан кейін не болатынын бірге қараймыз. Кейде мәселе жарнамада емес, солай болса, тура айтамын." },
    { q: "Ал бір аптадан кейін ұнамаса ше?", a: "Жай ғана тоқтатамыз, айыппұлсыз және артық сұрақсыз." },
    { q: "Тек Қазақстанмен жұмыс істейсіз бе?", a: "Жоқ. Қазақстан (Алматы, Астана және басқа қалалар), Әзербайжан және ТМД-ның басқа елдеріндегі бизнеспен қашықтан жұмыс істеймін. Барлық байланыс мессенджерде және қоңырауларда." },
  ],
  TAPE_WHAT: ["Таргет", "Сайттар", "Креативтер", "Аналитика"],
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
      name: "Basic", price: "$350", sub: "One platform: Instagram and Facebook", popular: false,
      features: ["I set up ads from scratch or audit your current ones", "Up to 4 new ads per month", "Report every 2 weeks", "Messenger support"],
    },
    {
      name: "Optimal", price: "$550", sub: "Two platforms, e.g. Meta and Google", popular: true,
      features: ["Everything in Basic", "Weekly report with numbers", "Retargeting people who already saw you", "A call once a week"],
    },
    {
      name: "Premium", price: "$850", sub: "Up to three platforms, plus images and video", popular: false,
      features: ["Everything in Optimal", "I also produce the images and video", "I send sales from your CRM to Meta (CAPI), so the ads look for buyers", "Support 7 days a week, priority replies"],
    },
  ],
  /* первый экран: цифра из кабинета (подробный разбор этого кейса первым в CASES) */
  PROOF: { big: "4,617", unit: "conversations", sub: "$0.57 each, $2,626 over 45 days", shot: { ...SHOTS.s4617, alt: "Meta Ads Manager screenshot, all time: 4,617 conversations started, $0.57 per conversation, $2,626.17 spent, reach 325,552, impressions 1,098,477" } },
  /* кейсы со скринами: ниша, город, срок, что было до, что сделал. Тексты из
     отчётов владельца по каждому скрину (ноябрь 2026), бренды скрыты по NDA */
  CASES: [
    {
      niche: "Online store for home textiles, shipping across Uzbekistan", place: "Tashkent", period: "45 days",
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
      niche: "Women's clothing and shoe store", place: "Baku", period: "5 days",
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
      niche: "Food delivery: sushi and pizza", place: "Almaty", period: "2 days",
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
      niche: "Seasonal clothing stall, wholesale and retail", place: "Bishkek", period: "5 days",
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
      niche: "Hardware cosmetology and hair removal studio", place: "Astana", period: "5 days",
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
      niche: "Custom cabinet furniture and kitchens", place: "Baku", period: "3 days",
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
    { q: "Do you only work with Kazakhstan?", a: "No. I work remotely with businesses in Kazakhstan (Almaty, Astana and other cities), Azerbaijan and other CIS countries. All communication happens in messengers and on calls." },
  ],
  TAPE_WHAT: ["Targeting", "Websites", "Creatives", "Analytics"],
  TAPE_WHERE: ["Instagram", "Facebook", "TikTok", "Threads", "Google"],
};

export const CONTENT = { ru, kk, en };
