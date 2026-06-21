"use client";

import GeneNetwork from "./GeneNetwork";

export default function ClientBackgrounds() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <GeneNetwork />
    </div>
  );
}
