"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}

export default function SpotlightCard({ children, className = "", tilt = true }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const rotateX = useSpring(rotateXVal, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(rotateYVal, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--spot-x", `${x}px`);
    el.style.setProperty("--spot-y", `${y}px`);

    if (tilt) {
      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;
      rotateYVal.set(px * 6);
      rotateXVal.set(-py * 6);
    }
  };

  const handleMouseLeave = () => {
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      className={`spotlight ${className}`}
    >
      <div className="relative z-[2]">{children}</div>
    </motion.div>
  );
}
