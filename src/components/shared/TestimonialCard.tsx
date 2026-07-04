"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

// =============================================================================
// TestimonialCard — Individual review card
// =============================================================================

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 md:p-8 border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-[var(--color-accent)]/20 mb-4" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? "fill-orange-500 text-orange-500"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[var(--color-text)] text-base leading-relaxed mb-6 flex-grow">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
        {/* Avatar */}
        <div 
          className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg shrink-0 ring-2 ring-orange-400 bg-cover bg-center"
          style={testimonial.avatar ? { backgroundImage: `url(${testimonial.avatar})` } : {}}
        >
          {!testimonial.avatar && testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="font-semibold text-[var(--color-primary)]">
            {testimonial.name}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            {testimonial.city}
          </p>
        </div>
      </div>
    </div>
  );
}
