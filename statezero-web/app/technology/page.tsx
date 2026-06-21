import type { Metadata } from "next";
import Link from "next/link";
import CrisprBlock from "../../src/components/tech/CrisprBlock";

export const metadata: Metadata = {
  title: "Technology — StateZero Labs",
  description:
    "Core compute engine: LINCS ligand screening, Virtual CRISPR RL agent, and Transcriptomic-to-Fingerprint Encoding.",
};

export default function TechnologyPage() {
  return (
    <div className="min-h-screen text-[#F4F4FB]">

      {/* Nav */}
      <div className="border-b border-[#334155]">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-[#8D88B3] hover:text-[#22C55E] transition-colors duration-150"
          >
            ← statezero.labs
          </Link>
          <span className="text-[#334155] select-none">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#22C55E]">
            technology
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6">

        {/* Page header */}
        <div className="pt-16 pb-14 border-b border-[#334155]">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED]">
            ENGINE::CORE_COMPUTE
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Core Compute Engine
          </h1>
          <p className="mt-4 max-w-2xl text-[#8D88B3] text-base leading-relaxed">
            A three-stage pipeline that translates single-cell transcriptomic
            disease coordinates into synthesizable small-molecule candidates —
            entirely in silico.
          </p>

          {/* Pipeline flow indicator */}
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest">
            <span className="text-[#22C55E]">LINCS Screening</span>
            <span className="text-[#334155]">──▶</span>
            <span className="text-[#7C3AED]">Virtual CRISPR</span>
            <span className="text-[#334155]">──▶</span>
            <span className="text-[#22C55E]">TFE Encoder</span>
            <span className="text-[#334155]">──▶</span>
            <span className="text-[#F4F4FB]">Candidate</span>
          </div>
        </div>

        {/* Bento grid */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            {/* ── Block 1: LINCS Screening — wide top card ── */}
            <div
              className="md:col-span-7 relative rounded-2xl overflow-hidden bg-[#141425] p-8 group"
              style={{
                border: "1px solid transparent",
                backgroundClip: "padding-box",
                boxShadow: "inset 0 0 0 1px rgba(34,197,94,0.18), 0 0 24px rgba(34,197,94,0.06)",
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-24 h-24 opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle at top left, #22C55E, transparent 70%)" }} />

              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#22C55E] mb-4">
                STAGE::01
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-4">
                Biological Ligand Screening
              </h2>

              <p className="text-[#8D88B3] text-sm leading-relaxed mb-6">
                Screens the NIH LINCS Phase I L1000 dataset (
                <span className="font-mono text-[#22C55E]">GSE92742</span>) —
                filtered exclusively for{" "}
                <span className="font-mono text-[#22C55E]">trt_lig</span>{" "}
                perturbations — to evaluate recombinant ligands, cytokines, and
                morphogens. The engine calculates multi-dimensional cell-state
                transitions using{" "}
                <span className="font-mono text-[#22C55E]">Cosine Similarity</span>,{" "}
                <span className="font-mono text-[#22C55E]">Earth Mover&apos;s Distance (EMD)</span>,
                and{" "}
                <span className="font-mono text-[#22C55E]">Mean Squared Error (MSE)</span>{" "}
                to identify vectors that collapse the fibrotic manifold into the
                regenerative fetal blueprint.
              </p>

              {/* Metric chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["GSE92742", "trt_lig filter", "Cosine Sim", "EMD", "MSE"].map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 border border-[#22C55E]/30 text-[#22C55E] bg-[#22C55E]/5"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Terminal data table */}
              <div className="border border-[#334155] overflow-hidden text-xs font-mono">
                {/* Header row */}
                <div className="grid grid-cols-3 border-b border-[#334155] bg-[#0A0A14]">
                  <span className="px-3 py-2 text-[#8D88B3] uppercase tracking-wider">Ligand</span>
                  <span className="px-3 py-2 text-[#8D88B3] uppercase tracking-wider border-l border-[#334155]">Cos_Sim (Trajectory)</span>
                  <span className="px-3 py-2 text-[#8D88B3] uppercase tracking-wider border-l border-[#334155]">EMD (Manifold Shift)</span>
                </div>
                {/* EGF — winning hit */}
                <div className="grid grid-cols-3 border-b border-[#334155] bg-[#22C55E]/5">
                  <span className="px-3 py-2 text-[#22C55E] font-semibold">EGF ●</span>
                  <span className="px-3 py-2 text-[#22C55E] border-l border-[#334155]">0.92</span>
                  <span className="px-3 py-2 text-[#22C55E] border-l border-[#334155]">1.14</span>
                </div>
                {/* FGF2 — neutral */}
                <div className="grid grid-cols-3 border-b border-[#334155]">
                  <span className="px-3 py-2 text-[#CBD5E1]">FGF2</span>
                  <span className="px-3 py-2 text-[#CBD5E1] border-l border-[#334155]">0.85</span>
                  <span className="px-3 py-2 text-[#CBD5E1] border-l border-[#334155]">1.42</span>
                </div>
                {/* TGFB1 — divergent / pro-fibrotic */}
                <div className="grid grid-cols-3 bg-[#7C3AED]/5">
                  <span className="px-3 py-2 text-[#64748B]">TGFB1 ✕</span>
                  <span className="px-3 py-2 text-[#64748B] border-l border-[#334155]">−0.65</span>
                  <span className="px-3 py-2 text-[#F87171]/70 border-l border-[#334155]">5.89</span>
                </div>
              </div>
            </div>

            {/* ── Block 2: Virtual CRISPR (client component for animation) ── */}
            <div className="md:col-span-5">
              <CrisprBlock />
            </div>

            {/* ── Block 3: TFE Encoder — full width bottom ── */}
            <div
              className="md:col-span-12 relative rounded-2xl overflow-hidden bg-[#141425] p-8"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(124,58,237,0.18), 0 0 24px rgba(124,58,237,0.06)",
              }}
            >
              <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle at bottom right, #7C3AED, transparent 70%)" }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#7C3AED] mb-4">
                    STAGE::03
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-4">
                    Transcriptomic-to-Fingerprint Encoder
                  </h2>
                  <p className="text-[#8D88B3] text-sm leading-relaxed">
                    Translates the target genetic coordinate vector — the output of
                    the Virtual CRISPR agent — directly into{" "}
                    <span className="font-mono text-[#A78BFA]">Morgan Fingerprint</span>{" "}
                    chemical space. Maps biological reprogramming intent to
                    synthesizable polypharmacology candidates without manual
                    chemical intuition.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Code-style transform visual */}
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#334155] mb-3">
                    Encoding Pipeline
                  </p>
                  {[
                    {
                      from: "ΔExpression Vector",
                      to: "Latent Embedding",
                      color: "#22C55E",
                    },
                    {
                      from: "Latent Embedding",
                      to: "Morgan Fingerprint",
                      color: "#A78BFA",
                    },
                    {
                      from: "Morgan Fingerprint",
                      to: "Candidate Molecule",
                      color: "#7C3AED",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#8D88B3] truncate">{step.from}</span>
                      <span className="text-[#334155] shrink-0">──▶</span>
                      <span style={{ color: step.color }} className="truncate">
                        {step.to}
                      </span>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t border-[#334155] flex flex-wrap gap-2">
                    {["Morgan FP", "2048-bit vector", "Tanimoto similarity", "Polypharmacology"].map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[#7C3AED]/30 text-[#A78BFA] bg-[#7C3AED]/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="border-t border-[#334155]">
        <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-[#334155] uppercase tracking-widest">
            StateZero Labs © 2026
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/documentation"
              className="font-mono text-xs uppercase tracking-widest text-[#334155] hover:text-[#22C55E] transition-colors duration-150"
            >
              Documentation →
            </Link>
            <Link
              href="/company"
              className="font-mono text-xs uppercase tracking-widest text-[#334155] hover:text-[#22C55E] transition-colors duration-150"
            >
              Company →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
