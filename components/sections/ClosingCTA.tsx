"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const footerLinks = ["Services", "NextComply AI", "About", "Contact"];

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".closing-headline",
        { scale: 0.85, opacity: 0, y: 24, transformOrigin: "50% 55%" },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".closing-headline",
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".closing-subheadline",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: ".closing-subheadline",
            start: "top 80%",
            scrub: false,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".closing-cta-btn",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".closing-cta-btn",
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
    <section ref={sectionRef} id="closing-cta" className="relative bg-[#080808] text-brand-text">
      <div className="relative overflow-hidden px-6 py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[clamp(4rem,18vw,16rem)] font-black tracking-[0.08em] text-white/[0.03]">
            NEXTDOT
          </span>
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <p className="font-mono text-xs tracking-[0.14em] text-brand-text/45">{"// Ready to Build"}</p>

          <h2 className="closing-headline mt-5 text-[clamp(3.1rem,7.5vw,5rem)] font-extrabold leading-[0.94] tracking-[-0.03em] opacity-0">
            Done experimenting with AI?
          </h2>

          <p className="closing-subheadline mt-6 max-w-2xl text-base leading-relaxed text-brand-text/75 opacity-0 sm:text-lg">
            Let&apos;s define what production looks like for your organisation.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="closing-cta-btn rounded-full bg-brand-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-black opacity-0 transition-transform duration-300 hover:-translate-y-1 sm:text-base">
              Start the Conversation →
            </button>
            <button className="closing-cta-btn rounded-full border border-brand-text/35 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-brand-text opacity-0 transition-colors duration-300 hover:border-brand-accent hover:text-brand-accent sm:text-base">
              See What We Build →
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 px-6 py-7">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold tracking-[0.01em] text-brand-text">Nextdot</p>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a key={link} href="#" className="text-sm text-brand-text/65 transition-colors hover:text-brand-text">
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-auto mt-5 w-full max-w-6xl border-t border-white/10 pt-5">
          <p className="text-xs tracking-[0.08em] text-brand-text/45">© 2025 Nextdot. Built in India.</p>
        </div>
      </footer>
    </section>
  );
}
