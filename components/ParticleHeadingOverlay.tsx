"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    size: number;
    density: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Mouse tracking
        let mouse = {
            x: -1000,
            y: -1000,
            radius: 150, // Interaction radius
        };

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            particles = [];

            // Number of particles depends on screen size to maintain density
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000);

            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    vx: (Math.random() - 0.5) * 0.5, // Slow drift velocity
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 1.5 + 0.5, // Random size between 0.5 and 2
                    density: Math.random() * 30 + 1,
                });
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // 1. Mouse Interaction logic (Repel effect)
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Push force from mouse
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;

                const directionX = forceDirectionX * force * p.density;
                const directionY = forceDirectionY * force * p.density;

                if (distance < mouse.radius) {
                    p.x -= directionX;
                    p.y -= directionY;
                } else {
                    // Return to base behavior: keep drifting
                    if (p.x !== p.baseX) {
                        const dxBase = p.x - p.baseX;
                        p.x -= dxBase / 50; // Return spring
                    }
                    if (p.y !== p.baseY) {
                        const dyBase = p.y - p.baseY;
                        p.y -= dyBase / 50; // Return spring
                    }
                }

                // Add constant slow drift
                p.baseX += p.vx;
                p.baseY += p.vy;

                // Wrap around screen
                if (p.baseX < 0) p.baseX = canvas.width;
                if (p.baseX > canvas.width) p.baseX = 0;
                if (p.baseY < 0) p.baseY = canvas.height;
                if (p.baseY > canvas.height) p.baseY = 0;

                // Ensure current x,y wraps if base wrapped
                if (p.x < -100) p.x = canvas.width + 100;
                if (p.x > canvas.width + 100) p.x = -100;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(240, 238, 232, 0.6)"; // Text color with opacity
                ctx.fill();

                // Connect particles within a certain distance
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance2 = Math.sqrt(
                        Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
                    );

                    if (distance2 < 80) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(240, 238, 232, ${0.2 * (1 - distance2 / 80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Events
        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        init();
        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [pathname]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-10 pointer-events-none"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
