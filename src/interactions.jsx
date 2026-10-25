/* ============================================================
   ИНТЕРАКТИВНЫЕ ХУКИ
   Вся императивная логика (скролл, курсор, анимации) вынесена
   из разметки в именованные хуки.
   ============================================================ */
import { useState, useEffect, useRef } from "react";

const pointerFine = () => window.matchMedia("(pointer: fine)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Прогресс чтения страницы (0–100) + флаг показа плавающих CTA. */
export function useScrollProgress(ctaThreshold = 650) {
  const [progress, setProgress] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setCtaVisible(h.scrollTop > ctaThreshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ctaThreshold]);
  return { progress, ctaVisible };
}

/** Статус «на связи» по рабочим часам владельца (в его часовом поясе). */
export function useClockStatus(workHours, timeZone) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  let hour = now.getHours();
  try {
    hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone }).format(now));
  } catch { /* старый браузер без часовых поясов: берём местное время */ }
  const online = hour >= workHours.from && hour < workHours.to;
  return { online };
}

/** Спотлайт: CSS-переменные --mx/--my следуют за курсором. */
export function useSpotlight() {
  const rootRef = useRef(null);
  useEffect(() => {
    if (!pointerFine()) return;
    let raf;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!rootRef.current) return;
        rootRef.current.style.setProperty("--mx", `${e.clientX}px`);
        rootRef.current.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return rootRef;
}

/** Бегущая лента: базовая скорость + разгон от скорости скролла.
 *  dir = 1 едет влево, dir = -1 вправо. Внутри трека две одинаковые
 *  половины, поэтому сдвиг на половину ширины даёт бесшовный круг.
 *  Пока лента не видна на экране, анимация стоит. */
export function useVelocityMarquee(dir = 1, base = 0.6) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let pos = dir > 0 ? 0 : -el.scrollWidth / 4;
    let vel = base, lastY = window.scrollY, raf = 0, visible = true;
    const onScroll = () => {
      const y = window.scrollY;
      vel = Math.max(-14, Math.min(14, vel + (y - lastY) * 0.05));
      lastY = y;
    };
    const tick = () => {
      vel += (base - vel) * 0.05;
      pos -= vel * dir;
      const half = el.scrollWidth / 2;
      if (pos <= -half) pos += half;
      if (pos > 0) pos -= half;
      el.style.transform = `translate3d(${pos}px,0,0)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [dir, base]);
  return ref;
}

/** «Магнитная» кнопка: тянется к курсору. Разворачивается как {...magnetHandlers}. */
export const magnetHandlers = {
  onMouseMove: (e) => {
    if (!pointerFine() || reducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.12}px, ${(e.clientY - (r.top + r.height / 2)) * 0.22}px)`;
  },
  onMouseLeave: (e) => { e.currentTarget.style.transform = ""; },
};

/** Плавный скролл к секции с поправкой на высоту навбара. */
export const scrollToId = (id) => (e) => {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: reducedMotion() ? "auto" : "smooth" });
};
export const scrollToTop = (e) => {
  if (e) e.preventDefault();
  window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
};
