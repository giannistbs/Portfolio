import type { Metadata, Viewport } from "next";
import { Shell } from "@/components/layout/shell";
import { inconsolata } from "@/fonts";
import { SITE } from "@/data/site";
import { Providers } from "./providers";
import "./tech.css";

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
      <body className={`${inconsolata.className} antialiased`}>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
