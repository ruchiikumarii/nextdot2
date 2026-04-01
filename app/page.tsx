import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import FlagshipProduct from "@/components/sections/FlagshipProduct";
import HowWeWork from "@/components/sections/HowWeWork";
import Credibility from "@/components/sections/Credibility";
import CapabilityCenter from "@/components/sections/CapabilityCenter";
import Creative from "@/components/sections/Creative";
import ClosingCTA from "@/components/sections/ClosingCTA";
import fs from "fs";
import path from "path";

export default function Home() {
  const clientsDir = path.join(process.cwd(), "public/clients");
  let clientLogos: string[] = [];
  try {
    clientLogos = fs.readdirSync(clientsDir).filter(f => f.match(/\.(png|jpe?g|svg|webp|avif)$/i));
  } catch (err) {
    console.error("Failed to read clients directory:", err);
  }

  return (
    <main className="bg-brand-bg text-brand-text relative">
      <Hero />
      <Problem />
      <WhatWeBuild />
      <FlagshipProduct />
      <HowWeWork />
      <Credibility clientLogos={clientLogos} />
      <CapabilityCenter />
      <Creative />
      <ClosingCTA />
    </main >
  );
}
