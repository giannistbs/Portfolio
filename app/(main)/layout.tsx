import type { Metadata, Viewport } from "next";
import { Courier_Prime, Instrument_Serif, Inter_Tight } from "next/font/google";
import { SITE } from "@/data/site";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["500", "700", "800", "900"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.fullName,
  description: SITE.description,
  openGraph: { title: SITE.fullName, description: SITE.description, url: SITE.url, type: "website", images: "/art/hero.jpg" },
};

export const viewport: Viewport = { themeColor: "#1a4ba7" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
