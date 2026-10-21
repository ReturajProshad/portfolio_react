"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { experiences, projects, lensProfiles, type Lens, type LensProfile } from "@/data/portfolio";

const RoleLensContext = createContext<Lens | null>(null);

function parseLens(value: string | null): Lens {
  const v = value?.toLowerCase();
  return v === "flutter" || v === "mobile" ? "flutter" : "swe";
}

/**
 * The lens comes only from the link: /?role=flutter shows the Flutter view,
 * anything else the Software Engineer view. Nothing is remembered, so each CV
 * link always opens its own version.
 */
export function RoleLensProvider({ children }: { children: React.ReactNode }) {
  const [lens, setLens] = useState<Lens>("swe");

  useEffect(() => {
    setLens(parseLens(new URLSearchParams(window.location.search).get("role")));
  }, []);

  return <RoleLensContext.Provider value={lens}>{children}</RoleLensContext.Provider>;
}

export function useRoleLens() {
  const lens = useContext(RoleLensContext);
  if (!lens) throw new Error("useRoleLens must be used within RoleLensProvider");
  return lens;
}

/** Portfolio content resolved for the active lens. */
export function useProfile() {
  const lens = useRoleLens();

  return useMemo(() => {
    const profile: LensProfile = lensProfiles[lens];

    const lensExperiences = experiences.map(exp => {
      const override = profile.experience[exp.company];
      return override ? { ...exp, ...override } : exp;
    });

    const ordered = profile.projectOrder
      .map(id => projects.find(p => p.id === id))
      .filter((p): p is (typeof projects)[number] => Boolean(p));
    const rest = projects.filter(p => !profile.projectOrder.includes(p.id));
    const lensProjects = [...ordered, ...rest].map(p => ({
      ...p,
      featured: profile.featuredProjects.includes(p.id),
    }));

    return { ...profile, lens, experiences: lensExperiences, projects: lensProjects };
  }, [lens]);
}
