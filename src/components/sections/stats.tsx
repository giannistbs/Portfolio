"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { STATS, type Stat } from "@/data/site";

export function Stats() {
  return (
    <motion.section className="w-full pb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <motion.h2 className="mb-2 mt-4 text-xl font-bold" initial={{ x: -10, y: 10 }} animate={{ x: 0, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
        by the numbers
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </motion.div>
    </motion.section>
  );
}

function StatCard({ value, prefix, suffix, label, cta, href, external }: Stat) {
  return (
    <MagicCard className="h-full">
      <div className="flex h-full flex-col p-6">
        <div className="flex-grow">
          <p className="text-3xl font-bold">
            {prefix}
            <NumberTicker value={value} />
            {suffix}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{label}</p>
        </div>
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="mt-4 inline-flex items-center text-sm font-bold text-primary underline-offset-4 hover:underline"
        >
          {">"} {cta}
          {external && <ExternalLink className="ml-2 size-3" />}
        </Link>
      </div>
    </MagicCard>
  );
}
