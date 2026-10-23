"use client";

import SectionWrapper, { SectionLabel, SectionHeading } from "@/components/SectionWrapper";
import OpenSourceContent from "@/components/OpenSourceContent";
import { openSource } from "@/data/portfolio";

export default function OpenSource() {
  return (
    <SectionWrapper id="opensource">
      <div className="mb-12">
        <SectionLabel>Open Source</SectionLabel>
        <SectionHeading>{openSource.name}</SectionHeading>
        <p className="text-subtle text-sm mt-2 max-w-lg">{openSource.tagline}</p>
      </div>
      <OpenSourceContent />
    </SectionWrapper>
  );
}
