"use client";

import { useCallback, useEffect } from "react";
import { motion, useDragControls, type PanInfo } from "framer-motion";
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
  const definition = appDefinitions.find(a => a.id === appId);
  const title = definition?.title ?? (appId === "photo" ? "Profile Photo" : "Portfolio");
  const dragControls = useDragControls();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Swipe from the left edge to go back, like an iOS navigation stack
  const handleDragEnd = useCallback((_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x > 110 || info.velocity.x > 600) onClose();
  }, [onClose]);

  return (
    <motion.div
      className="mobile-app-view"
      role="dialog"
      aria-label={title}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 380, damping: 38 }}
      drag="x"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0, right: 0.9 }}
      onDragEnd={handleDragEnd}
    >
      <div
        className="mobile-app-edge"
        onPointerDown={e => dragControls.start(e)}
        aria-hidden="true"
      />
      <div className="mobile-app-header">
        <button className="mobile-app-back" onClick={onClose} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <span className="mobile-app-title">{title}</span>
        <div className="mobile-app-spacer" />
      </div>
      <div className="mobile-app-content">
        {children}
      </div>
    </motion.div>
  );
}
