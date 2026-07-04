"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Send } from "lucide-react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";
import { formatPriceRange } from "@/lib/utils";

// =============================================================================
// EstimateWizard — Multi-step interactive estimate form
// The single highest-value trust + conversion feature.
// Removes the #1 homeowner fear: price ambush.
// =============================================================================

interface FormData {
  service: string;
  scope: string;
  urgency: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
}

export function EstimateWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    service: "",
    scope: "",
    urgency: "",
    zip: "",
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = siteConfig.estimateSteps;
  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const canProceed = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case "service":
        return formData.service !== "";
      case "scope":
        return formData.scope !== "";
      case "urgency":
        return formData.urgency !== "";
      case "zip":
        return formData.zip.length >= 5;
      case "contact":
        return formData.name !== "" && formData.phone !== "" && formData.email !== "";
      default:
        return true;
    }
  };

  const handleSelect = (stepId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [stepId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getEstimateRange = () => {
    const service = siteConfig.services.find((s) => s.slug === formData.service);
    if (!service) return { min: 0, max: 0 };

    const scopeMultiplier =
      formData.scope === "small" ? 0.4 : formData.scope === "medium" ? 0.7 : 1;

    return {
      min: Math.round(service.priceRange.min * scopeMultiplier),
      max: Math.round(service.priceRange.max * scopeMultiplier),
    };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const estimate = getEstimateRange();
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "estimate",
          estimateRange: estimate,
        }),
      });
      setIsSubmitted(true);
    } catch {
      // Silently handle — in production, add error handling
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const estimate = getEstimateRange();
    return (
      <section id="estimate" className="section-padding bg-[var(--color-background-alt)]" aria-label="Estimate tool">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 text-[var(--color-success)] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 !text-[#111827]">
                Your Estimate Is Ready!
              </h2>
              <div className="bg-white rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.1)] p-8 mb-6">
                <p className="text-lg mb-3 !text-[#1A1A1A]">
                  Based on your answers, a typical project like this runs:
                </p>
                <p className="text-4xl md:text-5xl font-bold text-[var(--color-accent)]">
                  {formatPriceRange(estimate.min, estimate.max)}
                </p>
              </div>
              <p className="text-lg !text-[#1A1A1A]">
                We&apos;ll confirm your exact price within 2 hours. Check your
                phone — we&apos;re fast. 🚀
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="estimate"
      className="px-4 py-12 md:section-padding bg-[var(--color-background-alt)]"
      aria-label="Get an instant estimate"
    >
      <div className="container-custom">
        <AnimatedSection className="text-center mb-10">
          <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
            Instant Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 !text-[#111827]">
            Get Your Free Estimate in 60 Seconds
          </h2>
          <p className="text-lg max-w-2xl mx-auto !text-[#1A1A1A]">
            Answer a few quick questions and get an instant price range — no
            phone call required, no obligation.
          </p>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2 !text-[#1A1A1A]">
              <span>
                Step {currentStep + 1} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full h-[6px] bg-[var(--color-border)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-accent)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-[16px] md:rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.1)] p-6 md:p-10 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-6 !text-[#111827]">
                  {steps[currentStep].question}
                </h3>

                {/* Select options */}
                {steps[currentStep].type === "select" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {steps[currentStep].options?.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          handleSelect(steps[currentStep].id, option.value)
                        }
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer min-h-[56px] ${
                          formData[
                            steps[currentStep].id as keyof FormData
                          ] === option.value
                            ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] !text-[#111827]"
                            : "bg-white border-[var(--color-border)] !text-[#1A1A1A] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)]"
                        }`}
                      >
                        {option.icon && (
                          <DynamicIcon
                            name={option.icon}
                            className="w-5 h-5 shrink-0"
                          />
                        )}
                        <span className="font-medium text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Text input (ZIP code) */}
                {steps[currentStep].type === "text" && (
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={formData.zip}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        zip: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    placeholder="e.g., 80202"
                    className="w-full max-w-xs p-4 rounded-xl bg-white border-2 border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] text-lg focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                  />
                )}

                {/* Contact fields */}
                {steps[currentStep].type === "contact" && (
                  <div className="space-y-4">
                    {/* Show estimate preview */}
                    {formData.service && formData.scope && (
                      <div className="bg-[var(--color-accent-light)] border border-[var(--color-accent)]/30 rounded-xl p-4 mb-6">
                        <p className="text-sm mb-1 !text-[#1A1A1A]">
                          Your estimated range:
                        </p>
                        <p className="text-2xl font-bold text-[var(--color-accent)]">
                          {formatPriceRange(
                            getEstimateRange().min,
                            getEstimateRange().max
                          )}
                        </p>
                      </div>
                    )}

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Your Name"
                      className="w-full p-4 rounded-xl bg-white border-2 border-[var(--color-border)] !text-[#1A1A1A] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="Phone Number"
                      className="w-full p-4 rounded-xl bg-white border-2 border-[var(--color-border)] !text-[#1A1A1A] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Email Address"
                      className="w-full p-4 rounded-xl bg-white border-2 border-[var(--color-border)] !text-[#1A1A1A] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between mt-6 gap-3 sm:gap-0">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center justify-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed px-4 py-3 min-h-[48px] rounded-lg border border-[var(--color-border)] sm:border-transparent"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-8 py-3.5 min-h-[48px] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full sm:w-auto"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold px-8 py-3.5 min-h-[48px] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Get My Estimate"}
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
