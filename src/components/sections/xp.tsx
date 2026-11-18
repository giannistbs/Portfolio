"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BadgeList } from "@/components/ui/badge-list";
import { MagicCard } from "@/components/ui/magic-card";
import { TabPanel, Tabs } from "@/components/ui/tabs";
import { XP, XP_TABS, type XpItem, type XpTab } from "@/data/site";
import { cn } from "@/lib/utils";

export function Xp() {
  const [tab, setTab] = useState<XpTab>("work");

  return (
    <motion.div className="flex w-full flex-col gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Tabs tabs={XP_TABS} value={tab} onChange={setTab}>
        {XP_TABS.map((t) => (
          <TabPanel key={t} value={t} className="mt-2 focus-visible:outline-none">
            {XP[t].badges && <BadgeList items={XP[t].badges!} className="mb-3" />}
            <Timeline items={XP[t].items} />
          </TabPanel>
        ))}
      </Tabs>
    </motion.div>
  );
}

function Timeline({ items }: { items: XpItem[] }) {
  const [seen, setSeen] = useState(0);
  const height = (Math.min(seen, items.length) / items.length) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <MagicCard>
        <div className="relative p-6 pt-8">
          <motion.div
            className="absolute left-[27px] top-6 w-px bg-primary"
            animate={{ height: `calc(${height}% - 3rem)` }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
          />
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              className={cn("flex", i < items.length - 1 && "mb-8")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              onViewportEnter={() => setSeen((s) => s + 1)}
            >
              <div className="mr-3 mt-1">
                <div className="flex size-2 items-center justify-center rounded-full bg-primary">
                  <div className="size-1 rounded-full bg-background" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-primary">{it.date}</p>
                <h3 className="font-bold">{it.title}</h3>
                <p className="text-sm text-muted-foreground">@{it.org}</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{it.description}</p>
                {it.skills && <BadgeList items={it.skills} outline />}
              </div>
            </motion.div>
          ))}
        </div>
      </MagicCard>
    </motion.div>
  );
}
