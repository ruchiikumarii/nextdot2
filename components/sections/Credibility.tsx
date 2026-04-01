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

export default function Credibility({ clientLogos = [] }: { clientLogos?: string[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const displayLogos = clientLogos.length > 0 ? clientLogos : logos.map(l => l.text);

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
      className="min-h-screen bg-brand-bg py-20 text-brand-text"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.14em] text-brand-text/90">Who we work with</p>

        <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="border-l border-black/15 pl-4">
              <p
                className="stat-value text-5xl font-extrabold leading-none tracking-[-0.02em] text-brand-text sm:text-6xl"
                data-target={stat.value}
                data-suffix={stat.suffix || ""}
              >
                0
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-brand-text/85 sm:text-sm">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14 w-full overflow-hidden border-y border-black/10 py-8 sm:py-10">
        <div className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar sm:overflow-x-hidden">
          <div
            className="marquee-track flex min-w-max items-center gap-10 px-6 sm:gap-24 sm:px-0 hover:[animation-play-state:paused]"
            style={{ "--marquee-duration": `${Math.max(20, displayLogos.length * 2.2)}s` } as React.CSSProperties}
          >
            {[...displayLogos, ...displayLogos].map((logo, index) => (
              <div
                key={`logo-${logo}-${index}`}
                className="group relative flex h-14 w-28 shrink-0 snap-center items-center justify-center transition-transform duration-300 sm:h-20 sm:w-40"
              >
                {clientLogos.length > 0 ? (
                  <img
                    src={`/clients/${logo}`}
                    alt={`Client Logo ${index}`}
                    className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-md"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-black/15 bg-black/[0.12] text-[10px] uppercase tracking-[0.12em] text-brand-text/90 sm:text-xs">
                    {logo}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .marquee-track {
            animation: marquee var(--marquee-duration) linear infinite;
          }
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
