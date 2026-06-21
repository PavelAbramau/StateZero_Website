"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Play, RotateCcw } from "lucide-react";

type StageStatus = "waiting" | "processing" | "completed";

const STAGES = [
  {
    id: 0,
    tag: "STAGE::01",
    title: "Proprietary Data Ingestion",
    subtitle: "scRNA-seq tissue assay loading",
    logs: [
      "$ mounting internal tissue atlas v3.1...",
      "$ loading hypertrophic scar profiles [T_pre]...",
      "$ loading fetal skin regenerative atlas [T_post]...",
      "$ normalizing 47,293 cell barcodes...",
      "$ QC filter: 98.2% cells passed",
    ],
  },
  {
    id: 1,
    tag: "STAGE::02",
    title: "Microenvironment Anchoring",
    subtitle: "LINCS GSE92742 ligand perturbation screening",
    logs: [
      "$ connecting NIH LINCS Phase I dataset...",
      "$ filtering trt_lig perturbations only...",
      "$ computing MSE(T_pre → T_post) for 847 ligands...",
      "$ top candidate: EGF [MSE: 0.114]",
      "$ ranked shortlist: EGF, FGF2, TGFB1 selected",
    ],
  },
  {
    id: 2,
    tag: "STAGE::03",
    title: "Virtual CRISPR RL Agent",
    subtitle: "Scale-free hub knockout simulation",
    logs: [
      "$ initializing reinforcement learning agent...",
      "$ simulating parallelized multi-gene knockouts...",
      "$ targeting TGF-β/SMAD master regulatory hubs...",
      "$ iteration 4,200,000 — trajectory shift: −0.83σ",
      "$ hub collapse: SUCCESS. optimal KO set locked.",
    ],
  },
  {
    id: 3,
    tag: "STAGE::04",
    title: "TFE Chemical Translation",
    subtitle: "Transcriptomic → Morgan Fingerprint encoding",
    logs: [
      "$ encoding ΔExpression vector → latent space...",
      "$ projecting to 2048-bit Morgan Fingerprint space...",
      "$ Tanimoto similarity search complete...",
      "$ candidate SZ-01 crystallized [score: 0.89]",
      "$ polypharmacology cocktail output: READY",
    ],
  },
] as const;

const TOTAL_STAGES = STAGES.length;
const STAGE_DURATION = 4500; // ms per stage — slower, more readable

