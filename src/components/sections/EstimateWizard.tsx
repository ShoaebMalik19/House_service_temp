"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Send, Phone, MessageSquare, Mail } from "lucide-react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ZipChecker } from "@/components/shared/ZipChecker";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// EstimateWizard — Multi-step interactive estimate form
// Step 0: ZIP checker (FIX 3)
// Steps 1-4: service → scope → urgency → contact
// Result: realistic price ranges + message template (FIX 4)
// Final step: contact preference toggle (FIX 5)
// =============================================================================

// FIX 4 — Realistic price ranges keyed by service slug
const REALISTIC_PRICES: Record<string, { label: string; range: string }> = {
  "kitchen-remodeling":  { label: "Kitchen Remodeling",  range: "$15,000 – $75,000" },
  "bathroom-renovation": { label: "Bathroom Renovation",  range: "$8,000 – $35,000" },
  "basement-finishing":  { label: "Basement Finishing",   range: "$20,000 – $65,000" },
  "deck-building":       { label: "Deck Building",        range: "$8,000 – $25,000" },
  "home-additions":      { label: "Home Addition",        range: "$40,000 – $150,000" },
  "general-repairs":     { label: "General Repairs",      range: "$500 – $5,000" },
};

interface FormData {
  zip: string;
  service: string;
  scope: string;
  urgency: string;
  name: string;
  phone: string;
  email: string;
  contactPref: "call" | "text" | "email";
}

// Wizard steps AFTER the ZIP gate
const WIZARD_STEPS = ["service", "scope", "urgency", "contact"] as const;

