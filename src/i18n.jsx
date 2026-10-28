/* ============================================================
   МНОГОЯЗЫЧНОСТЬ
   UI: весь текст интерфейса (не контент, тот в data.jsx),
   сгруппирован по секциям сайта.

   Язык определяется адресом страницы: / русский, /kk/ казахский,
   /en/ английский (см. src/seo.js). У каждой версии свой готовый
   HTML, поэтому поисковики индексируют все три. Переключатель
   меняет язык без перезагрузки и адрес в строке браузера.

   Заголовки секций устроены как в каруселях LeadBoost: строка(и)
   `pre` обычным белым, последняя строка `mark` на жёлтой плашке.
   Русский: обращение на «ты», без длинных тире (—).
   ============================================================ */
import { useState, useEffect, startTransition } from "react";
import { LANG_PATHS, SEO, langFromPath } from "./seo.js";
import { IS_PREVIEW } from "./assets.js";

/* label: короткое название на переключателе (рядом круглый флаг, см. FLAGS
   в App.jsx), name: полное название для экранных читалок */
export const LANGS = [
  { code: "ru", label: "RU", name: "Русский" },
  { code: "kk", label: "KZ", name: "Қазақша" },
  { code: "en", label: "EN", name: "English" },
];

export function useLang(initialLang = "ru") {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = SEO[lang].title;
  }, [lang]);

  /* Смена языка перерисовывает всю страницу. startTransition: если часть
     страницы ещё «оживает» (см. Part в App.jsx), React сначала доживит её,
     а не выбросит готовый HTML с ошибкой в консоли. */
  const switchTo = (code) => startTransition(() => setLangState(code));

  /* кнопка «назад» в браузере возвращает и язык */
  useEffect(() => {
    const onPop = () => switchTo(langFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setLang = (code) => {
    switchTo(code);
    /* в превью адресов /kk/ и /en/ нет: там язык меняется без смены адреса */
    if (IS_PREVIEW) return;
    try {
      const path = LANG_PATHS[code];
      if (/^https?:$/.test(window.location.protocol) && window.location.pathname !== path) {
        window.history.pushState({}, "", path + window.location.hash);
      }
    } catch { /* превью без нормального адреса: язык всё равно сменится */ }
  };

  return { lang, setLang };
}

export const UI = {
  ru: {
    nav: { services: "Услуги", niches: "С кем работаю", work: "Кейсы", results: "Цифры", pricing: "Тарифы", faq: "Вопросы", contact: "Контакт", menu: "Меню" },
    common: { whatsapp: "Написать в WhatsApp", instagram: "Instagram", toTop: "Наверх", language: "Язык" },
    hero: {
      greetingMorning: "Доброе утро, это LeadBoost",
      greetingDay: "Добрый день, это LeadBoost",
      greetingEvening: "Добрый вечер, это LeadBoost",
      statusOnline: "На связи", statusOffline: "Отвечу утром",
      h1: ["Реклама,", "которая приводит"], h1Mark: "клиентов",
      lead: "Настраиваю таргетированную рекламу в Instagram и Facebook и делаю сайты, которые выдерживают этот трафик. Реклама, сайт и аналитика в одних руках с первого дня.",
      ctaPrimary: "Написать в WhatsApp", ctaSecondary: "Оставить заявку",
      proofLabel: "Из моего кабинета Meta", proofLink: "Смотреть скрины",
      statA: "кампаний запущено", statB: "средний ROAS клиентов",
      facts: ["Один специалист, без передачи по цепочке", "Первая реклама уже на первой неделе", "Понятный отчёт вместо красивых слов"],
    },
    statement: { pre: "Лайки не платят", mark: "по счетам", sub: "Хорошая реклама приводит не клики, а людей, готовых купить." },
    services: {
      label: "Услуги", pre: "От «где клиенты?»", mark: "до системы",
      sub: "Основное: таргетированная реклама в Instagram и Facebook. Дополнительно: сайты под рекламу, креативы и понятные отчёты.",
    },
    niches: {
      label: "Ниши", pre: "С кем", mark: "работаю",
      sub: "У каждой ниши своя цель: где-то нужна запись, где-то заказ или звонок. Под эту цель и настраиваю рекламу.",
      ctaTitle: "Твоей ниши нет?", ctaText: "Напиши, скажу честно, возьмусь или нет.",
    },
    work: {
      label: "Кейсы", pre: "Кампании", mark: "с цифрами",
      sub: "Сайты: новое направление, первые проекты уже в работе.", soonCta: "Обсудить сайт",
    },
    results: {
      label: "Скрины из кабинета", pre: "Не обещания,", mark: "а скрины",
      sub: "Реальные скрины из моего рекламного кабинета Meta. Цифры как есть, креативы клиентов размыты.",
      note: "Цена переписки зависит от ниши, оффера и бюджета. Это не обещание таких же цифр, а то, что видно в кабинете.",
      zoom: "Открыть скрин крупно", close: "Закрыть", source: "Скрин из Meta Ads Manager",
    },
    principles: {
      label: "Принципы", pre: "Как я", mark: "работаю", practice: "На практике",
      notPromiseLabel: "Чего не обещаю",
      notPromiseText: "точного числа продаж (оно зависит и от того, как ты отвечаешь клиентам), клиентов «уже завтра», результата без бюджета на саму рекламу и работы с продуктом, который ещё никто не покупал.",
    },
    fit: {
      label: "Честный отсев", pre: "Кому", mark: "подходит",
      sub: "Беру 3-4 проекта в месяц, поэтому честно фильтрую на входе.",
      yes: "Подходит, если", no: "Пока рано, если",
    },
    pricing: {
      label: "Тарифы", pre: "Три", mark: "варианта",
      sub: "Одна сумма в месяц. Без скрытых процентов и доплат.",
      popularBadge: "Выбор большинства", perMonth: "в месяц", select: "Выбрать",
      webNoteTitle: "Сайт идёт отдельно от тарифов на рекламу",
      webNoteText: "От простого лендинга до интернет-магазина. Цену и сроки скажу после короткого созвона.",
      webNoteBtn: "Обсудить сайт",
    },
    calculator: {
      label: "Калькулятор", pre: "Посчитай", mark: "сам",
      sub: "Сколько примерно клиентов принесёт твой рекламный бюджет.",
      nicheLabel: "Ниша", budgetLabel: "Бюджет на рекламу в месяц, $",
      out1: "Сколько будет стоить один человек, который напишет",
      out2: "Сколько таких людей будет в месяц",
      out3: "Насколько окупится реклама (ROAS)",
      note: "Примерный расчёт по средним цифрам ниши. Точные значения зависят от цены товара и сезона, скажу на созвоне.",
    },
    faq: { label: "Вопросы", pre: "Отвечаю", mark: "просто", more: "Не нашёл свой вопрос? Напиши, отвечу сам.", moreBtn: "Спросить в WhatsApp" },
    game: {
      label: "Мини-игра",
      title: "Проверь мою меткость на себе",
      subtitle: (need) => `Я попадаю в целевую аудиторию. А ты попадёшь в цель ${need} раз?`,
      playBtn: "Играть", playAgain: "Ещё раз", hudLabel: "Попаданий:", targetAria: "Цель",
      winTitle: "В яблочко! 🎯",
      winLine1: "Меткость у нас общая. Назови кодовое слово, когда будешь писать:",
      winLine2: "и получи бесплатный мини-аудит своей текущей рекламы.",
    },
    contact: {
      label: "Контакт", pre: ["Принеси задачу,", "которую не решить"], mark: "шаблоном",
      intro: "Расскажи, что меняется, что буксует и что должна дать следующая версия твоей рекламы или сайта. Отвечу по делу, без продающей рассылки.",
      fastLabel: "Быстрее всего", fastText: "Пиши в WhatsApp или в директ Instagram, отвечаю сам.",
      note: (left, total) => `Отвечаю в течение дня. Сейчас свободно ${left} из ${total} мест на месяц. Если мест нет, честно скажу, когда освобожусь.`,
      formTitle: "Или оставь заявку",
      form: {
        nameLabel: "Имя", namePh: "Как тебя зовут",
        contactLabel: "Телефон или Telegram", contactPh: "+7… или @username",
        serviceLabel: "Что интересует", serviceChoose: "Выбери", serviceAds: "Реклама", serviceSite: "Сайт", serviceBoth: "И реклама, и сайт",
        nicheLabel: "Чем занимаешься", nicheChoose: "Выбери нишу",
        budgetLabel: "Бюджет на рекламу в месяц (если есть)", budgetPh: "Например: $1 000",
        submit: "Отправить заявку", sending: "Отправляю…",
        errorText: "Не получилось отправить автоматически. Напиши мне напрямую", errorLink: "в WhatsApp",
        ok: "Заявка у меня. Свяжусь в течение дня.",
        planLabel: "Тариф", planRemove: "Убрать тариф",
      },
    },
    footer: {
      pre: "Ясность,", mark: "которая продаёт",
      linksLabel: "Ссылки", contactsLabel: "Связь", statusLabel: "Статус",
      online: "на связи, отвечаю быстро", offline: "сейчас ночь, отвечу утром",
      copyright: "© 2026 LeadBoost", services: "Реклама, сайты, аналитика", brandCta: "Написать",
    },
    mcta: { spots: (left, total) => `${left} из ${total} мест свободно`, cta: "WhatsApp" },
  },

  kk: {
    nav: { services: "Қызметтер", niches: "Кіммен жұмыс істеймін", work: "Кейстер", results: "Цифрлар", pricing: "Тарифтер", faq: "Сұрақтар", contact: "Байланыс", menu: "Мәзір" },
    common: { whatsapp: "WhatsApp-қа жазу", instagram: "Instagram", toTop: "Жоғарыға", language: "Тіл" },
    hero: {
      greetingMorning: "Қайырлы таң, бұл LeadBoost",
      greetingDay: "Қайырлы күн, бұл LeadBoost",
      greetingEvening: "Қайырлы кеш, бұл LeadBoost",
      statusOnline: "Байланыстамын", statusOffline: "Таңертең жауап беремін",
      h1: ["Клиент", "әкелетін"], h1Mark: "жарнама",
      lead: "Instagram мен Facebook-та таргеттелген жарнаманы баптаймын және осы трафикті көтере алатын сайттар жасаймын. Жарнама, сайт және аналитика бірінші күннен бір қолда.",
      ctaPrimary: "WhatsApp-қа жазу", ctaSecondary: "Өтінім қалдыру",
      proofLabel: "Meta кабинетімнен", proofLink: "Скриндерді көру",
      statA: "іске қосылған науқан", statB: "клиенттердің орташа ROAS",
      facts: ["Бір маман, тізбек арқылы берілмейді", "Алғашқы жарнама бірінші аптада-ақ", "Әдемі сөздің орнына түсінікті есеп"],
    },
    statement: { pre: "Лайктар", mark: "шот төлемейді", sub: "Жақсы жарнама клик емес, сатып алуға дайын адамдарды әкеледі." },
    services: {
      label: "Қызметтер", pre: "«Клиент қайда?» сұрағынан", mark: "жүйеге дейін",
      sub: "Негізгісі: Instagram мен Facebook-тағы таргеттелген жарнама. Қосымша: жарнамаға арналған сайттар, креативтер және түсінікті есептер.",
    },
    niches: {
      label: "Салалар", pre: "Кіммен", mark: "жұмыс істеймін",
      sub: "Әр саланың өз мақсаты бар: бірінде жазылу керек, бірінде тапсырыс не қоңырау. Жарнаманы осы мақсатқа баптаймын.",
      ctaTitle: "Салаңыз жоқ па?", ctaText: "Жазыңыз, көмектесе аламын ба, адал айтамын.",
    },
    work: {
      label: "Кейстер", pre: "Цифрлары бар", mark: "науқандар",
      sub: "Сайттар: жаңа бағыт, алғашқы жобалар жұмыста.", soonCta: "Сайтты талқылау",
    },
    results: {
      label: "Кабинеттен скриндер", pre: "Уәде емес,", mark: "скриндер",
      sub: "Meta жарнама кабинетімнен нақты скриндер. Цифрлар өзгертілмеген, клиенттердің креативтері бұлдыратылған.",
      note: "Хат алмасудың бағасы салаға, офферге және бюджетке байланысты. Бұл дәл осындай цифрларға уәде емес, кабинетте көрінетін нәтиже ғана.",
      zoom: "Скринді үлкейту", close: "Жабу", source: "Meta Ads Manager скрині",
    },
    principles: {
      label: "Қағидалар", pre: "Қалай", mark: "жұмыс істеймін", practice: "Іс жүзінде",
      notPromiseLabel: "Нені уәде етпеймін",
      notPromiseText: "нақты сатылым санын (бұл сіздің клиенттерге қалай жауап беретініңізге де байланысты), «ертең-ақ» клиенттерді, жарнамаға бюджетсіз нәтижені және әлі ешкім сатып алмаған өніммен жұмысты.",
    },
    fit: {
      label: "Адал іріктеу", pre: "Кімге", mark: "жарайды",
      sub: "Айына 3-4 жоба аламын, сондықтан кіреберісте адал іріктеймін.",
      yes: "Жарайды, егер", no: "Әзірге ерте, егер",
    },
    pricing: {
      label: "Тарифтер", pre: "Үш", mark: "нұсқа",
      sub: "Айына бір сома. Жасырын пайыздар мен қосымша төлемдерсіз.",
      popularBadge: "Көбінің таңдауы", perMonth: "айына", select: "Таңдау",
      webNoteTitle: "Сайт жарнама тарифтерінен бөлек",
      webNoteText: "Қарапайым лендингтен интернет-дүкенге дейін. Баға мен мерзімді қысқа қоңыраудан кейін айтамын.",
      webNoteBtn: "Сайтты талқылау",
    },
    calculator: {
      label: "Калькулятор", pre: "Өзіңіз", mark: "есептеңіз",
      sub: "Жарнама бюджетіңіз шамамен қанша клиент әкеледі.",
      nicheLabel: "Сала", budgetLabel: "Айына жарнама бюджеті, $",
      out1: "Жазатын бір адам қанша тұрады",
      out2: "Айына осындай адамдар саны",
      out3: "Жарнама қаншалықты өтеледі (ROAS)",
      note: "Сала бойынша орташа цифрлармен болжамды есеп. Нақты мәндер тауар бағасы мен маусымға байланысты, қоңырауда айтамын.",
    },
    faq: { label: "Сұрақтар", pre: "Қарапайым", mark: "жауап беремін", more: "Сұрағыңызды таппадыңыз ба? Жазыңыз, өзім жауап беремін.", moreBtn: "WhatsApp-та сұрау" },
    game: {
      label: "Мини-ойын",
      title: "Менің дәлдігімді өзіңізде тексеріңіз",
      subtitle: (need) => `Мен мақсатты аудиторияға дәл тиемін. Ал сіз нысанаға ${need} рет тие аласыз ба?`,
      playBtn: "Ойнау", playAgain: "Тағы да", hudLabel: "Тигендер:", targetAria: "Нысана",
      winTitle: "Дәл тидіңіз! 🎯",
      winLine1: "Дәлдік бізге ортақ. Жазған кезде кодтық сөзді айтыңыз:",
      winLine2: "және ағымдағы жарнамаңызға тегін мини-аудит алыңыз.",
    },
    contact: {
      label: "Байланыс", pre: "Үлгімен шешілмейтін", mark: "тапсырманы әкеліңіз",
      intro: "Не өзгеріп жатқанын, не тұрып қалғанын және жарнамаңыздың немесе сайтыңыздың келесі нұсқасы не беруі керектігін айтыңыз. Сатушы хатпен емес, нақты жауап беремін.",
      fastLabel: "Ең жылдамы", fastText: "WhatsApp-қа немесе Instagram директке жазыңыз, өзім жауап беремін.",
      note: (left, total) => `Бір күн ішінде жауап беремін. Қазір айына ${total} орынның ${left} бос. Орын болмаса, қашан босайтынымды адал айтамын.`,
      formTitle: "Немесе өтінім қалдырыңыз",
      form: {
        nameLabel: "Аты", namePh: "Атыңыз кім",
        contactLabel: "Телефон немесе Telegram", contactPh: "+7… немесе @username",
        serviceLabel: "Немен қызығасыз", serviceChoose: "Таңдаңыз", serviceAds: "Жарнама", serviceSite: "Сайт", serviceBoth: "Жарнама және сайт",
        nicheLabel: "Немен айналысасыз", nicheChoose: "Саланы таңдаңыз",
        budgetLabel: "Айына жарнама бюджеті (бар болса)", budgetPh: "Мысалы: $1 000",
        submit: "Өтінім жіберу", sending: "Жіберілуде…",
        errorText: "Автоматты түрде жіберілмеді. Маған тікелей жазыңыз", errorLink: "WhatsApp-қа",
        ok: "Өтінім менде. Бір күн ішінде хабарласамын.",
        planLabel: "Тариф", planRemove: "Тарифті алып тастау",
      },
    },
    footer: {
      pre: "Сататын", mark: "айқындық",
      linksLabel: "Сілтемелер", contactsLabel: "Байланыс", statusLabel: "Мәртебе",
      online: "байланыстамын, тез жауап беремін", offline: "қазір түн, таңертең жауап беремін",
      copyright: "© 2026 LeadBoost", services: "Жарнама, сайттар, аналитика", brandCta: "Жазу",
    },
    mcta: { spots: (left, total) => `${total} орынның ${left} бос`, cta: "WhatsApp" },
  },

  en: {
    nav: { services: "Services", niches: "Who I work with", work: "Cases", results: "Numbers", pricing: "Pricing", faq: "FAQ", contact: "Contact", menu: "Menu" },
    common: { whatsapp: "Message on WhatsApp", instagram: "Instagram", toTop: "Back to top", language: "Language" },
    hero: {
      greetingMorning: "Good morning, this is LeadBoost",
      greetingDay: "Good afternoon, this is LeadBoost",
      greetingEvening: "Good evening, this is LeadBoost",
      statusOnline: "Online", statusOffline: "Will reply in the morning",
      h1: ["Advertising", "that brings in"], h1Mark: "customers",
      lead: "I set up targeted Instagram and Facebook ads and build websites that can handle that traffic. Ads, website and analytics in one pair of hands from day one.",
      ctaPrimary: "Message on WhatsApp", ctaSecondary: "Send a request",
      proofLabel: "From my Meta ad account", proofLink: "See the screenshots",
      statA: "campaigns launched", statB: "avg. client ROAS",
      facts: ["One specialist, no hand-offs down a chain", "First ads live within the first week", "A clear report instead of pretty words"],
    },
    statement: { pre: "Likes don't", mark: "pay the bills", sub: "Good advertising brings people who are ready to buy, not just clicks." },
    services: {
      label: "Services", pre: "From “where are the customers?”", mark: "to a system",
      sub: "Core: targeted advertising on Instagram and Facebook. Add-ons: websites built for ads, creatives and clear reporting.",
    },
    niches: {
      label: "Niches", pre: "Who I", mark: "work with",
      sub: "Every niche has its own goal: bookings for some, orders or calls for others. That's the goal I set the ads up for.",
      ctaTitle: "Not on the list?", ctaText: "Message me and I'll tell you honestly if I can help.",
    },
    work: {
      label: "Case studies", pre: "Campaigns", mark: "with numbers",
      sub: "Websites are a new direction, first projects already underway.", soonCta: "Discuss a website",
    },
    results: {
      label: "Ad account screenshots", pre: "Not promises,", mark: "screenshots",
      sub: "Real screenshots from my Meta ad account. Numbers untouched, client creatives blurred.",
      note: "Cost per conversation depends on the niche, the offer and the budget. This isn't a promise of the same numbers, just what the ad account shows.",
      zoom: "Open the screenshot", close: "Close", source: "Meta Ads Manager screenshot",
    },
    principles: {
      label: "Principles", pre: "How I", mark: "work", practice: "In practice",
      notPromiseLabel: "What I don't promise",
      notPromiseText: "an exact number of sales (that also depends on how you respond to leads), customers “by tomorrow”, results without an ad budget, or working with a product nobody has bought yet.",
    },
    fit: {
      label: "Honest filter", pre: "Who this", mark: "fits",
      sub: "I take on 3-4 projects a month, so I filter honestly upfront.",
      yes: "A good fit if", no: "Too early if",
    },
    pricing: {
      label: "Pricing", pre: "Three", mark: "options",
      sub: "One flat monthly fee. No hidden percentages or add-ons.",
      popularBadge: "Most popular", perMonth: "per month", select: "Choose",
      webNoteTitle: "A website is separate from ad plans",
      webNoteText: "From a simple landing page to a full online store. Price and timeline after a short call.",
      webNoteBtn: "Discuss a website",
    },
    calculator: {
      label: "Calculator", pre: "Do the math", mark: "yourself",
      sub: "Roughly how many customers your ad budget will bring.",
      nicheLabel: "Niche", budgetLabel: "Monthly ad budget, $",
      out1: "Cost per person who messages you",
      out2: "How many such people per month",
      out3: "Expected return on ad spend (ROAS)",
      note: "A rough estimate based on niche averages. Exact numbers depend on product price and season, I'll tell you on a call.",
    },
    faq: { label: "Questions", pre: "Straight", mark: "answers", more: "Didn't find your question? Message me, I reply myself.", moreBtn: "Ask on WhatsApp" },
    game: {
      label: "Mini-game",
      title: "Test my aim yourself",
      subtitle: (need) => `I hit the target audience. Can you hit the target ${need} times?`,
      playBtn: "Play", playAgain: "Play again", hudLabel: "Hits:", targetAria: "Target",
      winTitle: "Bullseye! 🎯",
      winLine1: "Good aim is something we share. Mention this code word when you message me:",
      winLine2: "and get a free mini-audit of your current ads.",
    },
    contact: {
      label: "Contact", pre: ["Bring a problem", "a template"], mark: "can't solve",
      intro: "Tell me what's changing, what's stuck and what the next version of your ads or website needs to deliver. I'll reply with specifics, not a sales blast.",
      fastLabel: "Fastest", fastText: "Message me on WhatsApp or Instagram DM, I reply myself.",
      note: (left, total) => `I reply within a day. Right now ${left} of ${total} slots are open this month. If none are left, I'll tell you honestly when I free up.`,
      formTitle: "Or send a request",
      form: {
        nameLabel: "Name", namePh: "What's your name",
        contactLabel: "Phone or Telegram", contactPh: "+1… or @username",
        serviceLabel: "What are you interested in", serviceChoose: "Choose", serviceAds: "Advertising", serviceSite: "Website", serviceBoth: "Advertising & website",
        nicheLabel: "What do you do", nicheChoose: "Choose a niche",
        budgetLabel: "Monthly ad budget (if any)", budgetPh: "E.g.: $1,000",
        submit: "Send request", sending: "Sending…",
        errorText: "Couldn't send automatically. Message me directly", errorLink: "on WhatsApp",
        ok: "Got your request. I'll get back to you within a day.",
        planLabel: "Plan", planRemove: "Remove plan",
      },
    },
    footer: {
      pre: "Clarity", mark: "that sells",
      linksLabel: "Links", contactsLabel: "Contact", statusLabel: "Status",
      online: "online, quick replies", offline: "night here, will reply in the morning",
      copyright: "© 2026 LeadBoost", services: "Advertising, websites, analytics", brandCta: "Message me",
    },
    mcta: { spots: (left, total) => `${left} of ${total} slots open`, cta: "WhatsApp" },
  },
};
