import type { Metadata, Viewport } from "next";
import { courierPrime, instrumentSerif, interTight } from "@/fonts";
import { SITE } from "@/data/site";
import "./globals.css";

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
      <body className={`${interTight.variable} ${instrumentSerif.variable} ${courierPrime.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
