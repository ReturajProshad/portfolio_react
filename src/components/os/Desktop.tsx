"use client";

import { useState, useCallback } from "react";
import { OsThemeProvider, useOsTheme } from "./OsThemeProvider";
import { WindowManagerProvider, useWindowManager } from "@/lib/windowManager";
import { appDefinitions } from "@/config/apps";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import WindowsTaskbar from "./WindowsTaskbar";
import LinuxTopBar from "./LinuxTopBar";
import LinuxDock from "./LinuxDock";
import StartMenu from "./StartMenu";
import ActivitiesOverview from "./ActivitiesOverview";
import AboutApp from "@/components/apps/AboutApp";
import ExperienceApp from "@/components/apps/ExperienceApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import OpenSourceApp from "@/components/apps/OpenSourceApp";
import AchievementsApp from "@/components/apps/AchievementsApp";
import ContactApp from "@/components/apps/ContactApp";

const appComponentMap: Record<string, React.ComponentType> = {
  about: AboutApp,
  experience: ExperienceApp,
  skills: SkillsApp,
  projects: ProjectsApp,
  opensource: OpenSourceApp,
  achievements: AchievementsApp,
  contact: ContactApp,
};

function DesktopInner() {
  const { windows } = useWindowManager();
  const { osTheme } = useOsTheme();
  const [showStart, setShowStart] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const isWindows = osTheme === "windows";

  const handleStartClick = useCallback(() => setShowStart(prev => !prev), []);
  const handleActivitiesClick = useCallback(() => setShowActivities(prev => !prev), []);

  return (
    <div className="desktop">
      {!isWindows && <LinuxTopBar onActivitiesClick={handleActivitiesClick} />}
      {!isWindows && <LinuxDock />}
      <div className="desktop-area">
        <div className="desktop-icons">
          {appDefinitions.map(app => (
            <DesktopIcon key={app.id} app={app} />
          ))}
        </div>
        {windows.filter(w => w.isOpen && !w.isMinimized).map(w => {
          const AppComponent = appComponentMap[w.id];
          return (
            <Window key={w.id} windowState={w}>
              <AppComponent />
            </Window>
          );
        })}
      </div>
      {isWindows && <WindowsTaskbar onStartClick={handleStartClick} />}
      {showStart && <StartMenu onClose={() => setShowStart(false)} />}
      {showActivities && <ActivitiesOverview onClose={() => setShowActivities(false)} />}
    </div>
  );
}

export default function Desktop() {
  return (
    <OsThemeProvider>
      <WindowManagerProvider>
        <DesktopInner />
      </WindowManagerProvider>
    </OsThemeProvider>
  );
}
