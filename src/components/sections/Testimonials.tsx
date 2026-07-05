"use client";

import React, { useState, useRef } from "react";
import { Star } from "lucide-react";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// Testimonials — Reviews section with grid/carousel and overall rating
// Reviews are the most-cited trust factor for home service decisions.
// =============================================================================

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const card = scrollRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  return (
    <section
      id="testimonials"
      className="section-padding bg-[var(--color-background-alt)]"
      aria-label="Customer testimonials"
    >
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
            What Our Clients Say
          </h2>

          {/* Overall Rating Callout */}
          <div className="inline-flex items-center justify-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-[var(--color-border)] w-full md:w-auto">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-orange-500 text-orange-500"
                />
              ))}
            </div>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {siteConfig.overallRating.stars}
            </span>
            <span className="text-[var(--color-text-muted)] text-sm md:text-base">
              from {siteConfig.overallRating.count}+{" "}
              {siteConfig.overallRating.platform} Reviews
            </span>
          </div>
        </AnimatedSection>

        {/* Responsive Grid (Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.testimonials.slice(0, 3).map((testimonial, index) => (
            <AnimatedSection 
              key={testimonial.name} 
              delay={index * 0.1}
              className={index === 2 ? "md:col-span-2 lg:col-span-1 flex justify-center md:block lg:flex" : ""}
            >
              <div className={index === 2 ? "md:w-1/2 lg:w-full mx-auto" : ""}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-[var(--color-accent)]/25"
          >
            Join {siteConfig.overallRating.count}+ Happy Customers
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
