import React, { useState, useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.unobserve(el); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, show];
}
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, show] = useReveal();
  return <div ref={ref} className={`reveal ${show ? "show" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
function useTween(value, duration = 500, decimals = 1) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const from = prevRef.current, to = value;
    let start = null;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (to - from) * eased;
      const f = Math.pow(10, decimals);
      setDisplay(Math.round(val * f) / f);
      if (p < 1) requestAnimationFrame(step);
      else prevRef.current = to;
    };
    requestAnimationFrame(step);
  }, [value, duration, decimals]);
  return display;
}


export { useReveal, Reveal, useTween };
