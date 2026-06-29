import Hero from "../src/components/Hero";
import Platform from "../src/components/Platform";
import Pipeline from "../src/components/Pipeline";
import TeamAndDocs from "../src/components/TeamAndDocs";

export default function Home() {
  return (
    <main className="relative min-h-screen text-[#F4F4FB] overflow-x-hidden">
      <div className="flex flex-col">
        {/* Hero occupies full viewport height */}
        <Hero />

        {/* Divider */}
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="h-px bg-white/5" />
        </div>

        {/* Platform Architecture */}
        <section className="py-24 sm:py-32">
          <Platform />
        </section>

        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="h-px bg-white/5" />
        </div>

        {/* Pipeline Matrix */}
        <section id="pipeline" className="py-24 sm:py-32">
          <Pipeline />
        </section>

        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="h-px bg-white/5" />
        </div>

        {/* Team & Docs */}
        <section className="py-24 sm:py-32">
          <TeamAndDocs />
        </section>

        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="h-px bg-white/5" />
        </div>

        {/* CTA */}
        <section className="py-32 sm:py-40 flex flex-col items-center text-center px-6">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#7C3AED] mb-6">
            SYS::ENGAGE
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F4F4FB] max-w-xl">
            Access the StateZero Engine.
          </h2>

          <p className="mt-5 max-w-md text-[#8D88B3] text-base leading-relaxed">
            Full technical transparency — platform architecture, pipeline data,
            and computational validation — available on request.
          </p>

          {/* Primary CTA */}
          <a
            href="mailto:pavel@statezerolabs.space"
            className="mt-12 inline-flex items-center gap-3 px-10 py-4 bg-[#05050A] border border-[#7C3AED] text-[#F4F4FB] font-mono text-sm uppercase tracking-widest transition-all duration-200 hover:bg-[#7C3AED]/10 hover:shadow-[0_0_40px_8px_rgba(124,58,237,0.35),0_0_80px_20px_rgba(124,58,237,0.12)] active:scale-95"
          >
            <span className="text-[#7C3AED]">◈</span>
            Request Investor Data Room
          </a>

          {/* Secondary link */}
          <a
            href="mailto:pavel@statezerolabs.space"
            className="mt-6 font-mono text-xs uppercase tracking-widest text-[#8D88B3] hover:text-[#22C55E] transition-colors duration-150 underline-offset-4 hover:underline"
          >
            → Initialize General Contact
          </a>
        </section>

        {/* Footer */}
        <div className="border-t border-white/5 py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto w-full max-w-5xl">
          <span className="font-mono text-xs text-[#334155] uppercase tracking-widest">
            StateZero Labs © 2026
          </span>
          <a
            href="/documentation"
            className="font-mono text-xs uppercase tracking-widest text-[#334155] hover:text-[#22C55E] transition-colors duration-150"
          >
            Documentation →
          </a>
        </div>

      </div>
    </main>
  );
}
