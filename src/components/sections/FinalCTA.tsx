"use client";

import React from "react";
import { Phone, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";

// =============================================================================
// FinalCTA — Bold closing conversion section
// Dark background, high contrast — for visitors who scrolled all the way down.
// =============================================================================

export function FinalCTA() {
  return (
    <section
      className="relative py-20 md:py-28 bg-[var(--color-primary)] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)` }}
      aria-label="Get started"
    >
      {/* Decorative background */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(10,20,40,0.88)' }} 
      />
      <div className="bg-noise" />

      <div className="relative container-custom text-center">
        <AnimatedSection>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight !text-[#FFFFFF]">
            {siteConfig.finalCTA.headline}
          </h2>
          <p className="text-base md:text-xl px-4 md:px-0 text-[#FFFFFF] max-w-2xl mx-auto mb-8">
            {siteConfig.finalCTA.subHeadline}
          </p>

          {/* Large Phone Number */}
          <a
            href={`tel:${formatPhoneTel(siteConfig.phone)}`}
            className="inline-flex items-center gap-4 text-2xl md:text-3xl font-bold text-[var(--color-accent)] hover:text-white transition-colors mb-8"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/10 animate-pulse-fast shadow-[0_0_15px_rgba(232,130,12,0.3)]">
              <Phone className="w-6 h-6" />
            </div>
            {siteConfig.phone}
          </a>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 mb-8">
            <Button href="#estimate" size="lg" className="w-full sm:w-auto min-h-[48px]">
              Get Your Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              href={`tel:${formatPhoneTel(siteConfig.phone)}`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
            >
              <Phone className="w-5 h-5" />
              Call Now — We Answer Fast
            </Button>
          </div>

          {/* Guarantee */}
          <div className="inline-flex items-center gap-2 text-[#FFFFFF] text-sm">
            <Shield className="w-4 h-4 text-[var(--color-success)]" />
            {siteConfig.finalCTA.guaranteeText}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
