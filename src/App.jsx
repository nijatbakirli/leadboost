/* ============================================================
   ГЛАВНЫЙ КОМПОНЕНТ
   Только композиция и разметка. Настройки — в config.js,
   контент — в data.jsx, логика — в interactions.jsx.
   ============================================================ */
import React, { useState } from "react";
import LOGO_SRC from "./logo.png";
import { Reveal, useTween } from "./hooks.jsx";
import { IconCaseStudies, IconSuccess, IconSupport, IconConsultant } from "./icons.jsx";
import { ScrambleText, WordReveal, CountMetric, Mark, TargetGame } from "./widgets.jsx";
import {
  TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NOTIFY_EMAIL,
  SPOTS_LEFT, SPOTS_TOTAL, WORK_HOURS,
} from "./config.js";
import {
  NICHE_DATA, NICHES, SERVICES, PRINCIPLES, FIT_YES, FIT_NO,
  PLANS, WORK_CASES, METRIC_NOTES, FAQS, KPI_PHRASES, MARQUEE_ITEMS,
} from "./data.jsx";
import {
  useScrollProgress, usePreloader, useClockStatus, useTicker,
  useSpotlight, useHeroParallax, useVelocityMarquee, useCoverflow,
  useKineticWordmark, tiltHandlers, magnetHandlers, scrollToId, scrollToTop,
} from "./interactions.jsx";

