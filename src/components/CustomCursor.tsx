import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR =
  'a[href],button,input,textarea,select,[role="button"],label[for],[data-cursor-hover]';

function isTextInput(el: Element | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === 'TEXTAREA') return true;
  if (tag === 'INPUT') {
    const t = (el as HTMLInputElement).type;
    return (
      t === 'text' ||
      t === 'email' ||
      t === 'search' ||
      t === 'password' ||
      t === 'url' ||
      t === 'tel' ||
      t === ''
    );
  }
  return false;
}

function isInteractive(el: Element | null): boolean {
  if (!el) return false;
  return Boolean(el.closest(INTERACTIVE_SELECTOR));
}

/**
 * Orbital cursor: outer ring lags and spins; core follows faster; streak follows velocity.
 * Fine pointer only; off when prefers-reduced-motion.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [textMode, setTextMode] = useState(false);

  const target = useRef({ x: -100, y: -100 });
  const orbit = useRef({ x: -100, y: -100 });
  const core = useRef({ x: -100, y: -100 });
  const prev = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);
  const textRef = useRef(false);

  const orbitWrapRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    if (reduce.matches || !fine.matches) return;

    setActive(true);
    document.body.classList.add('custom-cursor-active');

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const tx = target.current.x;
      const ty = target.current.y;

      orbit.current.x = lerp(orbit.current.x, tx, 0.13);
      orbit.current.y = lerp(orbit.current.y, ty, 0.13);
      core.current.x = lerp(core.current.x, tx, 0.4);
      core.current.y = lerp(core.current.y, ty, 0.4);

      const vx = tx - prev.current.x;
      const vy = ty - prev.current.y;
      vel.current.x = lerp(vel.current.x, vx, 0.22);
      vel.current.y = lerp(vel.current.y, vy, 0.22);
      prev.current.x = tx;
      prev.current.y = ty;

      const speed = Math.hypot(vel.current.x, vel.current.y);
      const angleDeg = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      const ox = orbit.current.x;
      const oy = orbit.current.y;
      const cx = core.current.x;
      const cy = core.current.y;

      const tr = textRef.current;
      const hr = hoverRef.current;
      let coreScale = 1;
      let coreOpacity = 1;
      if (tr) {
        coreScale = 0.45;
        coreOpacity = 0.35;
      } else if (hr) {
        coreScale = 1.38;
      }

      if (orbitWrapRef.current) {
        orbitWrapRef.current.style.transform = `translate3d(${ox}px, ${oy}px, 0) translate(-50%, -50%) rotate(${angleDeg * 0.26}deg)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${coreScale})`;
        coreRef.current.style.opacity = String(coreOpacity);
      }
      if (streakRef.current) {
        if (tr) {
          streakRef.current.style.opacity = '0';
        } else {
          const show = Math.min(1, speed / 24);
          streakRef.current.style.opacity = String(show * 0.85);
          streakRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) rotate(${angleDeg}deg) scaleX(${0.35 + show * 1.05})`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);

      const under = document.elementFromPoint(e.clientX, e.clientY);
      const h = isInteractive(under);
      const t = isTextInput(under);
      hoverRef.current = h;
      textRef.current = t;
      setHover(h);
      setTextMode(t);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className={`custom-cursor${visible ? ' custom-cursor--visible' : ''}${hover ? ' custom-cursor--hover' : ''}${textMode ? ' custom-cursor--text' : ''}`}
      aria-hidden
    >
      <div ref={orbitWrapRef} className="custom-cursor__wrap">
        <div className="custom-cursor__orbit" />
        <div className="custom-cursor__orbit-inner" />
      </div>
      <div ref={coreRef} className="custom-cursor__core" />
      <div ref={streakRef} className="custom-cursor__streak" />
    </div>
  );
}
