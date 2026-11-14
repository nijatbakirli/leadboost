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
  ],
  RESULTS: [
    {
      label: "Переписки, весь период", big: "4 617", unit: "переписок", sub: "по $0,57 за каждую, потрачено $2 626",
      shots: [{ ...SHOTS.s4617, alt: "Скрин Meta Ads Manager за весь период: 4 617 начатых переписок, $0,57 за переписку, потрачено $2 626,17, охват 325 552, показы 1 098 477" }],
    },
    {
      label: "Переписки, весь период", big: "$0,21", unit: "за переписку", sub: "165 переписок за $35",
      shots: [{ ...SHOTS.s165, alt: "Скрин Meta Ads Manager: 165 начатых переписок, $0,21 за переписку, потрачено $35,06, охват 7 599, показы 10 852" }],
    },
    {
      label: "Переписки, весь период", big: "$0,25", unit: "за переписку", sub: "52 переписки за $12,79",
      shots: [{ ...SHOTS.s52, alt: "Скрин Meta Ads Manager: 52 начатые переписки, $0,25 за переписку, потрачено $12,79, охват 2 789, показы 3 694" }],
    },
    {
      label: "Весь период, бюджет $10 в день", big: "75", unit: "переписок", sub: "по $0,67 за каждую, потрачено $50. Рекламу увидели 20 572 человека.",
      shots: [{ ...SHOTS.s75, alt: "Скрин Meta Ads Manager: 75 начатых переписок, $0,67 за переписку, потрачено $50,12, дневной бюджет $10, охват 20 572, показы 29 456" }],
    },
    {
      label: "Трафик в Instagram", big: "$0,05", unit: "за визит в профиль", sub: "6,7 тыс. посещений профиля за $361. Рядом вторая кампания: 189 переписок по $1,74.",
      shots: [
        { ...SHOTS.traffic, alt: "Скрин кампании «Трафик» в Meta Ads Manager: 6,7 тыс. посещений профиля Instagram, $0,05 за посещение, затраты $361,48" },
        { ...SHOTS.engagement, alt: "Скрин кампании «Вовлеченность» в Meta Ads Manager: 189 начатых переписок, $1,74 за переписку, затраты $329,11" },
      ],
    },
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
  ],
  RESULTS: [
    {
      label: "Хат алмасулар, бүкіл кезең", big: "4 617", unit: "хат алмасу", sub: "әрқайсысы $0,57, жұмсалғаны $2 626",
      shots: [{ ...SHOTS.s4617, alt: "Meta Ads Manager скрині, бүкіл кезең: 4 617 басталған хат алмасу, әрқайсысы $0,57, жұмсалғаны $2 626,17, қамту 325 552, көрсетілім 1 098 477" }],
    },
    {
      label: "Хат алмасулар, бүкіл кезең", big: "$0,21", unit: "бір хат алмасу", sub: "165 хат алмасу $35-ға",
      shots: [{ ...SHOTS.s165, alt: "Meta Ads Manager скрині: 165 басталған хат алмасу, әрқайсысы $0,21, жұмсалғаны $35,06, қамту 7 599, көрсетілім 10 852" }],
    },
    {
      label: "Хат алмасулар, бүкіл кезең", big: "$0,25", unit: "бір хат алмасу", sub: "52 хат алмасу $12,79-ға",
      shots: [{ ...SHOTS.s52, alt: "Meta Ads Manager скрині: 52 басталған хат алмасу, әрқайсысы $0,25, жұмсалғаны $12,79, қамту 2 789, көрсетілім 3 694" }],
    },
    {
      label: "Бүкіл кезең, күніне $10 бюджет", big: "75", unit: "хат алмасу", sub: "әрқайсысы $0,67, жұмсалғаны $50. Жарнаманы 20 572 адам көрді.",
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
  ],
  RESULTS: [
    {
      label: "Conversations, all time", big: "4,617", unit: "conversations", sub: "$0.57 each, $2,626 spent",
      shots: [{ ...SHOTS.s4617, alt: "Meta Ads Manager screenshot, all time: 4,617 conversations started, $0.57 per conversation, $2,626.17 spent, reach 325,552, impressions 1,098,477" }],
    },
    {
      label: "Conversations, all time", big: "$0.21", unit: "per conversation", sub: "165 conversations for $35",
      shots: [{ ...SHOTS.s165, alt: "Meta Ads Manager screenshot: 165 conversations started, $0.21 per conversation, $35.06 spent, reach 7,599, impressions 10,852" }],
    },
    {
      label: "Conversations, all time", big: "$0.25", unit: "per conversation", sub: "52 conversations for $12.79",
      shots: [{ ...SHOTS.s52, alt: "Meta Ads Manager screenshot: 52 conversations started, $0.25 per conversation, $12.79 spent, reach 2,789, impressions 3,694" }],
    },
    {
      label: "All time, $10 a day budget", big: "75", unit: "conversations", sub: "$0.67 each, $50 spent. The ads reached 20,572 people.",
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
