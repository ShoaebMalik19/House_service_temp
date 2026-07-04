"use client";

import React from "react";
import Link from "next/link";
import { Phone, ArrowRight, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel, formatPriceRange } from "@/lib/utils";
import type { Service, GalleryItem } from "@/types";

// =============================================================================
// ServicePageContent — Client component for individual service pages
// Follows Problem → Agitate → Solution copy flow
// =============================================================================

interface ServicePageContentProps {
  service: Service;
  relatedServices: Service[];
  galleryItems: GalleryItem[];
}

export function ServicePageContent({
  service,
  relatedServices,
  galleryItems,
}: ServicePageContentProps) {
  return (
    <>
      {/* Service Hero */}
      <section className="relative bg-[var(--color-primary)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)]/50 to-[var(--color-primary)]" />
        <div className="relative container-custom">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-accent)]/20">
                <DynamicIcon name={service.icon} className="w-7 h-7 text-[var(--color-accent)]" />
              </div>
              <span className="text-[var(--color-accent)] font-semibold uppercase tracking-wider text-sm">
                Professional Service
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold !text-white leading-[1.1] mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] md:text-left text-center">
              {service.name} in {siteConfig.address.city}
            </h1>
            <p className="text-base md:text-xl text-white/80 leading-relaxed mb-8 max-w-3xl md:text-left text-center">
              {service.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="#estimate" size="lg" className="w-full sm:w-auto min-h-[48px]">
                Get My Free Estimate
              </Button>
              <Button
                href={`tel:${formatPhoneTel(siteConfig.phone)}`}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-h-[48px]"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.phone}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem → Agitate → Solution */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {/* Problem */}
          <AnimatedSection className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-4">
              Sound Familiar?
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
              {service.fullDescription.problem}
            </p>
          </AnimatedSection>

          {/* Agitate */}
          <AnimatedSection className="mb-12 bg-[var(--color-background-alt)] rounded-2xl p-8 border-l-4 border-[var(--color-accent)]">
            <p className="text-lg text-[var(--color-text)] leading-relaxed italic">
              {service.fullDescription.agitate}
            </p>
          </AnimatedSection>

          {/* Solution */}
          <AnimatedSection className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-4">
              Here&apos;s How We Fix That
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-6">
              {service.fullDescription.solution}
            </p>
            <div className="flex items-center gap-3 text-[var(--color-success)] font-medium">
              <CheckCircle className="w-5 h-5" />
              Starting from {formatPriceRange(service.priceRange.min, service.priceRange.max)}
            </div>
          </AnimatedSection>

          {/* Mid-page CTA */}
          <AnimatedSection className="text-center py-8">
            <Button href="#estimate" size="lg" className="w-full sm:w-auto min-h-[48px]">
              Get a Free {service.name} Estimate
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="mt-3 text-sm text-[var(--color-text-muted)] flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-[var(--color-success)]" />
              {siteConfig.finalCTA.guaranteeText}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Before/After for this service (if available) */}
      {galleryItems.length > 0 && (
        <section className="section-padding bg-[var(--color-background-alt)]">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
                {service.name} — Before & After
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {galleryItems.map((item) => (
                <AnimatedSection key={item.id}>
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    caption={item.caption}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific FAQ */}
      {service.faqs.length > 0 && (
        <FAQAccordion
          faqs={service.faqs}
          title={`${service.name} FAQ`}
        />
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
                Related Services
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedServices.map((related) => (
                <AnimatedSection key={related.slug}>
                  <Link
                    href={`/services/${related.slug}`}
                    className="group block bg-[var(--color-background-alt)] rounded-xl p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:shadow-lg transition-all"
                  >
                    <DynamicIcon
                      name={related.icon}
                      className="w-8 h-8 text-[var(--color-accent)] mb-4"
                    />
                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {related.name}
                    </h3>
                    <span className="text-sm text-[var(--color-accent)] font-medium">
                      Learn More →
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}
