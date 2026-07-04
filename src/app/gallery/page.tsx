import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { GalleryPageContent } from "./GalleryPageContent";

export const metadata: Metadata = {
  title: siteConfig.seo.gallery.title,
  description: siteConfig.seo.gallery.description,
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
