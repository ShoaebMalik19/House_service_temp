import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { ServicePageContent } from "./ServicePageContent";

// =============================================================================
// Dynamic Service Page — /services/[slug]
// Generates static pages for each service from the config array.
// =============================================================================

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all services
export async function generateStaticParams() {
  return siteConfig.services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) return {};

  const title = siteConfig.seo.services.title.replace("{serviceName}", service.name);
  const description = siteConfig.seo.services.description.replace(
    "{serviceName}",
    service.name
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find related services
  const relatedServices = siteConfig.services.filter((s) =>
    service.relatedServices.includes(s.slug)
  );

  // Find relevant gallery items for this service
  const galleryItems = siteConfig.galleryItems.filter(
    (item) => item.category === service.name
  );

  return (
    <ServicePageContent
      service={service}
      relatedServices={relatedServices}
      galleryItems={galleryItems}
    />
  );
}
