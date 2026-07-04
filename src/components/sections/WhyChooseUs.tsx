"use client";

import React from "react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// WhyChooseUs — 3-4 differentiators with icons and customer-benefit copy
// Written from the CUSTOMER'S perspective, not the company's ego.
// =============================================================================

export function WhyChooseUs() {
  return (
    <section
      className="section-padding bg-white"
      aria-label="Why choose us"
    >
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
            The Summit Difference
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Why Homeowners Choose Us
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            We know you have options. Here&apos;s why over 1,200 Denver families
            have trusted us with their homes.
          </p>
        </AnimatedSection>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {siteConfig.differentiators.map((item, index) => (
            <AnimatedSection
              key={item.headline}
              delay={index * 0.1}
              className="flex gap-5"
            >
              <div className="shrink-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-accent)]/10">
                  <DynamicIcon
                    name={item.icon}
                    className="w-7 h-7 text-[var(--color-accent)]"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                  {item.headline}
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA after section */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-[var(--color-accent)]/25"
          >
            Get Your Free Estimate Today
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
