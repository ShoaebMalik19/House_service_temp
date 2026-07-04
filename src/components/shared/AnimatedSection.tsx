"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// AnimatedSection — Scroll-triggered fade-up wrapper
// Wraps any content with a gentle fade-up animation on scroll into view.
// Used by every homepage section for consistent, subtle entrance animations.
// =============================================================================

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Y-offset for the fade-up (pixels) */
  yOffset?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Whether to animate only once or every time element enters view */
  once?: boolean;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  yOffset = 24,
  duration = 0.5,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-80px 0px", // Trigger slightly before fully in view
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Smooth, natural ease
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
