"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

// Register ScrollTrigger securely
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
    { name: "Problem", href: "/#problem" },
    { name: "Services", href: "/#what-we-build" },
    { name: "Approach", href: "/#how-we-work" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    // Sync isScrolled text state
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // GSAP ScrollTrigger Logic
    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        const ctx = gsap.context(() => {
            // 1. Navbar slide up/down animation on scroll
            const showAnim = gsap.from(navbar, {
                yPercent: -100,
                paused: true,
                duration: 0.4,
                ease: "power2.out",
            }).progress(1);

            ScrollTrigger.create({
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    // Hide navbar when scrolling down, show when scrolling up
                    if (self.direction === 1 && self.scroll() > 50) {
                        showAnim.reverse();
                    } else {
                        showAnim.play();
                    }

                    // Toggle background color and bottom border based on scroll position
                    if (self.scroll() > 50) {
                        gsap.to(navbar, {
                            backgroundColor: "#FFFFFF",
                            borderBottomColor: "rgba(0, 0, 0, 0.1)",
                            duration: 0.4,
                            ease: "power2.out",
                            overwrite: "auto",
                        });
                    } else {
                        gsap.to(navbar, {
                            backgroundColor: "rgba(255, 255, 255, 0)",
                            borderBottomColor: "rgba(0, 0, 0, 0)",
                            duration: 0.4,
                            ease: "power2.out",
                            overwrite: "auto",
                        });
                    }
                },
            });
        }, navbar); // Scope to navbar

        return () => ctx.revert(); // Cleanup on unmount
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <>
            {/* Header */}
            <header
                ref={navbarRef}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-transparent"
                style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            >
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight text-brand-text transition-all duration-300 w-24">
                    {isScrolled ? "ND" : "NextDot"}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-brand-text/90 hover:text-brand-text transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/#closing-cta"
                        className="bg-brand-accent text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                        Let&apos;s Talk
                    </Link>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-[60] relative"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-6 h-[2px] bg-brand-text transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] bg-brand-text transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"
                            }`}
                    />
                    <span
                        className={`w-6 h-[2px] bg-brand-text transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                            }`}
                    />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-brand-bg flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-3xl font-medium text-brand-text hover:text-brand-accent transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}
                <Link
                    href="/#closing-cta"
                    className="bg-brand-accent text-white px-8 py-3 mt-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Let&apos;s Talk
                </Link>
            </div>
        </>
    );
}
