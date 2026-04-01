"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const problemCards = [
  {
    number: "01",
    title: "The Integration Gap",
    body: "Multiple tools. Disconnected workflows. What looks like AI adoption is actually fragmentation.",
  },
  {
    number: "02",
    title: "The Accountability Gap",
    body: "Vendors deliver decks. Your internal team inherits complexity without clarity.",
  },
  {
    number: "03",
    title: "The Architecture Gap",
    body: "Pilots don't scale. Real transformation needs an AI operating system - not scattered experiments.",
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".problem-copy",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".problem-copy",
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".problem-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".problem-card",
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
      id="problem"
      className="relative min-h-screen bg-brand-bg px-6 py-20 text-brand-text"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="problem-copy max-w-2xl opacity-0">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-text/85">
            Problem
          </p>
          <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.02em] text-brand-text sm:text-5xl">
            Most enterprises are stuck at the pilot.
          </h2>
          <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-brand-text/85 sm:text-lg">
            Moving AI into production is not a model problem - it&apos;s a systems problem. It
            requires domain context, workflow integration, and engineering accountability.
          </p>
        </div>

        <div className="grid gap-4">
          {problemCards.map((card) => (
            <article
              key={card.number}
              className="problem-card rounded-2xl border border-black/15 bg-[#F8F8F8] p-6 opacity-0"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-text/60">
                {card.number}
              </p>
              <h3 className="mt-3 text-xl font-bold leading-tight text-brand-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-text/85 sm:text-[0.95rem]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
