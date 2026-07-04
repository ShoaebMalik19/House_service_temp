"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { siteConfig } from "@/config/siteConfig";
import { formatPhoneTel } from "@/lib/utils";

// =============================================================================
// Footer — 4-column layout with NAP, services, service areas, social links
// =============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--color-primary)] text-white">
      <div className="bg-noise" />
      {/* Main Footer Content */}
      <div className="relative container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8 divide-y divide-white/10 md:divide-y-0">
          {/* Column 1: About */}
          <div className="pt-8 md:pt-0 first:pt-0">
            <Link href="/" className="text-2xl font-bold text-white block">
              {siteConfig.logoText}
            </Link>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${formatPhoneTel(siteConfig.phone)}`}
                className="flex items-center gap-3 text-white/80 hover:text-[var(--color-accent)] transition-colors text-sm"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-white/80 hover:text-[var(--color-accent)] transition-colors text-sm"
              >
                <Mail className="w-4 h-4 shrink-0" />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-3 text-white/80 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city},{" "}
                  {siteConfig.address.state} {siteConfig.address.zip}
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{siteConfig.businessHours[0].hours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="pt-8 md:pt-0">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {siteConfig.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="block text-sm text-white/70 hover:text-[var(--color-accent)] transition-colors py-1 md:py-0"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div className="pt-8 md:pt-0">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Service Areas</h3>
            <ul className="space-y-2.5">
              {siteConfig.serviceAreas.slice(0, 10).map((area) => (
                <li key={area} className="text-sm text-white/70 py-1 md:py-0">
                  {area}
                </li>
              ))}
              {siteConfig.serviceAreas.length > 10 && (
                <li className="text-sm text-[var(--color-accent)]">
                  + {siteConfig.serviceAreas.length - 10} more areas
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Quick Links & Social */}
          <div className="pt-8 md:pt-0">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Quick Links</h3>
            <ul className="space-y-2.5 mb-6">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm text-white/70 hover:text-[var(--color-accent)] transition-colors py-1 md:py-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3 text-center md:text-left">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.platform}`}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white/80 hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200"
                >
                  <DynamicIcon name={social.icon} className="w-6 h-6 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-gray-500 md:text-white/50 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>&copy; {currentYear} {siteConfig.businessName}. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>{siteConfig.licensingStatement}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
