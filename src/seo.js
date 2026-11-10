/* ============================================================
   SEO: адреса языковых страниц, title/description, Open Graph и
   структурированные данные (JSON-LD). Используется и при сборке
   (scripts/build-site.mjs пишет это в готовый HTML), и в браузере
   (смена title при переключении языка).
   ============================================================ */

/* у каждого языка свой адрес: так поисковики видят и индексируют все три версии */
export const LANG_PATHS = { ru: "/", kk: "/kk/", en: "/en/" };
export const LOCALES = { ru: "ru_RU", kk: "kk_KZ", en: "en_US" };

export function langFromPath(pathname = "/") {
  const seg = String(pathname).split("/").filter(Boolean)[0];
  return seg === "kk" || seg === "en" ? seg : "ru";
}

export const SEO = {
  ru: {
    title: "Таргетированная реклама в Казахстане и СНГ | TARGET PRO",
    description: "Таргетированная реклама в Instagram и Facebook для бизнеса в Казахстане и СНГ: заявки в WhatsApp, отчёт каждую неделю, запуск за 7 дней. От $170 в месяц.",
    ogTitle: "TARGET PRO: реклама, которая приводит клиентов",
    ogDescription: "Таргет в Instagram и Facebook и сайты под рекламу. Реальные скрины из рекламного кабинета, тарифы от $170 в месяц.",
    ogImageAlt: "TARGET PRO: реклама, которая приводит клиентов. 4 617 переписок по $0,57 из кабинета Meta",
    serviceType: "Таргетированная реклама в Instagram и Facebook",
  },
  kk: {
    title: "Қазақстан мен ТМД-дағы таргеттелген жарнама | TARGET PRO",
    description: "Қазақстан мен ТМД бизнесіне Instagram мен Facebook-тағы таргеттелген жарнама: WhatsApp-қа өтінімдер, апта сайын есеп, 7 күнде іске қосу. Айына $170-ден.",
    ogTitle: "TARGET PRO: клиент әкелетін жарнама",
    ogDescription: "Instagram мен Facebook-тағы таргет және жарнамаға арналған сайттар. Жарнама кабинетінен нақты скриндер, тарифтер айына $170-ден.",
    ogImageAlt: "TARGET PRO: клиент әкелетін жарнама. Meta кабинетінен 4 617 хат алмасу, әрқайсысы $0,57",
    serviceType: "Instagram мен Facebook-тағы таргеттелген жарнама",
  },
  en: {
    title: "Targeted ads for businesses in Kazakhstan and CIS | TARGET PRO",
    description: "Targeted Instagram and Facebook ads for businesses in Kazakhstan and the CIS: leads in WhatsApp, a weekly report, launch in 7 days. From $170 a month.",
    ogTitle: "TARGET PRO: advertising that brings in customers",
    ogDescription: "Instagram and Facebook ads plus websites built for ads. Real ad-account screenshots, plans from $170 a month.",
    ogImageAlt: "TARGET PRO: advertising that brings in customers. 4,617 conversations at $0.57 each from a Meta ad account",
    serviceType: "Targeted advertising on Instagram and Facebook",
  },
};

/* JSON-LD: организация, сайт, страница, услуга с тарифами и вопросы-ответы.
   site: абсолютный адрес сайта без слэша в конце (https://...). */
export function structuredData({ site, lang, content, contacts }) {
  const page = site + LANG_PATHS[lang];
  const s = SEO[lang];
  const org = `${site}/#org`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: "TARGET PRO",
        url: `${site}/`,
        logo: `${site}/img/icons/icon-512.png`,
        image: `${site}/img/og/og-ru.jpg`,
        sameAs: [contacts.instagram, contacts.telegram, contacts.tiktok, contacts.threads],
        contactPoint: [{
          "@type": "ContactPoint",
          contactType: "sales",
          url: contacts.whatsapp,
          availableLanguage: ["ru", "kk", "en"],
          areaServed: ["KZ", "AZ"],
        }],
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: `${site}/`,
        name: "TARGET PRO",
        inLanguage: ["ru", "kk", "en"],
        publisher: { "@id": org },
      },
      {
        "@type": "WebPage",
        "@id": `${page}#webpage`,
        url: page,
        name: s.title,
        description: s.description,
        inLanguage: lang,
        isPartOf: { "@id": `${site}/#website` },
        about: { "@id": org },
        primaryImageOfPage: `${site}/img/og/og-${lang}.jpg`,
      },
      {
        "@type": "Service",
        "@id": `${page}#service`,
        name: s.serviceType,
        serviceType: s.serviceType,
        provider: { "@id": org },
        areaServed: [
          { "@type": "Country", name: "Kazakhstan" },
          { "@type": "Country", name: "Azerbaijan" },
        ],
        offers: content.PLANS.map((p) => {
          const price = String(p.price).replace(/[^\d]/g, "");
          return {
            "@type": "Offer",
            name: p.name,
            description: p.sub,
            price,
            priceCurrency: "USD",
            priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", unitText: "MONTH" },
          };
        }),
      },
      {
        "@type": "FAQPage",
        "@id": `${page}#faq`,
        inLanguage: lang,
        mainEntity: content.FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
