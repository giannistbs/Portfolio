import { usePathname } from "next/navigation";

export const NAV = [
  { href: "/", label: "home" },
  { href: "/experience/", label: "experience" },
  { href: "/projects/", label: "projects" },
];

/** Current path without a trailing slash ("/" stays "/"). */
export function useCleanPath() {
  const p = usePathname() || "/";
  return p.length > 1 ? p.replace(/\/$/, "") : p;
}

export const clean = (href: string) => (href.length > 1 ? href.replace(/\/$/, "") : href);
