/* ============================================================
   ИНТЕРАКТИВНЫЕ ХУКИ
   Вся императивная логика (скролл, курсор, анимации) —
   вынесена из разметки в именованные хуки.
   ============================================================ */
import { useState, useEffect, useRef } from "react";

const pointerFine = () => window.matchMedia("(pointer: fine)").matches;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Прогресс чтения страницы (0–100) + флаг показа мобильного CTA. */
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ctaThreshold]);
  return { progress, ctaVisible };
}

/** Прелоадер: true после задержки (шторка уезжает). */
export function usePreloader(delay = 1050) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return loaded;
}

/** Живые часы + статус «на связи» по рабочим часам. */
export function useClockStatus(workHours) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const online = now.getHours() >= workHours.from && now.getHours() < workHours.to;
  const timeStr = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  return { online, timeStr };
}

/** Циклическая смена индекса для KPI-тикера. */
export function useTicker(length, intervalMs = 3400) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs]);
  return index;
}

/** Спотлайт: CSS-переменные --mx/--my следуют за курсором. */
export function useSpotlight() {
  const rootRef = useRef(null);
  useEffect(() => {
    if (!pointerFine()) return;
    const onMove = (e) => {
      if (!rootRef.current) return;
      rootRef.current.style.setProperty("--mx", `${e.clientX}px`);
      rootRef.current.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return rootRef;
}

/** Параллакс хиро: --hx/--hy (-0.5..0.5) для слоёв с разной скоростью. */
export function useHeroParallax() {
  const heroRef = useRef(null);
  const onMove = (e) => {
    const el = heroRef.current;
    if (!el || !pointerFine()) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--hy", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onLeave = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--hx", 0);
    el.style.setProperty("--hy", 0);
  };
  return { heroRef, onMove, onLeave };
}

/** Бегущая строка, скорость которой зависит от скорости скролла. */
export function useVelocityMarquee() {
  const marqueeRef = useRef(null);
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el || reducedMotion()) return;
    let pos = 0, vel = 1, lastY = window.scrollY, raf;
    const onScroll = () => {
      const y = window.scrollY;
      vel += (y - lastY) * 0.06; // скролл вниз разгоняет, вверх — толкает назад
      lastY = y;
    };
    const tick = () => {
      vel += (1 - vel) * 0.05; // возврат к базовой скорости
      pos -= vel;
      const half = el.scrollWidth / 2;
      if (pos <= -half) pos += half;
      if (pos > 0) pos -= half;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return marqueeRef;
}

/** Coverflow: боковые слайды ленты разворачиваются в 3D к центру. */
export function useCoverflow() {
  const trackRef = useRef(null);
  useEffect(() => {
    const el = trackRef.current;
    if (!el || reducedMotion()) return;
    let raf;
    const update = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      Array.from(el.children).forEach((slide) => {
        const mid = slide.offsetLeft + slide.offsetWidth / 2;
        const clamped = Math.max(-1, Math.min(1, ((mid - center) / el.clientWidth) * 1.6));
        slide.style.transform = `rotateY(${clamped * -14}deg) scale(${1 - Math.abs(clamped) * 0.06}) translateZ(${-Math.abs(clamped) * 40}px)`;
        slide.style.opacity = `${1 - Math.abs(clamped) * 0.25}`;
      });
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { el.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * Math.min(580, window.innerWidth * 0.84), behavior: "smooth" });
  };
  return { trackRef, scrollBy };
}

/** 3D-наклон карточки за курсором. Разворачивается как {...tiltHandlers}. */
export const tiltHandlers = {
  onMouseMove: (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${py * -5}deg) rotateY(${px * 6}deg) scale(1.01)`;
  },
  onMouseLeave: (e) => { e.currentTarget.style.transform = ""; },
};

/** «Магнитная» кнопка: тянется к курсору. Разворачивается как {...magnetHandlers}. */
export const magnetHandlers = {
  onMouseMove: (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.18}px, ${(e.clientY - (r.top + r.height / 2)) * 0.28}px)`;
  },
  onMouseLeave: (e) => { e.currentTarget.style.transform = ""; },
};

/** Кинетический wordmark футера: следует за курсором по X. */
export function useKineticWordmark() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || !pointerFine()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / r.width;
    el.style.transform = `translateY(12%) translateX(${px * 26}px) skewX(${px * -2.5}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translateY(12%)"; };
  return { ref, onMove, onLeave };
}

/** Плавный скролл к секции с поправкой на высоту навбара. */
export const scrollToId = (id) => (e) => {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
};
export const scrollToTop = (e) => {
  if (e) e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
