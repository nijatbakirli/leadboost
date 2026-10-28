import React, { useState, useEffect, useRef } from "react";
import { useReveal } from "./hooks.jsx";
import { IconCross } from "./icons.jsx";

/* scramble: строка "расшифровывается" из случайных символов */
function ScrambleText({ text, className = "", speed = 28 }) {
  const [ref, show] = useReveal();
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!show) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplay(text); return; }
    const chars = "▓▒░#%&@$?!АБВГДЕКЛМНОПРСТ0123456789";
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame++;
      const fixed = Math.floor(frame / 2.2);
      let out = "";
      for (let i = 0; i < total; i++) {
        if (text[i] === " ") { out += " "; continue; }
        out += i < fixed ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(out);
      if (fixed >= total) { setDisplay(text); clearInterval(id); }
    }, speed);
    return () => clearInterval(id);
  }, [show, text, speed]);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

/* метрика с анимацией счёта при появлении (240+, 310%) */
function CountMetric({ value, className = "" }) {
  const [ref, show] = useReveal();
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const m = String(value).match(/^([^\d]*)([\d\s]+(?:[.,]\d+)?)(.*)$/);
    if (!show || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setDisplay(value); return; }
    const prefix = m[1], numRaw = m[2].replace(/\s/g, "").replace(",", "."), suffix = m[3];
    const target = parseFloat(numRaw), hasDec = numRaw.includes(".");
    let start = null, raf;
    const dur = 1100;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      setDisplay(`${prefix}${hasDec ? cur.toFixed(1) : Math.round(cur).toLocaleString("ru-RU")}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [show, value]);
  return <span ref={ref} className={className}>{display}</span>;
}

/* жёлтая плашка-выделение, как последняя строка заголовка в каруселях:
   при появлении на экране плашка "наезжает" слева направо.
   instant: плашка видна сразу, без анимации (первый экран: он должен
   выглядеть готовым ещё до загрузки JavaScript) */
function Mark({ children, instant = false }) {
  const [ref, show] = useReveal();
  return <span ref={ref} className={`hl ${instant || show ? "show" : ""}`}>{children}</span>;
}

/* моно-лейбл секции: "// УСЛУГИ" */
function SecLabel({ children, className = "" }) {
  return (
    <div className={`lbl ${className}`}>
      <span className="lbl-sl" aria-hidden="true">//</span> {children}
    </div>
  );
}

/* заголовок в стиле каруселей: строки pre белым + строка mark на жёлтой плашке */
function Heading({ as: Tag = "h2", pre, mark, className = "", instant = false }) {
  const lines = Array.isArray(pre) ? pre : [pre];
  return (
    <Tag className={`hd ${className}`}>
      {lines.filter(Boolean).map((l, i) => <span className="hd-line" key={i}>{l}</span>)}
      {mark && <span className="hd-line"><Mark instant={instant}>{mark}</Mark></span>}
    </Tag>
  );
}

/* мини-игра: попади в цель N раз и получи бонус (тематика таргетинга).
   strings: тексты интерфейса на текущем языке (см. src/i18n.jsx),
   promoWord: кодовое слово из config.js (одно на все языки). */
function TargetGame({ strings, promoWord, need = 5 }) {
  const [playing, setPlaying] = useState(false);
  const [hits, setHits] = useState(0);
  const [pos, setPos] = useState({ x: 45, y: 40 });
  const [won, setWon] = useState(false);

  const moveTarget = () => {
    setPos({ x: 8 + Math.random() * 80, y: 14 + Math.random() * 66 });
  };
  const onHit = () => {
    if (navigator.vibrate) navigator.vibrate(18);
    const next = hits + 1;
    setHits(next);
    if (next >= need) { setWon(true); return; }
    moveTarget();
  };
  const start = () => { setPlaying(true); setHits(0); setWon(false); moveTarget(); };

  return (
    <section className="section game-section" id="game">
      <div className="wrap">
        <div className={`tile game-card ${playing ? "playing" : ""}`}>
          <div className="game-head">
            <SecLabel>{strings.label}</SecLabel>
            <h3 className="game-title">{strings.title}</h3>
            <p>{strings.subtitle(need)}</p>
            {!playing && <button type="button" className="btn btn-ghost game-play" onClick={start}>{strings.playBtn}</button>}
          </div>
          {!playing ? (
            /* большая мишень справа: украшение, клик мышкой тоже запускает игру
               (с клавиатуры для этого есть кнопка «Играть») */
            <div className="game-deco" aria-hidden="true" onClick={start}>
              <svg viewBox="0 0 220 220" fill="none">
                <path d="M110 0v58M110 162v58M0 110h58M162 110h58" stroke="#2A323C" strokeWidth="2" />
                <circle className="game-deco-spin" cx="110" cy="110" r="100" stroke="currentColor" strokeWidth="3" strokeDasharray="3 12" strokeLinecap="round" opacity=".55" />
                <circle cx="110" cy="110" r="76" stroke="currentColor" strokeWidth="4" />
                <circle cx="110" cy="110" r="50" stroke="currentColor" strokeWidth="4" />
                <circle className="game-deco-core" cx="110" cy="110" r="22" fill="currentColor" />
              </svg>
            </div>
          ) : (
            <div className="game-area">
              <div className="game-hud">{strings.hudLabel} <b>{hits}</b> / {need}</div>
              {!won ? (
                <button
                  type="button"
                  className="game-target"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  onClick={onHit}
                  aria-label={strings.targetAria}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </button>
              ) : (
                <div className="game-win" role="status">
                  <h4>{strings.winTitle}</h4>
                  <p>{strings.winLine1}</p>
                  <span className="code">{promoWord}</span>
                  <p className="small">{strings.winLine2}</p>
                  <button className="btn btn-ghost btn-sm" onClick={start}>{strings.playAgain}</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* просмотр скрина из кабинета крупно: нативный <dialog> (Esc, фокус,
   клик по фону закрывают; страница под ним не прокручивается) */
function ShotViewer({ item, onClose, closeLabel, sourceLabel }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) {
      if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
      document.documentElement.style.overflow = "hidden";
    }
    if (!item && d.open) d.close();
    if (!item) document.documentElement.style.overflow = "";
  }, [item]);
  useEffect(() => () => { document.documentElement.style.overflow = ""; }, []);

  return (
    <dialog
      ref={ref}
      className="shot-dialog"
      aria-label={sourceLabel}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {item && (
        <div className="shot-dialog-inner">
          <div className="shot-dialog-head">
            <SecLabel className="lbl-sm">{sourceLabel}</SecLabel>
            <button type="button" className="icon-btn" onClick={onClose} aria-label={closeLabel} autoFocus>
              <IconCross />
            </button>
          </div>
          <div className="shot-dialog-imgs">
            {item.shots.map((s) => <img key={s.src} src={s.src} width={s.w} height={s.h} alt={s.alt} />)}
          </div>
          <p className="shot-dialog-cap"><b>{item.big} {item.unit}</b> {item.sub}</p>
        </div>
      )}
    </dialog>
  );
}

export { ScrambleText, CountMetric, Mark, SecLabel, Heading, TargetGame, ShotViewer };
