"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/data/site";
import { useAppTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useCleanPath } from "./nav";

export function Header() {
  const path = useCleanPath();
  const { mode, setMode, mounted } = useAppTheme();

  return (
    <motion.header
      className="sticky top-0 z-10 flex h-[53px] w-full items-center bg-background/70 px-4 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
        <Link
          href="/tech/"
          className={cn(
            "text-lg font-bold transition-colors duration-300 hover:text-primary",
            path === "/" ? "text-primary" : "text-foreground",
          )}
        >
          {SITE.fullName}
        </Link>
      </motion.div>

      <motion.div
        className="mx-4 h-px flex-grow bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <button
          type="button"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className="flex size-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-primary"
          aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {mounted && mode === "light" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </motion.div>
    </motion.header>
  );
}
