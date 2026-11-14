import React, { useEffect, useRef } from "react";
import { useReveal } from "./hooks.jsx";
import { IconCross } from "./icons.jsx";
import { asset } from "./assets.js";

/* жёлтая плашка-выделение, как последняя строка заголовка в каруселях,
   в виде мазка маркера: при появлении на экране мазок тянется слева
   направо. Вариант мазка (a/b/c, см. .hl-a в styles.css) выбирается по
   тексту: одинаково на сервере и в браузере, поэтому hydration не
   расходится, а соседние заголовки обычно получают разные мазки.
   instant: плашка видна сразу, без анимации (первый экран: он должен
   выглядеть готовым ещё до загрузки JavaScript) */
function hlVariant(text) {
  // FNV-1a и перемешивание битов: варианты расходятся ровнее, чем от простой суммы
  let h = 0x811c9dc5;
  for (const ch of String(text)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b) >>> 0; h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35) >>> 0; h ^= h >>> 16;
  return "abc"[(h >>> 0) % 3];
}
function Mark({ children, instant = false }) {
  const [ref, show] = useReveal();
  return <span ref={ref} className={`hl hl-${hlVariant(children)} ${instant || show ? "show" : ""}`}>{children}</span>;
}

/* моно-лейбл капсом внутри плитки ("ИЗ МОЕГО КАБИНЕТА META", название
   тарифа). Над заголовками секций его больше нет (ноябрь 2026). Без "//"
   перед текстом: владелец убрал их, они придавали сайту вид сделанного ИИ */
function SecLabel({ children, className = "" }) {
  return <div className={`lbl ${className}`}>{children}</div>;
}

/* заголовок в стиле каруселей: строки pre цветом текста + строка mark на
   жёлтом мазке. mark необязателен: мазок только на четырёх экранах */
function Heading({ as: Tag = "h2", pre, mark, className = "", instant = false }) {
  const lines = (Array.isArray(pre) ? pre : [pre]).filter(Boolean);
  /* пробел между строками: на экране строки и так с новой строки (display:
     block), а поисковики и экранный диктор без него читали бы слова слитно
     («Instagramи Facebook») */
  return (
    <Tag className={`hd ${className}`}>
      {lines.map((l, i) => <React.Fragment key={i}>{i > 0 && " "}<span className="hd-line">{l}</span></React.Fragment>)}
      {mark && <>{lines.length > 0 && " "}<span className="hd-line"><Mark instant={instant}>{mark}</Mark></span></>}
    </Tag>
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

/* Значки соцсетей (официальные, прислал владелец), одноцветные. Файл
   img/icons/social/*.webp (96×96, белый на прозрачном) задаёт только
   форму, цвет берётся из текста кнопки через CSS-маску (.soc-ic в
   styles.css): тёмный на жёлтой кнопке, светлый на тёмной, жёлтый при
   наведении. Рядом всегда есть подпись, поэтому значок скрыт от
   экранного диктора. */
function SocialIcon({ name, className = "btn-ic" }) {
  return <span className={`soc-ic ${className}`} style={{ "--ic": `url("${asset(`img/icons/social/${name}.webp`)}")` }} aria-hidden="true" />;
}

export { Mark, SecLabel, Heading, ShotViewer, SocialIcon };
