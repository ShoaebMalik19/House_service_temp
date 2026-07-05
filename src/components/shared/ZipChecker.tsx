"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, XCircle, MapPin } from "lucide-react";

// =============================================================================
// ZipChecker — FIX 2: cleaned up labels, improved spacing, better placeholders
// =============================================================================

const SERVED_ZIPS = new Set([
  "80201","80202","80203","80204","80205","80206","80207","80208","80209","80210",
  "80211","80212","80214","80215","80216","80218","80219","80220","80221","80222",
  "80223","80224","80226","80227","80228","80229","80230","80231","80232","80233",
  "80234","80235","80236","80237","80238","80239","80241","80246","80247","80249",
  "80260","80010","80011","80012","80013","80014","80015","80016","80017","80018",
  "80019","80110","80111","80112","80120","80121","80122","80123","80124","80125",
  "80126","80127","80128","80129","80130","80401","80403","80465","80033","80034",
]);

type ZipStatus = "idle" | "served" | "not-served" | "invalid";

interface ZipCheckerProps {
  variant: "hero" | "wizard";
  onValidZip?: (zip: string) => void;
}

export function ZipChecker({ variant, onValidZip }: ZipCheckerProps) {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<ZipStatus>("idle");
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const isHero = variant === "hero";

  const handleCheck = () => {
    const trimmed = zip.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setStatus("invalid");
      return;
    }
    if (SERVED_ZIPS.has(trimmed)) {
      setStatus("served");
      onValidZip?.(trimmed);
    } else {
      setStatus("not-served");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCheck();
  };

  // FIX 2 — Input height: 52px desktop, matches spec
  const inputStyle: React.CSSProperties = isHero
    ? {
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "0 16px",
        color: "white",
        fontSize: "15px",
        width: "200px",
        height: "52px",
        outline: "none",
        transition: "border-color 0.2s",
        flexShrink: 0,
      }
    : {
        background: "#F9FAFB",
        border: "2px solid #E5E7EB",
        borderRadius: "12px",
        padding: "0 20px",
        color: "#111827",
        fontSize: "16px",
        width: "100%",
        height: "52px",
        outline: "none",
        transition: "border-color 0.2s",
        textAlign: "center" as const,
      };

  const buttonStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #F97316, #E8820C)",
    borderRadius: "12px",
    padding: "0 20px",
    height: "52px",
    fontSize: isHero ? "14px" : "15px",
    fontWeight: 600,
    color: "white",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    userSelect: "none" as const,
  };

  return (
    <div
      style={{
        marginTop: isHero ? "28px" : "0",
        width: isHero ? "auto" : "100%",
        maxWidth: "100%",
      }}
      className={isHero ? "zip-checker-hero" : "zip-checker-wizard"}
    >
      {/* FIX 2 — Hero label only; wizard label is handled by the parent heading */}
      {isHero && (
        <div
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <MapPin style={{ width: "12px", height: "12px" }} aria-hidden="true" />
          Check if we serve your area
        </div>
      )}

      {/* FIX 2 — Input + Button: side by side, gap: 12px */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
        className={isHero ? "zip-row-hero" : "zip-row-wizard"}
      >
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, ""));
            if (status !== "idle") setStatus("idle");
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 80202"  // FIX 2 — more helpful placeholder
          aria-label="ZIP code"
          style={{
            ...inputStyle,
            ...(isHero ? {} : { flex: 1 }),
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = isHero
              ? "rgba(232,130,12,0.5)"
              : "#E8820C";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = isHero
              ? "rgba(255,255,255,0.15)"
              : "#E5E7EB";
          }}
        />
        <button
          type="button"
          onClick={handleCheck}
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          aria-label="Check ZIP coverage"
        >
          Check Coverage →
        </button>
      </div>

      {/* Result messages — fade in */}
      {status !== "idle" && (
        <div
          style={{
            marginTop: "10px",
            animation: "zipFadeIn 0.3s ease-out forwards",
          }}
        >
          <style>{`@keyframes zipFadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>

          {status === "served" && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#22C55E", fontWeight: 500 }}>
              <CheckCircle style={{ width: "14px", height: "14px", flexShrink: 0 }} />
              ✓ Great news — we serve {zip}! Scroll down to get your free estimate.
            </div>
          )}

          {status === "invalid" && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#F59E0B", fontWeight: 500 }}>
              <AlertCircle style={{ width: "14px", height: "14px", flexShrink: 0 }} />
              Please enter a valid 5-digit ZIP code.
            </div>
          )}

          {status === "not-served" && (
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "13px", color: isHero ? "rgba(255,255,255,0.55)" : "#6B7280", marginBottom: "8px" }}>
                <XCircle style={{ width: "14px", height: "14px", flexShrink: 0, color: "#EF4444", marginTop: "1px" }} />
                We don&apos;t serve this area yet — but we&apos;re expanding! Leave your email and we&apos;ll notify you:
              </div>
              {notifySubmitted ? (
                <div style={{ fontSize: "13px", color: "#22C55E", display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle style={{ width: "14px", height: "14px" }} />
                  Got it! We&apos;ll reach out when we expand to your area.
                </div>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      background: isHero ? "rgba(255,255,255,0.07)" : "#F9FAFB",
                      border: isHero ? "1px solid rgba(255,255,255,0.15)" : "1px solid #E5E7EB",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: isHero ? "white" : "#111827",
                      fontSize: "14px",
                      flex: 1,
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => notifyEmail && setNotifySubmitted(true)}
                    style={{ background: "linear-gradient(135deg, #F97316, #E8820C)", border: "none", borderRadius: "10px", padding: "10px 16px", fontSize: "14px", fontWeight: 600, color: "white", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s ease" }}
                  >
                    Notify Me
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 767px) {
          .zip-row-hero {
            flex-direction: column !important;
            gap: 8px !important;
          }
          .zip-row-hero input {
            width: 100% !important;
            height: 56px !important;
          }
          .zip-row-hero button {
            width: 100% !important;
            height: 56px !important;
            justify-content: center;
          }
          .zip-row-wizard {
            flex-direction: column !important;
          }
          .zip-row-wizard input {
            height: 56px !important;
          }
          .zip-row-wizard button {
            width: 100% !important;
            height: 56px !important;
            justify-content: center;
          }
          .zip-checker-hero {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
