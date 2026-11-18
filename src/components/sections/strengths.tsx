"use client";

import { motion } from "framer-motion";
import { Boxes, Server, ShieldCheck } from "lucide-react";
import { STRENGTHS } from "@/data/site";

const ICONS = { shield: ShieldCheck, server: Server, boxes: Boxes };

const container = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, when: "beforeChildren", staggerChildren: 0.1 } },
} as const;
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } } as const;

export function Strengths() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full rounded-lg bg-primary/10 p-6 shadow-lg sm:p-8"
    >
      <motion.h2 variants={item} className="mb-6 text-center text-3xl font-bold text-primary">
        {STRENGTHS.title}
      </motion.h2>
      <div className="flex flex-col gap-6">
        {STRENGTHS.items.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <motion.div key={f.title} variants={item} className="flex flex-col items-center rounded-lg bg-background p-6 text-center">
              <Icon className="mb-4 size-12 text-primary" strokeWidth={1.5} />
              <h3 className="mb-3 text-xl font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
