/* ============================================================
   ГЛАВНЫЙ КОМПОНЕНТ
   Только композиция и разметка. Настройки в config.js,
   контент в data.jsx, тексты интерфейса в i18n.jsx,
   логика в interactions.jsx, мелкие компоненты в widgets.jsx.
   Визуальный стиль как в каруселях LeadBoost (см. styles.css).
   ============================================================ */
import React, { useState, Suspense } from "react";
import { asset } from "./assets.js";
import { useTween } from "./hooks.jsx";
import {
  IconArrowRight, IconArrowDown, IconArrowUp, IconCheck, IconCross, IconPlus,
  IconChevronDown, IconExpand, IconChat, IconCamera,
} from "./icons.jsx";
import { ScrambleText, CountMetric, SecLabel, Heading, TargetGame, ShotViewer } from "./widgets.jsx";
import { CONTACTS, SPOTS_LEFT, SPOTS_TOTAL, WORK_HOURS, WORK_TZ, GAME } from "./config.js";
import { CONTENT } from "./data.jsx";
import { UI, LANGS, useLang } from "./i18n.jsx";
import { LANG_PATHS } from "./seo.js";
import {
  useScrollProgress, useClockStatus, useMounted, useSpotlight, useVelocityMarquee,
  magnetHandlers, scrollToId, scrollToTop,
} from "./interactions.jsx";

const ext = { target: "_blank", rel: "noopener noreferrer" };
/* Часть страницы, которая "оживает" (hydrate) отдельной небольшой задачей:
   браузер не зависает на одном долгом куске JavaScript после загрузки,
   а то, по чему человек кликнул, React оживляет в первую очередь. */
const Part = ({ children }) => <Suspense fallback={null}>{children}</Suspense>;
/* логотип отдельным файлом (раньше был base64 внутри JS и утяжелял страницу) */
const LOGO_SRC = asset("img/logo.webp");

function SpotsBar() {
  return (
    <span className="spots-bar" aria-hidden="true">
      {Array.from({ length: SPOTS_TOTAL }, (_, i) => <i key={i} className={i < SPOTS_LEFT ? "free" : ""} />)}
    </span>
  );
}

