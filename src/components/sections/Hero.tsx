"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/siteConfig";
import { Shield, Phone } from "lucide-react";

// =============================================================================
// Hero — Full-width hero with background image, headline, benefits, and CTAs
// This is the entire website for the first 5 seconds.
// =============================================================================

export function Hero() {
  const { hero, phone } = siteConfig;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center"
      aria-label="Hero section"
    >
      {/* Background — CSS background with overlay for better performance */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        {/* Gradient overlay for text readability */}
        <div 
          className="absolute inset-0" 
          style={{ background: 'linear-gradient(to right, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.85) 45%, rgba(5,10,20,0.2) 100%)' }}
        />
        <div className="bg-noise" />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--color-primary)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-custom py-32 md:py-40 lg:py-48">
        <div className="max-w-3xl">
          {/* Benefit Tags */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            {hero.benefitTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/12 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/25"
              >
                <Shield className="w-3.5 h-3.5 text-white" />
                {tag}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-[32px] md:text-[40px] lg:text-[64px] font-extrabold !text-white leading-[1.1] tracking-tight mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:text-left text-center">
            {hero.headline}
          </h1>

          {/* Sub-headline */}
          <p className="text-base md:text-xl text-white leading-relaxed mb-8 max-w-2xl md:text-left text-center">
            {hero.subHeadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={hero.primaryCTA.href} size="lg" className="w-full sm:w-auto min-h-[48px]">
              {hero.primaryCTA.text}
            </Button>
            <Button href={hero.secondaryCTA.href} variant="secondary" size="lg" className="w-full sm:w-auto min-h-[48px]">
              <Phone className="w-5 h-5" />
              {hero.secondaryCTA.text}
            </Button>
          </div>

          {/* Guarantee Text */}
          <p className="mt-6 text-white text-sm flex justify-center md:justify-start items-center gap-2">
            <Shield className="w-4 h-4 text-white" />
            {siteConfig.finalCTA.guaranteeText}
          </p>
        </div>
      </div>
    </section>
  );
}
