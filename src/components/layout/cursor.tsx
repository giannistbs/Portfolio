"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppTheme } from "@/lib/theme";

const INNER = 8;
const OUTER = 35;
const CLICKABLE = "a, button, [role='button'], [role='tab'], input, label, select, textarea, summary";

/**
 * A dot that follows the pointer exactly, plus a ring that trails behind it
 * and grows over anything clickable. Only on devices with a mouse, and not
 * when the visitor has asked for reduced motion.
 */
export function AnimatedCursor() {
  const { hex } = useAppTheme();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.(CLICKABLE));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: OUTER,
          height: OUTER,
          marginLeft: -OUTER / 2,
          marginTop: -OUTER / 2,
          border: `3px solid ${hex}`,
        }}
        animate={{ scale: hovering ? 2 : pressed ? 0.8 : 1, opacity: visible ? (hovering ? 0.5 : 0.35) : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full"
        style={{
          x,
          y,
          width: INNER,
          height: INNER,
          marginLeft: -INNER / 2,
          marginTop: -INNER / 2,
          backgroundColor: hex,
        }}
        animate={{ scale: pressed ? 0.6 : 1, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}
