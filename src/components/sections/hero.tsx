"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Typewriter } from "@/components/ui/typewriter";
import { HERO, SITE } from "@/data/site";

export function Hero() {
  const [waves, setWaves] = useState(0);

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <MagicCard>
        <div className="flex flex-col gap-4 p-6">
          <motion.div className="flex items-center gap-2" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <h1 className="text-2xl font-bold leading-none tracking-tight">{HERO.title}</h1>
            <motion.button
              type="button"
              aria-label="wave"
              onClick={() => setWaves((w) => w + 1)}
              animate={{ rotate: waves ? [0, 20, -10, 20, 0] : 0 }}
              key={waves}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.15 }}
              className="text-xl"
            >
              👋
            </motion.button>
          </motion.div>

          <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
            a <Typewriter words={HERO.roles} className="font-bold text-secondary-foreground" /> engineer who likes breaking things
            before someone else does
          </motion.p>

          <motion.p className="text-sm leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
            {HERO.subtext}
          </motion.p>

          <div>
            <a
              href={`mailto:${SITE.socials.mail}`}
              className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground shadow transition-opacity hover:opacity-90"
            >
              {HERO.cta}
            </a>
          </div>
        </div>
      </MagicCard>
    </motion.section>
  );
}
