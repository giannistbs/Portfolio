import { PROJECTS, SITE, XP } from "@/data/site";
import { ScrollArea } from "./scroll-area";

export type Chapter = {
  id: string;
  mark: string; // big italic glyph on the index card
  label: string; // short name shown in the header and index
  wall: string;
  floor: string;
  horizon: number; // % from the top where the wall meets the floor
  horizonPhone?: number; // same, on phones (defaults to horizon)
  image?: string;
  imageMobile?: string; // taller version used on phones so the top isn't hidden by the header
  ink: "light" | "dark";
  render: () => React.ReactNode;
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Title({ n, children, light }: { n: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className="max-w-[46rem]">
      <p className={`pop font-mono text-sm font-bold ${light ? "text-paper/80" : "text-dot"}`} style={d(120)}>
        ### {n}
      </p>
      <h2
        className={`pop mt-2 text-[clamp(2.6rem,7vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.045em] ${light ? "text-paper" : "text-ink"}`}
        style={d(200)}
      >
        {children}
      </h2>
    </div>
  );
}

function Paper({ children, tilt = 0, delay = 0, className = "" }: { children: React.ReactNode; tilt?: number; delay?: number; className?: string }) {
  return (
    <div
      className={`pop card-paper p-4 sm:p-5 ${className}`}
      style={{ ...d(delay), "--tilt": `${tilt}deg`, "--tilt-from": `${tilt * 3}deg` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[11px]">
          {t}
        </span>
      ))}
    </div>
  );
}


const INTRO = ["devops engineer @ certora.", "prev netcompany: cloud for eu research.", "has broken defi protocols for fun."];

function IntroLines({ className, wrap = false }: { className: string; wrap?: boolean }) {
  // wrap: narrow column (phones) where lines may break; each line pops in instead of being typed
  return (
    <div className={`space-y-2 font-mono text-[12px] tracking-[0.1em] sm:text-[15px] sm:tracking-[0.12em] ${className}`}>
      {INTRO.map((line, i) =>
        wrap ? (
          <p key={line} className="pop flex gap-2.5 leading-snug" style={d(700 + i * 260)}>
            <span className="text-dot-soft">&gt;</span>
            <span>{line}</span>
          </p>
        ) : (
          <p key={line} className="flex gap-3">
            <span className="text-dot">&gt;</span>
            <span className="type-in inline-block" style={{ ...d(700 + i * 650), "--n": line.length, "--t": "620ms" } as React.CSSProperties}>
              {line}
            </span>
          </p>
        ),
      )}
    </div>
  );
}

const work = XP.work.items;
const sec = XP.security.items;
const edu = XP.education.items;

