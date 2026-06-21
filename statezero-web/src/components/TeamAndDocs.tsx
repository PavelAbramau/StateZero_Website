const team = [
  {
    initials: "PA",
    name: "Pavel Abramau",
    role: "Lead AI Architect",
    note: "CEO & Platform Architect",
  },
  {
    initials: "PS",
    name: "Prof. Paweł Sachadyn",
    role: "Biomedical Lead",
    note: "Scientific Lead, GUT-PB",
  },
] as const;

const terminalLinks = [
  {
    prompt: "~",
    command: "git clone statezero/core-engine",
    href: "https://github.com/statezero",
  },
  {
    prompt: "~",
    command: "cat docs/whitepaper.md",
    href: "#",
  },
] as const;

export default function TeamAndDocs() {
  return (
    <section className="px-6 py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left — Team */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">
            TEAM::ARCHITECTS
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F4F4FB] mb-8">
            StateZero Architects
          </h2>

          <div className="flex flex-col gap-5">
            {team.map((member) => (
              <div
                key={member.initials}
                className="flex items-center gap-5 border border-white/10 p-5 rounded-xl bg-white/[0.02]"
              >
                {/* Initials avatar */}
                <div
                  className="w-16 h-16 shrink-0 rounded-lg border border-white/10 flex items-center justify-center text-lg font-extrabold tracking-tight text-[#F4F4FB]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(124,58,237,0.2) 100%)",
                  }}
                >
                  {member.initials}
                </div>

                {/* Text */}
                <div>
                  <p className="text-[#F4F4FB] font-semibold leading-tight">
                    {member.name}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-[#22C55E] mt-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#8D88B3] mt-1">{member.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Terminal */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-3">
            DOCS::OPEN_SOURCE
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F4F4FB] mb-8">
            Data Room Access
          </h2>

          {/* Terminal window */}
          <div className="rounded-xl overflow-hidden border border-white/10">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0F0F1A] border-b border-white/10">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[11px] text-[#64748B] select-none">
                statezero — bash
              </span>
            </div>

            {/* Body */}
            <div className="bg-[#06060F] px-5 py-5 font-mono text-sm space-y-3">
              {/* Static welcome line */}
              <p className="text-[#334155] select-none">
                StateZero Labs v0.1.0 — Computational TechBio Platform
              </p>

              {/* Clickable commands */}
              {terminalLinks.map((item) => (
                <div key={item.command} className="flex items-start gap-2">
                  <span className="text-[#7C3AED] select-none shrink-0">
                    {item.prompt} $
                  </span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#22C55E] underline-offset-4 decoration-[#22C55E]/40 hover:underline hover:text-white hover:decoration-white transition-colors duration-150 break-all"
                  >
                    {item.command}
                  </a>
                </div>
              ))}

              {/* Blinking cursor */}
              <div className="flex items-center gap-2">
                <span className="text-[#7C3AED] select-none">~ $</span>
                <span className="inline-block w-2 h-4 bg-[#22C55E] animate-pulse" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
