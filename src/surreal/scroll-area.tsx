"use client";

import { useEffect, useRef, useState } from "react";

// layout classes that belong on the outer box (position on the page), the rest go on the scroller
const OUTER = /^(sm:|md:|lg:)?(mt-|mb-|max-w-)/;

/**
 * A scrolling card list with no visible scrollbar. When there is more below,
 * the bottom edge fades out and a vertical "scroll" label with a thin arrow shows in a
 * narrow column to the right of the cards; both go away at the end.
 */
export function ScrollArea({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  const tokens = className.split(/\s+/);
  const outer = tokens.filter((t) => OUTER.test(t)).join(" ");
  const inner = tokens.filter((t) => !OUTER.test(t)).join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setMore(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    const t = window.setTimeout(update, 1600); // cards pop in after mount
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const fade = more ? "linear-gradient(to bottom, #000 calc(100% - 120px), transparent calc(100% - 40px))" : undefined;

  return (
    <div className={`relative pr-8 ${outer}`}>
      <div ref={ref} className={`w-full ${inner}`} style={{ maskImage: fade, WebkitMaskImage: fade }}>
        {children}
      </div>
      <button
        type="button"
        tabIndex={more ? 0 : -1}
        aria-hidden={!more}
        aria-label="Scroll for more"
        onClick={() => ref.current?.scrollBy({ top: ref.current.clientHeight * 0.8, behavior: "smooth" })}
        className={`absolute bottom-24 right-1 flex flex-col items-center gap-2 text-ink transition-opacity duration-200 hover:text-dot ${more ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <span className="font-mono text-[10px] tracking-[0.32em] [writing-mode:vertical-rl]">scroll</span>
        <svg width="10" height="46" viewBox="0 0 10 46" fill="none" aria-hidden className="text-dot">
          <path d="M5 0v44M1 39l4 5 4-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
