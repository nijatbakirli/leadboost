/* ============================================================
   ГЛАВНЫЙ КОМПОНЕНТ
   Только композиция и разметка. Настройки в config.js,
   контент в data.jsx, тексты интерфейса в i18n.jsx,
   логика в interactions.jsx, мелкие компоненты в widgets.jsx.
   Визуальный стиль как в каруселях TARGET PRO (см. styles.css).

   Каждая секция — свой компонент со своим состоянием (открытый
   вопрос, открытая услуга, форма). App хранит только язык, поэтому
   клик или скролл обновляет одну секцию, а не всю страницу,
   и не задевает секции, которые браузер ещё «оживляет» (см. Part).
   ============================================================ */
import React, { useState, useEffect, useRef, Suspense, useSyncExternalStore } from "react";
import { asset } from "./assets.js";
import {
  IconArrowRight, IconArrowDown, IconArrowUp, IconCheck, IconCross, IconPlus,
  IconChevronDown, IconExpand, IconSun, IconMoon, FlagRU, FlagGB,
} from "./icons.jsx";
import { SecLabel, Heading, ShotViewer, SocialIcon } from "./widgets.jsx";
import { CONTACTS, SPOTS_LEFT, SPOTS_TOTAL, WORK_HOURS, WORK_TZ } from "./config.js";
import { CONTENT } from "./data.jsx";
import { UI, LANGS, useLang } from "./i18n.jsx";
import { LANG_PATHS } from "./seo.js";
import {
  useScrollProgress, useScrolledPast, useClockStatus, useVelocityMarquee,
  magnetHandlers, scrollToId, scrollToTop, useTheme, setTheme,
} from "./interactions.jsx";

const ext = { target: "_blank", rel: "noopener noreferrer" };
/* Часть страницы, которая "оживает" (hydrate) отдельной небольшой задачей:
   браузер не зависает на одном долгом куске JavaScript после загрузки,
   а то, по чему человек кликнул, React оживляет в первую очередь. */
const Part = ({ children }) => <Suspense fallback={null}>{children}</Suspense>;
/* логотип отдельным файлом (раньше был base64 внутри JS и утяжелял страницу) */
/* логотип в двух файлах: PRO тёмным для светлой темы, белым для тёмной; показ решает CSS по html[data-theme] */
const LOGO_LIGHT = asset("img/logo.svg");
const LOGO_DARK = asset("img/logo-dark.svg");

/* Выбранный тариф: кнопка «Выбрать» в тарифах ставит, форма заявки показывает.
   Маленькое общее хранилище вместо состояния в App: выбор тарифа
   перерисовывает только форму, а не всю страницу. */
const planStore = (() => {
  let value = null;
  const subs = new Set();
  return {
    get: () => value,
    set: (v) => { value = v; subs.forEach((f) => f()); },
    subscribe: (f) => { subs.add(f); return () => subs.delete(f); },
  };
})();
const usePlan = () => useSyncExternalStore(planStore.subscribe, planStore.get, () => null);

/* статус «на связи»: пока страница не запустилась, место держим, но не показываем */
function useStatus() {
  const { online } = useClockStatus(WORK_HOURS, WORK_TZ);
  return { online, cls: online === null ? "pending" : online ? "on" : "off" };
}

function SpotsBar() {
  return (
    <span className="spots-bar" aria-hidden="true">
      {Array.from({ length: SPOTS_TOTAL }, (_, i) => <i key={i} className={i < SPOTS_LEFT ? "free" : ""} />)}
    </span>
  );
}

/* шапка секции: заголовок и, если есть, подпись справа. Подписи капсом
   над заголовком больше нет (повторяла меню), мазок маркера (mark) только
   там, где он задан: первый экран, скрины, тарифы, контакт */
