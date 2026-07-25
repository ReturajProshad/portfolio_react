"use client";

import { useCallback, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { appDefinitions } from "@/config/apps";

export default function MobileAppView({
  appId,
  onClose,
  children,
}: {
  appId: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const app = appDefinitions.find(a => a.id === appId);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="mobile-app-view" role="dialog" aria-label={app?.title ?? "App"}>
      <div className="mobile-app-header">
        <button className="mobile-app-back" onClick={onClose} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <span className="mobile-app-title">{app?.title ?? ""}</span>
        <div className="mobile-app-spacer" />
      </div>
      <div className="mobile-app-content">
        {children}
      </div>
    </div>
  );
}
