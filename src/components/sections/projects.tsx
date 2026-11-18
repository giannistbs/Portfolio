"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { TabPanel, Tabs } from "@/components/ui/tabs";
import { PROJECT_TABS, PROJECTS, type Project, type ProjectTab } from "@/data/site";

export function Projects() {
  const [tab, setTab] = useState<ProjectTab>("engineering");

  return (
    <motion.div className="flex w-full flex-col gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Tabs tabs={PROJECT_TABS} value={tab} onChange={setTab}>
        {PROJECT_TABS.map((t) => (
          <TabPanel key={t} value={t} className="mt-2 focus-visible:outline-none">
            <ProjectGrid items={PROJECTS[t]} />
          </TabPanel>
        ))}
      </Tabs>
    </motion.div>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2">
      {items.map((p, i) => {
        const Wrapper = p.href ? "a" : "div";
        return (
          <Wrapper
            key={p.title}
            {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group/item relative block h-full w-full p-1"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence>
              {hovered === i && (
                <motion.span
                  className="absolute inset-0 block rounded-lg bg-primary/80"
                  layoutId="project-hover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>
            <MagicCard className="relative z-20 h-full bg-card group-hover/item:border-primary">
              <div className="flex h-full flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs text-primary">{p.context}</p>
                  {p.href && <ExternalLink className="size-3.5 shrink-0 text-primary" />}
                </div>
                <h3 className="mt-1 font-bold tracking-wide">{p.title}</h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-primary/40 px-2 py-0.5 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </MagicCard>
          </Wrapper>
        );
      })}
    </div>
  );
}
