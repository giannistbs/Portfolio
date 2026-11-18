import type { Metadata, Viewport } from "next";
import { Inconsolata } from "next/font/google";
import { Shell } from "@/components/layout/shell";
import { SITE } from "@/data/site";
import { Providers } from "./providers";
import "./tech.css";

const font = Inconsolata({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.fullName} · tech`, template: `%s · ${SITE.fullName}` },
  description: SITE.description,
  openGraph: { title: SITE.fullName, description: SITE.description, url: SITE.url, type: "website", images: "/images/ioannis.jpg" },
};

export const viewport: Viewport = { themeColor: "#0c0a09" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