/* одна лента: список слов, повторённый три раза; крестики-разделители рисует CSS */
/* хук бегущей ленты живёт внутри самой ленты: она оживает отдельно (см. Part) */
function Tape({ items, className, dir = 1, speed = 0.6 }) {
  const trackRef = useVelocityMarquee(dir, speed);
  const run = [...items, ...items, ...items];
  return (
    <div className={`tape ${className}`}>
      <div className="tape-track" ref={trackRef}>
        {[0, 1].map((k) => (
          <span className="tape-run" key={k}>
            {run.map((w, i) => <span className="tape-word" key={i}>{w}</span>)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App({ initialLang = "ru" }) {
  /* --- Язык --- */
  const { lang, setLang } = useLang(initialLang);
  const D = CONTENT[lang];
  const t = UI[lang];
  const RU = CONTENT.ru; /* заявка в Telegram всегда на русском: её читает владелец, не посетитель */

  /* --- UI-состояния --- */
  const [openFaq, setOpenFaq] = useState(0);
  const [openSvc, setOpenSvc] = useState(0);
  const [zoom, setZoom] = useState(null); /* индекс скрина в D.RESULTS, открытого крупно */

  /* --- Интерактив (вся логика в interactions.jsx) --- */
  const { progress, ctaVisible } = useScrollProgress();
  const { online } = useClockStatus(WORK_HOURS, WORK_TZ);
  const rootRef = useSpotlight();

  /* --- Приветствие по времени суток посетителя ---
     В готовом HTML (собран заранее) всегда «Добрый день», в браузере
     после загрузки подставляется приветствие по времени посетителя. */
  const mounted = useMounted();
  const hour = mounted ? new Date().getHours() : 12;
  const greeting = hour >= 5 && hour < 12 ? t.hero.greetingMorning : hour < 18 ? t.hero.greetingDay : t.hero.greetingEvening;
  /* статус «на связи»: пока страница не запустилась, место держим, но не показываем */
  const statusCls = online === null ? "pending" : online ? "on" : "off";

  /* --- ROI-калькулятор --- */
  const [roiBudget, setRoiBudget] = useState(1000);
  const [roiNiche, setRoiNiche] = useState("ecommerce");
  const nicheInfo = D.NICHE_DATA[roiNiche];
  const estLeads = Math.max(1, Math.round(roiBudget / nicheInfo.cpl));
  const animatedCpl = useTween(nicheInfo.cpl, 500, 1);
  const animatedLeads = useTween(estLeads, 500, 0);
  const dec = (n) => (lang === "en" ? String(n) : String(n).replace(".", ","));

  /* --- Форма заявки → Telegram (если не ушло: WhatsApp) --- */
  const [form, setForm] = useState({ name: "", contact: "", service: "", niche: "", budget: "" });
  const [plan, setPlan] = useState(null); /* индекс тарифа, выбранного кнопкой «Выбрать» */
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const choosePlan = (i) => (e) => { setPlan(i); scrollToId("contact")(e); };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setSendError(false);
    const nicheLabel = RU.NICHE_DATA[form.niche]?.label || form.niche || "не указана";
    setSending(true);
    try {
      const res = await fetch("/api/telegram", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, contact: form.contact, service: form.service, niche: nicheLabel, budget: form.budget,
          plan: plan !== null ? RU.PLANS[plan].name : "",
        }),
      });
      if (!res.ok) throw new Error("send error");
      if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
      setSent(true);
    } catch { setSendError(true); } finally { setSending(false); }
  };

  const featured = D.RESULTS[0];

  return (
    <div className="cl-root" ref={rootRef}>
      <div className="spotlight" aria-hidden="true" />

      {/* НАВБАР-ПИЛЮЛЯ */}
      <nav className="nav" aria-label="LeadBoost">
        <a href="#top" className="nav-logo" onClick={scrollToTop}>
          <img src={LOGO_SRC} alt="LeadBoost" width="114" height="20" />
        </a>
        <ul className="nav-links">
          <li><a href="#services" onClick={scrollToId("services")}>{t.nav.services}</a></li>
          <li className="nav-hide-xs"><a href="#work" onClick={scrollToId("work")}>{t.nav.work}</a></li>
          <li className="nav-hide-sm"><a href="#results" onClick={scrollToId("results")}>{t.nav.results}</a></li>
          <li className="nav-hide-sm"><a href="#pricing" onClick={scrollToId("pricing")}>{t.nav.pricing}</a></li>
          <li><a href="#contact" onClick={scrollToId("contact")}>{t.nav.contact}</a></li>
        </ul>
        <div className="lang-switch" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <a
              key={l.code}
              href={LANG_PATHS[l.code]}
              hrefLang={l.code}
              lang={l.code}
              className="lang-pill"
              aria-current={lang === l.code ? "true" : undefined}
              onClick={(e) => { e.preventDefault(); setLang(l.code); }}
            >{l.label}</a>
          ))}
        </div>
        <div className="nav-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
      </nav>

      <main>
        {/* ПЕРВЫЙ ЭКРАН: бенто как на обложках Reels */}
        <section className="hero" id="top">
          <div className="wrap">
            <div className="hero-bar">
              <span className="corner tl" aria-hidden="true" />
              <span className="corner tr" aria-hidden="true" />
              <SecLabel className="hero-greet"><ScrambleText text={greeting} /></SecLabel>
              <span className={`status ${statusCls}`}><i aria-hidden="true" />{online === false ? t.hero.statusOffline : t.hero.statusOnline}</span>
            </div>
            <div className="hero-grid">
              <div className="tile hero-main">
                <Heading as="h1" pre={t.hero.h1} mark={t.hero.h1Mark} className="hd-hero" instant />
                <div>
                  <p className="hero-lead">{t.hero.lead}</p>
                  <div className="hero-actions">
                    <a className="btn btn-y" href={CONTACTS.whatsapp} {...ext}><IconChat className="btn-ic" />{t.hero.ctaPrimary}</a>
                    <a className="btn btn-ghost" href="#contact" onClick={scrollToId("contact")}>{t.hero.ctaSecondary}<IconArrowRight className="btn-ic" /></a>
                  </div>
                </div>
              </div>
              <a className="tile hero-proof" href="#results" onClick={scrollToId("results")}>
                <SecLabel className="lbl-sm">{t.hero.proofLabel}</SecLabel>
                <div className="num-row">
                  <span className="big-y">{featured.big}</span>
                  <span className="num-unit">{featured.unit}</span>
                </div>
                <p className="num-sub">{featured.sub}</p>
                <img className="proof-shot" src={featured.shots[0].src} width={featured.shots[0].w} height={featured.shots[0].h} alt="" />
                <span className="more-link">{t.hero.proofLink}<IconArrowDown className="more-ic" /></span>
              </a>
              <div className="tile hero-stat stat-a">
                <CountMetric value="240+" className="stat-num" />
                <span className="stat-cap">{t.hero.statA}</span>
              </div>
              <div className="tile hero-stat stat-b">
                <CountMetric value="310%" className="stat-num" />
                <span className="stat-cap">{t.hero.statB}</span>
              </div>
            </div>
            <ul className="hero-facts">
              {t.hero.facts.map((f) => <li key={f}><IconCheck className="fact-ic" />{f}</li>)}
            </ul>
          </div>
        </section>

        <Part>
        {/* ЛЕНТЫ: что делаю × где */}
        <div className="tapes" aria-hidden="true">
          <Tape items={D.TAPE_WHERE} className="tape-w" dir={-1} speed={0.45} />
          <Tape items={D.TAPE_WHAT} className="tape-y" />
        </div>

        </Part>
        <Part>
        {/* СТЕЙТМЕНТ */}
        <section className="statement">
          <div className="wrap">
            <Heading pre={t.statement.pre} mark={t.statement.mark} className="hd-statement" />
            <p className="statement-sub">{t.statement.sub}</p>
          </div>
        </section>

        </Part>
        <Part>
        {/* УСЛУГИ */}
        <section className="section" id="services">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <SecLabel>{t.services.label}</SecLabel>
                <Heading pre={t.services.pre} mark={t.services.mark} />
              </div>
              <p className="sec-sub">{t.services.sub}</p>
            </div>
            <div className="svc-list">
              {D.SERVICES.map((s, i) => {
                const open = openSvc === i;
                return (
                  <div className={`tile svc ${open ? "open" : ""}`} key={s.title}>
                    <button type="button" className="svc-row" onClick={() => setOpenSvc(open ? -1 : i)} aria-expanded={open} aria-controls={`svc-${i}`}>
                      <span className="svc-ic" aria-hidden="true"><img src={asset(`img/icons/premium/${s.icon}.svg`)} alt="" width="46" height="46" decoding="async" /></span>
                      <span className="svc-title">
                        <span className="svc-name">{s.title}</span>
                        {s.badge && <span className={`badge ${s.badgeCls}`}>{s.badge}</span>}
                      </span>
                      <span className="svc-meta">{s.meta}</span>
                      <IconChevronDown className="svc-chev" />
                    </button>
                    <div className="svc-detail" id={`svc-${i}`} aria-hidden={!open}>
                      <div>
                        <ul className="svc-chips">
                          {s.chips.map((c) => <li className="chip" key={c}>{c}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="niches">
              <SecLabel className="lbl-sm">{t.services.nichesLabel}</SecLabel>
              <ul className="niche-list">
                {D.NICHES.map((n) => (
                  <li className="niche" key={n.label}><n.icon className="niche-ic" aria-hidden="true" />{n.label}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        </Part>
        <Part>
        {/* КЕЙСЫ */}
        <section className="section" id="work">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <SecLabel>{t.work.label}</SecLabel>
                <Heading pre={t.work.pre} mark={t.work.mark} />
              </div>
              <p className="sec-sub">{t.work.sub}</p>
            </div>
            <div className="case-grid">
              {D.WORK_CASES.map((c) => (
                <article className={`tile case ${c.soon ? "case-soon" : ""}`} key={c.name}>
                  <div className="case-top">
                    <SecLabel className="lbl-sm">{c.name}</SecLabel>
                    <span className="case-cat">{c.cat}</span>
                  </div>
                  {c.big ? (
                    <>
                      <div className="case-big">{c.big}</div>
                      <h3 className="case-h">{c.h}</h3>
                      <p className="case-desc">{c.desc}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="case-h case-h-soon">{c.h}</h3>
                      <p className="case-desc">{c.desc}</p>
                      <a className="btn btn-ghost btn-sm case-btn" href={CONTACTS.whatsapp} {...ext}>{t.work.soonCta}<IconArrowRight className="btn-ic" /></a>
                    </>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        </Part>
        <Part>
        {/* ЦИФРЫ ИЗ КАБИНЕТА: настоящие скрины Meta Ads Manager */}
        <section className="section" id="results">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <SecLabel>{t.results.label}</SecLabel>
                <Heading pre={t.results.pre} mark={t.results.mark} />
              </div>
              <p className="sec-sub">{t.results.sub}</p>
            </div>
            <div className="res-grid">
              {D.RESULTS.map((r, i) => (
                <article className={`tile res ${i === 0 ? "res-feature" : ""}`} key={i}>
                  <div className="res-info">
                    <SecLabel className="lbl-sm">{r.label}</SecLabel>
                    <div className="num-row">
                      <span className="big-y">{r.big}</span>
                      <span className="num-unit">{r.unit}</span>
                    </div>
                    <p className="num-sub">{r.sub}</p>
                  </div>
                  <button type="button" className="res-shot" onClick={() => setZoom(i)}>
                    {r.shots.map((s) => (
                      <img key={s.src} src={s.src} width={s.w} height={s.h} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                    ))}
                    <span className="sr-only">{t.results.zoom}</span>
                    <span className="res-zoom" aria-hidden="true"><IconExpand /></span>
                  </button>
                </article>
              ))}
            </div>
            <p className="res-note">{t.results.note}</p>
          </div>
          <ShotViewer
            item={zoom === null ? null : D.RESULTS[zoom]}
            onClose={() => setZoom(null)}
            closeLabel={t.results.close}
            sourceLabel={t.results.source}
          />
        </section>

        </Part>
        <Part>
        {/* ПРИНЦИПЫ */}
        <section className="section" id="how">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <SecLabel>{t.principles.label}</SecLabel>
                <Heading pre={t.principles.pre} mark={t.principles.mark} />
              </div>
            </div>
            <div className="pr-grid">
              {D.PRINCIPLES.map((p) => (
                <article className="tile pr" key={p.title}>
                  <span className="pr-ic" aria-hidden="true"><img src={asset(`img/icons/premium/${p.icon}.svg`)} alt="" width="42" height="42" loading="lazy" decoding="async" /></span>
                  <h3 className="pr-title">{p.title}</h3>
                  <p className="pr-front">{p.front}</p>
                  <div className="pr-back">
                    <SecLabel className="lbl-sm">{t.principles.practice}</SecLabel>
                    <p>{p.back}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="tile tile-dashed not-promise"><b>{t.principles.notPromiseLabel}:</b> {t.principles.notPromiseText}</p>
          </div>
        </section>

        </Part>
        <Part>
        {/* КОМУ ПОДХОДИТ */}
        <section className="section" id="fit">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <SecLabel>{t.fit.label}</SecLabel>
                <Heading pre={t.fit.pre} mark={t.fit.mark} />
              </div>
              <p className="sec-sub">{t.fit.sub}</p>
            </div>
            <div className="fit-grid">
              <div className="tile fit fit-yes">
                <h3 className="fit-title"><span className="fit-badge" aria-hidden="true"><IconCheck /></span>{t.fit.yes}</h3>
                <ul>{D.FIT_YES.map((txt) => <li key={txt}><IconCheck className="fit-ic" />{txt}</li>)}</ul>
              </div>
              <div className="tile fit fit-no">
                <h3 className="fit-title"><span className="fit-badge" aria-hidden="true"><IconCross /></span>{t.fit.no}</h3>
                <ul>{D.FIT_NO.map((txt) => <li key={txt}><IconCross className="fit-ic" />{txt}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        </Part>
        <Part>
        {/* ТАРИФЫ */}
        <section className="section" id="pricing">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <SecLabel>{t.pricing.label}</SecLabel>
                <Heading pre={t.pricing.pre} mark={t.pricing.mark} />
              </div>
              <p className="sec-sub">{t.pricing.sub}</p>
            </div>
            <div className="price-grid">
              {D.PLANS.map((p, i) => (
                <article className={`tile price ${p.popular ? "pop" : ""}`} key={p.name}>
                  <div className="price-top">
                    <SecLabel className="lbl-sm">{p.name}</SecLabel>
                    {p.popular && <span className="badge main">{t.pricing.popularBadge}</span>}
                  </div>
                  <div className="price-val">
                    <span className="price-num">{p.price}</span>
                    <span className="price-per">{t.pricing.perMonth}</span>
                  </div>
                  <p className="price-sub">{p.sub}</p>
                  <ul className="price-list">
                    {p.features.map((f) => <li key={f}><IconCheck className="li-ic" />{f}</li>)}
                  </ul>
                  <a href="#contact" onClick={choosePlan(i)} className={`btn btn-block ${p.popular ? "btn-y" : "btn-ghost"}`}>{t.pricing.select}</a>
                </article>
              ))}
            </div>
            <div className="tile web-note">
              <div>
                <strong>{t.pricing.webNoteTitle}</strong>
                <span>{t.pricing.webNoteText}</span>
              </div>
              <a href={CONTACTS.whatsapp} {...ext} className="btn btn-y">{t.pricing.webNoteBtn}<IconArrowRight className="btn-ic" /></a>
            </div>
          </div>
        </section>

        </Part>
        <Part>
        {/* КАЛЬКУЛЯТОР */}
        <section className="section" id="calculator">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <SecLabel>{t.calculator.label}</SecLabel>
                <Heading pre={t.calculator.pre} mark={t.calculator.mark} />
              </div>
              <p className="sec-sub">{t.calculator.sub}</p>
            </div>
            <div className="tile roi">
              <div className="roi-inputs">
                <label className="field">
                  <span className="field-lbl">{t.calculator.nicheLabel}</span>
                  <select className="input" value={roiNiche} onChange={(e) => setRoiNiche(e.target.value)}>
                    {Object.entries(D.NICHE_DATA).map(([key, n]) => <option key={key} value={key}>{n.label}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span className="field-lbl">{t.calculator.budgetLabel}</span>
                  <input className="input" type="number" inputMode="numeric" min="0" step="100" value={roiBudget} onChange={(e) => setRoiBudget(Math.max(0, Number(e.target.value)))} />
                </label>
                <input className="roi-range" type="range" min="300" max="6000" step="100" value={roiBudget} aria-label={t.calculator.budgetLabel} onChange={(e) => setRoiBudget(Number(e.target.value))} />
              </div>
              <div className="roi-results" aria-live="polite">
                <div className="roi-out"><span className="k">{t.calculator.out1}</span><span className="v">~${dec(animatedCpl)}</span></div>
                <div className="roi-out"><span className="k">{t.calculator.out2}</span><span className="v">~{animatedLeads}</span></div>
                <div className="roi-out"><span className="k">{t.calculator.out3}</span><span className="v">{nicheInfo.roas}</span></div>
                <p className="roi-note">{t.calculator.note}</p>
              </div>
            </div>
          </div>
        </section>

        </Part>
        <Part>
        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <SecLabel>{t.faq.label}</SecLabel>
            <Heading pre={t.faq.pre} mark={t.faq.mark} className="hd-faq" />
            <div className="faq-list">
              {D.FAQS.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div className={`tile faq ${open ? "open" : ""}`} key={f.q}>
                    <button type="button" className="faq-q" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open} aria-controls={`faq-${i}`}>
                      <span>{f.q}</span>
                      <IconPlus className="faq-ic" />
                    </button>
                    <div className="faq-a" id={`faq-${i}`} aria-hidden={!open}>
                      <div><p>{f.a}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        </Part>
        <Part>
        {/* МИНИ-ИГРА */}
        <TargetGame strings={t.game} promoWord={GAME.promoWord} need={GAME.hitsToWin} />

        </Part>
        <Part>
        {/* КОНТАКТ */}
        <section className="section" id="contact">
          <div className="wrap">
            <SecLabel>{t.contact.label}</SecLabel>
            <Heading pre={t.contact.pre} mark={t.contact.mark} className="hd-contact" />
            <div className="contact-grid">
              <div className="contact-left">
                <p className="contact-intro">{t.contact.intro}</p>
                <div className="tile contact-fast">
                  <SecLabel className="lbl-sm">{t.contact.fastLabel}</SecLabel>
                  <p>{t.contact.fastText}</p>
                  <div className="contact-btns">
                    <a className="btn btn-y" href={CONTACTS.whatsapp} {...ext}><IconChat className="btn-ic" />WhatsApp</a>
                    <a className="btn btn-ghost" href={CONTACTS.instagram} {...ext}><IconCamera className="btn-ic" />{CONTACTS.instagramHandle}</a>
                  </div>
                </div>
                <div className="contact-note">
                  <p>{t.contact.note(SPOTS_LEFT, SPOTS_TOTAL)}</p>
                  <SpotsBar />
                </div>
              </div>
              <div className="tile form-card">
                <h3 className="form-title">{t.contact.formTitle}</h3>
                {!sent ? (
                  <form onSubmit={onFormSubmit}>
                    {plan !== null && (
                      <div className="form-plan">
                        <span>{t.contact.form.planLabel}: <b>{D.PLANS[plan].name} · {D.PLANS[plan].price}</b></span>
                        <button type="button" className="icon-btn icon-btn-sm" onClick={() => setPlan(null)} aria-label={t.contact.form.planRemove}><IconCross /></button>
                      </div>
                    )}
                    <div className="form-row">
                      <label className="field">
                        <span className="field-lbl">{t.contact.form.nameLabel}</span>
                        <input className="input" name="name" autoComplete="name" placeholder={t.contact.form.namePh} required value={form.name} onChange={onFormChange} />
                      </label>
                      <label className="field">
                        <span className="field-lbl">{t.contact.form.contactLabel}</span>
                        <input className="input" name="contact" autoComplete="tel" placeholder={t.contact.form.contactPh} required value={form.contact} onChange={onFormChange} />
                      </label>
                    </div>
                    <div className="form-row">
                      <label className="field">
                        <span className="field-lbl">{t.contact.form.serviceLabel}</span>
                        <select className="input" name="service" required value={form.service} onChange={onFormChange}>
                          <option value="" disabled>{t.contact.form.serviceChoose}</option>
                          <option value="Реклама">{t.contact.form.serviceAds}</option>
                          <option value="Сайт">{t.contact.form.serviceSite}</option>
                          <option value="Реклама и сайт">{t.contact.form.serviceBoth}</option>
                        </select>
                      </label>
                      <label className="field">
                        <span className="field-lbl">{t.contact.form.nicheLabel}</span>
                        <select className="input" name="niche" required value={form.niche} onChange={onFormChange}>
                          <option value="" disabled>{t.contact.form.nicheChoose}</option>
                          {Object.entries(D.NICHE_DATA).map(([key, n]) => <option key={key} value={key}>{n.label}</option>)}
                        </select>
                      </label>
                    </div>
                    <label className="field">
                      <span className="field-lbl">{t.contact.form.budgetLabel}</span>
                      <input className="input" name="budget" placeholder={t.contact.form.budgetPh} value={form.budget} onChange={onFormChange} />
                    </label>
                    <span className="magnetic" {...magnetHandlers}>
                      <button type="submit" className="btn btn-y btn-block btn-lg" disabled={sending}>
                        {sending ? t.contact.form.sending : t.contact.form.submit}
                        {!sending && <IconArrowRight className="btn-ic" />}
                      </button>
                    </span>
                    {sendError && (
                      <div className="form-err" role="alert">
                        {t.contact.form.errorText} <a href={CONTACTS.whatsapp} {...ext}>{t.contact.form.errorLink}</a>.
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="form-ok" role="status"><IconCheck />{t.contact.form.ok}</div>
                )}
              </div>
            </div>
          </div>
        </section>
        </Part>
      </main>

      {/* ФУТЕР */}
      <Part>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <Heading as="p" pre={t.footer.pre} mark={t.footer.mark} className="hd-footer" />
            <nav className="f-col" aria-label={t.footer.linksLabel}>
              <SecLabel className="lbl-sm">{t.footer.linksLabel}</SecLabel>
              <ul>
                <li><a href="#services" onClick={scrollToId("services")}>{t.nav.services}</a></li>
                <li><a href="#work" onClick={scrollToId("work")}>{t.nav.work}</a></li>
                <li><a href="#results" onClick={scrollToId("results")}>{t.nav.results}</a></li>
                <li><a href="#pricing" onClick={scrollToId("pricing")}>{t.nav.pricing}</a></li>
                <li><a href="#contact" onClick={scrollToId("contact")}>{t.nav.contact}</a></li>
              </ul>
            </nav>
            <div className="f-col">
              <SecLabel className="lbl-sm">{t.footer.contactsLabel}</SecLabel>
              <ul>
                <li><a href={CONTACTS.whatsapp} {...ext}>WhatsApp</a></li>
                <li><a href={CONTACTS.instagram} {...ext}>Instagram {CONTACTS.instagramHandle}</a></li>
              </ul>
            </div>
            <div className="f-col">
              <SecLabel className="lbl-sm">{t.footer.statusLabel}</SecLabel>
              <p className={`status ${statusCls}`}><i aria-hidden="true" />{online === false ? t.footer.offline : t.footer.online}</p>
            </div>
          </div>
          <a className="brand-line" href={CONTACTS.whatsapp} {...ext}>
            <span className="bl-name">LEADBOOST</span>
            <span className="bl-rule" aria-hidden="true" />
            <span className="bl-cta">{t.footer.brandCta}<IconArrowRight className="bl-ic" /></span>
          </a>
          <div className="footer-base">
            <span>{t.footer.copyright}</span>
            <span>{t.footer.services}</span>
            <a href="#top" onClick={scrollToTop}>{t.common.toTop}<IconArrowUp className="btn-ic" /></a>
          </div>
        </div>
      </footer>
      </Part>

      {/* ПЛАВАЮЩИЙ WHATSAPP (десктоп) */}
      <a className={`wa-float ${ctaVisible ? "show" : ""}`} href={CONTACTS.whatsapp} {...ext} aria-label={t.common.whatsapp} tabIndex={ctaVisible ? 0 : -1}>
        <IconChat />
      </a>

      {/* НИЖНЯЯ ПАНЕЛЬ НА ТЕЛЕФОНЕ */}
      <div className={`m-cta ${ctaVisible ? "show" : ""}`} aria-hidden={!ctaVisible}>
        <span className="spots"><SpotsBar />{t.mcta.spots(SPOTS_LEFT, SPOTS_TOTAL)}</span>
        <a className="btn btn-y btn-sm" href={CONTACTS.whatsapp} {...ext} tabIndex={ctaVisible ? 0 : -1}><IconChat className="btn-ic" />{t.mcta.cta}</a>
      </div>
    </div>
  );
}
