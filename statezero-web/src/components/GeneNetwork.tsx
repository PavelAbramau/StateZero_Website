"use client";

import { useEffect, useRef } from "react";

interface Particle {
  hx: number; // home X
  hy: number; // home Y
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  opacityDir: number;
  jitterAngle: number;
  jitterSpeed: number;
}

const NODE_COLOR = "34,197,94";
const LINK_COLOR = "99,120,180";  // brighter blue-grey links
const PARTICLE_COUNT = 108;
const LINK_DISTANCE = 200;        // even wider = more connections
const ATTRACT_RADIUS = 180;
const ATTRACT_STRENGTH = 0.012;
const SPRING = 0.032;
const DAMPING = 0.78;
const JITTER = 0.225;

function makeParticle(w: number, h: number): Particle {
  const x = Math.random() * w;
  const y = Math.random() * h;
  return {
    hx: x, hy: y,
    x, y,
    vx: 0, vy: 0,
    r: 3 + Math.random() * 4,
    opacity: 0.35 + Math.random() * 0.4,
    opacityDir: Math.random() > 0.5 ? 1 : -1,
    jitterAngle: Math.random() * Math.PI * 2,
    jitterSpeed: 0.01 + Math.random() * 0.015,
  };
}

export default function GeneNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      // replace particles, preserving count
      particles = Array.from({ length: PARTICLE_COUNT }, () => makeParticle(w, h));
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        // slow jitter — tiny orbital drift around home
        a.jitterAngle += a.jitterSpeed;
        a.vx += Math.cos(a.jitterAngle) * JITTER;
        a.vy += Math.sin(a.jitterAngle) * JITTER;

        // spring back to home
        a.vx += (a.hx - a.x) * SPRING;
        a.vy += (a.hy - a.y) * SPRING;

        // cursor attraction
        const dx = mouse.x - a.x;
        const dy = mouse.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ATTRACT_RADIUS && dist > 0) {
          const force = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
          a.vx += (dx / dist) * force * dist;
          a.vy += (dy / dist) * force * dist;
        }

        // dampen + integrate
        a.vx *= DAMPING;
        a.vy *= DAMPING;
        a.x += a.vx;
        a.y += a.vy;

        // opacity pulse
        a.opacity += 0.002 * a.opacityDir;
        if (a.opacity > 0.75) { a.opacity = 0.75; a.opacityDir = -1; }
        if (a.opacity < 0.2)  { a.opacity = 0.2;  a.opacityDir = 1; }

        // links
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const ldx = a.x - b.x;
          const ldy = a.y - b.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
          if (ldist < LINK_DISTANCE) {
            const alpha = (1 - ldist / LINK_DISTANCE) * 0.55;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${LINK_COLOR},${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }

        // node
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${NODE_COLOR},${a.opacity})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}
