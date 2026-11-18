"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BadgeList({ items, outline, className }: { items: string[]; outline?: boolean; className?: string }) {
  return (
    <div className={cn("mt-3 flex flex-wrap gap-1.5", className)}>
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.25 }}
          className={cn(
            "rounded-md px-2 py-0.5 text-xs font-bold",
            outline ? "border border-primary/40 text-foreground" : "bg-primary text-primary-foreground",
          )}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}
