import type { Metadata } from "next";
import { Xp } from "@/components/sections/xp";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return <Xp />;
}
