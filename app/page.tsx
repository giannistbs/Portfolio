import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Strengths } from "@/components/sections/strengths";

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Hero />
      <Stats />
      <Strengths />
    </div>
  );
}
