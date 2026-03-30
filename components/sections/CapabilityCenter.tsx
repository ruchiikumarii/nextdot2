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
      id="capability-center"
      className="relative flex min-h-screen items-center bg-[#080808] px-6 py-20 text-brand-text"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(240,238,232,0.8) 0.5px, transparent 0.5px), linear-gradient(rgba(240,238,232,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(240,238,232,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px, 120px 120px, 120px 120px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl text-center">
        <h2 className="mx-auto max-w-[12ch] text-[clamp(3.4rem,8.5vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
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

        <div className="cc-copy mx-auto mt-10 grid max-w-[680px] gap-5 text-balance">
          {bodyParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="cc-paragraph text-sm leading-relaxed text-brand-text/76 opacity-0 sm:text-base sm:leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
