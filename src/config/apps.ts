import { User, Briefcase, Wrench, Folder, Github, Trophy, Mail, type LucideIcon } from "lucide-react";

export interface AppDefinition {
  id: string;
  title: string;
  icon: LucideIcon;
}

export const appDefinitions: AppDefinition[] = [
  { id: "about", title: "About Me", icon: User },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "skills", title: "Skills & Expertise", icon: Wrench },
  { id: "projects", title: "Projects", icon: Folder },
  { id: "opensource", title: "rj_form_engine", icon: Github },
  { id: "achievements", title: "Achievements", icon: Trophy },
  { id: "contact", title: "Contact Me", icon: Mail },
];
