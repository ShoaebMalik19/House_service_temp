"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { Service } from "@/types";

// =============================================================================
// ServiceCard — Individual service card for the grid
// =============================================================================

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
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
        {/* Top Image Section */}
        <div className="relative h-[120px] w-full shrink-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className="absolute inset-0 bg-[var(--color-primary)]/40 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300" />
          {/* Subtle gradient into white body */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-5 md:p-8 pt-2 flex flex-col flex-grow relative z-10">
          {/* Icon floating up a bit */}
          <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent)]/20 mb-4 -mt-8 md:-mt-10 group-hover:-translate-y-1 transition-transform duration-300">
            <DynamicIcon
              name={service.icon}
              className="w-6 h-6 md:w-7 md:h-7 text-[var(--color-accent)]"
            />
          </div>

          <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
            {service.name}
          </h3>

          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4 flex-grow">
            {service.shortDescription}
          </p>

          {/* Learn More link */}
          <span className="flex items-center justify-center md:justify-start gap-1.5 text-sm font-semibold text-[var(--color-accent)] group-hover:gap-3 transition-all duration-300 mt-4 md:mt-auto w-full md:w-auto bg-[var(--color-accent)]/10 md:bg-transparent py-3 md:py-0 rounded-lg md:rounded-none text-center">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