export function EstimateWizard() {
  // -1 = ZIP gate, 0..3 = wizard steps
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [zipPassed, setZipPassed] = useState(false);
  const [zipValue, setZipValue] = useState("");
  const [zipSuccessFlash, setZipSuccessFlash] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    zip: "",
    service: "",
    scope: "",
    urgency: "",
    name: "",
    phone: "",
    email: "",
    contactPref: "text",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = siteConfig.estimateSteps;
  const wizardStepCount = 4; // service, scope, urgency, contact
  const totalDisplaySteps = wizardStepCount;
  const progress = currentStep < 0 ? 0 : ((currentStep + 1) / totalDisplaySteps) * 100;

  // When ZIP is valid: flash success, then advance
  const handleValidZip = (zip: string) => {
    setZipValue(zip);
    setFormData((prev) => ({ ...prev, zip }));
    setZipSuccessFlash(true);
    setZipPassed(true);
    setTimeout(() => {
      setCurrentStep(0);
      setZipSuccessFlash(false);
    }, 900);
  };

  const canProceed = () => {
    const stepId = WIZARD_STEPS[currentStep];
    switch (stepId) {
      case "service":  return formData.service !== "";
      case "scope":    return formData.scope !== "";
      case "urgency":  return formData.urgency !== "";
      case "contact":  return formData.name !== "" && formData.phone !== "" && formData.email !== "";
      default:         return false;
    }
  };

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) setCurrentStep((p) => p + 1);
  };
  const handleBack = () => {
    if (currentStep === 0) {
      // Go back to ZIP gate
      setCurrentStep(-1);
    } else {
      setCurrentStep((p) => p - 1);
    }
  };

  const getPriceInfo = () => {
    return REALISTIC_PRICES[formData.service] ?? null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const priceInfo = getPriceInfo();
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "estimate",
          priceRange: priceInfo?.range ?? "N/A",
          contactPreference: formData.contactPref,
        }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Submitted success state ──────────────────────────────────────────
  if (isSubmitted) {
    const priceInfo = getPriceInfo();
    const serviceName = priceInfo?.label ?? formData.service;
    const range = priceInfo?.range ?? "";

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
                {/* FIX 4 — Realistic estimate with message template */}
                <p className="text-lg mb-3 !text-[#1A1A1A]">Most {serviceName} projects in the Denver area run between:</p>
                <p className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] mb-4">{range}</p>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  Your exact price depends on scope, materials, and site conditions — we&apos;ll give you a precise quote
                  within 2 hours, completely free.
                </p>
              </div>
              <p className="text-lg !text-[#1A1A1A]">
                Check your {formData.contactPref === "text" ? "texts" : formData.contactPref === "call" ? "phone" : "email"} — we&apos;re fast. 🚀
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Get the step config from siteConfig matching our current wizard step
  const siteStep = steps.find((s) => s.id === WIZARD_STEPS[currentStep]);

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
            Answer a few quick questions and get an instant price range — no phone call required, no obligation.
          </p>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {/* Progress Bar — only show during wizard steps */}
          {currentStep >= 0 && (
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2 !text-[#1A1A1A]">
                <span>Step {currentStep + 2} of {totalDisplaySteps + 1}</span>
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
          )}

          {/* Step Content */}
          <div className="bg-white rounded-[16px] md:rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.1)] p-6 md:p-10 pb-8 md:pb-8" style={{ minHeight: "280px" }}>
            <AnimatePresence mode="wait">
              {/* ── FIX 3 — ZIP gate step (-1) ── */}
              {currentStep === -1 && (
                <motion.div
                  key="zip-gate"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* FIX 2: heading already explains; no duplicate small label */}
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 !text-[#111827] text-center">
                    Enter your ZIP code to check coverage
                  </h3>
                  <p className="text-center text-[#6B7280] text-sm mb-6">
                    We serve the Greater Denver area — confirm in seconds.
                  </p>

                  {zipSuccessFlash ? (
                    <div className="flex flex-col items-center gap-3 py-6">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                      <p className="text-lg font-semibold text-green-600">✓ We serve your area!</p>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <ZipChecker variant="wizard" onValidZip={handleValidZip} />
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Wizard steps 0–3 ── */}
              {currentStep >= 0 && siteStep && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold mb-6 !text-[#111827]">
                    {siteStep.question}
                  </h3>

                  {/* Select options */}
                  {siteStep.type === "select" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {siteStep.options?.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelect(siteStep.id, option.value)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer min-h-[56px] ${
                            formData[siteStep.id as keyof FormData] === option.value
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] !text-[#111827]"
                              : "bg-white border-[var(--color-border)] !text-[#1A1A1A] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)]"
                          }`}
                        >
                          {option.icon && (
                            <DynamicIcon name={option.icon} className="w-5 h-5 shrink-0" />
                          )}
                          <span className="font-medium text-sm">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Contact fields (last step) */}
                  {siteStep.type === "contact" && (
                    <div className="space-y-4">
                      {/* Estimate preview */}
                      {formData.service && getPriceInfo() && (
                        <div className="bg-[var(--color-accent-light)] border border-[var(--color-accent)]/30 rounded-xl p-4 mb-6">
                          <p className="text-sm mb-1 !text-[#1A1A1A]">Your estimated range:</p>
                          <p className="text-2xl font-bold text-[var(--color-accent)]">
                            {getPriceInfo()?.range}
                          </p>
                        </div>
                      )}

                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your Name"
                        className="w-full p-4 rounded-xl bg-white border-2 border-[var(--color-border)] !text-[#1A1A1A] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="Phone Number"
                        className="w-full p-4 rounded-xl bg-white border-2 border-[var(--color-border)] !text-[#1A1A1A] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="Email Address"
                        className="w-full p-4 rounded-xl bg-white border-2 border-[var(--color-border)] !text-[#1A1A1A] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      />

                      {/* FIX 5 — Contact preference toggle */}
                      <div>
                        <p className="text-sm font-medium !text-[#1A1A1A] mb-3">
                          How should we reach you?
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {(
                            [
                              { value: "call", icon: Phone, label: "📞 Call" },
                              { value: "text", icon: MessageSquare, label: "💬 Text" },
                              { value: "email", icon: Mail, label: "✉️ Email" },
                            ] as const
                          ).map(({ value, label }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, contactPref: value }))}
                              style={{
                                padding: "10px 20px",
                                borderRadius: "100px",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.18s",
                                background:
                                  formData.contactPref === value
                                    ? "linear-gradient(135deg, #F97316, #E8820C)"
                                    : "white",
                                color:
                                  formData.contactPref === value ? "white" : "#374151",
                                border:
                                  formData.contactPref === value
                                    ? "none"
                                    : "1px solid #E5E7EB",
                              }}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        {formData.contactPref === "text" && (
                          <p className="text-xs text-[#6B7280] mt-2">
                            Most clients prefer text — we reply within 1 hour.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons — only during wizard steps */}
          {currentStep >= 0 && (
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between mt-6 gap-3 sm:gap-0">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center justify-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors px-4 py-3 min-h-[48px] rounded-lg border border-[var(--color-border)] sm:border-transparent"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              {currentStep < WIZARD_STEPS.length - 1 ? (
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
          )}
        </div>
      </div>
    </section>
  );
}
