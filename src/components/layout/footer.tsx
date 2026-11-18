"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/data/site";
import { COLOR_HEX, THEME_COLORS, type ThemeColor, useAppTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { NAV, clean, useCleanPath } from "./nav";

export function Footer() {
  const path = useCleanPath();

  return (
    <motion.footer
      className="w-full bg-background/70 py-4 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ioannis.jpg" alt="" className="size-6 rounded-full border border-primary/60 object-cover md:size-8" />
          </motion.div>
          <div className="flex flex-col gap-1.5">
            <nav className="flex flex-wrap gap-1 text-xs">
              {NAV.map(({ href, label }, i) => {
                const active = path === clean(href);
                return (
                  <span key={href}>
                    {active ? (
                      <span className="text-muted-foreground">{label}</span>
                    ) : (
                      <Link href={href} className="transition-colors hover:text-primary">
                        {label}
                      </Link>
                    )}
                    {i < NAV.length - 1 && <span className="ml-1 text-muted-foreground">|</span>}
                  </span>
                );
              })}
            </nav>
            <ColorPicker />
          </div>
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${SITE.socials.mail}`}
          className="rounded-md border border-primary px-3 py-1.5 text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          say hi
        </motion.a>
      </div>
    </motion.footer>
  );
}

function ColorPicker() {
  const { color, mode, setColor } = useAppTheme();
  const mono: ThemeColor = mode === "dark" ? "white" : "black";
  const colors = [...THEME_COLORS.filter((c) => c !== "white" && c !== "black"), mono];

  return (
    <div className="flex flex-row gap-2" role="group" aria-label="Accent colour">
      {colors.map((c) => (
        <motion.button
          key={c}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setColor(c)}
          aria-label={`${c} accent`}
          aria-pressed={color === c}
          className={cn(
            "size-2 rounded-md ring-offset-background",
            color === c ? "ring-2 ring-primary ring-offset-1" : "ring-1 ring-border",
          )}
          style={{ backgroundColor: COLOR_HEX[c] }}
        />
      ))}
    </div>
  );
}
