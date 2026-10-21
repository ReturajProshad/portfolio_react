"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { OsThemeProvider, useOsTheme } from "./OsThemeProvider";
import { WindowManagerProvider, useWindowManager } from "@/lib/windowManager";
import { RoleLensProvider, useRoleLens } from "@/lib/roleLens";
import { useIsMobile } from "@/hooks/useIsMobile";
import Window, { type WindowExitReason } from "./Window";
import RoleSwitch from "./RoleSwitch";
import WindowsTaskbar from "./WindowsTaskbar";
import LinuxTopBar from "./LinuxTopBar";
import LinuxDock from "./LinuxDock";
import StartMenu from "./StartMenu";
import ActivitiesOverview from "./ActivitiesOverview";
import WritingReveal from "./WritingReveal";
import ProfessionalSummary from "./ProfessionalSummary";
import StatsCards from "./StatsCards";
import QuickInfo from "./QuickInfo";
import CurrentWork from "./CurrentWork";
import FlutterShowcase from "./FlutterShowcase";
import { GraduationCap } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import MobileNav from "./MobileNav";
import MobileDrawer from "./MobileDrawer";
import MobileAppView from "./MobileAppView";
import AboutApp from "@/components/apps/AboutApp";
import ExperienceApp from "@/components/apps/ExperienceApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import OpenSourceApp from "@/components/apps/OpenSourceApp";
import AchievementsApp from "@/components/apps/AchievementsApp";
import ContactApp from "@/components/apps/ContactApp";
import PhotoApp from "@/components/apps/PhotoApp";
import ListPortfolio from "@/components/apps/ListPortfolio";
const appComponentMap: Record<string, React.ComponentType> = {
  about: AboutApp,
  experience: ExperienceApp,
  skills: SkillsApp,
  projects: ProjectsApp,
  opensource: OpenSourceApp,
  achievements: AchievementsApp,
  contact: ContactApp,
  photo: PhotoApp,
  listportfolio: ListPortfolio,
};

