"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { experiences, projects, lensProfiles, type Lens, type LensProfile } from "@/data/portfolio";

type RoleLensContextType = {
  lens: Lens;
  setLens: (lens: Lens) => void;
};

const RoleLensContext = createContext<RoleLensContextType | null>(null);

const STORAGE_KEY = "roleLens";

function parseLens(value: string | null): Lens | null {
  if (!value) return null;
  const v = value.toLowerCase();
  if (v === "flutter" || v === "mobile") return "flutter";
  if (v === "swe" || v === "se" || v === "software" || v === "backend") return "swe";
  return null;
}

export function RoleLensProvider({ children }: { children: React.ReactNode }) {
  const [lens, setLensState] = useState<Lens>("swe");

  // A shared ?role= link wins over what this browser last picked
  useEffect(() => {
    const fromUrl = parseLens(new URLSearchParams(window.location.search).get("role"));
    let stored: Lens | null = null;
    try {
      stored = parseLens(localStorage.getItem(STORAGE_KEY));
    } catch {}
    const initial = fromUrl ?? stored;
    if (initial) setLensState(initial);
  }, []);

  const setLens = useCallback((next: Lens) => {
    setLensState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    // Keep the address bar shareable: /?role=flutter sends the Flutter view
    const url = new URL(window.location.href);
    if (next === "swe") url.searchParams.delete("role");
    else url.searchParams.set("role", next);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const value = useMemo(() => ({ lens, setLens }), [lens, setLens]);

  return <RoleLensContext.Provider value={value}>{children}</RoleLensContext.Provider>;
}

export function useRoleLens() {
  const ctx = useContext(RoleLensContext);
  if (!ctx) throw new Error("useRoleLens must be used within RoleLensProvider");
  return ctx;
}

/** Portfolio content resolved for the active lens. */
export function useProfile() {
  const { lens, setLens } = useRoleLens();

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

    return { ...profile, lens, setLens, experiences: lensExperiences, projects: lensProjects };
  }, [lens, setLens]);
}
