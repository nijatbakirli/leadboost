/* ============================================================
   ГЛАВНЫЙ КОМПОНЕНТ
   Только композиция и разметка. Настройки — в config.js,
   контент — в data.jsx, тексты интерфейса — в i18n.jsx,
   логика — в interactions.jsx.
   ============================================================ */
import React, { useState } from "react";
import LOGO_SRC from "./logo.png";
import { Reveal, useTween } from "./hooks.jsx";
import { IconCaseStudies, IconSuccess, IconSupport, IconConsultant } from "./icons.jsx";
import { ScrambleText, WordReveal, CountMetric, Mark, TargetGame } from "./widgets.jsx";
import {
  NOTIFY_EMAIL, SPOTS_LEFT, SPOTS_TOTAL, WORK_HOURS, GAME,
} from "./config.js";
import { CONTENT } from "./data.jsx";
import { UI, LANGS, useLang } from "./i18n.jsx";
import {
  useScrollProgress, usePreloader, useClockStatus, useTicker,
  useSpotlight, useHeroParallax, useVelocityMarquee, useCoverflow,
  useKineticWordmark, tiltHandlers, magnetHandlers, scrollToId, scrollToTop,
} from "./interactions.jsx";

export default function App() {
  /* --- Язык --- */
  const { lang, setLang } = useLang();
  const D = CONTENT[lang];
  const t = UI[lang];
  const RU = CONTENT.ru; /* заявка в Telegram/почту всегда на русском — её читает владелец, не посетитель */

  /* --- UI-состояния --- */
  const [openFaq, setOpenFaq] = useState(0);
  const [openSvc, setOpenSvc] = useState(0);

  /* --- Интерактив (вся логика в interactions.jsx) --- */
  const loaded = usePreloader();
  const { progress, ctaVisible } = useScrollProgress();
  const { online, timeStr } = useClockStatus(WORK_HOURS);
  const kpiIndex = useTicker(D.KPI_PHRASES.length);
  const rootRef = useSpotlight();
  const { heroRef, onMove: onHeroMove, onLeave: onHeroLeave } = useHeroParallax();
  const marqueeRef = useVelocityMarquee();
  const { trackRef: workRef, scrollBy: scrollWork } = useCoverflow();
  const { ref: wordmarkRef, onMove: onFooterMove, onLeave: onFooterLeave } = useKineticWordmark();

  /* --- Приветствие по времени суток --- */
  const hour = new Date().getHours();
  const greeting = hour >= 5 && hour < 12 ? t.hero.greetingMorning : hour < 18 ? t.hero.greetingDay : t.hero.greetingEvening;

  /* --- ROI-калькулятор --- */
  const [roiBudget, setRoiBudget] = useState(1000);
  const [roiNiche, setRoiNiche] = useState("ecommerce");
  const nicheInfo = D.NICHE_DATA[roiNiche];
  const estLeads = Math.max(1, Math.round(roiBudget / nicheInfo.cpl));
  const animatedCpl = useTween(nicheInfo.cpl, 500, 1);
  const animatedLeads = useTween(estLeads, 500, 0);

  /* --- Форма заявки → Telegram (fallback: mailto) --- */
  const [form, setForm] = useState({ name: "", contact: "", service: "", niche: "", budget: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setSendError(false);
    const nicheLabel = RU.NICHE_DATA[form.niche]?.label || form.niche || "не указана";
    setSending(true);
    try {
      const res = await fetch("/api/telegram", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, contact: form.contact, service: form.service, niche: nicheLabel, budget: form.budget }),
      });
      if (!res.ok) throw new Error("send error");
      if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
      setSent(true);
    } catch { setSendError(true); } finally { setSending(false); }
  };
  const mailtoHref = `mailto:${NOTIFY_EMAIL}?subject=${encodeURIComponent("Заявка с сайта LeadBoost")}&body=${encodeURIComponent(`Имя: ${form.name}\nКонтакт: ${form.contact}\nУслуга: ${form.service}\nНиша: ${RU.NICHE_DATA[form.niche]?.label || ""}\nБюджет: ${form.budget}`)}`;

  return (
    <div className="cl-root" ref={rootRef}>
      <div className={`preloader ${loaded ? "done" : ""}`} aria-hidden="true">
        <img src={LOGO_SRC} alt="" />
        <div className="bar"><i /></div>
      </div>
      <div className="spotlight" aria-hidden="true" />

      {/* ПЛАВАЮЩИЙ НАВБАР-ПИЛЮЛЯ */}
      <nav className="nav-pill">
        <a href="#" className="nav-logo" onClick={scrollToTop}>
          <img src={LOGO_SRC} alt="LeadBoost" />
        </a>
        <ul>
          <li><a href="#studio" onClick={scrollToId("studio")}>{t.nav.studio}</a></li>
          <li><a href="#services" onClick={scrollToId("services")}>{t.nav.services}</a></li>
          <li><a href="#work" onClick={scrollToId("work")}>{t.nav.work}</a></li>
          <li><a href="#pricing" onClick={scrollToId("pricing")} className="nav-hide-sm">{t.nav.pricing}</a></li>
          <li><a href="#contact" onClick={scrollToId("contact")}>{t.nav.contact}</a></li>
        </ul>
        <div className="lang-switch">
          {LANGS.map((l) => (
            <button key={l.code} className={`lang-pill ${lang === l.code ? "active" : ""}`} onClick={() => setLang(l.code)}>{l.label}</button>
          ))}
        </div>
        <div className="nav-progress"><i style={{ width: `${progress}%` }} /></div>
      </nav>

      {/* 01 — СТУДИЯ (хиро, премиальная версия) */}
      <section className="hero" id="studio" ref={heroRef} onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}>
        <div className="hero-halo" aria-hidden="true" />
        <div className="wrap">
          <div className="sec-num"><span className="circle">01</span> {t.hero.secLabel}</div>
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-overline">{t.hero.overline}</div>
              <h1 className="h-huge">
                <ScrambleText text={greeting} />
                <span className="stroke">{t.hero.brand}</span>
              </h1>
              <p className="hero-lead">
                {t.hero.leadPre}<Mark>{t.hero.leadMark}</Mark>{t.hero.leadPost}
              </p>
              <div className="hero-actions">
                <a href="#contact" onClick={scrollToId("contact")} className="hero-btn">{t.hero.ctaPrimary}</a>
                <a href="#work" className="hero-link" onClick={scrollToId("work")}>{t.hero.ctaSecondary} <span className="arr">↘</span></a>
              </div>
            </div>
            <Reveal delay={140}>
              <div className="hero-visual">
                <div className="laptop-mock">
                  <div className="laptop-mock-screen">
                    <div className="hero-card" {...tiltHandlers}>
                      <div className="shine" aria-hidden="true" />
                      <div className="hero-card-inner">
                        <span className="case-tag">{t.hero.caseTag}</span>
                        <h4>{t.hero.caseTitle}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="laptop-mock-base" aria-hidden="true"><i /></div>
                </div>
                <div className="hero-chip chip-a"><CountMetric value="240+" inline /><span>{t.hero.chipA}</span></div>
                <div className="hero-chip chip-b"><CountMetric value="310%+" inline /><span>{t.hero.chipB}</span></div>
              </div>
            </Reveal>
          </div>

          {/* статусная линия хиро */}
          <div className="hero-bottom">
            {t.hero.facts.map((f, i) => <div className="hero-fact" key={i}>{f}</div>)}
            <div className="hero-fact ticker"><span className="hero-kpi-ticker"><span className="kpi-face" key={kpiIndex}>{D.KPI_PHRASES[kpiIndex]}</span></span></div>
          </div>
        </div>
      </section>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="marquee">
        <div className="marquee-track" ref={marqueeRef}>
          {[0, 1].map((k) => (
            <span key={k} className="marquee-run">
              {D.MARQUEE_ITEMS.map((item) => (
                <span className="mq-item" key={item.label}>
                  <span className="mq-ic">
                    {item.img ? <img src={item.img} alt="" /> : <item.icon />}
                  </span>
                  {item.label}
                  <span className="mq-dot" aria-hidden="true">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* СТЕЙТМЕНТ */}
      <section className="statement">
        <div className="wrap">
          <Reveal>
            <h2 className="h-big"><WordReveal text={t.statement.pre} /> <Mark>{t.statement.mark}</Mark></h2>
          </Reveal>
        </div>
      </section>

      {/* 02 — УСЛУГИ */}
      <section className="section" id="services" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">02</span> {t.services.secLabel}</div>
          <div className="svc-head">
            <h2 className="h-big">{t.services.heading}</h2>
            <p>{t.services.sub}</p>
          </div>
          <div className="super-card">
            {D.SERVICES.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className={`svc-row pill-row ${openSvc === i ? "open" : ""}`} onClick={() => setOpenSvc(openSvc === i ? -1 : i)}
                     role="button" tabIndex={0} aria-expanded={openSvc === i}
                     onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenSvc(openSvc === i ? -1 : i); } }}>
                  <span className="svc-ic"><s.icon /></span>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="title">
                    <h3>{s.title}</h3>
                    {s.badge && <span className={`svc-badge ${s.badgeCls}`}>{s.badge}</span>}
                  </span>
                  <span className="meta">{s.meta}</span>
                  <span className="chev">›</span>
                </div>
                <div className={`svc-detail ${openSvc === i ? "open" : ""}`}>
                  <div className="svc-detail-inner">
                    {s.chips.map((c) => <span className="svc-chip" key={c}>{c}</span>)}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* ниши */}
          <div style={{ marginTop: 70 }}>
            <div className="f-label" style={{ color: "var(--ink-soft)" }}>{t.services.nichesLabel}</div>
            <div className="niche-grid">
              {D.NICHES.map((n) => (
                <div className="niche-pill" key={n.label}>
                  <span className="ic"><n.icon /></span>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — РАБОТЫ (горизонтальная лента со скролл-снапом) */}
      <section id="work" style={{ padding: "60px 0 40px" }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">03</span> {t.work.secLabel}</div>
          <div className="svc-head" style={{ marginBottom: 40 }}>
            <h2 className="h-big"><span className="h-ic"><IconCaseStudies /></span>{t.work.heading}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
              <p style={{ textAlign: "right" }}>{t.work.sub}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="work-hint">{t.work.hint}</span>
                <div className="work-nav">
                  <button onClick={() => scrollWork(-1)} aria-label={t.work.back}>←</button>
                  <button onClick={() => scrollWork(1)} aria-label={t.work.next}>→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="work-scroller" ref={workRef}>
          {D.WORK_CASES.map((w) => (
            <a key={w.tag} href="#contact" className="work-slide" onClick={scrollToId("contact")}>
              <span className="brandtag">LEADBOOST</span>
              <div className="bg" style={{ background: w.bg }} />
              <div className="shade" />
              <div className="inner">
                <span className="case-tag">{w.tag}</span>
                <h3>{w.title}</h3>
                <div className="sub">{w.name} · {w.cat}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 04 — ПРИНЦИПЫ / ГАРАНТИИ (тёмная секция) */}
      <section className="section dark">
        <div className="wrap">
          <div className="sec-num"><span className="circle">04</span> {t.principles.secLabel}</div>
          <div className="dark-cards">
            {D.PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="p-flip">
                  <div className="p-card">
                    <div className="p-face">
                      <span className="p-ic"><p.icon /></span>
                      <span className="n">{p.n}</span>
                      <h4>{p.title}</h4>
                      <p>{p.front}</p>
                    </div>
                    <div className="p-face back">
                      <span className="n">{p.n}{t.principles.practiceSuffix}</span>
                      <p>{p.back}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="not-promise">
              <b>{t.principles.notPromiseLabel}</b> {t.principles.notPromiseText}
            </div>
          </Reveal>
        </div>
      </section>

      {/* КОМУ ПОДХОДИТ */}
      <section className="section">
        <div className="wrap">
          <div className="sec-num"><span className="circle">05</span> {t.fit.secLabel}</div>
          <div className="svc-head">
            <h2 className="h-big">{t.fit.headingPre}<Mark>{t.fit.headingMark}</Mark></h2>
            <p>{t.fit.sub}</p>
          </div>
          <div className="fit-grid">
            <Reveal>
              <div className="fit-card">
                <h4><span className="fit-mark y">✓</span> {t.fit.yes}</h4>
                {D.FIT_YES.map((txt) => <div className="fit-row" key={txt}><span className="fit-mark y">✓</span>{txt}</div>)}
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="fit-card">
                <h4><span className="fit-mark n">✕</span> {t.fit.no}</h4>
                {D.FIT_NO.map((txt) => <div className="fit-row" key={txt}><span className="fit-mark n">✕</span>{txt}</div>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 — ТАРИФЫ */}
      <section className="section" id="pricing" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">06</span> {t.pricing.secLabel}</div>
          <div className="svc-head">
            <h2 className="h-big">{t.pricing.headingPre}<Mark>{t.pricing.headingMark}</Mark></h2>
            <p>{t.pricing.sub}</p>
          </div>
          <div className="price-grid">
            {D.PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 90}>
                <div className={`price-card ${plan.popular ? "pop" : ""}`}>
                  {plan.popular && <span className="price-tag">{t.pricing.popularBadge}</span>}
                  <div className="price-name">{plan.name}</div>
                  <div className="price-value">{plan.price}</div>
                  <div className="price-sub">{plan.sub}</div>
                  <ul className="price-list">
                    {plan.features.map((f) => <li key={f}>✓ {f}</li>)}
                  </ul>
                  <a
                    href="#contact"
                    onClick={scrollToId("contact")}
                    className="f-pill"
                    style={plan.popular
                      ? { textAlign: "center", background: "var(--accent)", color: "var(--accent-ink)" }
                      : { textAlign: "center", background: "transparent", color: "var(--ink)", border: "1px solid var(--border-light)" }}
                  >
                    {t.pricing.select}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <div className="web-note">
              <div>
                <strong>{t.pricing.webNoteTitle}</strong>
                <span>{t.pricing.webNoteText}</span>
              </div>
              <a href="#contact" onClick={scrollToId("contact")} className="f-pill" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>{t.pricing.webNoteBtn}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 07 — КАЛЬКУЛЯТОР */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">07</span> {t.calculator.secLabel}</div>
          <div className="svc-head">
            <h2 className="h-big">{t.calculator.heading}</h2>
            <p>{t.calculator.sub}</p>
          </div>
          <Reveal>
            <div className="roi-box">
              <div className="roi-inputs">
                <div className="roi-field">
                  <label>{t.calculator.nicheLabel}</label>
                  <select className="roi-select" value={roiNiche} onChange={(e) => setRoiNiche(e.target.value)}>
                    {Object.entries(D.NICHE_DATA).map(([key, n]) => <option key={key} value={key}>{n.label}</option>)}
                  </select>
                </div>
                <div className="roi-field">
                  <label>{t.calculator.budgetLabel}</label>
                  <input className="roi-input" type="number" step="100" value={roiBudget} onChange={(e) => setRoiBudget(Math.max(0, Number(e.target.value)))} />
                </div>
                <input className="roi-range" type="range" min="300" max="6000" step="100" value={roiBudget} onChange={(e) => setRoiBudget(Number(e.target.value))} />
              </div>
              <div className="roi-results">
                <div className="roi-out"><span className="k">{t.calculator.out1}</span><span className="v">~${animatedCpl}</span></div>
                <div className="roi-out"><span className="k">{t.calculator.out2}</span><span className="v">~{animatedLeads}</span></div>
                <div className="roi-out"><span className="k">{t.calculator.out3}</span><span className="v">{nicheInfo.roas}</span></div>
                <p className="roi-note">{t.calculator.note}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 — ЗАМЕТКИ / КЕЙСЫ-МЕТРИКИ (тёмные градиентные карточки) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">08</span> {t.notes.secLabel}</div>
          <div className="notes-head">
            <h2 className="h-big">{t.notes.heading}</h2>
            <p>{t.notes.sub}</p>
          </div>
          <div className="notes-grid">
            {D.METRIC_NOTES.map((c, i) => (
              <Reveal key={c.tag} delay={i * 90}>
                <div className="note-card">
                  <div className="note-glow" style={{ background: c.glow }} />
                  <span className="note-ic"><IconSuccess /></span>
                  <span className="tag">{c.tag}</span>
                  <div className="metric">
                    <CountMetric value={c.big} />
                    <h4>{c.h}</h4>
                    <p>{c.p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="sec-num"><span className="circle">09</span> {t.faq.secLabel}</div>
          <h2 className="h-big" style={{ marginBottom: 46 }}>{t.faq.headingPre}<Mark>{t.faq.headingMark}</Mark></h2>
          <div className="super-card">
            {D.FAQS.map((f, i) => (
              <div key={f.q} className={`faq-item pill-row ${openFaq === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f.q} <span className="faq-plus">+</span></button>
                <div className="faq-a"><div className="faq-a-inner">{f.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* МИНИ-ИГРА */}
      <TargetGame strings={t.game} promoWord={GAME.promoWord} need={GAME.hitsToWin} />

      {/* 10 — КОНТАКТ */}
      <section className="section" id="contact" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">10</span> {t.contact.secLabel}</div>
          <Reveal>
            <h2 className="h-big"><WordReveal text={t.contact.heading} /></h2>
          </Reveal>
          <div className="contact-grid">
            <div className="contact-left">
              <Reveal delay={100}>
                <span className="contact-consultant"><IconConsultant /></span>
                <p>{t.contact.intro}</p>
                <div className="contact-note">
                  <span className="contact-ic"><IconSupport /></span>
                  {t.contact.note(SPOTS_LEFT, SPOTS_TOTAL)}
                  <span className="spots" style={{ display: "flex", marginTop: 12 }}>
                    <span className="spots-bar">{[0,1,2].map((i) => <i key={i} className={i < SPOTS_LEFT ? "free" : ""} />)}</span>
                  </span>
                </div>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <div className="form-card">
                {!sent ? (
                  <form onSubmit={onFormSubmit}>
                    <div className="form-row">
                      <div className="f-field">
                        <label>{t.contact.form.nameLabel}</label>
                        <input name="name" placeholder={t.contact.form.namePh} required value={form.name} onChange={onFormChange} />
                      </div>
                      <div className="f-field">
                        <label>{t.contact.form.contactLabel}</label>
                        <input name="contact" placeholder={t.contact.form.contactPh} required value={form.contact} onChange={onFormChange} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="f-field">
                        <label>{t.contact.form.serviceLabel}</label>
                        <select name="service" required value={form.service} onChange={onFormChange}>
                          <option value="" disabled>{t.contact.form.serviceChoose}</option>
                          <option value="Реклама">{t.contact.form.serviceAds}</option>
                          <option value="Сайт">{t.contact.form.serviceSite}</option>
                          <option value="Реклама и сайт">{t.contact.form.serviceBoth}</option>
                        </select>
                      </div>
                      <div className="f-field">
                        <label>{t.contact.form.nicheLabel}</label>
                        <select name="niche" required value={form.niche} onChange={onFormChange}>
                          <option value="" disabled>{t.contact.form.nicheChoose}</option>
                          {Object.entries(D.NICHE_DATA).map(([key, n]) => <option key={key} value={key}>{n.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="f-field">
                      <label>{t.contact.form.budgetLabel}</label>
                      <input name="budget" placeholder={t.contact.form.budgetPh} value={form.budget} onChange={onFormChange} />
                    </div>
                    <span className="magnetic" style={{ display: "block" }} {...magnetHandlers}><button type="submit" className="form-submit" disabled={sending}>{sending ? t.contact.form.sending : t.contact.form.submit}</button></span>
                    {sendError && (
                      <div className="form-err">
                        {t.contact.form.errorText} <a href={mailtoHref}>{t.contact.form.errorLink}</a>.
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="form-ok">{t.contact.form.ok}</div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" onMouseMove={onFooterMove} onMouseLeave={onFooterLeave}>
        <div className="wrap footer-top">
          <h3 className="h-mid">{t.footer.tagline}<br />{t.footer.tagline2}</h3>
          <div>
            <div className="f-label">{t.footer.quickLinks}</div>
            <div className="f-pills">
              <a href="#studio" className="f-pill" onClick={scrollToId("studio")}>{t.nav.studio}</a>
              <a href="#services" className="f-pill" onClick={scrollToId("services")}>{t.nav.services}</a>
              <a href="#work" className="f-pill" onClick={scrollToId("work")}>{t.nav.work}</a>
              <a href="#contact" className="f-pill" onClick={scrollToId("contact")}>{t.nav.contact}</a>
            </div>
          </div>
          <div>
            <div className="f-label">{t.footer.status}</div>
            <div className="f-time">
              <span className={`st ${online ? "on" : "off"}`} />
              {timeStr} · {online ? t.footer.online : t.footer.offline}
            </div>
          </div>
        </div>
        <div className="footer-wordmark" ref={wordmarkRef}>LEADBOOST</div>
        <div className="footer-base">
          <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, width: "100%" }}>
            <span>{t.footer.copyright}</span>
            <span>{t.footer.services}</span>
            <a href="#" onClick={scrollToTop}>{t.footer.toTop}</a>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className={`m-cta ${ctaVisible ? "show" : ""}`}>
        <span className="spots">
          <span className="spots-bar">{[0,1,2].map((i) => <i key={i} className={i < SPOTS_LEFT ? "free" : ""} />)}</span>
          {t.mcta.spots(SPOTS_LEFT, SPOTS_TOTAL)}
        </span>
        <a href="#contact" onClick={scrollToId("contact")}>{t.mcta.cta}</a>
      </div>
    </div>
  );
}
