const PHASES = ["In Silico", "Lead Opt", "In Vitro", "Ex Vivo", "Phase 1"] as const;

const assets = [
  {
    id: "SZ-01",
    label: "Lead Asset",
    sub: "Topical Polypharmacology",
    // 3 phases complete + midway through Ex Vivo (4th)
    fillPct: 72,
    color: "green" as const,
  },
  {
    id: "SZ-02",
    label: "",
    sub: "Next-Gen Inhibitor",
    // 2 phases complete + midway through In Vitro (3rd)
    fillPct: 55,
    color: "green" as const,
  },
  {
    id: "GF-01",
    label: "",
    sub: "Biologic Ligand",
    // In Silico only
    fillPct: 18,
    color: "violet" as const,
  },
] as const;

const gradients = {
  green: {
    bar: "from-[#22C55E]/80 to-[#22C55E]",
    glow: "0 0 14px 2px rgba(34,197,94,0.35)",
  },
  violet: {
    bar: "from-[#7C3AED]/80 to-[#7C3AED]",
    glow: "0 0 14px 2px rgba(124,58,237,0.35)",
  },
};

export default function Pipeline() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#22C55E]">
            PIPELINE::MATRIX
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F4FB]">
            Development Pipeline
          </h2>
        </div>

        {/* Horizontally scrollable on mobile */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">

            {/* Column header row */}
            <div className="grid grid-cols-[160px_1fr] gap-6 pb-4 border-b border-white/10">
              <div className="font-mono text-xs uppercase tracking-widest text-[#8D88B3]">
                Asset
              </div>
              {/* 5 phase headers, each 20% of the 1fr track */}
              <div className="grid grid-cols-5">
                {PHASES.map((phase) => (
                  <div
                    key={phase}
                    className="font-mono text-xs uppercase tracking-widest text-[#8D88B3] text-center"
                  >
                    {phase}
                  </div>
                ))}
              </div>
            </div>

            {/* Asset rows */}
            <div className="divide-y divide-white/5">
              {assets.map((asset) => {
                const { bar, glow } = gradients[asset.color];
                return (
                  <div
                    key={asset.id}
                    className="grid grid-cols-[160px_1fr] gap-6 py-5 px-2 -mx-2 rounded-lg transition-colors duration-150 hover:bg-white/5"
                  >
                    {/* Asset name */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-sm font-bold text-[#F4F4FB]">
                          {asset.id}
                        </span>
                        {asset.label && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#22C55E]">
                            {asset.label}
                          </span>
                        )}
                      </div>
                      <span className="mt-0.5 text-xs text-[#8D88B3]">
                        {asset.sub}
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="flex items-center">
                      <div className="relative w-full h-3 rounded-full bg-white/5">
                        {/* Filled bar */}
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${bar} transition-all duration-700`}
                          style={{
                            width: `${asset.fillPct}%`,
                            boxShadow: glow,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-widest text-[#8D88B3]">
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#22C55E]" />
                Small molecule
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-[#7C3AED]" />
                Biologic
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
