"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAPTERS, type Chapter } from "./chapters";

const BOOT_MS = 760; // opening: a dot grows into the first page
const INDEX_MS = 560; // opening / closing the index
const PAGE_MS = 440; // page to page: quicker
const INDEX_COLOR = "#c9a033";
const WHEEL_COOLDOWN_MS = 700;
// a scroll movement that ran a card list to its end is "spent" until the wheel goes quiet for this long
const GESTURE_GAP_MS = 320;

/** Shapes used for page-to-page transitions; one is picked at random each time (never the same twice in a row). */
const VARIANTS = ["circle", "wipe", "diamond", "slant"] as const;
type Variant = (typeof VARIANTS)[number] | "wipe-back";

type Reveal = { color: string; x: number; y: number; r: number; out: boolean; key: number; variant: Variant; ms: number };

function radiusFrom(x: number, y: number) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.ceil(Math.max(Math.hypot(x, y), Math.hypot(w - x, y), Math.hypot(x, h - y), Math.hypot(w - x, h - y))) + 4;
}

/** Nearest element (from the event target up) that really scrolls vertically, i.e. overflow-y auto/scroll with overflowing content. */
function scrollableParent(target: EventTarget | null): HTMLElement | null {
  let el = target as HTMLElement | null;
  while (el && el !== document.body) {
    const oy = getComputedStyle(el).overflowY;
    if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 2) return el;
    el = el.parentElement;
  }
  return null;
}

/** True when `el` can still scroll further in the direction of `dy` (positive = down). */
function canScrollFurther(el: HTMLElement | null, dy: number) {
  if (!el) return false;
  // a few px of slack: phones report fractional / rubber-band scroll positions at the ends
  if (dy > 0) return el.scrollTop + el.clientHeight < el.scrollHeight - 6;
  return el.scrollTop > 6;
}

