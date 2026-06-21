"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { label: "Platform",      href: "/",               anchor: false },
  { label: "Technology",    href: "/technology",      anchor: false },
  { label: "Pipeline",      href: "/#pipeline",       anchor: true  },
  { label: "Company",       href: "/company",         anchor: false },
  { label: "Documentation", href: "/documentation",   anchor: false },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string, anchor: boolean) {
    if (anchor) return false; // anchor links never highlight as active route
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#05050A]/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={() => setOpen(false)}
        >
          {/* Sigil */}
          <span className="relative flex h-5 w-5">
            <span className="absolute inset-0 rounded-sm bg-[#7C3AED]/30 group-hover:bg-[#7C3AED]/50 transition-colors duration-200" />
            <span className="relative m-auto block h-2 w-2 rounded-[2px] bg-[#22C55E]" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F4F4FB] group-hover:text-[#22C55E] transition-colors duration-200">
            StateZero<span className="text-[#7C3AED]">.</span>Labs
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = isActive(item.href, item.anchor);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-150
                  ${active ? "text-[#22C55E]" : "text-[#8D88B3] hover:text-[#F4F4FB]"}
                `}
              >
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-[#22C55E]" />
                )}
                {item.label}
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            href="/#cta"
            className="ml-3 px-4 py-1.5 border border-[#7C3AED] font-mono text-[11px] uppercase tracking-widest text-[#F4F4FB] transition-all duration-200 hover:bg-[#7C3AED]/10 hover:shadow-[0_0_14px_rgba(124,58,237,0.3)]"
          >
            Data Room
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-[#8D88B3] transition-all duration-200 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block h-px w-5 bg-[#8D88B3] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-5 bg-[#8D88B3] transition-all duration-200 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-white/5 bg-[#05050A] px-6 py-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const active = isActive(item.href, item.anchor);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  px-2 py-2.5 font-mono text-xs uppercase tracking-widest border-b border-white/5
                  ${active ? "text-[#22C55E]" : "text-[#8D88B3]"}
                `}
              >
                {active ? "● " : "○ "}{item.label}
              </Link>
            );
          })}
          <Link
            href="/#cta"
            onClick={() => setOpen(false)}
            className="mt-3 px-4 py-2.5 border border-[#7C3AED] font-mono text-xs uppercase tracking-widest text-[#F4F4FB] text-center"
          >
            Data Room
          </Link>
        </nav>
      )}
    </header>
  );
}
