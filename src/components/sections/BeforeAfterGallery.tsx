"use client";

import React from "react";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// BeforeAfterGallery — Before/after slider showcase
// Visual proof — strongest trust signal for quality-sensitive trades.
// =============================================================================

export function BeforeAfterGallery() {
  return (
    <section
      id="gallery"
      className="section-padding bg-white"
      aria-label="Before and after project gallery"
    >
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
            See the Transformation
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            Drag the slider to see the before and after of our recent projects.
            Real homes, real results.
          </p>
        </AnimatedSection>

        {/* Before/After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteConfig.galleryItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 0.1}>
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                caption={`${item.caption}${item.location ? ` — ${item.location}` : ""}`}
              />
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-semibold rounded-full">
                  {item.category}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold hover:underline text-lg"
          >
            View Full Project Gallery →
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
