"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// ServiceArea — Cities/towns served with chip layout and map placeholder
// Confirms coverage and supports local SEO.
// =============================================================================

export function ServiceArea() {
  return (
    <section
      className="section-padding bg-white"
      aria-label="Service area coverage"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <AnimatedSection>
            <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
              Where We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              Proudly Serving the Denver Metro Area
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg mb-8">
              We provide home remodeling and repair services across the greater
              Denver metropolitan area. Not sure if we cover your area? Give us a
              call — we&apos;re probably closer than you think.
            </p>

            {/* City Chips */}
            <div className="flex flex-wrap gap-2">
              {siteConfig.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--color-background-alt)] text-[var(--color-text)] text-sm font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {area}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Embedded Map */}
          <AnimatedSection delay={0.2}>
            <div className="w-full rounded-[12px] md:rounded-[16px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196281.12745330384!2d-104.990251!3d39.7392358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876b80aa231f17cf%3A0x118ef4f8278a36d6!2sDenver%2C%20CO!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-[280px] md:h-[320px] lg:h-[400px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