function SecHead({ s, mark }) {
  return (
    <div className="sec-head">
      <Heading pre={s.pre} mark={mark === undefined ? s.mark : mark} />
      {s.sub && <p className="sec-sub">{s.sub}</p>}
    </div>
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

/* полоска прогресса чтения: отдельный компонент, чтобы скролл перерисовывал только её */
function NavProgress() {
  const progress = useScrollProgress();
  return <div className="nav-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>;
}

/* круглые флаги языков; для английского британский флаг */
const FLAGS = { ru: FlagRU, en: FlagGB };

/* Переключатель языка: кнопка с флагом и коротким названием (RU / EN),
   по нажатию список. В списке настоящие ссылки на / и /en/ (их видят
   поисковики), но клик меняет язык без перезагрузки. Закрывается по клику
   мимо, Esc и уходу фокуса. onOpen: закрыть мобильное меню, если открыто. */
/* Переключатель темы (рядом с языком и в меню на телефоне). Состояние общее
   через useTheme, поэтому обе кнопки всегда показывают одно и то же. Иконку
   (луна в светлой, солнце в тёмной) переключает CSS, разметка одна. */
function ThemeToggle({ t, className = "", withText = false }) {
  const dark = useTheme() === "dark";
  return (
    <button
      type="button"
      className={`theme-btn ${className}`}
      aria-pressed={dark}
      aria-label={withText ? undefined : t.nav.theme}
      title={withText ? undefined : t.nav.theme}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <IconMoon className="i-moon" />
      <IconSun className="i-sun" />
      {withText && <span className="theme-txt">{t.nav.theme}</span>}
      {withText && <span className="theme-sw" aria-hidden="true"><i /></span>}
    </button>
  );
}

function LangMenu({ t, lang, setLang, onOpen }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector(".lang-btn")?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const current = LANGS.find((l) => l.code === lang) || LANGS[0];
  const CurFlag = FLAGS[current.code];
  const toggle = () => { if (!open && onOpen) onOpen(); setOpen(!open); };
  return (
    <div
      className={`lang-menu ${open ? "open" : ""}`}
      ref={ref}
      onBlur={(e) => { if (open && ref.current && !ref.current.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button type="button" className="lang-btn" aria-expanded={open} aria-controls="lang-list" onClick={toggle}>
        <CurFlag />
        <span className="sr-only">{t.common.language}: </span>
        <span className="lang-cur">{current.label}</span>
        <IconChevronDown className="lang-chev" />
      </button>
      <ul className="lang-list" id="lang-list">
        {LANGS.map((l) => {
          const Flag = FLAGS[l.code];
          return (
            <li key={l.code}>
              <a
                href={LANG_PATHS[l.code]}
                hrefLang={l.code}
                lang={l.code}
                aria-current={lang === l.code ? "true" : undefined}
                onClick={(e) => { e.preventDefault(); setOpen(false); setLang(l.code); }}
              >
                <Flag />
                <span className="lang-code">{l.label}</span>
                <span className="sr-only"> {l.name}</span>
                {lang === l.code && <IconCheck className="lang-check" />}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* разделы в мобильном меню (id секций на странице, подписи в UI.nav) */
const MENU_IDS = ["services", "niches", "results", "pricing", "faq", "contact"];

/* МОБИЛЬНОЕ МЕНЮ (до 760px): панель под шапкой со всеми разделами и кнопками
   WhatsApp и Instagram. Стоит вне <nav>: у навбара есть transform и
   backdrop-filter, и внутри него position: fixed считался бы от навбара,
   а не от экрана. Пока меню открыто, страница под ним не прокручивается. */
function MobileMenu({ t, open, close, burgerRef }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      close();
      burgerRef.current?.focus();
    };
    const onResize = () => { if (window.innerWidth > 760) close(); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  /* пункт меню: закрыть, вернуть прокрутку и плавно доехать до раздела */
  const go = (id) => (e) => {
    e.preventDefault();
    document.documentElement.style.overflow = "";
    close();
    scrollToId(id)();
  };
  return (
    <>
      <div className={`m-menu-backdrop ${open ? "open" : ""}`} onClick={close} aria-hidden="true" />
      <div
        id="m-menu"
        className={`m-menu ${open ? "open" : ""}`}
        ref={ref}
        onBlur={(e) => {
          const to = e.relatedTarget;
          if (open && to && !ref.current.contains(to) && to !== burgerRef.current) close();
        }}
      >
        <ol className="m-menu-list">
          {MENU_IDS.map((id, i) => (
            <li key={id}>
              <a href={`#${id}`} onClick={go(id)}>
                <span className="m-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="m-txt">{t.nav[id]}</span>
                <IconArrowRight className="m-arrow" />
              </a>
            </li>
          ))}
        </ol>
        <ThemeToggle t={t} className="m-theme" withText />
        <div className="m-menu-cta">
          <a className="btn btn-y" href={CONTACTS.whatsapp} {...ext}><SocialIcon name="whatsapp" />{t.common.whatsapp}</a>
          <a className="btn btn-ghost" href={CONTACTS.telegram} {...ext}><SocialIcon name="telegram" />{t.common.telegram}</a>
          <a className="btn btn-ghost" href={CONTACTS.instagram} {...ext}><SocialIcon name="instagram" />{t.common.instagram}</a>
        </div>
      </div>
    </>
  );
}

/* ШАПКА: навбар-пилюля + мобильное меню.
   Компьютер (от 761px): логотип, пять ссылок, язык.
   Телефон и планшет: логотип, язык и кнопка меню, ссылки в панели.
   Логотип фиксированного размера и никогда не сжимается (иначе Safari
   на iPhone ужимал его до нуля, когда в шапке не хватало места). */
function Header({ t, lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <nav className="nav" aria-label="TARGET PRO">
        <a href="#top" className="nav-logo" onClick={(e) => { document.documentElement.style.overflow = ""; closeMenu(); scrollToTop(e); }}>
          <img className="logo-lt" src={LOGO_LIGHT} alt="TARGET PRO" width="121" height="17" />
          <img className="logo-dk" src={LOGO_DARK} alt="TARGET PRO" width="121" height="17" />
        </a>
        <ul className="nav-links">
          <li><a href="#services" onClick={scrollToId("services")}>{t.nav.services}</a></li>
          <li><a href="#results" onClick={scrollToId("results")}>{t.nav.results}</a></li>
          <li><a href="#pricing" onClick={scrollToId("pricing")}>{t.nav.pricing}</a></li>
          <li><a href="#contact" onClick={scrollToId("contact")}>{t.nav.contact}</a></li>
        </ul>
        <div className="nav-tools">
          <ThemeToggle t={t} />
          <LangMenu t={t} lang={lang} setLang={setLang} onOpen={closeMenu} />
        </div>
        <button
          type="button"
          ref={burgerRef}
          className={`burger ${menuOpen ? "open" : ""}`}
          aria-label={t.nav.menu}
          aria-expanded={menuOpen}
          aria-controls="m-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i /><i /><i />
        </button>
        <NavProgress />
      </nav>
      <MobileMenu t={t} open={menuOpen} close={closeMenu} burgerRef={burgerRef} />
    </>
  );
}

/* ПЕРВЫЙ ЭКРАН: бенто как на обложках Reels. Приветствия с бегущими
   буквами, ряда галочек под плитками и счёта цифр больше нет (ноябрь
   2026, разбор «чтобы сайт не выглядел сделанным ИИ»): цифры сразу на месте */
function Hero({ t, D }) {
  const status = useStatus();
  const featured = D.PROOF;
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-bar">
          <span className={`status ${status.cls}`}><i aria-hidden="true" />{status.online === false ? t.hero.statusOffline : t.hero.statusOnline}</span>
        </div>
        <div className="hero-grid">
          <div className="tile hero-main">
            <Heading as="h1" pre={t.hero.h1} mark={t.hero.h1Mark} className="hd-hero" instant />
            <div>
              <p className="hero-lead">{t.hero.lead}</p>
              <div className="hero-actions">
                <a className="btn btn-y" href={CONTACTS.whatsapp} {...ext}><SocialIcon name="whatsapp" />{t.hero.ctaPrimary}</a>
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
            <img className="proof-shot" src={featured.shot.src} width={featured.shot.w} height={featured.shot.h} alt="" />
            <span className="more-link">{t.hero.proofLink}<IconArrowDown className="more-ic" /></span>
          </a>
          <div className="tile hero-stat stat-a">
            <span className="stat-num">240+</span>
            <span className="stat-cap">{t.hero.statA}</span>
          </div>
          <div className="tile hero-stat stat-b">
            <span className="stat-num">310%</span>
            <span className="stat-cap">{t.hero.statB}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* УСЛУГИ: аккордеон */
function Services({ t, D }) {
  const [openSvc, setOpenSvc] = useState(0);
  return (
    <section className="section" id="services">
      <div className="wrap">
        <SecHead s={t.services} />
        <div className="svc-list">
          {D.SERVICES.map((s, i) => {
            const open = openSvc === i;
            return (
              <div className={`tile svc ${open ? "open" : ""}`} key={s.title}>
                <button type="button" className="svc-row" onClick={() => setOpenSvc(open ? -1 : i)} aria-expanded={open} aria-controls={`svc-${i}`}>
                  <span className="svc-ic" aria-hidden="true"><span className="prem-ic" style={{ "--ic": `url(${asset(`img/icons/premium/${s.icon}.svg`)})` }} /></span>
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
      </div>
    </section>
  );
}

/* С КЕМ РАБОТАЮ: сетка ниш 3×3 без иконок (иконки в квадратиках были
   на каждой плитке и читались как шаблон), девятая плитка ведёт в WhatsApp */
function Niches({ t, D }) {
  return (
    <section className="section" id="niches">
      <div className="wrap">
        <SecHead s={t.niches} />
        <ul className="niche-grid">
          {D.NICHES.map((n) => (
            <li className="tile niche" key={n.label}>
              <span className="niche-txt">
                <span className="niche-name">{n.label}</span>
                <span className="niche-desc">{n.desc}</span>
              </span>
            </li>
          ))}
          <li className="niche-cta-item">
            <a className="tile niche niche-cta" href={CONTACTS.whatsapp} {...ext}>
              <span className="niche-txt">
                <span className="niche-name">{t.niches.ctaTitle}</span>
                <span className="niche-desc">{t.niches.ctaText}</span>
              </span>
              <IconArrowRight className="niche-arrow" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* КЕЙСЫ ИЗ КАБИНЕТА (ноябрь 2026: кейсы и скрины в одном разделе).
   Шесть кейсов из отчётов владельца: ниша, город, срок, цифра, скрин,
   что было до и три шага. Ниже «Ещё результаты»: два кейса без скринов и
   трафик (скрины по кнопке). Клик по скрину открывает его крупно */
function Results({ t, D }) {
  const [zoom, setZoom] = useState(null); /* индекс в [...CASES, ...MORE], открытый крупно */
  const items = [...D.CASES, ...D.MORE];
  return (
    <section className="section" id="results">
      <div className="wrap">
        <SecHead s={t.results} />
        <div className="cs-grid">
          {D.CASES.map((c, i) => (
            <article className="tile cs" key={c.niche}>
              <SecLabel className="lbl-sm">{c.period}</SecLabel>
              <h3 className="cs-name">{c.niche}</h3>
              <div className="num-row">
                <span className="big-y">{c.big}</span>
                <span className="num-unit">{c.unit}</span>
              </div>
              <p className="num-sub">{c.sub}</p>
              <button type="button" className="res-shot" onClick={() => setZoom(i)}>
                {c.shots.map((s) => (
                  <img key={s.src} src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" decoding="async" />
                ))}
                <span className="sr-only">{t.results.zoom}</span>
                <span className="res-zoom" aria-hidden="true"><IconExpand /></span>
              </button>
              <div className="cs-story">
                <p className="cs-before"><b>{t.results.before}.</b> {c.before}</p>
                <p className="cs-did">{t.results.did}</p>
                <ol className="cs-steps">
                  {c.steps.map((st) => <li key={st}>{st}</li>)}
                </ol>
              </div>
            </article>
          ))}
        </div>
        <h3 className="more-title">{t.results.more}</h3>
        <div className="more-grid">
          {D.MORE.map((m, j) => (
            <article className="tile more" key={m.label}>
              <SecLabel className="lbl-sm">{m.label}</SecLabel>
              <div className="num-row">
                <span className="big-y">{m.big}</span>
                <span className="num-unit">{m.unit}</span>
              </div>
              <p className="num-sub">{m.sub}</p>
              {m.shots && (
                <button type="button" className="btn btn-ghost btn-sm more-shots" onClick={() => setZoom(D.CASES.length + j)}>
                  <IconExpand className="btn-ic" />{t.results.showShots}
                </button>
              )}
            </article>
          ))}
        </div>
        <p className="res-note">{t.results.note}</p>
      </div>
      <ShotViewer
        item={zoom === null ? null : items[zoom]}
        onClose={() => setZoom(null)}
        closeLabel={t.results.close}
        sourceLabel={t.results.source}
      />
    </section>
  );
}

/* ПРИНЦИПЫ: простой список с тонкими линиями, без карточек и иконок.
   Слева принцип, справа что он значит и как это выглядит на деле.
   Последняя строка: чего не обещаю */
function Principles({ t, D }) {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <SecHead s={t.principles} />
        <ul className="pr-list">
          {D.PRINCIPLES.map((p) => (
            <li className="pr" key={p.title}>
              <h3 className="pr-title">{p.title}</h3>
              <div className="pr-body">
                <p className="pr-front">{p.front}</p>
                <p className="pr-back">{p.back}</p>
              </div>
            </li>
          ))}
          <li className="pr pr-not">
            <h3 className="pr-title">{t.principles.notPromiseLabel}</h3>
            <div className="pr-body"><p className="pr-front">{t.principles.notPromiseText}</p></div>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* КОМУ ПОДХОДИТ: два списка без карточек, пункты строка в строку
   (CSS subgrid), число строк = длина большего списка */
function Fit({ t, D }) {
  const rows = Math.max(D.FIT_YES.length, D.FIT_NO.length);
  return (
    <section className="section" id="fit">
      <div className="wrap">
        <SecHead s={t.fit} />
        <div className="fit-grid" style={{ "--fit-rows": rows, "--fit-span": rows + 1 }}>
          <div className="fit fit-yes">
            <h3 className="fit-title"><span className="fit-badge" aria-hidden="true"><IconCheck /></span>{t.fit.yes}</h3>
            <ul>{D.FIT_YES.map((txt) => <li key={txt}><IconCheck className="fit-ic" />{txt}</li>)}</ul>
          </div>
          <div className="fit fit-no">
            <h3 className="fit-title"><span className="fit-badge" aria-hidden="true"><IconCross /></span>{t.fit.no}</h3>
            <ul>{D.FIT_NO.map((txt) => <li key={txt}><IconCross className="fit-ic" />{txt}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ТАРИФЫ: «Выбрать» запоминает тариф для формы и ведёт к ней */
function Pricing({ t, D }) {
  const choosePlan = (i) => (e) => { planStore.set(i); scrollToId("contact")(e); };
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <SecHead s={t.pricing} mark={t.pricing.mark(D.PLANS[0].price)} />
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
              <p className="price-excl"><b>{t.pricing.excl}</b> {p.excl}</p>
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
  );
}

/* ЧТО БУДЕТ ПОСЛЕ ЗАЯВКИ: четыре шага строкой (ноябрь 2026, пункт 29 разбора:
   человек пишет смелее, когда знает, что будет дальше). Без карточек,
   номера моно, линии сверху как в «Как я работаю» */
function AfterSteps({ t, D }) {
  return (
    <section className="section" id="after">
      <div className="wrap">
        <SecHead s={t.after} />
        <ol className="as-list">
          {D.AFTER_STEPS.map((st, i) => (
            <li className="as" key={st.title}>
              <span className="as-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="as-title">{st.title}</h3>
              <p className="as-text">{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ВОПРОСЫ. Компьютер: заголовок и кнопка слева (едут вместе со списком),
   вопросы справа. Телефон: заголовок, вопросы, потом кнопка.
   Вопросы простым списком с линиями, без карточек */
function Faq({ t, D }) {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap faq-layout">
        <div className="faq-side">
          <div className="faq-head">
            <Heading pre={t.faq.pre} className="hd-faq" />
          </div>
          <div className="faq-more">
            <p>{t.faq.more}</p>
            <a className="btn btn-ghost" href={CONTACTS.whatsapp} {...ext}><SocialIcon name="whatsapp" />{t.faq.moreBtn}</a>
          </div>
        </div>
        <div className="faq-list">
          {D.FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <div className={`faq ${open ? "open" : ""}`} key={f.q}>
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
  );
}

/* КОНТАКТ: быстрые кнопки и форма заявки → Telegram (если не ушло: WhatsApp) */
function Contact({ t, D, privacyHref }) {
  const RU = CONTENT.ru; /* заявка в Telegram всегда на русском: её читает владелец, не посетитель */
  const plan = usePlan(); /* индекс тарифа, выбранного кнопкой «Выбрать» */
  const [form, setForm] = useState({ name: "", contact: "", service: "", niche: "", budget: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const onFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setSendError(false);
    const nicheLabel = form.niche === "other" ? "Другое" : RU.NICHE_DATA[form.niche]?.label || form.niche || "не указана";
    setSending(true);
    try {
      const res = await fetch("/api/telegram", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, contact: form.contact, service: form.service, niche: nicheLabel, budget: form.budget,
          plan: plan !== null ? `${RU.PLANS[plan].name} (${RU.PLANS[plan].price} в месяц)` : "не выбрал, нужен совет",
        }),
      });
      if (!res.ok) throw new Error("send error");
      if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
      setSent(true);
    } catch { setSendError(true); } finally { setSending(false); }
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Heading pre={t.contact.pre} mark={t.contact.mark} className="hd-contact" />
        <div className="contact-grid">
          <div className="contact-left">
            <p className="contact-intro">{t.contact.intro}</p>
            <div className="tile contact-fast">
              <SecLabel className="lbl-sm">{t.contact.fastLabel}</SecLabel>
              <p>{t.contact.fastText}</p>
              {/* бесплатный разбор кабинета: раньше этот бонус был призом мини-игры */}
              <p className="contact-offer">{t.contact.offer}</p>
              <div className="contact-btns">
                <a className="btn btn-y" href={CONTACTS.whatsapp} {...ext}><SocialIcon name="whatsapp" />WhatsApp</a>
                <a className="btn btn-ghost" href={CONTACTS.telegram} {...ext}><SocialIcon name="telegram" />Telegram</a>
                <a className="btn btn-ghost" href={CONTACTS.instagram} {...ext}><SocialIcon name="instagram" />Instagram</a>
              </div>
            </div>
            <div className="contact-note">
              <p>{t.contact.note(SPOTS_LEFT)}</p>
              <SpotsBar />
            </div>
          </div>
          <div className="tile form-card">
            <h3 className="form-title">{t.contact.formTitle}</h3>
            {!sent ? (
              <form onSubmit={onFormSubmit}>
                {/* тариф: тот же выбор, что ставит кнопка «Выбрать» в тарифах (planStore) */}
                <label className="field">
                  <span className="field-lbl">{t.contact.form.planLabel}</span>
                  <select className="input" name="plan" value={plan === null ? "" : String(plan)} onChange={(e) => planStore.set(e.target.value === "" ? null : Number(e.target.value))}>
                    <option value="">{t.contact.form.planChoose}</option>
                    {D.PLANS.map((p, i) => <option key={p.name} value={i}>{p.name} · {p.price} {t.pricing.perMonth}</option>)}
                  </select>
                </label>
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
                      <option value="Другое">{t.contact.form.other}</option>
                    </select>
                  </label>
                  <label className="field">
                    <span className="field-lbl">{t.contact.form.nicheLabel}</span>
                    <select className="input" name="niche" required value={form.niche} onChange={onFormChange}>
                      <option value="" disabled>{t.contact.form.nicheChoose}</option>
                      {Object.entries(D.NICHE_DATA).map(([key, n]) => <option key={key} value={key}>{n.label}</option>)}
                      <option value="other">{t.contact.form.other}</option>
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
                <p className="form-consent">{t.contact.form.consent} <a href={privacyHref}>{t.contact.form.consentLink}</a>.</p>
                {sendError && (
                  <div className="form-err" role="alert">
                    {t.contact.form.errorText} <a href={CONTACTS.whatsapp} {...ext}>{t.contact.form.errorLink}</a> {t.contact.form.errorOr} <a href={CONTACTS.telegram} {...ext}>{t.contact.form.errorLinkTg}</a>.
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
  );
}

/* ФУТЕР */
function Footer({ t, privacyHref }) {
  const status = useStatus();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <nav className="f-col" aria-label={t.footer.linksLabel}>
            <SecLabel className="lbl-sm">{t.footer.linksLabel}</SecLabel>
            <ul>
              <li><a href="#services" onClick={scrollToId("services")}>{t.nav.services}</a></li>
              <li><a href="#results" onClick={scrollToId("results")}>{t.nav.results}</a></li>
              <li><a href="#pricing" onClick={scrollToId("pricing")}>{t.nav.pricing}</a></li>
              <li><a href="#contact" onClick={scrollToId("contact")}>{t.nav.contact}</a></li>
            </ul>
          </nav>
          <div className="f-col f-social">
            <SecLabel className="lbl-sm">{t.footer.contactsLabel}</SecLabel>
            <ul>
              <li><a href={CONTACTS.whatsapp} {...ext}><SocialIcon name="whatsapp" className="f-ic" />WhatsApp</a></li>
              <li><a href={CONTACTS.telegram} {...ext}><SocialIcon name="telegram" className="f-ic" />Telegram</a></li>
              <li><a href={CONTACTS.instagram} {...ext}><SocialIcon name="instagram" className="f-ic" />Instagram</a></li>
              <li><a href={CONTACTS.tiktok} {...ext}><SocialIcon name="tiktok" className="f-ic" />TikTok</a></li>
              <li><a href={CONTACTS.threads} {...ext}><SocialIcon name="threads" className="f-ic" />Threads</a></li>
            </ul>
          </div>
          <div className="f-col">
            <SecLabel className="lbl-sm">{t.footer.statusLabel}</SecLabel>
            <p className={`status ${status.cls}`}><i aria-hidden="true" />{status.online === false ? t.footer.offline : t.footer.online}</p>
          </div>
        </div>
        <a className="brand-line" href={CONTACTS.whatsapp} {...ext}>
          <span className="bl-name">TARGET PRO</span>
          <span className="bl-rule" aria-hidden="true" />
          <span className="bl-cta">{t.footer.brandCta}<IconArrowRight className="bl-ic" /></span>
        </a>
        <div className="footer-base">
          <span>{t.footer.copyright}</span>
          <a className="f-privacy" href={privacyHref}>{t.footer.privacy}</a>
        </div>
      </div>
    </footer>
  );
}

/* Плавающий WhatsApp (компьютер), нижняя панель (телефон) и кнопка «Наверх»
   над ними: появляются после первого экрана; скролл перерисовывает только их.
   В нижней панели только кнопка WhatsApp: счётчик мест, который висел там
   всё время, читался как продажный трюк, места показаны один раз в «Контакте».
   «Наверх» две: на компьютере над боковой кнопкой, на телефоне внутри
   нижней панели (сидит над ней, какой бы высоты панель ни была). */
function FloatingCta({ t }) {
  const show = useScrolledPast(650);
  const up = (cls) => (
    <a className={`up-btn ${cls}`} href="#top" onClick={scrollToTop} aria-label={t.common.toTop} title={t.common.toTop} tabIndex={show ? 0 : -1}>
      <IconArrowUp className="up-ic" />
    </a>
  );
  return (
    <>
      {up(`to-top ${show ? "show" : ""}`)}
      <a className={`wa-float ${show ? "show" : ""}`} href={CONTACTS.whatsapp} {...ext} aria-label={t.common.whatsapp} tabIndex={show ? 0 : -1}>
        <SocialIcon name="whatsapp" className="wa-ic" />
      </a>
      <div className={`m-cta ${show ? "show" : ""}`} aria-hidden={!show}>
        {up("m-up")}
        <a className="btn btn-y btn-sm" href={CONTACTS.whatsapp} {...ext} tabIndex={show ? 0 : -1}><SocialIcon name="whatsapp" />{t.common.whatsapp}</a>
      </div>
    </>
  );
}

export default function App({ initialLang = "ru" }) {
  /* App хранит только язык: его смена перерисовывает всё, остальное живёт в секциях */
  const { lang, setLang } = useLang(initialLang);
  const D = CONTENT[lang];
  const t = UI[lang];

  return (
    <div className="cl-root">
      <Header t={t} lang={lang} setLang={setLang} />

      <main>
        <Hero t={t} D={D} />
        {/* ЛЕНТЫ: что делаю × где */}
        <Part>
          <div className="tapes" aria-hidden="true">
            <Tape items={D.TAPE_WHERE} className="tape-w" dir={-1} speed={0.45} />
            <Tape items={D.TAPE_WHAT} className="tape-y" />
          </div>
        </Part>
        <Part><Services t={t} D={D} /></Part>
        <Part><Niches t={t} D={D} /></Part>
        <Part><Results t={t} D={D} /></Part>
        <Part><Principles t={t} D={D} /></Part>
        <Part><Fit t={t} D={D} /></Part>
        <Part><Pricing t={t} D={D} /></Part>
        <Part><AfterSteps t={t} D={D} /></Part>
        <Part><Faq t={t} D={D} /></Part>
        <Part><Contact t={t} D={D} privacyHref={LANG_PATHS[lang] + "privacy/"} /></Part>
      </main>

      <Part><Footer t={t} privacyHref={LANG_PATHS[lang] + "privacy/"} /></Part>
      <FloatingCta t={t} />
    </div>
  );
}
