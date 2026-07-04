"use client";

import React from "react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// HowItWorks — Numbered steps with connecting timeline
// Removes uncertainty about what happens after contact.
// =============================================================================

export function HowItWorks() {
  return (
    <section
      className="section-padding bg-[var(--color-background-alt)]"
      aria-label="How it works"
    >
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 !text-[#111827]">
            How It Works
          </h2>
          <p className="text-lg max-w-2xl mx-auto !text-[#1A1A1A]">
            Getting started is easy. Here&apos;s exactly what happens when you reach out.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-[var(--color-border)]" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {siteConfig.howItWorks.map((step, index) => (
              <AnimatedSection
                key={step.stepNumber}
                delay={index * 0.12}
                className="relative"
              >
                <div className="flex flex-col items-center text-center bg-white md:bg-transparent rounded-2xl p-5 md:p-0 shadow-sm md:shadow-none">
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)] text-white text-xl font-bold mb-6 shadow-lg">
                    {step.stepNumber}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 mb-4">
                    <DynamicIcon
                      name={step.icon}
                      className="w-6 h-6 text-[var(--color-accent)]"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 !text-[#111827]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xs !text-[#1A1A1A]">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connecting line between steps */}
                {index < siteConfig.howItWorks.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <div className="w-[2px] h-8 bg-[#E5E7EB]" />
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="text-center mt-12">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-[var(--color-accent)]/25"
          >
            Start With Step 1 — It&apos;s Free
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
