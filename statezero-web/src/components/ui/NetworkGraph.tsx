"use client";

import { motion } from "framer-motion";

// Nodes — 3 central hubs (indices 0,1,2) + 15 peripheral
const NODES = [
  // hub nodes — centre cluster
  { id: 0, x: 48,  y: 50, hub: true  },
  { id: 1, x: 65,  y: 35, hub: true  },
  { id: 2, x: 62,  y: 65, hub: true  },
  // periphery
  { id: 3,  x: 12,  y: 18, hub: false },
  { id: 4,  x: 28,  y: 10, hub: false },
  { id: 5,  x: 8,   y: 42, hub: false },
  { id: 6,  x: 20,  y: 70, hub: false },
  { id: 7,  x: 35,  y: 85, hub: false },
  { id: 8,  x: 55,  y: 88, hub: false },
  { id: 9,  x: 78,  y: 80, hub: false },
  { id: 10, x: 90,  y: 58, hub: false },
  { id: 11, x: 88,  y: 30, hub: false },
  { id: 12, x: 72,  y: 12, hub: false },
  { id: 13, x: 50,  y: 14, hub: false },
  { id: 14, x: 30,  y: 30, hub: false },
  { id: 15, x: 22,  y: 52, hub: false },
  { id: 16, x: 75,  y: 50, hub: false },
  { id: 17, x: 42,  y: 68, hub: false },
] as const;

// Edges — connections between nodes
const EDGES = [
  // hub–hub
  [0, 1], [1, 2], [0, 2],
  // periphery → hubs
  [3, 0],  [4, 1],  [5, 0],  [6, 0],  [7, 2],
  [8, 2],  [9, 2],  [10, 1], [11, 1], [12, 1],
  [13, 1], [14, 0], [15, 0], [16, 1], [17, 2],
  // periphery–periphery shortcuts
  [3, 4], [5, 6], [6, 15], [7, 8], [9, 10], [11, 12], [13, 14],
] as const;

// Which edges lead into a hub node
function isHubEdge(a: number, b: number) {
  return NODES[a].hub || NODES[b].hub;
}

interface Props {
  hovered: boolean;
}

export default function NetworkGraph({ hovered }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const na = NODES[a];
        const nb = NODES[b];
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const hubEdge = isHubEdge(a, b);

        return (
          <motion.line
            key={i}
            x1={na.x} y1={na.y}
            x2={nb.x} y2={nb.y}
            strokeWidth={hubEdge ? 0.5 : 0.3}
            strokeLinecap="round"
            // dash-offset animation — "severing" effect on hub edges
            strokeDasharray={hubEdge ? len : undefined}
            animate={
              hubEdge
                ? {
                    stroke: hovered ? "#7C3AED" : "rgba(255,255,255,0.12)",
                    strokeDashoffset: hovered ? len : 0,
                    opacity: hovered ? 0.5 : 0.9,
                  }
                : {
                    stroke: "rgba(255,255,255,0.08)",
                    opacity: hovered ? 0.3 : 0.6,
                  }
            }
            transition={{ duration: 0.6, ease: "easeInOut", delay: (i % 5) * 0.04 }}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          animate={
            node.hub
              ? {
                  r: hovered ? 2.4 : 1.6,
                  fill: hovered ? "#7C3AED" : "rgba(124,58,237,0.55)",
                  filter: hovered
                    ? "drop-shadow(0 0 3px #7C3AED)"
                    : "none",
                }
              : {
                  r: 0.9,
                  fill: hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.35)",
                }
          }
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}
