"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";
import { cn } from "@/lib/utils";

// =============================================================================
// Navbar — Sticky navigation with mobile hamburger menu
// Phone number and CTA are ALWAYS visible — never hidden behind hamburger.
// =============================================================================

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "text-xl md:text-2xl font-bold transition-colors duration-300",
            isScrolled ? "text-[var(--color-primary)]" : "text-white"
          )}
        >
          {siteConfig.logoText}
        </Link>

        {/* Tablet/Desktop Navigation Links */}
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

        {/* Tablet/Desktop: Rating + Phone + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Star rating badge */}
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isScrolled ? "text-[var(--color-text)]" : "text-white"
            )}
          >
            <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <span>{siteConfig.overallRating.stars}</span>
          </div>

          {/* Phone (Hidden on tablet, shown on lg) */}
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
          <Button href={siteConfig.hero.primaryCTA.href} size="sm">
            Get Free Estimate
          </Button>
        </div>

        {/* Mobile: Hamburger only */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "flex items-center justify-center min-h-[48px] min-w-[48px] rounded-lg transition-colors",
              isScrolled
                ? "text-[var(--color-primary)] hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            )}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100"
          >
            <div className="container-custom py-6 flex flex-col gap-1">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center min-h-[48px] px-4 text-[var(--color-text)] font-medium rounded-lg hover:bg-[var(--color-background-alt)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <hr className="my-3 border-gray-100" />

              {/* Rating */}
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-muted)]">
                <Star className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                <span>
                  {siteConfig.overallRating.stars}★ from {siteConfig.overallRating.count}+{" "}
                  {siteConfig.overallRating.platform} Reviews
                </span>
              </div>

              {/* Phone */}
              <a
                href={`tel:${formatPhoneTel(siteConfig.phone)}`}
                className="flex items-center gap-3 px-4 min-h-[48px] text-[var(--color-primary)] text-lg font-semibold rounded-lg hover:bg-[var(--color-background-alt)] transition-colors"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.phone}
              </a>

              {/* CTA */}
              <div className="mt-2 px-4">
                <Button
                  href={siteConfig.hero.primaryCTA.href}
                  className="w-full min-h-[48px]"
                  size="lg"
                >
                  Get My Free Estimate
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
