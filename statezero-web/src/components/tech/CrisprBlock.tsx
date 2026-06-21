"use client";

import { useEffect, useRef, useState } from "react";

const KNOCKOUT_TARGETS = [
  "TGF-β / SMAD3",
  "COL1A1 hub",
  "ACTA2 node",
  "CTGF regulator",
  "MMP2 axis",
  "FN1 network",
  "POSTN cluster",
];

function useCounter(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

export default function CrisprBlock() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scanWidth, setScanWidth] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const knockouts = useCounter(4_200_000);

  // cycle through knockout targets
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % KNOCKOUT_TARGETS.length);
    }, 900);
    return () => clearInterval(intervalRef.current!);
  }, []);

  // scanning progress bar — loops 0 → 100 over ~3s
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const PERIOD = 3000;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) % PERIOD;
      setScanWidth(Math.round((elapsed / PERIOD) * 100));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="h-full rounded-2xl overflow-hidden bg-[#141425] p-7 flex flex-col"
      style={{
        boxShadow:
          "inset 0 0 0 1px rgba(124,58,237,0.28), 0 0 28px rgba(124,58,237,0.08)",
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, #7C3AED, transparent 70%)",
        }}
      />

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#7C3AED] mb-4">
        STAGE::02
      </p>
      <h2 className="text-xl font-extrabold tracking-tight mb-3">
        Virtual CRISPR RL Agent
      </h2>
      <p className="text-[#8D88B3] text-sm leading-relaxed mb-6">
        Reinforcement learning simulates parallelised multi-gene knockouts
        targeting scale-free master regulatory hubs — collapsing fibrotic
        trajectories via{" "}
        <span className="font-mono text-[#A78BFA]">TGF-β / SMAD</span>{" "}
        pathway suppression.
      </p>

      {/* Simulated computation panel */}
      <div className="flex-1 border border-[#7C3AED]/20 bg-[#06060F] rounded-xl p-4 font-mono text-xs space-y-3">

        {/* Pulsing status dot + label */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]" />
          </span>
          <span className="text-[#7C3AED] uppercase tracking-widest">
            Simulation running
          </span>
        </div>

        {/* Knockout counter */}
        <div className="flex justify-between text-[#8D88B3]">
          <span>Knockouts evaluated</span>
          <span className="text-[#F4F4FB] tabular-nums">
            {knockouts.toLocaleString()}
          </span>
        </div>

        {/* Active target — cycles */}
        <div className="flex justify-between text-[#8D88B3]">
          <span>Active target</span>
          <span className="text-[#A78BFA] transition-all duration-300">
            {KNOCKOUT_TARGETS[activeIdx]}
          </span>
        </div>

        {/* Scanning progress bar */}
        <div>
          <div className="flex justify-between text-[#334155] mb-1.5">
            <span>Network scan</span>
            <span className="text-[#8D88B3]">{scanWidth}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED]/70 to-[#A78BFA]"
              style={{ width: `${scanWidth}%`, transition: "width 80ms linear" }}
            />
          </div>
        </div>

        {/* Log lines */}
        <div className="pt-1 border-t border-[#334155] text-[#334155] space-y-1">
          <p>
            <span className="text-[#7C3AED]">&gt;</span> hub collapse:{" "}
            <span className="text-[#22C55E]">SUCCESS</span>
          </p>
          <p>
            <span className="text-[#7C3AED]">&gt;</span> trajectory shift: −0.83σ
          </p>
          <p>
            <span className="text-[#7C3AED]">&gt;</span> next iteration...{" "}
            <span className="animate-pulse">▋</span>
          </p>
        </div>
      </div>
    </div>
  );
}
