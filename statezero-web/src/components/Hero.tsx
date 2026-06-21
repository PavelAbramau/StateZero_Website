export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-transparent">
      <h1
        className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-[#22C55E] via-[#7C3AED] to-[#22C55E] bg-clip-text text-transparent"
      >
        StateZero Labs
      </h1>

      <p className="mt-6 max-w-2xl font-mono uppercase tracking-widest text-sm sm:text-base leading-relaxed text-[#8D88B3]">
        Reprogramming fibrotic tissue through latent-space transcriptomics.
      </p>

      <button
        type="button"
        className="mt-12 px-8 py-3 border border-[#7C3AED] bg-transparent text-[#F4F4FB] font-mono text-sm uppercase tracking-widest transition-all duration-200 hover:bg-[#7C3AED] hover:shadow-[0_0_18px_rgba(124,58,237,0.55)] active:scale-95"
      >
        &gt; INITIALIZE_DATA_ROOM
      </button>
    </section>
  );
}
