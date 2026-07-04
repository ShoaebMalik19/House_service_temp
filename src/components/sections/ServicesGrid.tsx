"use client";

import React from "react";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// ServicesGrid — Responsive grid of service cards
// =============================================================================

export function ServicesGrid() {
  return (
    <section
      id="services"
      className="section-padding bg-[var(--color-background-alt)]"
      aria-label="Our services"
    >
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
            Our Services
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            From small repairs to complete home transformations — we handle every
            project with the same commitment to quality and transparency.
          </p>
        </AnimatedSection>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
