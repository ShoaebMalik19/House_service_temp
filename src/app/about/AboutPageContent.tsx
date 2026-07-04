"use client";

import React from "react";
import { Shield, Award, Heart, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// AboutPageContent — Company story, team, credentials
// =============================================================================

export function AboutPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-primary)] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)]/30 to-[var(--color-primary)]" />
        <div className="relative container-custom">
          <AnimatedSection>
            <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-white leading-[1.1] mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              {siteConfig.tagline}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              We&apos;re not just contractors — we&apos;re your neighbors. {siteConfig.businessName}{" "}
              has been serving the {siteConfig.address.city} area for over 15 years, building
              lasting relationships one project at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[var(--color-text-muted)] text-lg leading-relaxed">
                <p>
                  {siteConfig.businessName} was founded on a simple belief: homeowners deserve
                  a contractor who shows up on time, charges what they quoted, and stands behind
                  their work. After too many years watching homeowners get burned by unreliable
                  contractors, our founder Mike Sullivan decided to build the company he wished
                  existed.
                </p>
                <p>
                  Today, we&apos;re proud to be one of {siteConfig.address.city}&apos;s most
                  trusted home remodeling teams. With over 1,200 completed projects and a 4.9★
                  Google rating, we&apos;ve earned our reputation the hard way — one beautiful
                  project at a time.
                </p>
                <p>
                  We believe every homeowner deserves transparent pricing, clear communication,
                  and a finished project they&apos;re proud to show off. That&apos;s not marketing
                  talk — it&apos;s a commitment we back with a 5-year workmanship warranty.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Licensed & Insured", value: "15+ Years" },
                  { icon: Award, label: "BBB Accredited", value: "A+ Rating" },
                  { icon: Heart, label: "Projects Completed", value: "1,200+" },
                  { icon: Wrench, label: "Warranty", value: "5 Years" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[var(--color-background-alt)] rounded-xl p-6 text-center border border-[var(--color-border)]"
                  >
                    <item.icon className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-3" />
                    <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">
                      {item.value}
                    </div>
                    <div className="text-sm text-[var(--color-text-muted)]">{item.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="section-padding bg-[var(--color-background-alt)]">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <span className="inline-block text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider mb-3">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-4">
              Meet the People Behind the Work
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.team.map((member, index) => (
              <AnimatedSection key={member.name} delay={index * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow">
                  {/* Photo placeholder */}
                  <div className="aspect-square bg-[var(--color-primary)] flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/20">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[var(--color-accent)] font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-8">
              Our Credentials
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                siteConfig.licensingStatement,
                siteConfig.insuranceStatement,
                "BBB Accredited Business — A+ Rating",
                "EPA Lead-Safe Certified Firm",
                "5-Year Workmanship Warranty on All Projects",
              ].map((cred) => (
                <span
                  key={cred}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-background-alt)] rounded-full text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)]"
                >
                  <Shield className="w-4 h-4 text-[var(--color-success)]" />
                  {cred}
                </span>
              ))}
            </div>
            <Button href="#estimate" size="lg">
              Work With Our Team — Get a Free Estimate
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
