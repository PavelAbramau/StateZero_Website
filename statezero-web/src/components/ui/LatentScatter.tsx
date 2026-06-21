"use client";

import { motion } from "framer-motion";

// Deterministic pseudo-random seeded positions
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Generate dot positions as % of container
const DOTS = Array.from({ length: 30 }, (_, i) => ({
  // Disease cluster — bottom-left, tight scatter
  x0: 8  + seededRand(i * 3)     * 28,
  y0: 58 + seededRand(i * 3 + 1) * 30,
  // Target blueprint — top-right, organised spread
  x1: 58 + seededRand(i * 3 + 2) * 30,
  y1: 8  + seededRand(i * 3 + 3) * 32,
}));

// Visual cluster centres for the arrow
const FROM = { x: 22, y: 73 }; // ~center of T_pre cluster
const TO   = { x: 73, y: 24 }; // ~center of T_post cluster

interface Props {
  hovered: boolean;
}

export default function LatentScatter({ hovered }: Props) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden>

      {/* Dots */}
      {DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ left: 0, top: 0 }}
          animate={{
            x: `calc(${hovered ? dot.x1 : dot.x0}% - 3px)`,
            y: `calc(${hovered ? dot.y1 : dot.y0}% - 3px)`,
            backgroundColor: hovered
              ? "rgba(34,197,94,0.85)"
              : "rgba(255,255,255,0.2)",
            boxShadow: hovered
              ? "0 0 6px rgba(34,197,94,0.6)"
              : "none",
          }}
          transition={{
            duration: 0.7,
            delay: i * 0.012,
            ease: [0.34, 1.1, 0.64, 1],
          }}
        />
      ))}

      {/* Dashed vector arrow */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, delay: hovered ? 0.45 : 0 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="5"
            markerHeight="4"
            refX="5"
            refY="2"
            orient="auto"
          >
            <polygon
              points="0 0, 5 2, 0 4"
              fill="#22C55E"
              opacity={0.7}
            />
          </marker>
        </defs>

        <motion.line
          x1={FROM.x}
          y1={FROM.y}
          x2={TO.x}
          y2={TO.y}
          stroke="#22C55E"
          strokeWidth={0.6}
          strokeDasharray="3 2"
          strokeOpacity={0.55}
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        />

        {/* Cluster labels */}
        {hovered && (
          <>
            <text
              x={FROM.x - 2}
              y={FROM.y + 5}
              fontSize="3.5"
              fill="#8D88B3"
              fontFamily="monospace"
              textAnchor="middle"
            >
              T_pre
            </text>
            <text
              x={TO.x + 2}
              y={TO.y - 3}
              fontSize="3.5"
              fill="#22C55E"
              fontFamily="monospace"
              textAnchor="middle"
            >
              T_post
            </text>
          </>
        )}
      </motion.svg>

    </div>
  );
}
