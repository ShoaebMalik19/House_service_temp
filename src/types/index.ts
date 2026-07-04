// =============================================================================
// Home Service Website Template — Type Definitions
// All interfaces for the central site configuration system.
// =============================================================================

import { type LucideIcon } from "lucide-react";

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
}

/** Trust badge displayed in the trust bar */
export interface TrustBadge {
  icon: string; // lucide-react icon name
  label: string;
  value: string; // e.g., "15+" or "4.9★"
}

/** Individual service offered by the business */
export interface Service {
  name: string;
  slug: string;
  icon: string; // lucide-react icon name
  shortDescription: string;
  /** Extended description for the individual service page (Problem → Agitate → Solution) */
  fullDescription: {
    problem: string;
    agitate: string;
    solution: string;
  };
  image: string; // path to service image
  /** Price range for the estimate wizard */
  priceRange: {
    min: number;
    max: number;
  };
  /** Service-specific FAQs shown on the service page */
  faqs: FAQ[];
  /** Related service slugs for cross-linking */
  relatedServices: string[];
}

/** Customer testimonial / review */
export interface Testimonial {
  name: string;
  city: string;
  rating: number; // 1-5
  quote: string;
  avatar: string; // path to avatar image
  service?: string; // which service they used
}

/** Team member for the About page */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string; // path to headshot
}

/** FAQ item for accordion sections */
export interface FAQ {
  question: string;
  answer: string;
}

/** "Why Choose Us" differentiator */
export interface Differentiator {
  icon: string; // lucide-react icon name
  headline: string;
  description: string;
}

/** "How It Works" step */
export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
}

/** Before/After gallery item */
export interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  category: string; // service category for filtering
  caption: string;
  location?: string;
}

/** Social media link */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // lucide-react icon name
}

/** Business hours for contact page */
export interface BusinessHours {
  day: string;
  hours: string;
}

/** SEO metadata per page */
export interface PageSEO {
  title: string;
  description: string;
  ogImage?: string;
}

/** Estimate wizard step configuration */
export interface EstimateStep {
  id: string;
  question: string;
  type: "select" | "text" | "contact";
  options?: EstimateOption[];
}

export interface EstimateOption {
  label: string;
  value: string;
  icon?: string;
}

/** Complete site configuration — THE single source of truth */
export interface SiteConfig {
  // ── Business Identity ──────────────────────────────────────────────
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  logoText: string; // Text-based logo (can be replaced with image path)

  // ── Navigation ─────────────────────────────────────────────────────
  navLinks: NavLink[];

  // ── Hero Section ───────────────────────────────────────────────────
  hero: {
    headline: string;
    subHeadline: string;
    benefitTags: string[];
    primaryCTA: { text: string; href: string };
    secondaryCTA: { text: string; href: string };
    backgroundImage: string;
  };

  // ── Trust Bar ──────────────────────────────────────────────────────
  trustBadges: TrustBadge[];
  overallRating: { stars: number; count: number; platform: string };

  // ── Services ───────────────────────────────────────────────────────
  services: Service[];

  // ── Why Choose Us ──────────────────────────────────────────────────
  differentiators: Differentiator[];

  // ── How It Works ───────────────────────────────────────────────────
  howItWorks: HowItWorksStep[];

  // ── Estimate Wizard ────────────────────────────────────────────────
  estimateSteps: EstimateStep[];
  estimateResultMessage: string;

  // ── Gallery ────────────────────────────────────────────────────────
  galleryItems: GalleryItem[];

  // ── Testimonials ───────────────────────────────────────────────────
  testimonials: Testimonial[];

  // ── Service Areas ──────────────────────────────────────────────────
  serviceAreas: string[];
  mapEmbedUrl?: string; // Google Maps embed URL (optional for V1)

  // ── FAQ ────────────────────────────────────────────────────────────
  faqs: FAQ[];

  // ── Team ───────────────────────────────────────────────────────────
  team: TeamMember[];

  // ── Business Hours ─────────────────────────────────────────────────
  businessHours: BusinessHours[];

  // ── Social Links ───────────────────────────────────────────────────
  socialLinks: SocialLink[];

  // ── Footer ─────────────────────────────────────────────────────────
  licensingStatement: string;
  insuranceStatement: string;

  // ── SEO ────────────────────────────────────────────────────────────
  seo: {
    home: PageSEO;
    about: PageSEO;
    contact: PageSEO;
    gallery: PageSEO;
    services: PageSEO; // Default for service pages; individual overrides via Service.slug
  };

  // ── Final CTA ──────────────────────────────────────────────────────
  finalCTA: {
    headline: string;
    subHeadline: string;
    guaranteeText: string;
  };
}
