/* ============================================================
   МНОГОЯЗЫЧНОСТЬ
   UI: весь текст интерфейса (не контент, тот в data.jsx),
   сгруппирован по секциям сайта.

   Язык определяется адресом страницы: / русский, /kk/ казахский,
   /en/ английский (см. src/seo.js). У каждой версии свой готовый
   HTML, поэтому поисковики индексируют все три. Переключатель
   меняет язык без перезагрузки и адрес в строке браузера.

   Заголовок секции: строка(и) `pre` цветом текста и, только на первом
   экране, в скринах, тарифах и контакте, последняя строка `mark` на
   жёлтом мазке маркера (ноябрь 2026: мазков было 13, выделение
   перестало выделять). Подписей капсом над заголовками нет.
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
    nav: { services: "Услуги", niches: "С кем работаю", results: "Кейсы", pricing: "Тарифы", faq: "Вопросы", contact: "Контакт", menu: "Меню", theme: "Тёмная тема" },
    common: { whatsapp: "Написать в WhatsApp", telegram: "Написать в Telegram", instagram: "Instagram", toTop: "Наверх", language: "Язык" },
    hero: {
      statusOnline: "На связи", statusOffline: "Отвечу утром",
      h1: ["Таргет в Instagram", "и Facebook", "для бизнеса"], h1Mark: "в Казахстане и СНГ",
      lead: "Ещё веду рекламу в TikTok, Threads и Google и делаю сайты, которые выдерживают её трафик. Работаю сам, без менеджеров и передачи по цепочке.",
      ctaPrimary: "Написать в WhatsApp", ctaSecondary: "Оставить заявку",
      proofLabel: "Из моего кабинета Meta", proofLink: "Как это сделано",
      statA: "кампаний запущено", statB: "средний ROAS клиентов",
    },
    services: { pre: "Что я делаю" },
    niches: {
      pre: "С кем работаю",
      sub: "У каждой ниши своя цель: где-то нужна запись, где-то заказ или звонок. Под эту цель и настраиваю рекламу.",
      ctaTitle: "Твоей ниши нет?", ctaText: "Напиши, скажу, возьмусь или нет.",
    },
    results: {
      pre: "Кейсы из моего", mark: "кабинета Meta",
      sub: "Шесть бизнесов в пяти городах. Цифры со скринов как есть, названия брендов скрыты по договорённости с клиентами.",
      before: "Что было", did: "Что сделал", more: "Ещё результаты", showShots: "Скрины",
      note: "Цена переписки зависит от ниши, оффера и бюджета, поэтому одинаковых цифр не обещаю.",
      zoom: "Открыть скрин крупно", close: "Закрыть", source: "Скрин из Meta Ads Manager",
    },
    principles: {
      pre: "Как я работаю",
      notPromiseLabel: "Чего не обещаю",
      notPromiseText: "Точного числа продаж (оно зависит и от того, как ты отвечаешь клиентам), клиентов «уже завтра», результата без бюджета на саму рекламу и работы с продуктом, который ещё никто не покупал.",
    },
    fit: {
      pre: "Кому подходит",
      sub: "Беру 3, максимум 4 проекта в месяц, смотря по нише. Поэтому до старта проверяю, готов ли бизнес к рекламе.",
      yes: "Подходит, если", no: "Пока рано, если",
    },
    pricing: {
      pre: "Тарифы", mark: (from) => `от ${from} в месяц`,
      sub: "Цена за месяц работы. Бюджет на рекламу отдельно.",
      popularBadge: "Рекомендую", perMonth: "в месяц", select: "Выбрать",
      webNoteTitle: "Сайт идёт отдельно от тарифов на рекламу",
      webNoteText: "От простого лендинга до интернет-магазина. Цену и сроки скажу после короткого созвона.",
      webNoteBtn: "Обсудить сайт",
    },
    after: { pre: "Что будет после заявки" },
    faq: { pre: "Частые вопросы", more: "Не нашёл свой вопрос? Напиши, отвечу сам.", moreBtn: "Спросить в WhatsApp" },
    contact: {
      pre: "Напиши, отвечу сам", mark: "в течение дня",
      intro: "Расскажи, чем занимаешься и что сейчас с рекламой. Отвечу по делу.",
      fastLabel: "Быстрее всего", fastText: "Пиши в WhatsApp, Telegram или в директ Instagram.",
      offer: "Уже есть реклама? Пришли скрин своего рекламного кабинета, бесплатно скажу, что бы поправил.",
      note: (left) => left > 0
        ? `Сейчас на этот месяц свободно ${left} ${left % 10 === 1 && left % 100 !== 11 ? "место" : left % 10 >= 2 && left % 10 <= 4 && (left % 100 < 12 || left % 100 > 14) ? "места" : "мест"}. Если мест не останется, скажу, когда освободится.`
        : "На этот месяц мест нет. Напиши, скажу, когда освободится.",
      formTitle: "Или оставь заявку",
      form: {
        nameLabel: "Имя", namePh: "Как тебя зовут",
        contactLabel: "Телефон или Telegram", contactPh: "+7… или @username",
        serviceLabel: "Что интересует", serviceChoose: "Выбери", serviceAds: "Реклама", serviceSite: "Сайт", serviceBoth: "И реклама, и сайт", other: "Другое",
        nicheLabel: "Чем занимаешься", nicheChoose: "Выбери нишу",
        budgetLabel: "Бюджет на рекламу в месяц (если есть)", budgetPh: "Например: $1 000",
        submit: "Отправить заявку", sending: "Отправляю…",
        errorText: "Не получилось отправить автоматически. Напиши мне напрямую", errorLink: "в WhatsApp", errorOr: "или", errorLinkTg: "в Telegram",
        ok: "Заявка у меня. Свяжусь в течение дня.",
        planLabel: "Тариф", planChoose: "Пока не знаю, нужен совет",
      },
    },
    footer: {
      linksLabel: "Ссылки", contactsLabel: "Связь", statusLabel: "Статус",
      online: "на связи, отвечаю быстро", offline: "сейчас ночь, отвечу утром",
      copyright: "© 2026 TARGET PRO", brandCta: "Написать",
    },
  },

  kk: {
    nav: { services: "Қызметтер", niches: "Кіммен жұмыс істеймін", results: "Кейстер", pricing: "Тарифтер", faq: "Сұрақтар", contact: "Байланыс", menu: "Мәзір", theme: "Қараңғы тақырып" },
    common: { whatsapp: "WhatsApp-қа жазу", telegram: "Telegram-ға жазу", instagram: "Instagram", toTop: "Жоғарыға", language: "Тіл" },
    hero: {
      statusOnline: "Байланыстамын", statusOffline: "Таңертең жауап беремін",
      h1: ["Instagram мен", "Facebook-та", "Қазақстан мен ТМД"], h1Mark: "бизнесіне таргет",
      lead: "TikTok, Threads және Google-да да жарнама жүргіземін, оның трафигін көтере алатын сайттар жасаймын. Бәрін өзім істеймін, менеджерлерсіз және тізбек арқылы берусіз.",
      ctaPrimary: "WhatsApp-қа жазу", ctaSecondary: "Өтінім қалдыру",
      proofLabel: "Meta кабинетімнен", proofLink: "Бұл қалай жасалды",
      statA: "іске қосылған науқан", statB: "клиенттердің орташа ROAS",
    },
    services: { pre: "Не істеймін" },
    niches: {
      pre: "Кіммен жұмыс істеймін",
      sub: "Әр саланың өз мақсаты бар: бірінде жазылу керек, бірінде тапсырыс не қоңырау. Жарнаманы осы мақсатқа баптаймын.",
      ctaTitle: "Салаңыз жоқ па?", ctaText: "Жазыңыз, қолға аламын ба, айтамын.",
    },
    results: {
      pre: "Meta кабинетімнен", mark: "кейстер",
      sub: "Бес қаладағы алты бизнес. Скриндердегі цифрлар өзгертілмеген, брендтердің атаулары клиенттермен келісім бойынша жасырылған.",
      before: "Не болды", did: "Не істедім", more: "Тағы нәтижелер", showShots: "Скриндер",
      note: "Хат алмасудың бағасы салаға, офферге және бюджетке байланысты, сондықтан дәл осындай цифрларды уәде етпеймін.",
      zoom: "Скринді үлкейту", close: "Жабу", source: "Meta Ads Manager скрині",
    },
    principles: {
      pre: "Қалай жұмыс істеймін",
      notPromiseLabel: "Нені уәде етпеймін",
      notPromiseText: "Нақты сатылым санын (бұл сіздің клиенттерге қалай жауап беретініңізге де байланысты), «ертең-ақ» клиенттерді, жарнамаға бюджетсіз нәтижені және әлі ешкім сатып алмаған өніммен жұмысты.",
    },
    fit: {
      pre: "Кімге жарайды",
      sub: "Айына 3, ең көбі 4 жоба аламын, салаға байланысты. Сондықтан бастамас бұрын бизнестің жарнамаға дайын екенін тексеремін.",
      yes: "Жарайды, егер", no: "Әзірге ерте, егер",
    },
    pricing: {
      pre: "Тарифтер", mark: (from) => `айына ${from}-ден`,
      sub: "Бір айлық жұмыстың бағасы. Жарнама бюджеті бөлек.",
      popularBadge: "Ұсынамын", perMonth: "айына", select: "Таңдау",
      webNoteTitle: "Сайт жарнама тарифтерінен бөлек",
      webNoteText: "Қарапайым лендингтен интернет-дүкенге дейін. Баға мен мерзімді қысқа қоңыраудан кейін айтамын.",
      webNoteBtn: "Сайтты талқылау",
    },
    after: { pre: "Өтінімнен кейін не болады" },
    faq: { pre: "Жиі қойылатын сұрақтар", more: "Сұрағыңызды таппадыңыз ба? Жазыңыз, өзім жауап беремін.", moreBtn: "WhatsApp-та сұрау" },
    contact: {
      pre: "Жазыңыз, бір күн ішінде", mark: "өзім жауап беремін",
      intro: "Немен айналысатыныңызды және жарнамаңыз қазір қандай екенін айтыңыз. Нақты жауап беремін.",
      fastLabel: "Ең жылдамы", fastText: "WhatsApp-қа, Telegram-ға немесе Instagram директке жазыңыз.",
      offer: "Жарнамаңыз бар ма? Жарнама кабинетіңіздің скринін жіберіңіз, нені түзетер едім, тегін айтамын.",
      note: (left) => left > 0
        ? `Қазір осы айға ${left} орын бос. Орын қалмаса, қашан босайтынын айтамын.`
        : "Осы айға орын жоқ. Жазыңыз, қашан босайтынын айтамын.",
      formTitle: "Немесе өтінім қалдырыңыз",
      form: {
        nameLabel: "Аты", namePh: "Атыңыз кім",
        contactLabel: "Телефон немесе Telegram", contactPh: "+7… немесе @username",
        serviceLabel: "Немен қызығасыз", serviceChoose: "Таңдаңыз", serviceAds: "Жарнама", serviceSite: "Сайт", serviceBoth: "Жарнама және сайт", other: "Басқа",
        nicheLabel: "Немен айналысасыз", nicheChoose: "Саланы таңдаңыз",
        budgetLabel: "Айына жарнама бюджеті (бар болса)", budgetPh: "Мысалы: $1 000",
        submit: "Өтінім жіберу", sending: "Жіберілуде…",
        errorText: "Автоматты түрде жіберілмеді. Маған тікелей жазыңыз", errorLink: "WhatsApp-қа", errorOr: "немесе", errorLinkTg: "Telegram-ға",
        ok: "Өтінім менде. Бір күн ішінде хабарласамын.",
        planLabel: "Тариф", planChoose: "Әзірге білмеймін, кеңес керек",
      },
    },
    footer: {
      linksLabel: "Сілтемелер", contactsLabel: "Байланыс", statusLabel: "Мәртебе",
      online: "байланыстамын, тез жауап беремін", offline: "қазір түн, таңертең жауап беремін",
      copyright: "© 2026 TARGET PRO", brandCta: "Жазу",
    },
  },

  en: {
    nav: { services: "Services", niches: "Who I work with", results: "Cases", pricing: "Pricing", faq: "FAQ", contact: "Contact", menu: "Menu", theme: "Dark theme" },
    common: { whatsapp: "Message on WhatsApp", telegram: "Message on Telegram", instagram: "Instagram", toTop: "Back to top", language: "Language" },
    hero: {
      statusOnline: "Online", statusOffline: "Will reply in the morning",
      h1: ["Instagram and", "Facebook ads for", "businesses in"], h1Mark: "Kazakhstan & the CIS",
      lead: "I also run ads on TikTok, Threads and Google, and build websites that can handle the traffic. I do the work myself, with no managers and no hand-offs.",
      ctaPrimary: "Message on WhatsApp", ctaSecondary: "Send a request",
      proofLabel: "From my Meta ad account", proofLink: "How it was done",
      statA: "campaigns launched", statB: "avg. client ROAS",
    },
    services: { pre: "What I do" },
    niches: {
      pre: "Who I work with",
      sub: "Every niche has its own goal: bookings for some, orders or calls for others. That's the goal I set the ads up for.",
      ctaTitle: "Not on the list?", ctaText: "Message me and I'll tell you if I can take it on.",
    },
    results: {
      pre: "Cases from my", mark: "Meta ad account",
      sub: "Six businesses in five cities. Numbers from the screenshots as they are; brand names hidden by agreement with clients.",
      before: "Before", did: "What I did", more: "More results", showShots: "Screenshots",
      note: "Cost per conversation depends on the niche, the offer and the budget, so I don't promise the same numbers.",
      zoom: "Open the screenshot", close: "Close", source: "Meta Ads Manager screenshot",
    },
    principles: {
      pre: "How I work",
      notPromiseLabel: "What I don't promise",
      notPromiseText: "An exact number of sales (that also depends on how you respond to leads), customers “by tomorrow”, results without an ad budget, or working with a product nobody has bought yet.",
    },
    fit: {
      pre: "Who this fits",
      sub: "I take on 3, at most 4 projects a month, depending on the niche. So before we start I check whether the business is ready for ads.",
      yes: "A good fit if", no: "Too early if",
    },
    pricing: {
      pre: "Plans", mark: (from) => `from ${from} a month`,
      sub: "The price of a month of my work. The ad budget is separate.",
      popularBadge: "Recommended", perMonth: "per month", select: "Choose",
      webNoteTitle: "A website is separate from ad plans",
      webNoteText: "From a simple landing page to a full online store. Price and timeline after a short call.",
      webNoteBtn: "Discuss a website",
    },
    after: { pre: "What happens after you get in touch" },
    faq: { pre: "Common questions", more: "Didn't find your question? Message me, I reply myself.", moreBtn: "Ask on WhatsApp" },
    contact: {
      pre: "Message me, I'll reply myself", mark: "within a day",
      intro: "Tell me what you do and where your ads stand now. I'll reply with specifics.",
      fastLabel: "Fastest", fastText: "Message me on WhatsApp, Telegram or Instagram DM.",
      offer: "Already running ads? Send a screenshot of your ad account and I'll tell you what I'd fix, free.",
      note: (left) => left > 0
        ? `Right now ${left} slot${left === 1 ? " is" : "s are"} open this month. If none are left, I'll tell you when one frees up.`
        : "No slots left this month. Message me and I'll tell you when one frees up.",
      formTitle: "Or send a request",
      form: {
        nameLabel: "Name", namePh: "What's your name",
        contactLabel: "Phone or Telegram", contactPh: "+1… or @username",
        serviceLabel: "What are you interested in", serviceChoose: "Choose", serviceAds: "Advertising", serviceSite: "Website", serviceBoth: "Advertising & website", other: "Other",
        nicheLabel: "What do you do", nicheChoose: "Choose a niche",
        budgetLabel: "Monthly ad budget (if any)", budgetPh: "E.g.: $1,000",
        submit: "Send request", sending: "Sending…",
        errorText: "Couldn't send automatically. Message me directly", errorLink: "on WhatsApp", errorOr: "or", errorLinkTg: "on Telegram",
        ok: "Got your request. I'll get back to you within a day.",
        planLabel: "Plan", planChoose: "Not sure yet, I need advice",
      },
    },
    footer: {
      linksLabel: "Links", contactsLabel: "Contact", statusLabel: "Status",
      online: "online, quick replies", offline: "night here, will reply in the morning",
      copyright: "© 2026 TARGET PRO", brandCta: "Message me",
    },
  },
};
