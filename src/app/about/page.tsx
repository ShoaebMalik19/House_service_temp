import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { AboutPageContent } from "./AboutPageContent";

export const metadata: Metadata = {
  title: siteConfig.seo.about.title,
  description: siteConfig.seo.about.description,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