export const CHAPTERS: Chapter[] = [
  {
    id: "home",
    mark: "0",
    label: "myself",
    wall: "#1a4ba7",
    floor: "#d0ad82",
    horizon: 79,
    image: "/art/hero.jpg",
    imageMobile: "/art/hero-tall.jpg",
    ink: "light",
    render: () => (
      <div className="flex h-full flex-col">
        <h1 className="pop mt-[11vh] flex flex-col items-start gap-y-1 leading-[0.8] text-paper sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3" style={d(150)}>
          <span className="flex items-baseline gap-x-3">
            <span className="text-[clamp(3.2rem,11vw,10.5rem)] font-black tracking-[-0.06em]">IOANNIS</span>
            <span className="inline-block size-[clamp(0.8rem,2vw,1.6rem)] rounded-full bg-dot" />
          </span>
          <span className="font-serif text-[clamp(2.4rem,7.5vw,7rem)] italic tracking-tight">tampakis</span>
        </h1>
        {/* phones: lower down at leg height, in a narrow column left of the figure, cream on the blue wall */}
        <IntroLines wrap className="mb-[25vh] mt-auto max-w-[47%] text-paper sm:hidden" />
        {/* larger screens: on the floor, as before */}
        <IntroLines className="mb-[4vh] mt-auto hidden text-ink sm:block" />
      </div>
    ),
  },
  {
    id: "work",
    mark: "1",
    label: "experience",
    wall: "#406f6f",
    floor: "#b4613a",
    horizon: 79,
    image: "/art/work.jpg",
    imageMobile: "/art/work-tall.jpg",
    ink: "light",
    render: () => (
      <div className="flex h-full flex-col">
        <Title n="1" light>experience</Title>
        <ScrollArea className="scroll-thin items-start mt-6 grid max-h-[58vh] gap-4 overflow-y-auto pb-24 pr-1 sm:mt-auto sm:max-w-3xl sm:grid-cols-2">
          {work.slice(0, 2).map((w, i) => (
            <Paper key={w.org} tilt={i ? 1.2 : -1.4} delay={400 + i * 160}>
              <p className="font-serif text-2xl italic text-dot">{w.date}</p>
              <h3 className="mt-1 text-lg font-extrabold tracking-tight">{w.title}</h3>
              <p className="font-mono text-xs">@{w.org}</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-snug">{w.description}</p>
              {w.skills && <Tags items={w.skills} />}
            </Paper>
          ))}
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "security",
    mark: "2",
    label: "web3 security",
    wall: "#d34724",
    floor: "#c0a4bd",
    horizon: 74,
    image: "/art/security.jpg",
    ink: "light",
    render: () => (
      <div className="flex h-full flex-col">
        <Title n="2" light>
          And some web3
          <br />
          Security Exp
        </Title>
        <div className="mt-5 flex flex-wrap gap-2">
          {["#3 sherlock finish", "2 high", "4 medium", "8 months freelance"].map((b, i) => (
            <span key={b} className="pop rounded-full bg-paper px-3 py-1 font-mono text-xs font-bold" style={d(380 + i * 90)}>
              {b}
            </span>
          ))}
        </div>
        <ScrollArea className="scroll-thin items-start mt-auto grid max-h-[46vh] gap-3 overflow-y-auto pb-24 pr-1 sm:max-w-xl">
          {sec.map((s, i) => (
            <Paper key={s.title} tilt={[-1, 0.8, -0.5][i]} delay={600 + i * 140}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-dot">{s.org}</p>
              <h3 className="font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-1 text-sm leading-snug">{s.description}</p>
            </Paper>
          ))}
          <a href={SITE.socials.audits} target="_blank" rel="noopener noreferrer" className="pop font-mono text-sm font-bold text-paper underline underline-offset-4" style={d(1100)}>
            &gt; read the audit portfolio ↗
          </a>
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "web3",
    mark: "3",
    label: "chains & cubes",
    wall: "#70a1c7",
    floor: "#f28197",
    horizon: 80,
    image: "/art/web3.jpg",
    ink: "dark",
    render: () => (
      <div className="flex h-full flex-col">
        <Title n="3">
          chains
          <br />& cubes
        </Title>
        <ScrollArea className="scroll-thin items-start mt-auto grid max-h-[52vh] gap-3 overflow-y-auto pb-24 pr-1 sm:max-w-2xl sm:grid-cols-2">
          {PROJECTS.web3.map((p, i) => (
            <Paper key={p.title} tilt={[-1.2, 1, 0.6, -0.8][i]} delay={400 + i * 130}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-dot">{p.context}</p>
              <h3 className="font-extrabold leading-tight tracking-tight">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                    {p.title} ↗
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="mt-1 text-[13px] leading-snug">{p.description}</p>
            </Paper>
          ))}
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "builds",
    mark: "4",
    label: "things I built",
    wall: "#af98b7",
    floor: "#eb853b",
    horizon: 78,
    image: "/art/builds.jpg",
    imageMobile: "/art/builds-tall.jpg",
    ink: "dark",
    render: () => (
      <div className="flex h-full flex-col">
        <Title n="4">things I built</Title>
        <ScrollArea className="scroll-thin items-start mt-6 grid max-h-[60vh] gap-3 overflow-y-auto pb-24 pr-1 sm:mt-auto sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.engineering.map((p, i) => (
            <Paper key={p.title} tilt={[-1.4, 0.9, -0.6, 1.3, -0.9][i]} delay={350 + i * 120}>
              <p className="font-serif text-xl italic text-dot">{i + 1}</p>
              <h3 className="font-extrabold leading-tight tracking-tight">{p.title}</h3>
              <p className="font-mono text-[11px]">{p.context}</p>
              <p className="mt-2 text-[13px] leading-snug">{p.description}</p>
              <Tags items={p.tags} />
            </Paper>
          ))}
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "school",
    mark: "5",
    label: "school",
    wall: "#909c79",
    floor: "#dfd1bb",
    horizon: 86,
    image: "/art/school.jpg",
    imageMobile: "/art/school-tall.jpg",
    ink: "dark",
    render: () => (
      <div className="flex h-full flex-col">
        <Title n="5">school</Title>
        <ScrollArea className="scroll-thin items-start mt-6 grid max-h-[58vh] gap-4 overflow-y-auto pb-24 pr-1 sm:mt-auto sm:max-w-3xl sm:grid-cols-2">
          {edu.map((e, i) => (
            <Paper key={e.title} tilt={i ? 1 : -1.2} delay={400 + i * 160}>
              <p className="font-serif text-2xl italic text-dot">{e.date}</p>
              <h3 className="mt-1 font-extrabold leading-tight tracking-tight">{e.title}</h3>
              <p className="font-mono text-xs">@{e.org}</p>
              <p className="mt-2 text-sm leading-snug">{e.description}</p>
            </Paper>
          ))}
        </ScrollArea>
      </div>
    ),
  },
  {
    id: "contact",
    mark: "#",
    label: "say hi",
    wall: "#1a4ba7",
    floor: "#d0ad82",
    horizon: 62,
    horizonPhone: 86,
    ink: "light",
    render: () => (
      <div className="flex h-full flex-col">
        <h2 className="pop mt-[10vh] text-[clamp(3.6rem,14vw,12rem)] font-black leading-[0.8] tracking-[-0.06em] text-paper" style={d(150)}>
          say hi<span className="text-dot">.</span>
        </h2>
        {/* phones: right under the heading, cream on the blue wall, label above each link.
            larger screens: on the floor, label and link side by side, as before */}
        <div className="mt-10 space-y-5 pr-6 font-mono text-[12px] tracking-[0.04em] text-paper sm:pr-0 sm:mb-24 sm:mt-auto sm:space-y-2 sm:text-base sm:tracking-[0.08em] sm:text-ink">
          {[
            ["email", `mailto:${SITE.socials.mail}`, SITE.socials.mail],
            ["github", SITE.socials.github, "github.com/giannistbs"],
            ["linkedin", SITE.socials.linkedin, "linkedin.com/in/giannis-tampakis"],
            ["audits", SITE.socials.audits, "github.com/giannistbs/audit-portfolio"],
          ].map(([k, href, text], i) => (
            <p key={k} className="pop flex gap-3" style={d(500 + i * 120)}>
              <span className="text-dot-soft sm:text-dot">&gt;</span>
              <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:gap-3">
                <span className="text-[11px] uppercase tracking-[0.2em] text-paper/60 sm:w-20 sm:text-base sm:normal-case sm:tracking-[0.08em] sm:text-ink/70">{k}</span>
                <a href={href} target={k === "email" ? undefined : "_blank"} rel="noopener noreferrer" className="font-bold underline-offset-4 hover:underline">
                  {/* let long links wrap only after a "/" */}
                  {text.split("/").map((part, j, all) => (
                    <span key={j}>
                      {part}
                      {j < all.length - 1 && (
                        <>
                          /<wbr />
                        </>
                      )}
                    </span>
                  ))}
                </a>
              </span>
            </p>
          ))}
        </div>
      </div>
    ),
  },
];
