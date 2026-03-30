"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Map the highest-leverage problem inside your workflow.",
  },
  {
    number: "02",
    title: "ARCHITECT",
    description: "Design the system, integrations, data flow, and governance before building.",
  },
  {
    number: "03",
    title: "ENGINEER",
    description: "Deploy real systems into real environments. Not isolated pilots.",
  },
  {
    number: "04",
    title: "OPTIMISE",
    description: "Continuously improve performance post-deployment. ROI compounds.",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<SVGLineElement | null>(null);

  useGSAP(
    () => {
      if (lineRef.current) {
        const lineLength = lineRef.current.getTotalLength();

        gsap.set(lineRef.current, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        });
      }

      gsap.fromTo(
        ".how-step",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".how-step",
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
      id="how-we-work"
      className="relative min-h-screen overflow-hidden bg-[#080808] px-6 py-20 text-brand-text"
    >
      <div className="pointer-events-none absolute inset-0 opacity-55">
        <div className="absolute left-[5%] top-[8%] h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute bottom-[8%] right-[6%] h-72 w-72 rounded-full bg-brand-accent/[0.08] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <h2 className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">How we work</h2>
        <p className="mt-6 max-w-4xl text-sm leading-relaxed text-brand-text/72 sm:text-base">
          We deploy dedicated AI engineering pods that work alongside your team to take AI from
          exploration to production. Each pod is built around your problem, combining AI engineers,
          system architects, and domain specialists who own the outcome end-to-end. From
          identifying the right use case to architecting, building, and optimising the system, the
          same team stays accountable throughout.
        </p>

        <div className="relative mt-14 hidden lg:block">
          <svg className="h-4 w-full" viewBox="0 0 1000 16" preserveAspectRatio="none" aria-hidden="true">
            <line
              ref={lineRef}
              x1="10"
              y1="8"
              x2="990"
              y2="8"
              stroke="rgba(240,238,232,0.35)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="how-step relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-6 opacity-0"
            >
              <span className="pointer-events-none absolute right-3 top-1 text-6xl font-extrabold leading-none tracking-[-0.04em] text-white/[0.06]">
                {step.number}
              </span>
              <p className="relative z-[1] text-[11px] font-semibold tracking-[0.14em] text-brand-text/45">
                {step.number}
              </p>
              <h3 className="relative z-[1] mt-2 text-lg font-bold tracking-[0.01em] text-brand-text">
                {step.title}
              </h3>
              <p className="relative z-[1] mt-3 text-sm leading-relaxed text-brand-text/68">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
