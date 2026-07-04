"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";
import type { FAQ } from "@/types";

// =============================================================================
// FAQAccordion — Expandable FAQ items
// Pre-answers objections before the visitor bounces to search.
// =============================================================================

interface AccordionItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ faq, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <AnimatedSection delay={index * 0.05}>
      <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-white">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-5 md:p-6 min-h-[56px] text-left cursor-pointer hover:bg-[var(--color-background-alt)] transition-colors"
          aria-expanded={isOpen}
        >
          <span className="text-base md:text-lg font-semibold text-[var(--color-primary)]">
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown className="w-6 h-6 text-[var(--color-text-muted)]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-gray-600 leading-[1.7]">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

interface FAQAccordionProps {
  /** Optional: override FAQs from config (used on service pages) */
  faqs?: FAQ[];
  /** Optional: custom section title */
  title?: string;
}

export function FAQAccordion({ faqs, title }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = faqs || siteConfig.faqs;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="section-padding bg-[var(--color-background-alt)]"
      aria-label="Frequently asked questions"
    >
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
            {title || "Frequently Asked Questions"}
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. If you don&apos;t see what
            you&apos;re looking for, give us a call.
          </p>
        </AnimatedSection>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <p className="text-[var(--color-text-muted)] mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold hover:underline text-lg"
          >
            Contact us — we respond within 2 hours →
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
