"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Service = {
  title: string;
  description: string;
  flagship?: boolean;
};

const services: Service[] = [
  {
    title: "AI Agent & Agentic Systems",
    description:
      "Multi-agent architectures designed for real workflows - from document intelligence to decision automation. Autonomous where possible, controlled where necessary.",
  },
  {
    title: "Enterprise Workflow Automation",
    description:
      "AI embedded into your operating layer - orchestrating data, APIs, and systems across CRMs, ERPs, and internal tools.",
  },
  {
    title: "AI-Powered Growth Systems",
    description:
      "Content, campaign, and performance systems that combine LLMs with structured business data - built for scale, not experimentation.",
  },
  {
    title: "Enterprise AI Advisory",
    description:
      "Architecture, governance, and operating models for organisations building long-term AI capability.",
  },
  {
    title: "LLMOps & ML Engineering",
    description:
      "Model pipelines, orchestration layers, and infrastructure for enterprises moving toward domain-specific AI systems.",
  },
  {
    title: "Compliance-First Healthcare AI (Flagship)",
    description:
      "Purpose-built AI systems for regulated healthcare environments. Led by our flagship product - NextComply AI.",
    flagship: true,
  },
];

export default function WhatWeBuild() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-card",
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
      id="what-we-build"
      className="relative min-h-screen overflow-hidden bg-brand-bg px-6 py-20 text-brand-text"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs tracking-[0.14em] text-brand-text/90">{"// What We Build"}</p>
        <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
          AI Engineering & Agentic Systems
        </h2>
        <p className="mt-5 max-w-2xl text-base text-brand-text/85 sm:text-lg">
          Production-grade systems. Built to run inside real enterprises.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className={`service-card rounded-2xl border bg-[#F8F8F8] p-6 opacity-0 transition-transform duration-300 hover:-translate-y-1 ${service.flagship
                ? "border-brand-accent/70 shadow-[0_0_0_1px_rgba(59,130,246,0.12)]"
                : "border-black/15"
                }`}
            >
              <h3 className="text-lg font-bold leading-tight text-brand-text">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-text/90">{service.description}</p>

              {service.flagship ? (
                <a
                  href="#flagship-product"
                  className="mt-5 inline-flex text-sm font-semibold text-brand-accent transition-opacity duration-200 hover:opacity-80"
                >
                  Flagship →
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
