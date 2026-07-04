"use client";

import React, { useState } from "react";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// GalleryPageContent — Full project gallery with category filter
// =============================================================================

export function GalleryPageContent() {
  const categories = [
    "All",
    ...Array.from(new Set(siteConfig.galleryItems.map((item) => item.category))),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? siteConfig.galleryItems
      : siteConfig.galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-primary)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)]/30 to-[var(--color-primary)]" />
        <div className="relative container-custom">
          <AnimatedSection>
            <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-4">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-white leading-[1.1] mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              See Our Work in Action
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              Browse before-and-after transformations from recent projects.
              Drag the slider to see the difference.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Category Filter */}
          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === category
                    ? "bg-[var(--color-accent)] text-white shadow-lg"
                    : "bg-[var(--color-background-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] border border-[var(--color-border)]"
                }`}
              >
                {category}
              </button>
            ))}
          </AnimatedSection>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 0.1}>
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  caption={`${item.caption}${item.location ? ` — ${item.location}` : ""}`}
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                  {item.location && (
                    <span className="text-sm text-[var(--color-text-muted)]">
                      📍 {item.location}
                    </span>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-muted)] text-lg">
                No projects found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
