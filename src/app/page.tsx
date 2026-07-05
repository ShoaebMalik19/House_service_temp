import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { EstimateWizard } from "@/components/sections/EstimateWizard";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";

// =============================================================================
// Homepage — Assembles all section components in conversion-optimized order
// =============================================================================

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — "What do you do, where, and how do I reach you?" */}
      <Hero />

      {/* 3. Services Grid — "Yes, we do what you need" */}
      <ServicesGrid />

      {/* 4. Why Choose Us — Differentiators from competitors */}
      <WhyChooseUs />

      {/* 5. How It Works — Remove uncertainty about the process */}
      <HowItWorks />

      {/* 6. Instant Estimate Tool — #1 conversion feature */}
      <EstimateWizard />

      {/* 7. Before/After Gallery — Visual proof of quality */}
      <BeforeAfterGallery />

      {/* 8. Testimonials — Social proof */}
      <Testimonials />

      {/* 9. Service Area — Coverage confirmation + local SEO */}
      <ServiceArea />

      {/* 10. FAQ — Pre-answer objections */}
      <FAQAccordion />

      {/* 11. Final CTA — Last conversion opportunity */}
      <FinalCTA />
    </>
  );
}
