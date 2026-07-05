"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Shield, MessageCircle } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";

// =============================================================================
// ContactPageContent — Contact form, phone, hours, map
// FIX 5: 3-card contact method selector at top + floating mobile SMS button
// =============================================================================

// ── Floating mobile SMS button ──────────────────────────────────────────────
function FloatingSMSButton() {
  return (
    <>
      <style>{`
        @keyframes sms-badge-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.6; }
        }
        .sms-badge-pulse { animation: sms-badge-pulse 2s ease-in-out infinite; }
      `}</style>
      <a
        href="sms:+15552345678"
        aria-label="Text us now"
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "16px",
          zIndex: 50,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#E8820C",
          boxShadow: "0 8px 24px rgba(232,130,12,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <MessageCircle style={{ width: "24px", height: "24px", color: "white" }} />
        {/* Red dot badge */}
        <span
          className="sms-badge-pulse"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#EF4444",
            display: "block",
          }}
        />
      </a>
    </>
  );
}

// ── Contact method cards ─────────────────────────────────────────────────────
function ContactMethodCards({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        marginBottom: "48px",
        alignItems: "stretch",
      }}
      className="contact-method-grid"
    >
      <style>{`
        @media (max-width: 767px) {
          .contact-method-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Card 1 — Call */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "28px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Phone style={{ width: "22px", height: "22px", color: "#374151" }} />
        </div>
        <div>
          <div style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
            Call Us Directly
          </div>
          <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>
            Fastest for urgent jobs — we answer within minutes
          </div>
        </div>
        <div style={{ marginTop: "auto", width: "100%" }}>
          <a
            href="tel:+15552345678"
            id="contact-cta-call"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "12px",
              borderRadius: "12px",
              background: "#111827",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Call (555) 234-5678
          </a>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#9CA3AF",
              marginTop: "8px",
            }}
          >
            Mon–Sat · 7am–7pm
          </div>
        </div>
      </div>

      {/* Card 2 — Text/SMS (most prominent) */}
      <div
        style={{
          position: "relative",
          background: "#FFF4ED",
          border: "2px solid #E8820C",
          borderRadius: "20px",
          padding: "28px 24px",
          boxShadow: "0 12px 40px rgba(232,130,12,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
          transform: "scale(1.03)",
        }}
      >
        {/* "Fastest Response" badge above card */}
        <div
          style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#E8820C",
            color: "white",
            fontSize: "11px",
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: "100px",
            whiteSpace: "nowrap",
            letterSpacing: "0.02em",
          }}
        >
          ⚡ Fastest Response
        </div>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "rgba(232,130,12,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MessageCircle style={{ width: "22px", height: "22px", color: "#E8820C" }} />
        </div>
        <div>
          <div style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
            Send Us a Text
          </div>
          <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>
            Prefer texting? Most clients do. Reply in under 1 hour.
          </div>
        </div>
        <div style={{ marginTop: "auto", width: "100%" }}>
          <a
            href="sms:+15552345678"
            id="contact-cta-sms"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "13px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #F97316, #E8820C)",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(232,130,12,0.35)",
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Text Us Now
          </a>
        </div>
      </div>

      {/* Card 3 — Fill out form */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "28px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Mail style={{ width: "22px", height: "22px", color: "#374151" }} />
        </div>
        <div>
          <div style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
            Send a Message
          </div>
          <div style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.5 }}>
            Fill the form below — we respond within 2 hours
          </div>
        </div>
        <div style={{ marginTop: "auto", width: "100%" }}>
          <button
            type="button"
            onClick={onScrollToForm}
            id="contact-cta-form"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "12px",
              borderRadius: "12px",
              background: "white",
              color: "#374151",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid #E5E7EB",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#F9FAFB";
              e.currentTarget.style.borderColor = "#D1D5DB";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "#E5E7EB";
            }}
          >
            Fill Out Form ↓
          </button>
          <div
            style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", marginTop: "8px" }}
          >
            2-hour response guarantee
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
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

  const formRef = React.useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      {/* Floating SMS button — mobile only */}
      <FloatingSMSButton />

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
              Call us, text us, or fill out the form. We respond to every inquiry within 2 hours — guaranteed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          {/* FIX 5 — 3 contact method cards at top */}
          <AnimatedSection>
            <ContactMethodCards onScrollToForm={scrollToForm} />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" ref={formRef}>
            {/* Left: Contact Form */}
            <AnimatedSection>
              {isSubmitted ? (
                <div className="bg-[var(--color-background-alt)] rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-[var(--color-success)] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3">
                    Message Sent!
                  </h2>
                  <p className="text-[var(--color-text-muted)] text-lg">
                    Thank you for reaching out. We&apos;ll get back to you within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                    Send Us a Message
                  </h2>

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select a service...</option>
                      {siteConfig.services.map((service) => (
                        <option key={service.slug} value={service.name}>{service.name}</option>
                      ))}
                      <option value="Other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full p-4 rounded-xl border-2 border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors resize-none"
                      placeholder="Describe your project, timeline, budget range, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.email}
                    className="w-full flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white font-semibold py-4 rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--color-accent)]/25 min-h-[52px] cursor-pointer"
                  >
                    {isSubmitting ? "Sending..." : <><Send className="w-5 h-5" />Send Message</>}
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
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">Call Us Directly</h3>
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

                {/* Text/SMS highlight */}
                <div
                  style={{
                    background: "#FFF4ED",
                    border: "1px solid rgba(232,130,12,0.25)",
                    borderRadius: "16px",
                    padding: "20px",
                  }}
                >
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-[var(--color-accent)]" />
                    Text Us — Under 1 Hour Response
                  </h3>
                  <a
                    href="sms:+15552345678"
                    className="inline-flex items-center gap-2 text-[var(--color-accent)] font-semibold hover:opacity-80 transition-opacity"
                  >
                    Text (555) 234-5678
                  </a>
                  <p className="text-[var(--color-text-muted)] text-sm mt-1">
                    Most clients prefer text — it&apos;s faster and more convenient for scheduling.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Email</h3>
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
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Office Location</h3>
                  <div className="flex items-start gap-3 text-[var(--color-text-muted)]">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>
                      {siteConfig.address.street}<br />
                      {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
                    </span>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-3">Business Hours</h3>
                  <div className="space-y-2">
                    {siteConfig.businessHours.map((hours) => (
                      <div key={hours.day} className="flex items-center gap-3 text-[var(--color-text-muted)]">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span className="font-medium text-[var(--color-text)] w-40">{hours.day}</span>
                        <span>{hours.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
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
                      <p className="text-sm font-medium">{siteConfig.address.city}, {siteConfig.address.state}</p>
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
