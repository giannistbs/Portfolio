"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconShieldCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";
import { useCleanPath } from "./nav";

export function Sidebar() {
  const path = useCleanPath();
  const isHome = path === "/";

  return (
    <Tooltip.Provider delayDuration={150}>
      <motion.aside
        className="sticky top-0 z-20 flex h-[100dvh] flex-col overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="p-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
          <Link
            href="/"
            aria-label="Home"
            className={cn(
              "block size-9 overflow-hidden rounded-lg border border-primary/60 transition-transform duration-300",
              isHome ? "scale-110" : "hover:scale-105",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ioannis.jpg" alt="" className="size-full object-cover" />
          </Link>
        </motion.div>

        <motion.nav className="grid gap-1 p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <Item icon={Briefcase} href="/experience/" label="experience" active={path === "/experience"} />
          <Item icon={FolderGit2} href="/projects/" label="projects" active={path === "/projects"} />
        </motion.nav>

        <div className="mx-auto flex flex-grow flex-col items-center justify-center">
          <motion.div className="mx-auto w-px bg-primary" initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }} />
          <div className="my-2 flex flex-col items-center text-xs leading-tight text-muted-foreground">
            <span>©</span>
            {new Date().getFullYear().toString().split("").map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <motion.div className="mx-auto w-px bg-primary" initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }} />
        </div>

        <motion.nav className="mt-auto grid gap-1 p-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
          <Item icon={IconBrandGithub} label="github" href={SITE.socials.github} external />
          <Item icon={IconShieldCheck} label="audit portfolio" href={SITE.socials.audits} external />
          <Item icon={IconBrandLinkedin} label="linkedin" href={SITE.socials.linkedin} external />
          <Item icon={IconMail} label="email" href={`mailto:${SITE.socials.mail}`} />
        </motion.nav>
      </motion.aside>
    </Tooltip.Provider>
  );
}

function Item({
  icon: Icon,
  label,
  href,
  active,
  external,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={cn(
              "flex size-9 items-center justify-center rounded-lg transition-colors hover:bg-accent hover:text-primary",
              active && "border border-primary text-primary",
            )}
          >
            <Icon className="size-5" />
          </Link>
        </motion.div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={6}
          className="z-50 rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
