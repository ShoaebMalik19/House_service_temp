"use client";

import React, { useState, useEffect } from "react";
import { Phone, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";

// =============================================================================
// StickyMobileCTA — Fixed bottom bar on mobile viewports
// Appears after scrolling past the hero. Two large tap targets:
// "📞 Call Now" and "Get Estimate"
// =============================================================================

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~500px (roughly past the hero)
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Safe area padding for notched devices */}
          <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] px-4 py-2 h-[64px] pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center box-content">
            <div className="flex gap-3 w-full h-full">
              {/* Call Now */}
              <a
                href={`tel:${formatPhoneTel(siteConfig.phone)}`}
                className="flex-1 flex items-center justify-center gap-2 bg-[#111827] text-white font-semibold rounded-lg transition-colors min-h-[48px]"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>

              {/* Get Estimate */}
              <a
                href="#estimate"
                className="flex-1 flex items-center justify-center gap-2 bg-[#E8820C] text-white font-semibold rounded-lg transition-colors hover:bg-opacity-90 min-h-[48px]"
              >
                <FileText className="w-5 h-5" />
                Get Estimate
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
