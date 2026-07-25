"use client";

import { OsThemeProvider } from "./OsThemeProvider";
import { WindowManagerProvider, useWindowManager } from "@/lib/windowManager";
import { appDefinitions } from "@/config/apps";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import SystemTray from "./SystemTray";
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

  return (
    <div className="desktop">
      <div className="desktop-icons">
        {appDefinitions.map(app => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>
      {windows.filter(w => w.isOpen).map(w => {
        const AppComponent = appComponentMap[w.id];
        return (
          <Window key={w.id} windowState={w}>
            <AppComponent />
          </Window>
        );
      })}
      <SystemTray />
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
