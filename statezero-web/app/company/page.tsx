import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Company — StateZero Labs",
  description:
    "Mission, leadership, and scientific foundation of StateZero Labs — computational TechBio focused on reprogramming fibrotic tissue.",
};

const team = [
  {
    initials: "PA",
    name: "Pavel Abramau",
    handle: "PavelAbramau",
    role: "CEO / Lead AI Architect",
    location: "Remote · EU",
    bio: "Architect of the StateZero computational engine. Designed the full latent-space transcriptomics pipeline — from scRNA-seq ingestion and LINCS perturbation screening to Virtual CRISPR simulation and the Transcriptomic-to-Fingerprint Encoder. Thin-client SSH architecture connecting a lightweight Mac to a 1 TB Ryzen execution core.",
    tags: ["Next.js", "Python", "Nextflow", "PyTorch", "scRNA-seq"],
    cardHref: "https://www.linkedin.com/in/pavel-abramau/",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/PavelAbramau",
        icon: "⌥",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pavel-abramau/",
        icon: "↗",
      },
    ],
  },
  {
    initials: "PS",
    name: "Prof. Paweł Sachadyn",
    handle: "p.sachadyn",
    role: "Scientific Lead · Biomedical",
    location: "Gdańsk University of Technology",
    bio: "Full Professor of Biotechnology at GUT-PB. Specialist in molecular biology, genetic engineering, and regenerative tissue research. Provides scientific oversight on the biological framework — from T_pre disease-state profiling to fetal T_post target blueprint validation and wet-lab translation strategy.",
    tags: ["Molecular Biology", "Regenerative Medicine", "Genetic Engineering"],
    cardHref: "https://www.researchgate.net/profile/Pawel-Sachadyn",
    links: [
      {
        label: "ResearchGate",
        href: "https://www.researchgate.net/profile/Pawel-Sachadyn",
        icon: "↗",
      },
      {
        label: "Institution",
        href: "https://pg.edu.pl",
        icon: "↗",
      },
    ],
  },
] as const;

const missionStats = [
  { value: "89%", label: "In-silico cell-state reversal (SZ-01)" },
  { value: "3", label: "Pipeline assets in development" },
  { value: "1", label: "Validated lead therapeutic candidate" },
  { value: "∞", label: "Fibrotic trajectories modelled" },
] as const;

export default function CompanyPage() {
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
            company
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6">

        {/* ── Page header ── */}
        <div className="pt-16 pb-14 border-b border-[#334155]">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED]">
            ORG::PROFILE
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            StateZero Labs
          </h1>
          <p className="mt-3 font-mono text-sm text-[#8D88B3] uppercase tracking-widest">
            Pre-seed TechBio · Computational Tissue Reprogramming
          </p>
        </div>

        {/* ── Mission ── */}
        <section className="py-16 border-b border-[#334155]">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-5">
            SYS::MISSION
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5">
                Reprogramming Tissue via Latent Space
              </h2>
              <div className="space-y-4 text-[#8D88B3] leading-relaxed text-sm sm:text-base">
                <p>
                  Fibrosis — the pathological scarring of tissue — is the
                  endpoint of severe burns, deep skin trauma, and chronic
                  inflammatory damage. Current treatments address symptoms.
                  StateZero targets the root cause at the transcriptomic level.
                </p>
                <p>
                  Our platform models biological tissue as a programmable
                  state-space. We profile fibrotic disease states (
                  <span className="font-mono text-[#22C55E]">T_pre</span>) and
                  define a healthy fetal regenerative blueprint (
                  <span className="font-mono text-[#22C55E]">T_post</span>),
                  then computationally solve for the minimal perturbation
                  vector that collapses the fibrotic trajectory back to the
                  target — without slow, traditional wet-lab trial and error.
                </p>
                <p>
                  The result is{" "}
                  <span className="text-[#F4F4FB] font-semibold">SZ-01</span>
                  : a computationally validated topical polypharmacology
                  cocktail achieving an 89% in-silico cell-state reversal score
                  against hypertrophic scar and deep burn profiles.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 content-start">
              {missionStats.map((s) => (
                <div
                  key={s.label}
                  className="border border-[#334155] bg-[#06060F] rounded-xl p-5"
                >
                  <p className="font-mono text-3xl font-extrabold text-[#22C55E]">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs text-[#8D88B3] leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section className="py-16">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-5">
            TEAM::LEADERSHIP
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-10">
            Architects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.initials}
                className="border border-[#334155] bg-[#06060F] rounded-xl overflow-hidden hover:border-[#22C55E]/40 transition-colors duration-200"
              >
                {/* Card header — terminal title bar */}
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#334155] bg-[#0A0A14]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="font-mono text-[11px] text-[#334155]">
                    ~/.statezero/{member.handle}
                  </span>
                  <a
                    href={member.cardHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest text-[#334155] hover:text-[#22C55E] transition-colors duration-150"
                  >
                    View ↗
                  </a>
                </div>

                {/* Card body */}
                <div className="p-6">
                  {/* Avatar row */}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 shrink-0 rounded-lg border border-white/10 flex items-center justify-center text-base font-extrabold text-[#F4F4FB]"
                      style={{
                        background:
                          "linear-gradient(135deg,rgba(34,197,94,0.2) 0%,rgba(124,58,237,0.2) 100%)",
                      }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-[#F4F4FB] leading-tight">
                        {member.name}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#22C55E] mt-0.5">
                        {member.role}
                      </p>
                      <p className="font-mono text-[11px] text-[#334155] mt-0.5">
                        {member.location}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-[#8D88B3] text-sm leading-relaxed mb-5">
                    {member.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[#334155] text-[#8D88B3]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#334155]">
                    {member.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-widest text-[#8D88B3] hover:text-[#22C55E] transition-colors duration-150 flex items-center gap-1.5"
                      >
                        <span>{link.icon}</span>
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="border-t border-[#334155] mt-8">
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
              href="/"
              className="font-mono text-xs uppercase tracking-widest text-[#334155] hover:text-[#22C55E] transition-colors duration-150"
            >
              Platform →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
