"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

// Hexagon vertices centred at (72, 30) r=16
function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

const HEX_CX = 72;
const HEX_CY = 30;
const HEX_R  = 16;
const HEX_R2 = 10; // inner ring

// 5 transcriptomic bars — x fixed, heights vary
const BARS = [
  { x: 10, h: 18, y: 16 },
  { x: 16, h: 26, y: 8  },
  { x: 22, h: 14, y: 20 },
  { x: 28, h: 22, y: 12 },
  { x: 34, h: 10, y: 24 },
];

interface Props { hovered: boolean }

export default function TranslationMorph({ hovered }: Props) {
  const pulseCtrl   = useAnimation();
  const hexCtrl     = useAnimation();
  const innerCtrl   = useAnimation();
  const barsCtrl    = useAnimation();

  useEffect(() => {
    if (hovered) {
      // 1. Bars light up
      barsCtrl.start({ fill: "#22C55E", opacity: 0.7, transition: { duration: 0.25 } });
      // 2. Pulse travels right along connector line
      pulseCtrl.start({
        cx: HEX_CX,
        opacity: [0, 1, 1, 0],
        transition: { duration: 0.65, ease: "easeIn", delay: 0.15 },
      }).then(() => {
        // 3. Hexagon lights up
        hexCtrl.start({
          stroke: "#22C55E",
          strokeOpacity: 0.9,
          filter: "drop-shadow(0 0 4px #22C55E)",
          transition: { duration: 0.3 },
        });
        // 4. Inner ring expands
        innerCtrl.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.4, ease: [0.34, 1.2, 0.64, 1] },
        });
      });
    } else {
      // Reset all
      pulseCtrl.start({ cx: 40, opacity: 0, transition: { duration: 0.2 } });
      hexCtrl.start({
        stroke: "rgba(255,255,255,0.15)",
        strokeOpacity: 1,
        filter: "none",
        transition: { duration: 0.3 },
      });
      innerCtrl.start({ scale: 0, opacity: 0, transition: { duration: 0.25 } });
      barsCtrl.start({ fill: "rgba(255,255,255,0.18)", opacity: 1, transition: { duration: 0.3 } });
    }
  }, [hovered, pulseCtrl, hexCtrl, innerCtrl, barsCtrl]);

  return (
    <svg
      viewBox="0 0 100 60"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {/* ── Transcriptomic bars ── */}
      {BARS.map((bar, i) => (
        <motion.rect
          key={i}
          x={bar.x - 2}
          y={bar.y}
          width={4}
          height={bar.h}
          rx={1}
          animate={barsCtrl}
          initial={{ fill: "rgba(255,255,255,0.18)", opacity: 1 }}
        />
      ))}

      {/* Bar labels */}
      <text x="22" y="56" fontSize="3" fill="rgba(255,255,255,0.2)" textAnchor="middle" fontFamily="monospace">
        ΔExpression
      </text>

      {/* ── Connector line ── */}
      <line
        x1="38" y1="30" x2="54" y2="30"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.5"
        strokeDasharray="2 1.5"
      />

      {/* Traveling pulse */}
      <motion.circle
        cx={40} cy={30} r={2}
        fill="#7C3AED"
        initial={{ cx: 40, opacity: 0 }}
        animate={pulseCtrl}
        style={{ filter: "drop-shadow(0 0 3px #7C3AED)" }}
      />

      {/* ── Outer hexagon ── */}
      <motion.polygon
        points={hexPoints(HEX_CX, HEX_CY, HEX_R)}
        fill="transparent"
        strokeWidth={0.8}
        animate={hexCtrl}
        initial={{ stroke: "rgba(255,255,255,0.15)", strokeOpacity: 1, filter: "none" }}
      />

      {/* Inner ring (molecule marker) — starts hidden, scales in */}
      <motion.polygon
        points={hexPoints(HEX_CX, HEX_CY, HEX_R2)}
        fill="rgba(34,197,94,0.08)"
        stroke="#22C55E"
        strokeWidth={0.5}
        strokeOpacity={0.6}
        transformOrigin={`${HEX_CX}px ${HEX_CY}px`}
        initial={{ scale: 0, opacity: 0 }}
        animate={innerCtrl}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* Centre molecule dot */}
      <motion.circle
        cx={HEX_CX} cy={HEX_CY} r={1.5}
        initial={{ opacity: 0 }}
        animate={innerCtrl}
        fill="#22C55E"
        style={{ filter: "drop-shadow(0 0 2px #22C55E)" }}
      />

      {/* Hex label */}
      <text x={HEX_CX} y="53" fontSize="3" fill="rgba(255,255,255,0.2)" textAnchor="middle" fontFamily="monospace">
        Morgan FP
      </text>
    </svg>
  );
}
