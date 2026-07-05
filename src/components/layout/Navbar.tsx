"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";
import { cn } from "@/lib/utils";

// =============================================================================
// Navbar — FIX 3 mobile: logo 18px, hamburger only on mobile, full-screen
// dropdown with Call + Estimate CTAs at bottom.
// Desktop: nav links + star rating + phone + CTA unchanged.
// =============================================================================

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const close = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      )}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo — FIX 3: 18px on mobile */}
        <Link
          href="/"
          className={cn(
            "font-bold transition-colors duration-300",
            "text-[18px] md:text-2xl",
            isScrolled ? "text-[var(--color-primary)]" : "text-white"
          )}
        >
          {siteConfig.logoText}
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200 hover:text-[var(--color-accent)]",
                isScrolled ? "text-[var(--color-text)]" : "text-white/90"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop: Rating + Phone + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Star rating */}
          <div className={cn("flex items-center gap-1 text-sm font-medium", isScrolled ? "text-[var(--color-text)]" : "text-white")}>
            <span style={{ color: "#F59E0B" }}>★</span>
            <span>{siteConfig.overallRating.stars}</span>
          </div>

          {/* Phone — lg+ only */}
          <a
            href={`tel:${formatPhoneTel(siteConfig.phone)}`}
            className={cn(
              "hidden lg:flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--color-accent)]",
              isScrolled ? "text-[var(--color-primary)]" : "text-white"
            )}
          >
            <Phone className="w-4 h-4" />
            {siteConfig.phone}
          </a>

          {/* CTA Button */}
          <Link
            href={siteConfig.hero.primaryCTA.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, #F97316, #E8820C)",
              borderRadius: "10px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
              transition: "opacity 0.2s",
              cursor: "pointer",
              userSelect: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Get Free Estimate
          </Link>
        </div>

        {/* FIX 3 Mobile — Hamburger only, 40×40 tap target */}
        <button
          className="flex md:hidden items-center justify-center rounded-lg transition-colors"
          style={{
            width: "40px",
            height: "40px",
            color: isScrolled ? "#111827" : "white",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X style={{ width: "24px", height: "24px" }} /> : <Menu style={{ width: "24px", height: "24px" }} />}
        </button>
      </nav>

      {/* FIX 3 Mobile menu — full-width dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100"
            style={{ zIndex: 100 }}
          >
            {/* Nav links — FIX 3: 16px padding, 18px font, border-bottom dividers */}
            <div>
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  style={{
                    display: "block",
                    padding: "16px 20px",
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#111827",
                    textDecoration: "none",
                    borderBottom: "1px solid #F3F4F6",
                    transition: "color 0.15s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* FIX 3 — Bottom CTAs: Call + Estimate */}
            <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`tel:${formatPhoneTel(siteConfig.phone)}`}
                onClick={close}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "#111827",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Phone style={{ width: "18px", height: "18px" }} />
                Call Now — {siteConfig.phone}
              </a>
              <Link
                href={siteConfig.hero.primaryCTA.href}
                onClick={close}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #F97316, #E8820C)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 700,
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Get Free Estimate
                <ArrowRight style={{ width: "18px", height: "18px" }} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
