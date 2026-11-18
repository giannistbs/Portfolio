"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  children,
}: {
  tabs: readonly T[];
  value: T;
  onChange: (v: T) => void;
  children: React.ReactNode;
}) {
  return (
    <TabsPrimitive.Root value={value} onValueChange={(v) => onChange(v as T)} className="w-full">
      <TabsPrimitive.List
        className="grid w-full gap-1 rounded-lg bg-muted p-1 text-muted-foreground"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((t) => (
          <TabsPrimitive.Trigger
            key={t}
            value={t}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-bold transition-all",
              "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow",
              "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <motion.span className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {t}
            </motion.span>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {children}
    </TabsPrimitive.Root>
  );
}

export const TabPanel = TabsPrimitive.Content;