export default function Platform() {
  const [currentStage, setCurrentStage] = useState<number>(-1); // -1 = idle
  // All logs accumulated across stages — never cleared between stages
  const [allLogs, setAllLogs] = useState<{ stage: number; line: string }[]>([]);
  const logTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logTerminalRef = useRef<HTMLDivElement>(null);

  function stageStatus(idx: number): StageStatus {
    if (currentStage < 0)           return "waiting";
    if (idx < currentStage)         return "completed";
    if (idx === currentStage)       return "processing";
    return "waiting";
  }

  function clearAllTimers() {
    logTimers.current.forEach(clearTimeout);
    logTimers.current = [];
    if (stageTimer.current) clearTimeout(stageTimer.current);
  }

  function reset() {
    clearAllTimers();
    setCurrentStage(-1);
    setAllLogs([]);
  }

  function start() {
    reset();
    // Small delay so reset flushes before starting
    setTimeout(() => setCurrentStage(0), 50);
  }

  // Advance stages
  useEffect(() => {
    if (currentStage < 0 || currentStage >= TOTAL_STAGES) return;
    stageTimer.current = setTimeout(() => {
      setCurrentStage((s) => s + 1);
    }, STAGE_DURATION);
    return () => { if (stageTimer.current) clearTimeout(stageTimer.current); };
  }, [currentStage]);

  // Stream logs — append to the shared log list, never clear
  useEffect(() => {
    if (currentStage < 0 || currentStage >= TOTAL_STAGES) return;
    const logs = STAGES[currentStage].logs;
    const interval = (STAGE_DURATION * 0.75) / logs.length; // stream over 75% of stage time
    logs.forEach((line, i) => {
      const t = setTimeout(() => {
        setAllLogs((prev) => [...prev, { stage: currentStage, line }]);
        requestAnimationFrame(() => {
          if (logTerminalRef.current) {
            logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
          }
        });
      }, i * interval);
      logTimers.current.push(t);
    });
    return () => { logTimers.current.forEach(clearTimeout); logTimers.current = []; };
  }, [currentStage]);

  const isRunning  = currentStage >= 0 && currentStage < TOTAL_STAGES;
  const isDone     = currentStage >= TOTAL_STAGES;

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">

        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">
            ENGINE::PIPELINE
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4FB]">
            The StateZero Engine
          </h2>
          <p className="mt-3 text-[#8D88B3] text-sm max-w-md mx-auto">
            Four-stage computational pipeline from raw tissue data to validated drug candidate.
          </p>
        </div>

        {/* Start / Reset button */}
        <div className="flex justify-center mb-12">
          {!isRunning && !isDone && (
            <motion.button
              onClick={start}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-3 border border-[#22C55E] bg-transparent text-[#F4F4FB] font-mono text-sm uppercase tracking-widest transition-all duration-200 hover:bg-[#22C55E]/10 hover:shadow-[0_0_24px_rgba(34,197,94,0.3)]"
            >
              <Play size={14} className="text-[#22C55E]" />
              Initialize Engine
            </motion.button>
          )}
          {isDone && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={reset}
              className="flex items-center gap-3 px-8 py-3 border border-[#334155] text-[#8D88B3] font-mono text-sm uppercase tracking-widest hover:border-[#7C3AED] hover:text-[#F4F4FB] transition-all duration-200"
            >
              <RotateCcw size={14} />
              Reset Pipeline
            </motion.button>
          )}
        </div>

        {/* Pipeline stages */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[27px] top-10 bottom-10 w-px bg-white/5 z-0" />

          <div className="flex flex-col gap-3">
            {STAGES.map((stage, idx) => {
              const status = stageStatus(idx);
              return (
                <div key={stage.id}>
                  <motion.div
                    animate={{ opacity: status === "waiting" ? 0.35 : 1 }}
                    transition={{ duration: 0.4 }}
                    className={`
                      relative z-10 flex items-start gap-5 border rounded-2xl p-6
                      transition-all duration-300
                      ${status === "processing"
                        ? "border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.18)] bg-white/5"
                        : status === "completed"
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-white/5 bg-transparent"}
                    `}
                  >
                    {/* Status icon */}
                    <div
                      className={`
                        mt-0.5 flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center
                        transition-all duration-300
                        ${status === "processing"
                          ? "border-[#22C55E] bg-[#22C55E]/10"
                          : status === "completed"
                          ? "border-[#22C55E] bg-[#22C55E]/15"
                          : "border-white/10 bg-white/5"}
                      `}
                    >
                      {status === "processing" && (
                        <Loader2 size={16} className="text-[#22C55E] animate-spin" />
                      )}
                      {status === "completed" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Check size={16} className="text-[#22C55E]" />
                        </motion.div>
                      )}
                      {status === "waiting" && (
                        <span className="font-mono text-xs text-[#334155]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    {/* Stage info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7C3AED] mb-1">
                        {stage.tag}
                      </p>
                      <h3 className="font-semibold text-[#F4F4FB] leading-tight">
                        {stage.title}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-[#8D88B3]">
                        {stage.subtitle}
                      </p>
                    </div>

                    {/* Processing badge */}
                    {status === "processing" && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#22C55E] border border-[#22C55E]/30 px-2 py-1"
                      >
                        Running
                      </motion.span>
                    )}
                    {status === "completed" && (
                      <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#334155] border border-white/5 px-2 py-1">
                        Done
                      </span>
                    )}
                  </motion.div>

                  {/* Persistent log terminal — shows when this stage has any logs */}
                  {(status === "processing" || status === "completed") && (() => {
                    const stageLogs = allLogs.filter((l) => l.stage === idx);
                    if (stageLogs.length === 0) return null;
                    return (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="ml-14 mt-1.5"
                      >
                        <div
                          ref={status === "processing" ? logTerminalRef : undefined}
                          className="bg-[#06060F] border border-white/5 rounded-xl px-4 py-3 font-mono text-xs space-y-1 max-h-36 overflow-y-auto"
                        >
                          {stageLogs.map((entry, i) => (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2 }}
                              className={status === "completed" ? "text-[#334155]" : "text-[#7C3AED]"}
                            >
                              {entry.line}
                            </motion.p>
                          ))}
                          {status === "processing" && (
                            <p className="text-[#334155] animate-pulse">▋</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion banner */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 border border-[#22C55E]/40 bg-[#22C55E]/5 rounded-2xl px-6 py-5 text-center"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#22C55E] mb-2">
                PIPELINE::COMPLETE
              </p>
              <p className="text-[#F4F4FB] font-semibold">
                Candidate <span className="text-[#22C55E]">SZ-01</span> generated — 89% in-silico reversal score.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
