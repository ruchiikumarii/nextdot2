import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import FlagshipProduct from "@/components/sections/FlagshipProduct";
import HowWeWork from "@/components/sections/HowWeWork";
import Credibility from "@/components/sections/Credibility";
import CapabilityCenter from "@/components/sections/CapabilityCenter";
import Creative from "@/components/sections/Creative";
import ClosingCTA from "@/components/sections/ClosingCTA";
import ParticleTextOverlay from "@/components/ParticleHeadingOverlay";

export default function Home() {
  return (
    <main className="bg-brand-bg text-brand-text relative">
      <ParticleTextOverlay />
      <Hero />
      <Problem />
      <WhatWeBuild />
      <FlagshipProduct />
      <HowWeWork />
      <Credibility />
      <CapabilityCenter />
      <Creative />
      <ClosingCTA />
    </main>
  );
}
