"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Years Operating" },
  { value: 30, suffix: "+", label: "Specialists" },
  { value: 100, suffix: "+", label: "Systems & Campaigns Delivered" },
  { value: 3, label: "AI Products in Production" },
];

const logos = Array.from({ length: 6 }, (_, index) => ({
  id: `logo-${index + 1}`,
  text: "Client Logo",
}));

export default function Credibility() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>(".stat-value");

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target || 0);
        const suffix = counter.dataset.suffix || "";
        const tweenState = { value: 0 };

        gsap.to(tweenState, {
          value: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            counter.textContent = `${Math.round(tweenState.value)}${suffix}`;
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="credibility"
      className="min-h-screen bg-[#080808] px-6 py-20 text-brand-text"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-text/45">Who we work with</p>

        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="border-l border-white/10 pl-4">
              <p
                className="stat-value text-5xl font-extrabold leading-none tracking-[-0.02em] text-brand-text sm:text-6xl"
                data-target={stat.value}
                data-suffix={stat.suffix || ""}
              >
                0
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-brand-text/55 sm:text-sm">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 overflow-hidden border-y border-white/10 py-5">
          <div className="marquee-track flex min-w-max items-center gap-4">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex h-16 w-44 items-center justify-center rounded-md border border-white/12 bg-white/[0.03] text-xs uppercase tracking-[0.12em] text-brand-text/45"
              >
                {logo.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee 28s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
