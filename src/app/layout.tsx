import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { siteConfig } from "@/config/siteConfig";

// =============================================================================
// Root Layout — Font loading, global metadata, JSON-LD, layout shell
// =============================================================================

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Summit Builders | Denver's Trusted Home Remodeling Experts",
  description: "Denver's top-rated remodeling contractor. Kitchen, bathroom, basement, deck, and home additions. Free estimates. Licensed & insured. Call (555) 234-5678.",
  keywords: ["home remodeling", "contractor", "kitchen remodel", "bathroom remodel", "Denver", "deck builder", "home additions"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://summitbuilders.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Summit Builders",
    title: "Summit Builders | Denver's Trusted Home Remodeling Experts",
    description: "Denver's top-rated remodeling contractor. Kitchen, bathroom, basement, deck, and home additions. Free estimates. Licensed & insured. Call (555) 234-5678.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://summitbuilders.com",
    images: [
      {
        url: "/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
        alt: "Summit Builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Summit Builders | Denver's Trusted Home Remodeling Experts",
    description: "Denver's top-rated remodeling contractor. Kitchen, bathroom, basement, deck, and home additions. Free estimates. Licensed & insured. Call (555) 234-5678.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for LocalBusiness
function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://summitbuilders.com", // REPLACE with client's domain
    name: siteConfig.businessName,
    description: siteConfig.seo.home.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.overallRating.stars,
      reviewCount: siteConfig.overallRating.count,
      bestRating: 5,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home Services",
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.shortDescription,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow pb-20 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
