"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// TrustBar — Slim horizontal strip of trust badges with count-up animation
// Immediately answers the #1 homeowner concern — trust and legitimacy.
// =============================================================================

/** Animated counter that counts up once when scrolled into view */
function CountUpValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix (e.g., "1,200+" → 1200, "+")
    const numericMatch = value.replace(/,/g, "").match(/^(\d+)(.*)/);
    if (!numericMatch) return;

    const target = parseInt(numericMatch[1], 10);
    const suffix = numericMatch[2] || "";
    const prefix = value.match(/^[^0-9]*/)?.[0] || "";

    const duration = 1500; // ms
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      const formatted = current.toLocaleString("en-US");
      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value); // Ensure final value matches exactly
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="bg-white border-b border-[var(--color-border)] rounded-2xl py-8 md:py-10 relative z-10 -mt-12 mx-4 xl:mx-auto max-w-[1240px] shadow-lg overflow-x-auto"
      aria-label="Trust badges and credentials"
    >
      <div className="container-custom min-w-max md:min-w-0">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {siteConfig.trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`flex flex-col items-center text-center gap-2 w-full ${index === siteConfig.trustBadges.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent-light)]">
                <DynamicIcon
                  name={badge.icon}
                  className="w-6 h-6 text-[var(--color-accent)]"
                />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
                <CountUpValue value={badge.value} />
              </div>
              <div className="text-sm text-[var(--color-text-muted)] font-medium">
                {badge.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