function DesktopInner() {
  const { windows, openApp, toggleMaximize } = useWindowManager();
  const { osTheme } = useOsTheme();
  const { lens } = useRoleLens();
  const [showStart, setShowStart] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [mobileApp, setMobileApp] = useState<string | null>(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [revealDone, setRevealDone] = useState(false);
  const isMobile = useIsMobile();
  const isWindows = osTheme === "windows";

  const handleStartClick = useCallback(() => setShowStart(prev => !prev), []);
  const handleActivitiesClick = useCallback(() => setShowActivities(prev => !prev), []);
  const handleOpenList = useCallback(() => {
    openApp("listportfolio");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toggleMaximize("listportfolio"));
    });
  }, [openApp, toggleMaximize]);
  const handleMobileAppSelect = useCallback((id: string) => {
    openApp(id);
    setMobileApp(id);
  }, [openApp]);

  const handleDrawerToggle = useCallback(() => {
    setMobileDrawer(prev => !prev);
  }, []);

  const handleDrawerSelect = useCallback((id: string) => {
    openApp(id);
    setMobileApp(id);
  }, [openApp]);

  // Mobile back button / back gesture closes the open section or drawer
  // instead of leaving the site. One history entry covers whatever is open;
  // switching between the drawer and a section reuses it.
  const overlayOpen = isMobile && (mobileApp !== null || mobileDrawer);
  const historyPushed = useRef(false);

  useEffect(() => {
    if (overlayOpen && !historyPushed.current) {
      // Keep Next.js's router state on the entry, or its popstate handler
      // treats it as foreign and reloads the page.
      window.history.pushState({ ...window.history.state, portfolioOverlay: true }, "");
      historyPushed.current = true;
    } else if (!overlayOpen && historyPushed.current) {
      // Closed from the UI: drop the entry we added so Back still works normally
      historyPushed.current = false;
      window.history.back();
    }
  }, [overlayOpen]);

  useEffect(() => {
    const handlePopState = () => {
      if (!historyPushed.current) return;
      historyPushed.current = false;
      setMobileApp(null);
      setMobileDrawer(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (isMobile) {
    return (
      <div className="desktop mobile-desktop">
        <div className="mobile-top-bar">
          <RoleSwitch compact />
          <ThemeToggle />
        </div>
        <main className="mobile-home">
          <div className="mobile-profile">
            <WritingReveal onPicClick={() => handleMobileAppSelect("photo")} onDone={() => setRevealDone(true)} />
            {revealDone && <StatsCards />}
            <ProfessionalSummary show={revealDone} />
            {revealDone && <QuickInfo />}
            {revealDone && (
              <div className="education-line">
                <GraduationCap size={14} />
                <span><strong>B.Sc. in CSE</strong> — Islamic University &middot; <strong>CGPA 3.63/4.00</strong></span>
              </div>
            )}
            {revealDone && <CurrentWork />}
          </div>
        </main>
        <MobileNav onAppSelect={handleMobileAppSelect} onDrawerToggle={handleDrawerToggle} drawerOpen={mobileDrawer} />
        {mobileDrawer && <MobileDrawer onSelect={handleDrawerSelect} onClose={() => setMobileDrawer(false)} />}
        <AnimatePresence>
          {mobileApp && (
            <MobileAppView key={mobileApp} appId={mobileApp} onClose={() => setMobileApp(null)}>
              {React.createElement(appComponentMap[mobileApp], { key: lens })}
            </MobileAppView>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="desktop">
      <div className="top-right-actions">
        <RoleSwitch />
        <button className="top-action-btn top-action-hire" onClick={() => openApp("contact")}>
          Hire Me
        </button>
        <button className="top-action-btn top-action-list" onClick={handleOpenList}>
          List View
        </button>
        <div className="theme-toggle-sep" />
        <ThemeToggle />
      </div>
      <div className="animated-bg" aria-hidden="true">
        <div className="mesh-blobs">
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
          <div className="mesh-blob mesh-blob-4" />
          <div className="mesh-blob mesh-blob-5" />
          <div className="mesh-blob mesh-blob-6" />
        </div>
      </div>
      <div className="desktop-overlay" />
      {!isWindows && <LinuxTopBar onActivitiesClick={handleActivitiesClick} />}
      {!isWindows && <LinuxDock />}
      <main className="desktop-area">
        <div className="desktop-home">
          <div className="hero-left">
            <WritingReveal onPicClick={() => openApp("photo")} onDone={() => setRevealDone(true)} />
            {revealDone && <StatsCards />}
            <ProfessionalSummary show={revealDone} />
            {revealDone && <QuickInfo />}
            {revealDone && (
              <div className="education-line">
                <GraduationCap size={14} />
                <span><strong>B.Sc. in CSE</strong> — Islamic University &middot; <strong>CGPA 3.63/4.00</strong></span>
              </div>
            )}
          </div>
          {revealDone && <CurrentWork />}
          {revealDone && <FlutterShowcase />}
        </div>
        {windows.map(w => {
          const AppComponent = appComponentMap[w.id];
          // Each window gets its own presence so it knows whether it is
          // leaving because it was minimized (into the dock) or closed.
          const exitReason: WindowExitReason = w.isOpen && w.isMinimized ? "minimize" : "close";
          return (
            <AnimatePresence key={w.id} custom={exitReason}>
              {w.isOpen && !w.isMinimized && (
                <Window key={w.id} windowState={w}>
                  <AppComponent key={lens} />
                </Window>
              )}
            </AnimatePresence>
          );
        })}
      </main>
      {isWindows && <WindowsTaskbar onStartClick={handleStartClick} />}
      {showStart && <StartMenu onClose={() => setShowStart(false)} />}
      {showActivities && <ActivitiesOverview onClose={() => setShowActivities(false)} />}
    </div>
  );
}

export default function Desktop() {
  return (
    <OsThemeProvider>
      <RoleLensProvider>
        <WindowManagerProvider>
          {/* Honour the OS "reduce motion" setting for every framer animation */}
          <MotionConfig reducedMotion="user">
            <DesktopInner />
          </MotionConfig>
        </WindowManagerProvider>
      </RoleLensProvider>
    </OsThemeProvider>
  );
}
