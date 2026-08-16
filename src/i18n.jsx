/* ============================================================
   МНОГОЯЗЫЧНОСТЬ
   UI — весь текст интерфейса (не контент — тот в data.jsx),
   сгруппирован по секциям сайта. useLang — состояние текущего
   языка: всегда 'ru' у нового посетителя, дальше запоминается
   в localStorage.
   ============================================================ */
import { useState, useEffect } from "react";

export const LANGS = [
  { code: "ru", label: "RU" },
  { code: "kk", label: "KZ" },
  { code: "en", label: "EN" },
];

const LANG_KEY = "lb_lang";

export function useLang() {
  const [lang, setLangState] = useState("ru");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (code) => {
    setLangState(code);
    localStorage.setItem(LANG_KEY, code);
  };

  return { lang, setLang };
}

export const UI = {
  ru: {
    nav: { studio: "Студия", services: "Услуги", work: "Работы", pricing: "Тарифы", contact: "Контакт" },
    hero: {
      secLabel: "СТУДИЯ",
      overline: "Независимая студия рекламы",
      greetingMorning: "Доброе утро—", greetingDay: "Добрый день—", greetingEvening: "Добрый вечер—",
      brand: "это LeadBoost",
      leadPre: "Настраиваю трафик, который ", leadMark: "приводит клиентов",
      leadPost: ", и делаю сайты, которые его выдерживают. Реклама, сайт и аналитика — в одних руках с первого дня.",
      ctaPrimary: "Обсудить проект →", ctaSecondary: "Смотреть работы",
      caseTag: "КЕЙС / 07", caseTitle: "Реклама с характером.",
      chipA: "кампаний запущено", chipB: "средний ROAS клиентов",
      facts: ["✓ Один специалист, без передачи по цепочке", "✓ Первая реклама — уже на первой неделе", "✓ Понятный отчёт вместо красивых слов"],
    },
    statement: { pre: "Хорошая реклама делает больше, чем приводит клики. Она приводит людей,", mark: "готовых купить." },
    services: { secLabel: "ЧТО ДЕЛАЮ", heading: "Услуги", sub: "Сфокусированная работа: от вопроса «откуда брать клиентов» — до работающей системы.", nichesLabel: "/ С КЕМ РАБОТАЮ" },
    work: { secLabel: "ИЗБРАННЫЕ РАБОТЫ", heading: "Работы", sub: "Кампании с реальными цифрами. Сайты — новое направление, первые проекты уже в работе.", hint: "Листайте →", back: "Назад", next: "Вперёд" },
    principles: { secLabel: "ПРИНЦИПЫ РАБОТЫ", practiceSuffix: " / НА ПРАКТИКЕ", notPromiseLabel: "Чего не обещаю:", notPromiseText: "точного числа продаж (это зависит и от того, как вы отвечаете клиентам) · клиентов «уже завтра» · результата без бюджета на саму рекламу · работы с продуктом, который ещё никто не покупал." },
    fit: { secLabel: "ЧЕСТНЫЙ ОТСЕВ", headingPre: "Кому ", headingMark: "подходит", sub: "Беру 3-4 проекта в месяц — поэтому честно фильтрую на входе.", yes: "Подходит, если", no: "Пока рано, если" },
    pricing: { secLabel: "ТАРИФЫ", headingPre: "Три ", headingMark: "варианта", sub: "Одна сумма в месяц. Без скрытых процентов и доплат.", popularBadge: "выбор большинства", select: "Выбрать", webNoteTitle: "Сайт — отдельно от тарифов на рекламу", webNoteText: "От простого лендинга до интернет-магазина. Цена и сроки — после короткого созвона.", webNoteBtn: "Обсудить сайт" },
    calculator: { secLabel: "КАЛЬКУЛЯТОР", heading: "Посчитайте сами", sub: "Сколько клиентов примерно принесёт ваш рекламный бюджет.", nicheLabel: "Ниша", budgetLabel: "Бюджет на рекламу в месяц ($)", out1: "Сколько будет стоить один человек, который напишет", out2: "Сколько таких людей будет в месяц", out3: "На сколько окупится реклама", note: "Примерный расчёт по средним цифрам ниши. Точные значения зависят от цены товара и сезона — скажу на созвоне." },
    notes: { secLabel: "ЦИФРЫ", heading: "Не обещания.", sub: "Наблюдения из реальных кампаний — то, что видно в отчётах, а не в презентациях." },
    faq: { secLabel: "ВОПРОСЫ", headingPre: "Отвечаю ", headingMark: "просто" },
    game: {
      title: "Проверьте мою меткость на себе",
      subtitle: (need) => `Я попадаю в целевую аудиторию. А вы — попадёте в цель ${need} раз?`,
      playBtn: "Играть · 20 секунд", hudLabel: "Попаданий:", targetAria: "Цель",
      winTitle: "В яблочко! 🎯", winLine1: "Меткость — общая черта. Назовите кодовое слово при заявке:",
      winLine2: "— и получите бесплатный мини-аудит текущей рекламы.",
    },
    contact: {
      secLabel: "КОНТАКТ", heading: "Принесите задачу, которую не решить шаблоном.",
      intro: "Расскажите, что меняется, что буксует и что должна дать следующая версия вашей рекламы или сайта. Отвечу с конкретикой — а не продающей рассылкой.",
      note: (left, total) => `Отвечаю в течение дня. Сейчас свободно ${left} из ${total} мест на месяц — если не успели, честно скажу, когда освобожусь.`,
      form: {
        nameLabel: "Имя", namePh: "Как вас зовут",
        contactLabel: "Телефон или Telegram", contactPh: "+7… или @username",
        serviceLabel: "Что интересует", serviceChoose: "Выберите", serviceAds: "Реклама", serviceSite: "Сайт", serviceBoth: "И реклама, и сайт",
        nicheLabel: "Чем занимаетесь", nicheChoose: "Выберите нишу",
        budgetLabel: "Бюджет на рекламу в месяц (если применимо)", budgetPh: "Например: $1 000",
        submit: "Отправить заявку", sending: "Отправляю…",
        errorText: "Не получилось отправить автоматически. Напишите напрямую:", errorLink: "на почту",
        ok: "✓ Заявка принята — свяжусь с вами в течение дня.",
      },
    },
    footer: {
      tagline: "Ясность,", tagline2: "которая продаёт.",
      quickLinks: "/ БЫСТРЫЕ ССЫЛКИ", status: "/ СТАТУС",
      online: "на связи", offline: "отвечу утром",
      copyright: "© 2026 LeadBoost", services: "Реклама · Сайты · Аналитика", toTop: "Наверх →",
    },
    mcta: { spots: (left, total) => `${left} из ${total} свободно`, cta: "Заявка →" },
  },

  kk: {
    nav: { studio: "Студия", services: "Қызметтер", work: "Жұмыстар", pricing: "Тарифтер", contact: "Байланыс" },
    hero: {
      secLabel: "СТУДИЯ",
      overline: "Тәуелсіз жарнама студиясы",
      greetingMorning: "Қайырлы таң—", greetingDay: "Қайырлы күн—", greetingEvening: "Қайырлы кеш—",
      brand: "бұл LeadBoost",
      leadPre: "Клиенттерді ", leadMark: "әкелетін трафикті",
      leadPost: " баптаймын, оны көтере алатын сайттар жасаймын. Жарнама, сайт және аналитика — бірінші күннен бір қолда.",
      ctaPrimary: "Жобаны талқылау →", ctaSecondary: "Жұмыстарды көру",
      caseTag: "КЕЙС / 07", caseTitle: "Мінезі бар жарнама.",
      chipA: "кампания іске қосылды", chipB: "клиенттердің орташа ROAS",
      facts: ["✓ Бір маман, тізбек арқылы берілмейді", "✓ Алғашқы жарнама — бірінші аптада-ақ", "✓ Әдемі сөздердің орнына түсінікті есеп"],
    },
    statement: { pre: "Жақсы жарнама клик әкелуден көп нәрсе істейді. Ол сатып алуға,", mark: "дайын адамдарды әкеледі." },
    services: { secLabel: "НЕ ІСТЕЙМІН", heading: "Қызметтер", sub: "Мақсатты жұмыс: «клиенттерді қайдан алу керек» деген сұрақтан — жұмыс істейтін жүйеге дейін.", nichesLabel: "/ КІМДЕРМЕН ЖҰМЫС ІСТЕЙМІН" },
    work: { secLabel: "ТАҢДАУЛЫ ЖҰМЫСТАР", heading: "Жұмыстар", sub: "Нақты цифрлары бар науқандар. Сайттар — жаңа бағыт, алғашқы жобалар жұмыста.", hint: "Жылжытыңыз →", back: "Артқа", next: "Алға" },
    principles: { secLabel: "ЖҰМЫС ҚАҒИДАЛАРЫ", practiceSuffix: " / ІС ЖҮЗІНДЕ", notPromiseLabel: "Нені уәде етпеймін:", notPromiseText: "нақты сатылым санын (бұл сіздің клиенттерге қалай жауап беретініңізге де байланысты) · «ертең-ақ» клиенттерді · жарнамаға бюджетсіз нәтижені · әлі ешкім сатып алмаған өніммен жұмысты." },
    fit: { secLabel: "АДАЛ ІРІКТЕУ", headingPre: "Кімге ", headingMark: "жарайды", sub: "Айына 3-4 жоба аламын — сондықтан кіреберісте адал сүземін.", yes: "Жарайды, егер", no: "Әзірге ерте, егер" },
    pricing: { secLabel: "ТАРИФТЕР", headingPre: "Үш ", headingMark: "нұсқа", sub: "Айына бір сома. Жасырын пайыздар мен қосымша төлемдерсіз.", popularBadge: "көбінің таңдауы", select: "Таңдау", webNoteTitle: "Сайт — жарнама тарифтерінен бөлек", webNoteText: "Қарапайым лендингтен интернет-дүкенге дейін. Баға мен мерзім — қысқа қоңыраудан кейін.", webNoteBtn: "Сайтты талқылау" },
    calculator: { secLabel: "КАЛЬКУЛЯТОР", heading: "Өзіңіз есептеңіз", sub: "Жарнама бюджетіңіз шамамен қанша клиент әкеледі.", nicheLabel: "Сала", budgetLabel: "Айына жарнама бюджеті ($)", out1: "Жазатын бір адам қанша тұрады", out2: "Айына осындай адамдар саны қанша болады", out3: "Жарнама қаншаға өтеледі", note: "Сала бойынша орташа цифрлармен болжамды есеп. Нақты мәндер тауар бағасы мен маусымға байланысты — қоңырауда айтамын." },
    notes: { secLabel: "ЦИФРЛАР", heading: "Уәделер емес.", sub: "Нақты науқандардан алынған бақылаулар — презентацияда емес, есепте көрінетіні." },
    faq: { secLabel: "СҰРАҚТАР", headingPre: "Қарапайым ", headingMark: "жауап беремін" },
    game: {
      title: "Менің дәлдігімді өзіңізде тексеріңіз",
      subtitle: (need) => `Мен мақсатты аудиторияға дәл тиемін. Ал сіз — нысанаға ${need} рет тиесіз бе?`,
      playBtn: "Ойнау · 20 секунд", hudLabel: "Тигендер:", targetAria: "Нысана",
      winTitle: "Дәл тидіңіз! 🎯", winLine1: "Дәлдік — ортақ қасиет. Өтінім берген кезде кодтық сөзді айтыңыз:",
      winLine2: "— және ағымдағы жарнамаға тегін мини-аудит алыңыз.",
    },
    contact: {
      secLabel: "БАЙЛАНЫС", heading: "Үлгімен шешілмейтін тапсырманы әкеліңіз.",
      intro: "Не өзгеріп жатқанын, не тұрып қалғанын және жарнамаңыздың немесе сайтыңыздың келесі нұсқасы не беруі керектігін айтыңыз. Нақты жауап беремін — сатушы хатпен емес.",
      note: (left, total) => `Бір күн ішінде жауап беремін. Қазір айына ${total} орынның ${left} бос — үлгермесеңіз, қашан босайтынымды адал айтамын.`,
      form: {
        nameLabel: "Аты", namePh: "Атыңыз кім",
        contactLabel: "Телефон немесе Telegram", contactPh: "+7… немесе @username",
        serviceLabel: "Немен қызығасыз", serviceChoose: "Таңдаңыз", serviceAds: "Жарнама", serviceSite: "Сайт", serviceBoth: "Жарнама және сайт",
        nicheLabel: "Немен айналысасыз", nicheChoose: "Саланы таңдаңыз",
        budgetLabel: "Айына жарнама бюджеті (қолданылса)", budgetPh: "Мысалы: $1 000",
        submit: "Өтінім жіберу", sending: "Жіберілуде…",
        errorText: "Автоматты жіберу шықпады. Тікелей жазыңыз:", errorLink: "поштаға",
        ok: "✓ Өтінім қабылданды — бір күн ішінде хабарласамын.",
      },
    },
    footer: {
      tagline: "Сату", tagline2: "айқындығы.",
      quickLinks: "/ ЖЫЛДАМ СІЛТЕМЕЛЕР", status: "/ МӘРТЕБЕ",
      online: "байланыста", offline: "таңертең жауап беремін",
      copyright: "© 2026 LeadBoost", services: "Жарнама · Сайттар · Аналитика", toTop: "Жоғарыға →",
    },
    mcta: { spots: (left, total) => `${total} орынның ${left} бос`, cta: "Өтінім →" },
  },

  en: {
    nav: { studio: "Studio", services: "Services", work: "Work", pricing: "Pricing", contact: "Contact" },
    hero: {
      secLabel: "STUDIO",
      overline: "Independent advertising studio",
      greetingMorning: "Good morning—", greetingDay: "Good afternoon—", greetingEvening: "Good evening—",
      brand: "this is LeadBoost",
      leadPre: "I run traffic that ", leadMark: "brings in customers",
      leadPost: ", and build sites that can handle it. Ads, website and analytics — in one pair of hands from day one.",
      ctaPrimary: "Discuss a project →", ctaSecondary: "See the work",
      caseTag: "CASE / 07", caseTitle: "Advertising with character.",
      chipA: "campaigns launched", chipB: "avg. client ROAS",
      facts: ["✓ One specialist, no hand-offs down a chain", "✓ First ads live within the first week", "✓ A clear report instead of pretty words"],
    },
    statement: { pre: "Good advertising does more than get clicks. It brings people who are", mark: "ready to buy." },
    services: { secLabel: "WHAT I DO", heading: "Services", sub: "Focused work: from \"where do I get customers\" to a system that runs itself.", nichesLabel: "/ WHO I WORK WITH" },
    work: { secLabel: "SELECTED WORK", heading: "Work", sub: "Campaigns with real numbers. Websites are a new direction — first projects already underway.", hint: "Swipe →", back: "Back", next: "Next" },
    principles: { secLabel: "HOW I WORK", practiceSuffix: " / IN PRACTICE", notPromiseLabel: "What I don't promise:", notPromiseText: "an exact sales number (that also depends on how you respond to leads) · customers \"by tomorrow\" · results without an ad budget · working with a product nobody has bought yet." },
    fit: { secLabel: "HONEST FILTER", headingPre: "Who this ", headingMark: "fits", sub: "I take on 3-4 projects a month — so I filter honestly upfront.", yes: "A good fit if", no: "Too early if" },
    pricing: { secLabel: "PRICING", headingPre: "Three ", headingMark: "options", sub: "One flat monthly fee. No hidden percentages or add-ons.", popularBadge: "most popular", select: "Choose", webNoteTitle: "A website is separate from ad plans", webNoteText: "From a simple landing page to a full online store. Price and timeline — after a short call.", webNoteBtn: "Discuss a website" },
    calculator: { secLabel: "CALCULATOR", heading: "Do the math yourself", sub: "Roughly how many customers your ad budget will bring.", nicheLabel: "Niche", budgetLabel: "Monthly ad budget ($)", out1: "Cost per person who messages you", out2: "How many such people per month", out3: "Expected return on ad spend", note: "A rough estimate based on niche averages. Exact numbers depend on product price and season — I'll tell you on a call." },
    notes: { secLabel: "NUMBERS", heading: "Not promises.", sub: "Observations from real campaigns — what shows up in reports, not in pitch decks." },
    faq: { secLabel: "QUESTIONS", headingPre: "Straight ", headingMark: "answers" },
    game: {
      title: "Test my aim yourself",
      subtitle: (need) => `I hit the target audience. Can you hit the target ${need} times?`,
      playBtn: "Play · 20 seconds", hudLabel: "Hits:", targetAria: "Target",
      winTitle: "Bullseye! 🎯", winLine1: "Good aim is a shared trait. Mention this code word in your request:",
      winLine2: "— and get a free mini-audit of your current ads.",
    },
    contact: {
      secLabel: "CONTACT", heading: "Bring a problem a template can't solve.",
      intro: "Tell me what's changing, what's stuck, and what the next version of your ads or website needs to deliver. I'll reply with specifics — not a sales blast.",
      note: (left, total) => `I reply within a day. Right now ${left} of ${total} slots are open this month — if you missed it, I'll tell you honestly when I free up.`,
      form: {
        nameLabel: "Name", namePh: "What's your name",
        contactLabel: "Phone or Telegram", contactPh: "+1… or @username",
        serviceLabel: "What are you interested in", serviceChoose: "Choose", serviceAds: "Advertising", serviceSite: "Website", serviceBoth: "Advertising & website",
        nicheLabel: "What do you do", nicheChoose: "Choose a niche",
        budgetLabel: "Monthly ad budget (if relevant)", budgetPh: "E.g.: $1,000",
        submit: "Send request", sending: "Sending…",
        errorText: "Couldn't send automatically. Message directly:", errorLink: "by email",
        ok: "✓ Request received — I'll get back to you within a day.",
      },
    },
    footer: {
      tagline: "Clarity", tagline2: "that sells.",
      quickLinks: "/ QUICK LINKS", status: "/ STATUS",
      online: "online now", offline: "will reply in the morning",
      copyright: "© 2026 LeadBoost", services: "Advertising · Websites · Analytics", toTop: "Back to top →",
    },
    mcta: { spots: (left, total) => `${left} of ${total} open`, cta: "Get started →" },
  },
};