export default function App() {
  /* --- UI-состояния --- */
  const [openFaq, setOpenFaq] = useState(0);
  const [openSvc, setOpenSvc] = useState(0);

  /* --- Интерактив (вся логика в interactions.jsx) --- */
  const loaded = usePreloader();
  const { progress, ctaVisible } = useScrollProgress();
  const { online, timeStr } = useClockStatus(WORK_HOURS);
  const kpiIndex = useTicker(KPI_PHRASES.length);
  const rootRef = useSpotlight();
  const { heroRef, onMove: onHeroMove, onLeave: onHeroLeave } = useHeroParallax();
  const marqueeRef = useVelocityMarquee();
  const { trackRef: workRef, scrollBy: scrollWork } = useCoverflow();
  const { ref: wordmarkRef, onMove: onFooterMove, onLeave: onFooterLeave } = useKineticWordmark();

  /* --- Приветствие по времени суток --- */
  const hour = new Date().getHours();
  const greeting = hour >= 5 && hour < 12 ? "Доброе утро—" : hour < 18 ? "Добрый день—" : "Добрый вечер—";

  /* --- ROI-калькулятор --- */
  const [roiBudget, setRoiBudget] = useState(1000);
  const [roiNiche, setRoiNiche] = useState("ecommerce");
  const nicheInfo = NICHE_DATA[roiNiche];
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
    const nicheLabel = NICHE_DATA[form.niche]?.label || form.niche || "не указана";
    const text = `🎯 Новая заявка с сайта LeadBoost\n\nИмя: ${form.name}\nКонтакт: ${form.contact}\nУслуга: ${form.service || "не указана"}\nНиша: ${nicheLabel}\nБюджет: ${form.budget || "не указан"}`;
    const configured = TELEGRAM_BOT_TOKEN !== "ВАШ_ТОКЕН_БОТА" && TELEGRAM_CHAT_ID !== "ВАШ_CHAT_ID";
    if (!configured) { setSendError(true); return; }
    setSending(true);
    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      });
      if (!res.ok) throw new Error("tg error");
      if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
      setSent(true);
    } catch { setSendError(true); } finally { setSending(false); }
  };
  const mailtoHref = `mailto:${NOTIFY_EMAIL}?subject=${encodeURIComponent("Заявка с сайта LeadBoost")}&body=${encodeURIComponent(`Имя: ${form.name}\nКонтакт: ${form.contact}\nУслуга: ${form.service}\nНиша: ${NICHE_DATA[form.niche]?.label || ""}\nБюджет: ${form.budget}`)}`;

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
          <li><a href="#studio" onClick={scrollToId("studio")}>Студия</a></li>
          <li><a href="#services" onClick={scrollToId("services")}>Услуги</a></li>
          <li><a href="#work" onClick={scrollToId("work")}>Работы</a></li>
          <li><a href="#pricing" onClick={scrollToId("pricing")} className="nav-hide-sm">Тарифы</a></li>
          <li><a href="#contact" onClick={scrollToId("contact")}>Контакт</a></li>
        </ul>
        <div className="nav-progress"><i style={{ width: `${progress}%` }} /></div>
      </nav>

      {/* 01 — СТУДИЯ (хиро, премиальная версия) */}
      <section className="hero" id="studio" ref={heroRef} onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}>
        <div className="hero-halo" aria-hidden="true" />
        <div className="wrap">
          <div className="sec-num"><span className="circle">01</span> СТУДИЯ</div>
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-overline">Независимая студия рекламы</div>
              <h1 className="h-huge">
                <ScrambleText text={greeting} />
                <span className="stroke">это LeadBoost</span>
              </h1>
              <p className="hero-lead">
                Настраиваю трафик, который <Mark>приводит клиентов</Mark>, и делаю сайты,
                которые его выдерживают. Реклама, сайт и аналитика — в одних руках с первого дня.
              </p>
              <div className="hero-actions">
                <a href="#contact" onClick={scrollToId("contact")} className="hero-btn">Обсудить проект →</a>
                <a href="#work" className="hero-link" onClick={scrollToId("work")}>Смотреть работы <span className="arr">↘</span></a>
              </div>
            </div>
            <Reveal delay={140}>
              <div className="hero-visual">
                <div className="hero-card" {...tiltHandlers}>
                  <div className="shine" aria-hidden="true" />
                  <div className="hero-card-inner">
                    <span className="case-tag">КЕЙС / 07</span>
                    <h4>Реклама с характером.</h4>
                  </div>
                </div>
                <div className="hero-chip chip-a"><CountMetric value="240+" inline /><span>кампаний запущено</span></div>
                <div className="hero-chip chip-b"><CountMetric value="310%+" inline /><span>средний ROAS клиентов</span></div>
              </div>
            </Reveal>
          </div>

          {/* статусная линия хиро */}
          <div className="hero-bottom">
            <div className="hero-fact">✓ Один специалист, без передачи по цепочке</div>
            <div className="hero-fact">✓ Первая реклама — уже на первой неделе</div>
            <div className="hero-fact">✓ Понятный отчёт вместо красивых слов</div>
            <div className="hero-fact ticker"><span className="hero-kpi-ticker"><span className="kpi-face" key={kpiIndex}>{KPI_PHRASES[kpiIndex]}</span></span></div>
          </div>
        </div>
      </section>

      {/* БЕГУЩАЯ СТРОКА */}
      <div className="marquee">
        <div className="marquee-track" ref={marqueeRef}>
          {[0, 1].map((k) => (
            <span key={k} className="marquee-run">
              {MARQUEE_ITEMS.map((item) => (
                <span className="mq-item" key={item.label}>
                  <span className="mq-ic">
                    {item.img ? <img src={item.img} alt="" /> : <item.icon />}
                  </span>
                  {item.label}
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
            <h2 className="h-big"><WordReveal text="Хорошая реклама делает больше, чем приводит клики. Она приводит людей," /> <Mark>готовых купить.</Mark></h2>
          </Reveal>
        </div>
      </section>

      {/* 02 — УСЛУГИ */}
      <section className="section" id="services" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">02</span> ЧТО ДЕЛАЮ</div>
          <div className="svc-head">
            <h2 className="h-big">Услуги</h2>
            <p>Сфокусированная работа: от вопроса «откуда брать клиентов» — до работающей системы.</p>
          </div>
          <div>
            {SERVICES.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className={`svc-row ${openSvc === i ? "open" : ""}`} onClick={() => setOpenSvc(openSvc === i ? -1 : i)}
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
            <div className="f-label" style={{ color: "var(--ink-soft)" }}>/ С КЕМ РАБОТАЮ</div>
            <div className="niche-grid">
              {NICHES.map((n) => (
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
          <div className="sec-num"><span className="circle">03</span> ИЗБРАННЫЕ РАБОТЫ</div>
          <div className="svc-head" style={{ marginBottom: 40 }}>
            <h2 className="h-big"><span className="h-ic"><IconCaseStudies /></span>Работы</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
              <p style={{ textAlign: "right" }}>Кампании с реальными цифрами. Сайты — новое направление, первые проекты уже в работе.</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="work-hint">Листайте →</span>
                <div className="work-nav">
                  <button onClick={() => scrollWork(-1)} aria-label="Назад">←</button>
                  <button onClick={() => scrollWork(1)} aria-label="Вперёд">→</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="work-scroller" ref={workRef}>
          {WORK_CASES.map((w) => (
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
          <div className="sec-num"><span className="circle">04</span> ПРИНЦИПЫ РАБОТЫ</div>
          <div className="dark-cards">
            {PRINCIPLES.map((p, i) => (
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
                      <span className="n">{p.n} / НА ПРАКТИКЕ</span>
                      <p>{p.back}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="not-promise">
              <b>Чего не обещаю:</b> точного числа продаж (это зависит и от того, как вы отвечаете клиентам) · клиентов «уже завтра» · результата без бюджета на саму рекламу · работы с продуктом, который ещё никто не покупал.
            </div>
          </Reveal>
        </div>
      </section>

      {/* КОМУ ПОДХОДИТ */}
      <section className="section">
        <div className="wrap">
          <div className="sec-num"><span className="circle">05</span> ЧЕСТНЫЙ ОТСЕВ</div>
          <div className="svc-head">
            <h2 className="h-big">Кому подходит</h2>
            <p>Беру 3-4 проекта в месяц — поэтому честно фильтрую на входе.</p>
          </div>
          <div className="fit-grid">
            <Reveal>
              <div className="fit-card">
                <h4><span className="fit-mark y">✓</span> Подходит, если</h4>
                {FIT_YES.map((t) => <div className="fit-row" key={t}><span className="fit-mark y">✓</span>{t}</div>)}
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="fit-card">
                <h4><span className="fit-mark n">✕</span> Пока рано, если</h4>
                {FIT_NO.map((t) => <div className="fit-row" key={t}><span className="fit-mark n">✕</span>{t}</div>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 — ТАРИФЫ */}
      <section className="section" id="pricing" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">06</span> ТАРИФЫ</div>
          <div className="svc-head">
            <h2 className="h-big">Три варианта</h2>
            <p>Одна сумма в месяц. Без скрытых процентов и доплат.</p>
          </div>
          <div className="price-grid">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 90}>
                <div className={`price-card ${plan.popular ? "pop" : ""}`}>
                  {plan.popular && <span className="price-tag">выбор большинства</span>}
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
                    Выбрать
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220}>
            <div className="web-note">
              <div>
                <strong>Сайт — отдельно от тарифов на рекламу</strong>
                <span>От простого лендинга до интернет-магазина. Цена и сроки — после короткого созвона.</span>
              </div>
              <a href="#contact" onClick={scrollToId("contact")} className="f-pill" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>Обсудить сайт</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 07 — КАЛЬКУЛЯТОР */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">07</span> КАЛЬКУЛЯТОР</div>
          <div className="svc-head">
            <h2 className="h-big">Посчитайте сами</h2>
            <p>Сколько клиентов примерно принесёт ваш рекламный бюджет.</p>
          </div>
          <Reveal>
            <div className="roi-box">
              <div className="roi-inputs">
                <div className="roi-field">
                  <label>Ниша</label>
                  <select className="roi-select" value={roiNiche} onChange={(e) => setRoiNiche(e.target.value)}>
                    {Object.entries(NICHE_DATA).map(([key, n]) => <option key={key} value={key}>{n.label}</option>)}
                  </select>
                </div>
                <div className="roi-field">
                  <label>Бюджет на рекламу в месяц ($)</label>
                  <input className="roi-input" type="number" step="100" value={roiBudget} onChange={(e) => setRoiBudget(Math.max(0, Number(e.target.value)))} />
                </div>
                <input className="roi-range" type="range" min="300" max="6000" step="100" value={roiBudget} onChange={(e) => setRoiBudget(Number(e.target.value))} />
              </div>
              <div className="roi-results">
                <div className="roi-out"><span className="k">Сколько будет стоить один человек, который напишет</span><span className="v">~${animatedCpl}</span></div>
                <div className="roi-out"><span className="k">Сколько таких людей будет в месяц</span><span className="v">~{animatedLeads}</span></div>
                <div className="roi-out"><span className="k">На сколько окупится реклама</span><span className="v">{nicheInfo.roas}</span></div>
                <p className="roi-note">Примерный расчёт по средним цифрам ниши. Точные значения зависят от цены товара и сезона — скажу на созвоне.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 — ЗАМЕТКИ / КЕЙСЫ-МЕТРИКИ (тёмные градиентные карточки) */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">08</span> ЦИФРЫ</div>
          <div className="notes-head">
            <h2 className="h-big">Не обещания.</h2>
            <p>Наблюдения из реальных кампаний — то, что видно в отчётах, а не в презентациях.</p>
          </div>
          <div className="notes-grid">
            {METRIC_NOTES.map((c, i) => (
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
          <div className="sec-num"><span className="circle">09</span> ВОПРОСЫ</div>
          <h2 className="h-big" style={{ marginBottom: 46 }}>Отвечаю просто</h2>
          {FAQS.map((f, i) => (
            <div key={f.q} className={`faq-item ${openFaq === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>{f.q} <span className="faq-plus">+</span></button>
              <div className="faq-a"><div className="faq-a-inner">{f.a}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* МИНИ-ИГРА */}
      <TargetGame />

      {/* 10 — КОНТАКТ */}
      <section className="section" id="contact" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-num"><span className="circle">10</span> КОНТАКТ</div>
          <Reveal>
            <h2 className="h-big"><WordReveal text="Принесите задачу, которую не решить шаблоном." /></h2>
          </Reveal>
          <div className="contact-grid">
            <div className="contact-left">
              <Reveal delay={100}>
                <span className="contact-consultant"><IconConsultant /></span>
                <p>
                  Расскажите, что меняется, что буксует и что должна дать следующая версия вашей рекламы или сайта.
                  Отвечу с конкретикой — а не продающей рассылкой.
                </p>
                <div className="contact-note">
                  <span className="contact-ic"><IconSupport /></span>
                  Отвечаю в течение дня. Сейчас свободно {SPOTS_LEFT} из 3 мест на месяц —
                  если не успели, честно скажу, когда освобожусь.
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
                        <label>Имя</label>
                        <input name="name" placeholder="Как вас зовут" required value={form.name} onChange={onFormChange} />
                      </div>
                      <div className="f-field">
                        <label>Телефон или Telegram</label>
                        <input name="contact" placeholder="+7… или @username" required value={form.contact} onChange={onFormChange} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="f-field">
                        <label>Что интересует</label>
                        <select name="service" required value={form.service} onChange={onFormChange}>
                          <option value="" disabled>Выберите</option>
                          <option value="Реклама">Реклама</option>
                          <option value="Сайт">Сайт</option>
                          <option value="Реклама и сайт">И реклама, и сайт</option>
                        </select>
                      </div>
                      <div className="f-field">
                        <label>Чем занимаетесь</label>
                        <select name="niche" required value={form.niche} onChange={onFormChange}>
                          <option value="" disabled>Выберите нишу</option>
                          {Object.entries(NICHE_DATA).map(([key, n]) => <option key={key} value={key}>{n.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="f-field">
                      <label>Бюджет на рекламу в месяц (если применимо)</label>
                      <input name="budget" placeholder="Например: $1 000" value={form.budget} onChange={onFormChange} />
                    </div>
                    <span className="magnetic" style={{ display: "block" }} {...magnetHandlers}><button type="submit" className="form-submit" disabled={sending}>{sending ? "Отправляю…" : "Отправить заявку"}</button></span>
                    {sendError && (
                      <div className="form-err">
                        Не получилось отправить автоматически. Напишите напрямую: <a href={mailtoHref}>на почту</a>.
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="form-ok">✓ Заявка принята — свяжусь с вами в течение дня.</div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" onMouseMove={onFooterMove} onMouseLeave={onFooterLeave}>
        <div className="wrap footer-top">
          <h3 className="h-mid">Ясность,<br />которая продаёт.</h3>
          <div>
            <div className="f-label">/ БЫСТРЫЕ ССЫЛКИ</div>
            <div className="f-pills">
              <a href="#studio" className="f-pill" onClick={scrollToId("studio")}>Студия</a>
              <a href="#services" className="f-pill" onClick={scrollToId("services")}>Услуги</a>
              <a href="#work" className="f-pill" onClick={scrollToId("work")}>Работы</a>
              <a href="#contact" className="f-pill" onClick={scrollToId("contact")}>Контакт</a>
            </div>
          </div>
          <div>
            <div className="f-label">/ СТАТУС</div>
            <div className="f-time">
              <span className={`st ${online ? "on" : "off"}`} />
              {timeStr} · {online ? "на связи" : "отвечу утром"}
            </div>
          </div>
        </div>
        <div className="footer-wordmark" ref={wordmarkRef}>LEADBOOST</div>
        <div className="footer-base">
          <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, width: "100%" }}>
            <span>© 2026 LeadBoost</span>
            <span>Реклама · Сайты · Аналитика</span>
            <a href="#" onClick={scrollToTop}>Наверх →</a>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className={`m-cta ${ctaVisible ? "show" : ""}`}>
        <span className="spots">
          <span className="spots-bar">{[0,1,2].map((i) => <i key={i} className={i < SPOTS_LEFT ? "free" : ""} />)}</span>
          {SPOTS_LEFT} из 3 свободно
        </span>
        <a href="#contact" onClick={scrollToId("contact")}>Заявка →</a>
      </div>
    </div>
  );
}
