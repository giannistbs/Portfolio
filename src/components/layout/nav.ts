import { usePathname } from "next/navigation";

/** The techy site lives under /tech; paths below are compared without that prefix. */
export const BASE = "/tech";

export const NAV = [
  { href: `${BASE}/`, label: "home" },
  { href: `${BASE}/experience/`, label: "experience" },
  { href: `${BASE}/projects/`, label: "projects" },
];

/** Strip the /tech prefix and any trailing slash ("/" stays "/"). */
export const clean = (href: string) => {
  const p = href.startsWith(BASE) ? href.slice(BASE.length) || "/" : href;
  return p.length > 1 ? p.replace(/\/$/, "") : p;
};

/** Current path inside the techy site, e.g. "/", "/experience", "/projects". */
export function useCleanPath() {
  return clean(usePathname() || "/");
}
