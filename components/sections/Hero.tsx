"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const headline = "Domain Engineered AI Products & Agents For Enterprise";

const credibilityItems = [
  "10+ Years in Enterprise",
  "30+ Specialists",
  "3 Engineering Tracks",
  "1 AI Capability Center",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-word",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.9 }
      )
        .fromTo(
          ".hero-subheadline",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          ">+=0.3"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.14, duration: 0.8 },
          ">-=0.15"
        )
        .fromTo(
          ".hero-credibility",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          ">+=0.1"
        );

      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          backgroundPosition: "120% 50%",
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-bg px-6 py-24 text-brand-text"
    >
      <div
        ref={gradientRef}
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background:
            "radial-gradient(circle at 10% 10%, rgba(59,130,246,0.14), transparent 36%), radial-gradient(circle at 88% 28%, rgba(86,144,255,0.16), transparent 42%), linear-gradient(130deg, rgba(255,255,255,0.03), rgba(0,0,0,0.14), rgba(59,130,246,0.04))",
          backgroundSize: "180% 180%",
          backgroundPosition: "0% 50%",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"180\" viewBox=\"0 0 180 180\"%3E%3Cfilter id=\"n\" x=\"0\" y=\"0\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"180\" height=\"180\" filter=\"url(%23n)\" opacity=\"1\"/%3E%3C/svg%3E')",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start text-left">
          <h1 className="max-w-[15ch] text-[clamp(2.8rem,6.5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.02em]">
            {headline.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} className="hero-word mr-[0.32em] inline-block opacity-0">
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-subheadline mt-8 max-w-[60ch] text-base leading-relaxed text-brand-text/90 opacity-0 sm:text-lg">
            Real transformation needs an architected agentic ecosystem - not isolated use cases.
            Nextdot builds AI operating systems for enterprises that are no longer experimenting.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="hero-cta rounded-full bg-brand-accent px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white opacity-0 transition-transform duration-300 hover:-translate-y-1">
              See What We Build →
            </button>
            <button className="hero-cta rounded-full border border-black/20 bg-transparent px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-text opacity-0 transition-colors duration-300 hover:border-brand-accent hover:text-brand-accent">
              Talk to Us →
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="hero-cta opacity-0 relative flex w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] border border-black/10 bg-[#FAFAFA] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-16">
          <img
            src="/Nextdot_HB.png"
            alt="Nextdot Hero Image"
            className="h-full w-full object-contain select-none drop-shadow-sm"
          />
          <div className="absolute inset-0 rounded-[2rem] border border-black/10 pointer-events-none" />
        </div>
      </div>

      <div className="hero-credibility absolute inset-x-6 bottom-8 mx-auto w-full max-w-7xl border-t border-black/15 pt-4 text-xs text-brand-text/85 opacity-0 sm:text-sm">
        <p className="whitespace-normal md:whitespace-nowrap">
          {credibilityItems.map((item, index) => (
            <span key={item}>
              {item}
              {index < credibilityItems.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
