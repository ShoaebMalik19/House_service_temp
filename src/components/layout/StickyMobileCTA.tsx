"use client";

import React from "react";
import { Phone, FileText } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";

// =============================================================================
// StickyMobileCTA — FIX 4: always visible on mobile (no scroll trigger),
// two halves: Call (#111827) | Get Estimate (#E8820C)
// Safe-area padding for iPhone home bar. desktop hidden (md:hidden).
// =============================================================================

export function StickyMobileCTA() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "64px",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {/* Left 50% — Call Now */}
        <a
          href={`tel:${formatPhoneTel(siteConfig.phone)}`}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "#111827",
            color: "white",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.2s ease",
          }}
        >
          <Phone style={{ width: "18px", height: "18px" }} />
          Call Now
        </a>

        {/* Right 50% — Get Estimate */}
        <a
          href="#estimate"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            background: "#E8820C",
            color: "white",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.2s ease",
          }}
        >
          <FileText style={{ width: "18px", height: "18px" }} />
          Get Estimate
        </a>
      </div>
    </div>
  );
}
