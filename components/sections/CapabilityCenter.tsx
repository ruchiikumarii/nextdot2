"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const headlineLines = ["We didn't", "follow the crowd."];

const bodyParagraphs = [
  "Nextdot operates an AI Capability Center, bringing together forward-deployed engineers, AI system architects, and agentic specialists under one roof. This is where enterprise AI systems move from idea to production.",
  "Multi-agent architectures, workflow automation layers, and domain-trained models, designed, engineered, and deployed by a team that works at the intersection of AI, systems thinking, and real business operations.",
  "Built from emerging India, where the next generation of engineering talent is not just consuming global technology, but building it.",
];

export default function CapabilityCenter() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cc-word",
        { yPercent: 110, opacity: 0.08 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cc-word",
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".cc-paragraph",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cc-paragraph",
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
      id="capability"
      className="relative flex min-h-screen items-center bg-brand-bg px-6 py-20 text-brand-text"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(17,17,17,0.8) 0.5px, transparent 0.5px), linear-gradient(rgba(17,17,17,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px, 120px 120px, 120px 120px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-left">
          <h2 className="max-w-[12ch] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
            {headlineLines.map((line) => (
              <span key={line} className="mb-[0.08em] block">
                {line.split(" ").map((word, index) => (
                  <span key={`${word}-${index}`} className="mr-[0.28em] inline-block overflow-hidden">
                    <span className="cc-word inline-block">{word}</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div className="cc-copy mt-8 grid max-w-[600px] gap-5 text-balance">
            {bodyParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="cc-paragraph text-sm leading-relaxed text-brand-text/85 opacity-0 sm:text-base sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Dashboard Placeholder Image */}
        <div className="cc-image relative w-full overflow-hidden rounded-3xl border border-black/15 bg-white shadow-xl cc-paragraph opacity-0">
          <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-start gap-2 border-b border-black/15 bg-[#F8F8F8] px-4">
            <div className="h-3 w-3 rounded-full bg-black/10" />
            <div className="h-3 w-3 rounded-full bg-black/10" />
            <div className="h-3 w-3 rounded-full bg-black/10" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
            alt="AI Capability Center Dashboard"
            className="h-full w-full object-cover pt-10"
          />
        </div>
      </div>
    </section>
  );
}