export function Surreal() {
  const [current, setCurrent] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const [booted, setBooted] = useState(false);
  const busy = useRef(false);
  const lockedUntil = useRef(0);
  const wheelAcc = useRef(0);
  const listScrolledAt = useRef(0);
  const lastVariant = useRef<Variant>("circle");

  /** Grow a shape of `color` (from x, y where relevant); when it fills the screen, swap the view underneath and fade it out. */
  const runReveal = useCallback((color: string, x: number, y: number, variant: Variant, ms: number, swap: () => void) => {
    if (busy.current) return;
    busy.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const key = Date.now();
    setReveal({ color, x, y, r: radiusFrom(x, y), out: false, key, variant, ms });
    window.setTimeout(
      () => {
        swap();
        window.setTimeout(() => setReveal((r) => (r && r.key === key ? { ...r, out: true } : r)), 50);
        window.setTimeout(() => {
          setReveal((r) => (r && r.key === key ? null : r));
          busy.current = false;
          lockedUntil.current = Date.now() + WHEEL_COOLDOWN_MS;
          wheelAcc.current = 0;
        }, 280);
      },
      reduced ? 10 : ms,
    );
  }, []);

  const pickVariant = useCallback((dir: number): Variant => {
    const options = VARIANTS.filter((v) => v !== lastVariant.current);
    let v: Variant = options[Math.floor(Math.random() * options.length)];
    if (v === "wipe" && dir < 0) v = "wipe-back";
    lastVariant.current = v === "wipe-back" ? "wipe" : v;
    return v;
  }, []);

  const goTo = useCallback(
    (to: number, x?: number, y?: number) => {
      if (to < 0 || to >= CHAPTERS.length) return;
      if (to === current && !indexOpen) return;
      const px = x ?? window.innerWidth / 2;
      const py = y ?? window.innerHeight - 60;
      // from the index, always grow a circle out of the card you clicked; otherwise mix it up
      const variant: Variant = indexOpen ? "circle" : pickVariant(to - current);
      runReveal(CHAPTERS[to].wall, px, py, variant, indexOpen ? INDEX_MS : PAGE_MS, () => {
        setIndexOpen(false);
        setCurrent(to);
      });
    },
    [current, indexOpen, runReveal, pickVariant],
  );

  const toggleIndex = useCallback(
    (x: number, y: number) => {
      if (indexOpen) {
        runReveal(CHAPTERS[current].wall, x, y, "circle", INDEX_MS, () => setIndexOpen(false));
      } else {
        runReveal(INDEX_COLOR, x, y, "circle", INDEX_MS, () => setIndexOpen(true));
      }
    },
    [indexOpen, current, runReveal],
  );

  // opening animation: a small dot grows into the hero's blue, then the hero pops in
  useEffect(() => {
    const t = window.setTimeout(() => {
      runReveal(CHAPTERS[0].wall, window.innerWidth / 2, window.innerHeight / 2, "circle", BOOT_MS, () => setBooted(true));
    }, 650);
    return () => window.clearTimeout(t);
  }, [runReveal]);

  // keyboard, wheel / trackpad and swipe navigation between pages
  useEffect(() => {
    if (!booted) return;
    const ready = () => !indexOpen && !busy.current && Date.now() > lockedUntil.current;
    const step = (dir: number) => {
      const to = current + dir;
      if (to < 0 || to >= CHAPTERS.length) return;
      goTo(to);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && indexOpen) return toggleIndex(window.innerWidth - 80, 40);
      if (!ready()) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) step(1);
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) step(-1);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const now = Date.now();
      // a card list that can still scroll gets the wheel first
      if (canScrollFurther(scrollableParent(e.target), e.deltaY)) {
        listScrolledAt.current = now;
        wheelAcc.current = 0;
        return;
      }
      // the list just reached its end in this same scroll movement (incl. trackpad momentum): stop here.
      // Only a new, separate scroll at the end moves to the next / previous page.
      if (now - listScrolledAt.current < GESTURE_GAP_MS) {
        listScrolledAt.current = now;
        wheelAcc.current = 0;
        return;
      }
      if (!ready()) return;
      wheelAcc.current += e.deltaY;
      if (Math.abs(wheelAcc.current) > 60) {
        const dir = wheelAcc.current > 0 ? 1 : -1;
        wheelAcc.current = 0;
        step(dir);
      }
    };

    // swipes: a swipe that starts with the card list already at its end changes page;
    // one that starts mid-list only scrolls the list (iOS bounces at the ends, so don't look at movement)
    let touch: { y: number; t: number; el: HTMLElement | null; atTop: boolean; atBottom: boolean } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      const el = scrollableParent(e.target);
      touch = { y: e.touches[0].clientY, t: Date.now(), el, atTop: !canScrollFurther(el, -1), atBottom: !canScrollFurther(el, 1) };
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touch || !ready()) return;
      const dy = touch.y - e.changedTouches[0].clientY; // positive = swipe up = next page
      const quick = Date.now() - touch.t < 800;
      const startedAtEdge = dy > 0 ? touch.atBottom : touch.atTop;
      if (quick && Math.abs(dy) > 50 && startedAtEdge) step(dy > 0 ? 1 : -1);
      touch = null;
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [booted, current, indexOpen, goTo, toggleIndex]);

  const ch = CHAPTERS[current];
  const light = !indexOpen && ch.ink === "light";

  return (
    <div className="fixed inset-0 overflow-hidden">
      {!booted ? (
        <Boot />
      ) : indexOpen ? (
        <IndexView key="index" current={current} onPick={goTo} />
      ) : (
        <ChapterView key={ch.id} ch={ch} />
      )}

      {booted && (
        <Header
          light={light}
          label={indexOpen ? "index" : `${current + 1 > 1 ? `${current}. ` : ""}${ch.label}`}
          indexOpen={indexOpen}
          onIndex={toggleIndex}
          onHome={(x, y) => goTo(0, x, y)}
        />
      )}

      {booted && !indexOpen && (
        <>
          <Dots current={current} onPick={goTo} light={light} />
          <NextButton last={current === CHAPTERS.length - 1} onClick={(x, y) => goTo(current === CHAPTERS.length - 1 ? 0 : current + 1, x, y)} />
        </>
      )}

      {reveal && (
        <div
          key={reveal.key}
          aria-hidden
          className={`reveal reveal-${reveal.variant} ${reveal.out ? "reveal-out" : ""}`}
          style={
            {
              "--c": reveal.color,
              "--x": `${reveal.x}px`,
              "--y": `${reveal.y}px`,
              "--r": `${reveal.r}px`,
              "--ms": `${reveal.ms}ms`,
            } as React.CSSProperties
          }
        />
      )}
      <div className="grain" aria-hidden />
    </div>
  );
}

function Boot() {
  return (
    <div className="flex h-full items-center justify-center bg-paper">
      <p className="font-mono text-sm tracking-[0.3em] text-ink">
        loading<span className="blink">_</span>
      </p>
    </div>
  );
}

function ChapterView({ ch }: { ch: Chapter }) {
  return (
    <section
      className="absolute inset-0 [--hz:var(--hz-phone)] sm:[--hz:var(--hz-wide)]"
      style={{ background: ch.floor, "--hz-wide": `${ch.horizon}%`, "--hz-phone": `${ch.horizonPhone ?? ch.horizon}%` } as React.CSSProperties}
      aria-label={ch.label}
    >
      <div className="absolute inset-x-0 top-0" style={{ height: "var(--hz)", background: ch.wall }} />
      {ch.image ? (
        <picture>
          {ch.imageMobile && <source media="(max-width: 639px)" srcSet={ch.imageMobile} />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ch.image}
            alt=""
            className="slide-in absolute inset-0 h-full w-full object-cover object-[72%_center] sm:object-right"
            style={{ "--d": "60ms" } as React.CSSProperties}
          />
        </picture>
      ) : (
        <BigMark ch={ch} />
      )}
      <div className="relative z-10 h-full px-5 pb-6 pt-24 sm:px-10 sm:pt-28">{ch.render()}</div>
    </section>
  );
}

