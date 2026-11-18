"use client";

import { AnimatedCursor } from "./cursor";
import { Footer } from "./footer";
import { Header } from "./header";
import { Particles } from "./particles";
import { Sidebar } from "./sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-[100dvh] w-full justify-center overflow-hidden">
      <AnimatedCursor />
      <Particles className="fixed inset-0 z-[-2] h-full w-full" />
      <div className="fixed inset-0 z-[-1] bg-background/70 backdrop-blur-[2px]" />
      <div className="flex w-screen max-w-2xl overflow-hidden">
        <Sidebar />
        <div className="flex h-[100dvh] w-full min-w-0 flex-col">
          <Header />
          <main className="scrollbar-thin z-0 w-full flex-1 overflow-y-auto p-2">
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
