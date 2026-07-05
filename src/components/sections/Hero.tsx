"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { Phone, ArrowRight, ShieldCheck, Clock, Star } from "lucide-react";
import { ZipChecker } from "@/components/shared/ZipChecker";

// =============================================================================
// Hero — "Split Authority" Layout
// Left: bold statement + CTAs | Right: stacked photo card with floating badges
// Desktop: 2-col grid | Mobile: single column centered
// =============================================================================

export function Hero() {
  return (
    <>
      {/* ── Keyframes injected via <style> so no globals.css edit needed ── */}
      <style>{`
        @keyframes hero-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes hero-glow {
          0%   { box-shadow: 0 0 0 0 rgba(232,130,12,0.45); }
          70%  { box-shadow: 0 0 0 14px rgba(232,130,12,0); }
          100% { box-shadow: 0 0 0 0 rgba(232,130,12,0); }
        }
        @keyframes hero-green-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.5); }
        }
        .hero-cta-primary {
          animation: hero-glow 2.2s ease-out infinite;
        }
        .hero-pulse-dot {
          animation: hero-pulse-dot 2s ease-in-out infinite;
        }
        .hero-green-pulse {
          animation: hero-green-pulse 2s ease-in-out infinite;
        }
      `}</style>

      <section
        id="hero"
        aria-label="Hero section"
        style={{
          position: "relative",
          /* FIX 1 — Rich layered background: deep navy-to-dark-amber base */
          background: "linear-gradient(135deg, #0A0F1E 0%, #0F1A2E 40%, #1A0F08 100%)",
          /* FIX 1 — overflow:hidden REMOVED — it was clipping the stats bar */
          overflow: "visible",
          /* FIX 1 — padding-bottom gives breathing room before stats bar */
          paddingBottom: "60px",
        }}
      >
        {/* ── FIX 1 — Subtle photo texture layer (construction, 8% opacity) ── */}
        <div
          className="hero-absolute"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
            mixBlendMode: "luminosity",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── FIX 1 — Grid pattern overlay (3% opacity) ── */}
        <div
          className="hero-absolute"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── FIX 1 — SVG noise overlay (4%) ── */}
        <div
          className="hero-absolute"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── FIX 1 — Enhanced Orb 1: orange, 700px, 0.18 opacity ── */}
        <div
          className="hero-absolute"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-150px",
            left: "-150px",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(232,130,12,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── FIX 1 — Enhanced Orb 2: blue, 500px, 0.10 opacity ── */}
        <div
          className="hero-absolute"
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-60px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── FIX 1 — New Orb 3: white glow behind photo card, center-right ── */}
        <div
          className="hero-absolute"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            right: "8%",
            transform: "translateY(-50%)",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Main grid container ─────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1280px",
            margin: "0 auto",
            alignItems: "center",
            minHeight: "100svh",
            padding: "120px 80px 100px",
            gap: "64px",
          }}
          className="hero-grid"
        >
          {/* ════════════════════════════════════════════
              LEFT SIDE — Statement
          ════════════════════════════════════════════ */}
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="hero-left"
          >
            {/* Step 1 — Rating pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(232,130,12,0.10)",
                border: "1px solid rgba(232,130,12,0.25)",
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                width: "fit-content",
                marginBottom: "28px",
              }}
            >
              <span
                className="hero-pulse-dot"
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#E8820C",
                  flexShrink: 0,
                }}
              />
              ⭐ Rated 4.9 by 340+ Denver Homeowners
            </div>

            {/* Step 2 — Main headline */}
            <h1
              style={{
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "-2px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Denver&apos;s{" "}
              <span style={{ display: "inline-block" }}>
                <span style={{ color: "#E8820C" }}>#1</span>
                <svg
                  viewBox="0 0 80 8"
                  style={{
                    display: "block",
                    width: "60px",
                    height: "8px",
                    marginTop: "2px",
                  }}
                  aria-hidden="true"
                >
                  <path
                    d="M2,6 Q20,1 40,5 Q60,9 78,4"
                    stroke="#E8820C"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Home Remodeling
              <br />
              Company
            </h1>

            {/* Step 3 — Sub-headline */}
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                maxWidth: "420px",
                marginTop: "20px",
                marginBottom: 0,
              }}
            >
              From kitchens to full additions — upfront pricing, zero surprises,
              and a finish date we actually keep.
            </p>

            {/* Step 4 — Micro trust icons */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                marginTop: "20px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {[
                { Icon: ShieldCheck, label: "Licensed" },
                { Icon: Clock, label: "Same-Day" },
                { Icon: Star, label: "4.9 Stars" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <Icon
                    style={{ width: "14px", height: "14px", color: "#E8820C" }}
                    aria-hidden="true"
                  />
                  {label}
                </div>
              ))}
            </div>

            {/* Step 5 — CTA buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                marginTop: "32px",
              }}
              className="hero-ctas"
            >
              {/* Primary */}
              <Link
                href={siteConfig.hero.primaryCTA.href}
                id="hero-cta-estimate"
                className="hero-cta-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "linear-gradient(135deg, #F97316 0%, #E8820C 100%)",
                  borderRadius: "14px",
                  padding: "18px 32px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "white",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.92")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Get My Free Estimate
                <ArrowRight style={{ width: "18px", height: "18px" }} aria-hidden="true" />
              </Link>

              {/* Secondary */}
              <a
                href={`tel:+1${siteConfig.phone.replace(/\D/g, "")}`}
                id="hero-cta-call"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "14px",
                  padding: "18px 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "white",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <Phone style={{ width: "16px", height: "16px" }} aria-hidden="true" />
                Call Now
              </a>
            </div>

            {/* Step 6 — Guarantee line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "20px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span
                className="hero-green-pulse"
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#22C55E",
                  flexShrink: 0,
                }}
              />
              We call back within 2 hours — guaranteed
            </div>

            {/* FIX 3 — ZIP checker in hero (hidden on mobile, moved below) */}
            <div className="hidden md:block">
              <ZipChecker variant="hero" />
            </div>
          </div>

          {/* ════════════════════════════════════════════
              RIGHT SIDE — Photo card stack (desktop only)
          ════════════════════════════════════════════ */}
          <div
            className="hero-right hidden md:block"
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Main photo card — FIX 2: contractor remodeling image */}
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                width: "100%",
                maxWidth: "480px",
                height: "520px",
                boxShadow:
                  "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900&q=85"
                alt="Professional contractor doing home remodeling work in Denver"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority
                sizes="(max-width: 768px) 0px, 480px"
              />
              {/* Bottom gradient overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* FIX 2 — Floating review card: bottom:24px (no negative), hidden on mobile */}
            <div
              className="hidden md:block hero-absolute"
              style={{
                position: "absolute",
                bottom: "24px",
                left: "-16px",
                background: "white",
                borderRadius: "16px",
                padding: "14px 18px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                width: "200px",
                zIndex: 15,
              }}
            >
              <div
                style={{ display: "flex", gap: "2px", marginBottom: "4px" }}
                aria-label="5 star rating"
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} style={{ color: "#F59E0B", fontSize: "16px" }}>★</span>
                ))}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>
                340+ Five-Star Reviews
              </div>
              <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                on Google
              </div>
            </div>

            {/* Floating jobs counter card — top-right */}
            <div
              className="hero-absolute"
              style={{
                position: "absolute",
                top: "20px",
                right: "-20px",
                background: "#E8820C",
                borderRadius: "14px",
                padding: "12px 16px",
                boxShadow: "0 12px 32px rgba(232,130,12,0.4)",
                width: "130px",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: "26px", fontWeight: 800, color: "white", lineHeight: 1.1 }}>
                1,200+
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.88)", marginTop: "2px" }}>
                Projects Done
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            STATS BAR — FIX 1: no negative margin, no overflow clip
            Sits at the bottom of the hero section's padding area
        ════════════════════════════════════════════ */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
              /* FIX 1 — 28px/48px desktop padding, labels fully visible */
              padding: "28px 48px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "visible",
            }}
            className="hero-stats-bar"
          >
            {/* Stat 1 */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1.1, display: "block" }}>15+</div>
              <div style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px", display: "block" }}>Years in Business</div>
            </div>
            {/* Divider */}
            <div aria-hidden="true" style={{ width: "1px", height: "40px", background: "#E5E7EB", flexShrink: 0, alignSelf: "center" }} />
            {/* Stat 2 */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1.1, display: "block" }}>4.9★</div>
              <div style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px", display: "block" }}>Google Rating</div>
            </div>
            {/* Divider */}
            <div aria-hidden="true" style={{ width: "1px", height: "40px", background: "#E5E7EB", flexShrink: 0, alignSelf: "center" }} />
            {/* Stat 3 */}
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1.1, display: "block" }}>1,200+</div>
              <div style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px", display: "block" }}>Jobs Completed</div>
            </div>
          </div>
        </div>

        {/* ── Responsive overrides ─────────────────────────────────────── */}
        <style>{`
          @media (min-width: 768px) {
            .hero-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (max-width: 767px) {
            .hero-absolute {
              display: none !important;
            }
            .hero-grid {
              display: flex;
              flex-direction: column;
              width: 100%;
              /* FIX 3 — Hero padding tightened */
              padding: 80px 20px 40px !important;
              gap: 0 !important;
              min-height: unset !important;
            }
            .hero-left {
              align-items: center;
              text-align: center;
            }
            .hero-left p {
              margin-left: auto;
              margin-right: auto;
            }
            .hero-right {
              display: none !important;
            }
            .hero-ctas {
              flex-direction: column !important;
              width: 100%;
            }
            .hero-ctas a {
              width: 100% !important;
              white-space: normal !important;
            }
            /* FIX 1 & 3 — Mobile stats bar: width calc, auto margin, no negative */
            .hero-stats-bar {
              display: grid !important;
              grid-template-columns: 1fr 1fr 1fr !important;
              padding: 20px 16px !important;
              gap: 0 !important;
              align-items: center !important;
              width: calc(100% - 32px) !important;
              margin-left: 16px !important;
              margin-right: 16px !important;
              max-width: 100% !important;
            }
            /* FIX 1 — Hide dividers on mobile */
            .hero-stats-bar > div[aria-hidden="true"] {
              display: none !important;
            }
            /* FIX 1 — Smaller numbers on mobile */
            .hero-stats-bar > div > div:first-child {
              font-size: 20px !important;
            }
            /* FIX 1 — Labels always visible on mobile */
            .hero-stats-bar > div > div:last-child {
              font-size: 13px !important;
              display: block !important;
            }
            .zip-checker-hero {
              width: 100% !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .hero-grid {
              padding: 120px 40px 80px !important;
              gap: 40px !important;
            }
            .hero-stats-bar {
              padding: 24px 32px !important;
            }
          }
        `}</style>
      </section>

      {/* FIX 3 — Mobile ZIP checker moved BELOW stats bar in its own section */}
      <section style={{ width: "100%", maxWidth: "100%" }} className="md:hidden bg-white px-5 py-5 border-b border-gray-100">
        <ZipChecker variant="wizard" />
      </section>
    </>
  );
}
