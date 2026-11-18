import localFont from "next/font/local";

// Fonts are bundled with the site (open-licence files from Google Fonts, latin subset),
// so builds never depend on downloading them from Google.

// main site
export const interTight = localFont({
  src: [{ path: "./inter-tight-variable.woff2", weight: "500 900", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
});
export const instrumentSerif = localFont({
  src: [
    { path: "./instrument-serif-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
export const courierPrime = localFont({
  src: [
    { path: "./courier-prime-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./courier-prime-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

// /tech site
export const inconsolata = localFont({
  src: [{ path: "./inconsolata-variable.woff2", weight: "400 700", style: "normal" }],
  display: "swap",
});
