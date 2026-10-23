"use client";

import OpenSourceContent from "@/components/OpenSourceContent";
import { openSource } from "@/data/portfolio";

export default function OpenSourceApp() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <span className="inline-flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase mb-3">
        <span className="w-6 h-px bg-accent" />
        Open Source
      </span>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-text tracking-tight mb-1">{openSource.name}</h2>
      <p className="text-subtle text-sm mb-6">{openSource.tagline}</p>
      <OpenSourceContent compact />
    </div>
  );
}
