import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { ContactPageContent } from "./ContactPageContent";

export const metadata: Metadata = {
  title: siteConfig.seo.contact.title,
  description: siteConfig.seo.contact.description,
};

export default function ContactPage() {
  return <ContactPageContent />;
}
