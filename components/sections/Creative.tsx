"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CreativeService = {
  title: string;
  description: string;
};

const services: CreativeService[] = [
  {
    title: "AI-Augmented Content Systems",
    description: "High-volume, high-consistency content pipelines powered by AI.",
  },
  {
    title: "Performance Marketing Systems",
    description: "Campaigns driven by real-time intelligence and optimisation loops.",
  },
  {
    title: "Video & Design Production",
    description: "Faster iteration. Scalable production. Enterprise-grade output.",
  },
  {
    title: "Digital Growth Systems",
    description: "End-to-end growth infrastructure, not isolated campaigns.",
  },
];

export default function Creative() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".creative-copy",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".creative-copy",
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".creative-card",
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".creative-card",
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
      id="creative"
      className="min-h-screen bg-brand-bg px-6 py-20 text-brand-text"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="creative-copy max-w-xl opacity-0">
          <h2 className="text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
            Nextdot for Creative
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-text/85 sm:text-lg">
            A decade of digital and creative consulting, now re-engineered with AI at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="creative-card rounded-2xl border border-black/15 bg-[#F8F8F8] p-6 opacity-0 transition-colors duration-250 hover:border-brand-accent"
            >
              <h3 className="text-lg font-bold leading-tight text-brand-text">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-text/90">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