/** For chapters without artwork: a huge italic numeral standing on the floor, plus a small prop. */
function BigMark({ ch }: { ch: Chapter }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <span
        className="pop absolute right-[6vw] font-serif italic leading-none text-paper/80"
        style={{ bottom: "calc(94% - var(--hz))", fontSize: "min(52vh, 40vw)", "--d": "120ms" } as React.CSSProperties}
      >
        {ch.mark}
      </span>
      <span
        className="pop absolute right-[30vw] hidden size-[7vmin] rounded-full bg-dot sm:block"
        style={{ bottom: "calc(102% - var(--hz))", "--d": "420ms" } as React.CSSProperties}
      />
      <div className="absolute inset-x-0" style={{ top: "var(--hz)", height: "6%", background: "linear-gradient(rgba(0,0,0,.10), transparent)" }} />
    </div>
  );
}

function Header({
  light,
  label,
  indexOpen,
  onIndex,
  onHome,
}: {
  light: boolean;
  label: string;
  indexOpen: boolean;
  onIndex: (x: number, y: number) => void;
  onHome: (x: number, y: number) => void;
}) {
  const fg = light ? "text-paper" : "text-ink";
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-5">
        <button type="button" onClick={(e) => onHome(e.clientX, e.clientY)} className={`text-[15px] font-bold ${fg}`}>
          tampakis<span className="ml-1.5 inline-block size-2 rounded-full bg-dot align-middle" />
        </button>
        <span className={`max-w-[42vw] truncate font-mono text-xs sm:text-sm ${fg} opacity-80`}>
          <span className="text-dot">/</span> {label}
        </span>
      </div>
      <button
        type="button"
        onClick={(e) => onIndex(e.clientX, e.clientY)}
        className="pop pointer-events-auto flex items-center gap-3 rounded-full bg-pill px-5 py-2.5 text-[15px] font-bold text-ink transition-transform hover:scale-[1.04] sm:px-6 sm:py-3 sm:text-lg"
      >
        index
        <span aria-hidden className="font-mono text-base leading-none">
          {indexOpen ? "✕" : "☰"}
        </span>
      </button>
    </header>
  );
}

function Dots({ current, onPick, light }: { current: number; onPick: (i: number, x: number, y: number) => void; light: boolean }) {
  return (
    <nav className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5 sm:right-6" aria-label="Chapters">
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          type="button"
          aria-label={c.label}
          aria-current={i === current ? "step" : undefined}
          onClick={(e) => onPick(i, e.clientX, e.clientY)}
          className={`size-2.5 rounded-full transition-transform hover:scale-150 ${i === current ? "scale-125 bg-dot" : light ? "bg-paper/60" : "bg-ink/40"}`}
        />
      ))}
    </nav>
  );
}

function NextButton({ last, onClick }: { last: boolean; onClick: (x: number, y: number) => void }) {
  return (
    <button
      type="button"
      onClick={(e) => onClick(e.clientX, e.clientY)}
      className="pop fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink/25 px-6 py-2 font-mono text-xs tracking-[0.2em] text-paper backdrop-blur-sm transition-colors hover:bg-ink/45"
      style={{ "--d": "900ms" } as React.CSSProperties}
    >
      <span className="inline-block">{last ? "↑ start" : "scroll ↓"}</span>
    </button>
  );
}

function IndexView({ current, onPick }: { current: number; onPick: (i: number, x: number, y: number) => void }) {
  return (
    <section className="scroll-thin absolute inset-0 overflow-y-auto" style={{ background: INDEX_COLOR }} aria-label="Index">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 pb-16 pt-28 sm:grid-cols-3 sm:gap-6 sm:px-10 sm:pt-36 lg:grid-cols-4">
        {CHAPTERS.map((c, i) => {
          const tilt = [-2.2, 1.6, -0.8, 2, -1.6, 1.1, -1.9][i % 7];
          return (
            <button
              key={c.id}
              type="button"
              onClick={(e) => onPick(i, e.clientX, e.clientY)}
              className="pop hover-lift card-paper group block p-2.5 text-left sm:p-3"
              style={{ "--d": `${120 + i * 70}ms`, "--tilt": `${tilt}deg`, "--tilt-from": `${tilt * 4}deg` } as React.CSSProperties}
            >
              <div className="relative aspect-[4/3.6] overflow-hidden border-2 border-dot/70" style={{ background: c.floor }}>
                <div className="absolute inset-x-0 top-0" style={{ height: `${c.horizon}%`, background: c.wall }} />
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt="" className="absolute inset-0 size-full object-cover object-[78%_center]" />
                ) : (
                  <span className="absolute bottom-[12%] right-[12%] font-serif text-7xl italic leading-none text-paper/85">{c.mark}</span>
                )}
                {i === current && <span className="absolute left-2 top-2 size-3 rounded-full bg-dot" />}
              </div>
              <p className="mt-2 font-serif text-3xl italic leading-none text-dot">{c.mark}</p>
              <p className="mt-1 text-sm font-bold leading-tight sm:text-[15px]">{c.label}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
