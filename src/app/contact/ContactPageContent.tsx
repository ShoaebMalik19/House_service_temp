"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Shield } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";

// =============================================================================
// ContactPageContent — Contact form, phone, hours, map
// Short form (4-5 fields max) — every additional field reduces completion.
// =============================================================================

export function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "contact" }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-primary)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)]/30 to-[var(--color-primary)]" />
        <div className="relative container-custom">
          <AnimatedSection>
            <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-white leading-[1.1] mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              Let&apos;s Talk About Your Project
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              Call us, fill out the form, or stop by. We respond to every inquiry
              within 2 hours — guaranteed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Form */}
            <AnimatedSection>
              {isSubmitted ? (
                <div className="bg-[var(--color-background-alt)] rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-[var(--color-success)] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">
                    Message Sent!
                  </h2>
                  <p className="text-[var(--color-text-muted)] text-lg">
                    Thank you for reaching out. We&apos;ll get back to you within
                    2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                    Send Us a Message
                  </h2>

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                    >
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select a service...</option>
                      {siteConfig.services.map((service) => (
                        <option key={service.slug} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                      <option value="Other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
                    >
                      Tell Us About Your Project
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
                      placeholder="Describe your project, timeline, budget range, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.email}
                    className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold py-4 rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-accent)]/25 min-h-[52px] cursor-pointer"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-sm text-[var(--color-text-muted)] text-center flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-[var(--color-success)]" />
                    {siteConfig.finalCTA.guaranteeText}
                  </p>
                </form>
              )}
            </AnimatedSection>

            {/* Right: Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                {/* Phone */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">
                    Call Us Directly
                  </h3>
                  <a
                    href={`tel:${formatPhoneTel(siteConfig.phone)}`}
                    className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
                  >
                    <Phone className="w-8 h-8" />
                    {siteConfig.phone}
                  </a>
                  <p className="text-[var(--color-text-muted)] mt-2">
                    We answer the phone — no phone trees, no voicemail runaround.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                    Email
                  </h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    {siteConfig.email}
                  </a>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                    Office Location
                  </h3>
                  <div className="flex items-start gap-3 text-[var(--color-text-muted)]">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.city}, {siteConfig.address.state}{" "}
                      {siteConfig.address.zip}
                    </span>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-3">
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    {siteConfig.businessHours.map((hours) => (
                      <div
                        key={hours.day}
                        className="flex items-center gap-3 text-[var(--color-text-muted)]"
                      >
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="font-medium text-[var(--color-text)] w-40">
                          {hours.day}
                        </span>
                        <span>{hours.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="aspect-video rounded-xl overflow-hidden bg-[var(--color-background-alt)] border border-[var(--color-border)]">
                  {siteConfig.mapEmbedUrl ? (
                    <iframe
                      src={siteConfig.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Office location map"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-text-muted)]">
                      <MapPin className="w-12 h-12 text-[var(--color-accent)]/30 mb-3" />
                      <p className="text-sm font-medium">
                        {siteConfig.address.city}, {siteConfig.address.state}
                      </p>
                      <p className="text-xs mt-1">Map embed placeholder</p>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
