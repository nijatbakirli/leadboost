import React, { useState, useEffect } from "react";
import { useReveal } from "./hooks.jsx";

/* scramble: заголовок "расшифровывается" из случайных символов */
function ScrambleText({ text, className = "", speed = 28 }) {
  const [ref, show] = useReveal();
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!show) return;
    const chars = "▓▒░#%&@$?!АБВГДЕКЛМНОПРСТ0123456789";
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame++;
      const fixed = Math.floor((frame / 2.2));
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
  return <span ref={ref} className={className}>{display}</span>;
}

/* каскадное появление заголовка по словам */
function WordReveal({ text, className = "" }) {
  const [ref, show] = useReveal();
  const words = String(text).split(" ");
  return (
    <span ref={ref} className={`word-reveal ${show ? "show" : ""} ${className}`}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" style={{ transitionDelay: `${i * 45}ms` }}>{w}</span>{" "}
        </React.Fragment>
      ))}
    </span>
  );
}

/* метрика с анимацией счёта при появлении */
function CountMetric({ value, inline }) {
  const [ref, show] = useReveal();
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const m = String(value).match(/^([^\d]*)([\d\s]+(?:[.,]\d+)?)(.*)$/);
    if (!show || !m) { setDisplay(value); return; }
    const prefix = m[1], numRaw = m[2].replace(/\s/g, "").replace(",", "."), suffix = m[3];
    const target = parseFloat(numRaw), hasDec = numRaw.includes(".");
    let start = null;
    const dur = 1100;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      setDisplay(`${prefix}${hasDec ? cur.toFixed(1) : Math.round(cur).toLocaleString("ru-RU")}${suffix}`);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [show, value]);
  return <div ref={ref} className={inline ? "" : "big"}>{display}</div>;
}

/* фраза с жёлтым маркером, который "рисуется" при появлении */
function Mark({ children }) {
  const [ref, show] = useReveal();
  return <span ref={ref} className={`marklight ${show ? "show" : ""}`}>{children}</span>;
}

/* мини-игра: попади в цель 5 раз — получи бонус (тематика таргетинга) */
function TargetGame() {
  const [playing, setPlaying] = useState(false);
  const [hits, setHits] = useState(0);
  const [pos, setPos] = useState({ x: 45, y: 40 });
  const [won, setWon] = useState(false);
  const need = 5;

  const moveTarget = () => {
    setPos({ x: 8 + Math.random() * 80, y: 12 + Math.random() * 68 });
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
    <div className="game-strip">
      <div className="wrap">
        <h3 className="h-mid">Проверьте мою меткость на себе</h3>
        <p>Я попадаю в целевую аудиторию. А вы — попадёте в цель {need} раз?</p>
        {!playing ? (
          <button className="game-btn" onClick={start}>Играть · 20 секунд</button>
        ) : (
          <div className="game-area">
            <div className="game-hud">Попаданий: <b>{hits}</b> / {need}</div>
            {!won ? (
              <div
                className="game-target"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={onHit}
                role="button"
                aria-label="Цель"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </div>
            ) : (
              <div className="game-win">
                <h4>В яблочко! 🎯</h4>
                <p style={{ margin: 0 }}>Меткость — общая черта. Назовите кодовое слово при заявке:</p>
                <span className="code">МЕТКИЙ</span>
                <p style={{ margin: 0, fontSize: 12 }}>— и получите бесплатный мини-аудит текущей рекламы.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { ScrambleText, WordReveal, CountMetric, Mark, TargetGame };
