/* ============================================================
   SEO: адреса языковых страниц, title/description, Open Graph и
   структурированные данные (JSON-LD). Используется и при сборке
   (scripts/build-site.mjs пишет это в готовый HTML), и в браузере
   (смена title при переключении языка).
   ============================================================ */

/* у каждого языка свой адрес: так поисковики видят и индексируют обе версии.
   Казахскую (/kk/) владелец убрал 23.11.2026, старый адрес ведёт на / (vercel.json) */
export const LANG_PATHS = { ru: "/", en: "/en/" };
export const LOCALES = { ru: "ru_RU", en: "en_US" };

export function langFromPath(pathname = "/") {
  const seg = String(pathname).split("/").filter(Boolean)[0];
  return seg === "en" ? seg : "ru";
}

export const SEO = {
  ru: {
    title: "Таргетированная реклама в Instagram и Facebook | TARGET PRO",
    description: "Таргетированная реклама в Instagram и Facebook для бизнеса: заявки в WhatsApp, отчёты с цифрами, запуск за 7 дней. Тарифы от $350 в месяц.",
    ogTitle: "TARGET PRO: таргетированная реклама для бизнеса в Instagram и Facebook",
    ogDescription: "Таргет в Instagram и Facebook и сайты под рекламу. Реальные скрины из рекламного кабинета, тарифы от $350 в месяц.",
    ogImageAlt: "TARGET PRO: таргетированная реклама для бизнеса в Instagram и Facebook. 4 617 переписок по $0,57 из кабинета Meta",
    serviceType: "Таргетированная реклама в Instagram и Facebook",
  },
  en: {
    title: "Targeted Instagram and Facebook ads | TARGET PRO",
    description: "Targeted Instagram and Facebook ads for businesses: leads in WhatsApp, reports with numbers, launch in 7 days. Plans from $350 a month.",
    ogTitle: "TARGET PRO: targeted ads for businesses on Instagram and Facebook",
    ogDescription: "Instagram and Facebook ads plus websites built for ads. Real ad-account screenshots, plans from $350 a month.",
    ogImageAlt: "TARGET PRO: targeted ads for businesses on Instagram and Facebook. 4,617 conversations at $0.57 each from a Meta ad account",
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
          availableLanguage: ["ru", "en"],
        }],
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: `${site}/`,
        name: "TARGET PRO",
        inLanguage: ["ru", "en"],
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
