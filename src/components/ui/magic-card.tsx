"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAppTheme } from "@/lib/theme";

type Props = React.HTMLAttributes<HTMLDivElement> & { gradientSize?: number };

/** Card with a soft spotlight that follows the cursor. */
export function MagicCard({ children, className, gradientSize = 200, ...rest }: Props) {
  const { hex } = useAppTheme();
  const x = useMotionValue(-gradientSize);
  const y = useMotionValue(-gradientSize);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    },
    [x, y],
  );
  const onLeave = useCallback(() => {
    x.set(-gradientSize);
    y.set(-gradientSize);
  }, [x, y, gradientSize]);

  const background = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${hex}26, transparent 100%)`;

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative flex overflow-hidden rounded-lg border border-primary/30 bg-card/70",
        className,
      )}
      {...rest}
    >
      <div className="relative z-10 w-full">{children}</div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
    </div>
  );
}
