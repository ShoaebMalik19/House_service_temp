"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { Service } from "@/types";

// =============================================================================
// ServiceCard — FIX 1: correct images per service, 180px height, gradient overlay
// =============================================================================

// FIX 1 — Definitive image map keyed by slug
const SERVICE_IMAGES: Record<string, string> = {
  "kitchen-remodeling":  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  "bathroom-renovation": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
  "deck-building":       "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80",
  "basement-finishing":  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  "home-additions":      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80",
  "general-repairs":     "https://images.unsplash.com/photo-1581244277943-fe4a9c777540?w=600&q=80",
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  // Use override map first, then fall back to siteConfig image
  const imageUrl = SERVICE_IMAGES[service.slug] ?? service.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 h-full"
      >
        {/* FIX 1 — Image: 180px height, cover, gradient overlay */}
        <div
          className="relative shrink-0 overflow-hidden"
          style={{
            height: "180px",
            borderRadius: "12px 12px 0 0",
          }}
        >
          {/* Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {/* Subtle dark gradient overlay fading into white card below */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-6 pt-2 flex flex-col flex-grow relative z-10">
          {/* Icon floating up */}
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20 mb-4 -mt-8 md:-mt-9 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm">
            <DynamicIcon
              name={service.icon}
              className="w-6 h-6 md:w-7 md:h-7 text-[var(--color-accent)]"
            />
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-[var(--color-primary)] mb-2 md:mb-3 group-hover:text-[var(--color-accent)] transition-colors">
            {service.name}
          </h3>

          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4 flex-grow">
            {service.shortDescription}
          </p>

          {/* Learn More — full-width button style on mobile, inline on desktop */}
          <span className="flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] group-hover:gap-3 transition-all duration-300 mt-auto w-full bg-[var(--color-accent)]/10 md:bg-transparent py-3 md:py-0 rounded-lg md:rounded-none md:justify-start cursor-pointer user-select-none">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
