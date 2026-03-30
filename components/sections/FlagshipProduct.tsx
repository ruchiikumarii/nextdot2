"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const capabilities = [
  "Real-time compliance validation",
  "Automated issue detection & correction",
  "Audit-ready documentation trails",
  "Configurable rules engine for different markets",
  "Designed for marketing, medical, and regulatory teams",
];

export default function FlagshipProduct() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".flagship-headline",
        { yPercent: 100, clipPath: "inset(100% 0 0 0)", opacity: 0.1 },
        {
          yPercent: 0,
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".flagship-headline",
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".capability-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".capability-item",
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="flagship-product"
      className="relative min-h-screen overflow-hidden bg-[#0D0D0D] px-6 py-20 text-brand-text"
    >
      <div className="pointer-events-none absolute inset-0 opacity-65">
        <div className="absolute left-[-8%] top-[-8%] h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-10%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex rounded-full border border-brand-accent/50 bg-brand-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
            Flagship Product · Live
          </span>

          <div className="mt-6 overflow-hidden">
            <h2 className="flagship-headline text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">
              NextComply AI
            </h2>
          </div>

          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-brand-text/80 sm:text-lg">
            A Small Language Model built exclusively for healthcare compliance - trained to
            understand the rules, so your teams don&apos;t have to enforce them manually.
          </p>

          <p className="mt-5 max-w-[72ch] text-sm leading-relaxed text-brand-text/68 sm:text-base">
            Healthcare communication is high-volume and high-risk. One incorrect claim, a missing
            disclaimer, an unsupported benefit, or an off-label reference can delay campaigns or
            trigger regulatory action. NextComply AI brings compliance into the workflow itself. It
            reviews content in real time against a configurable rules engine, flags violations,
            suggests corrections, and generates audit trails both marketing and regulatory teams can
            rely on. Built for teams that cannot afford ambiguity.
          </p>

          <ul className="capabilities-list mt-8 space-y-3">
            {capabilities.map((item) => (
              <li
                key={item}
                className="capability-item flex items-start gap-3 text-sm text-brand-text/78 opacity-0 sm:text-base"
              >
                <span className="mt-[0.42rem] inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-brand-accent px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition-transform duration-300 hover:-translate-y-1">
              Request a Demo →
            </button>
            <button className="rounded-full border border-brand-text/35 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-text transition-colors duration-300 hover:border-brand-accent hover:text-brand-accent">
              Learn More →
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text/55">
                Compliance Monitor
              </p>
              <span className="rounded-full bg-brand-accent/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
                Live Check
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-red-400/30 bg-red-500/8 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-red-300">Flagged Claim</p>
                <p className="mt-1 text-xs text-brand-text/70">Unsupported therapeutic benefit in line 4.</p>
              </div>
              <div className="rounded-xl border border-blue-300/30 bg-blue-400/8 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-200">Warning</p>
                <p className="mt-1 text-xs text-brand-text/70">Required disclaimer missing for market: US.</p>
              </div>
              <div className="rounded-xl border border-brand-accent/30 bg-brand-accent/8 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-accent">Suggested Fix</p>
                <p className="mt-1 text-xs text-brand-text/70">Add approved safety statement and rebalance benefit claim language.</p>
              </div>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/4 rounded-full bg-brand-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
