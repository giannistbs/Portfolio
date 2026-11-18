"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

export const THEME_COLORS = [
  "red", "orange", "yellow", "green", "cyan", "blue", "indigo", "violet", "pink", "white", "black",
] as const;
export type ThemeColor = (typeof THEME_COLORS)[number];
export type ThemeMode = "light" | "dark";

export const DEFAULT_THEME = "dark-cyan";

export const COLOR_HEX: Record<ThemeColor, string> = {
  red: "#d92d62",
  orange: "#f97316",
  yellow: "#dfb903",
  green: "#1bb857",
  cyan: "#00bcbc",
  blue: "#5296fa",
  indigo: "#4f5bea",
  violet: "#9933ff",
  pink: "#e0338a",
  white: "#ffffff",
  black: "#000000",
};

export const THEMES = [
  ...THEME_COLORS.filter((c) => c !== "white" && c !== "black").flatMap((c) => [
    `light-${c}`,
    `dark-${c}`,
  ]),
  "light-black",
  "dark-white",
];

export function useAppTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [mode, color] = useMemo(() => {
    const [m, c] = (mounted && theme ? theme : DEFAULT_THEME).split("-");
    return [m as ThemeMode, c as ThemeColor];
  }, [theme, mounted]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      if (color === "white" || color === "black") {
        setTheme(next === "light" ? "light-black" : "dark-white");
      } else {
        setTheme(`${next}-${color}`);
      }
    },
    [color, setTheme],
  );

  const setColor = useCallback((next: ThemeColor) => setTheme(`${mode}-${next}`), [mode, setTheme]);

  return { mode, color, hex: COLOR_HEX[color], setMode, setColor, mounted };
}
