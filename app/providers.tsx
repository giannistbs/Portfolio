"use client";

import { ThemeProvider } from "next-themes";
import { DEFAULT_THEME, THEMES } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" themes={THEMES} defaultTheme={DEFAULT_THEME} enableSystem={false} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
