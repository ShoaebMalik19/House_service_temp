// =============================================================================
// SITE CONFIGURATION — Single Source of Truth
// =============================================================================
//
// ✏️  HOW TO CUSTOMIZE FOR A NEW CLIENT:
//     1. Update businessName, phone, email, address
//     2. Swap colors in globals.css (see the @theme block)
//     3. Replace services array with the client's offerings
//     4. Replace images in /public/images/[client-name]/
//     5. Update testimonials with real reviews
//     6. Update serviceAreas with actual coverage
//     7. Update team members on the About page
//
// 🎨  COLOR PALETTE PRESETS (swap in globals.css):
//     • General Contractor: Navy #0F1F3D + Orange #F97316 (DEFAULT)
//     • Plumbing/HVAC:      Navy #0F1F3D + Orange #F97316
//     • Roofing:            Charcoal #1C1C1E + Amber #F59E0B
//     • Electrical:         Navy #0F1F3D + Yellow #EAB308
//     • Landscaping:        Forest #14532D + Orange #F97316
//     • Painting:           Slate #334155 + Teal #14B8A6
//
// =============================================================================

import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  // ── Business Identity ────────────────────────────────────────────────
  businessName: "Summit Builders",
  tagline: "Building Excellence, One Home at a Time",
  phone: "(555) 234-5678",
  email: "info@summitbuilders.com",
  address: {
    street: "1247 Contractor Way",
    city: "Denver",
    state: "CO",
    zip: "80202",
  },
  logoText: "Summit Builders", // REPLACE: Use an image logo via next/image if available

  // ── Navigation ───────────────────────────────────────────────────────
  navLinks: [
    { label: "Services", href: "/#services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/#testimonials" },
    { label: "Contact", href: "/contact" },
  ],

  // ── Hero Section ─────────────────────────────────────────────────────
  hero: {
    headline: "Denver's Most Trusted Home Remodeling Experts",
    subHeadline:
      "From kitchen renovations to full home additions — we deliver premium craftsmanship with transparent pricing and guaranteed timelines.",
    benefitTags: [
      "Licensed & Insured",
      "Same-Day Estimates",
      "Financing Available",
    ],
    primaryCTA: { text: "Get My Free Estimate", href: "#estimate" },
    secondaryCTA: { text: "Call Now: (555) 234-5678", href: "tel:+15552345678" },
    // REPLACE WITH CLIENT'S REAL JOB PHOTO — Use a wide, high-quality image
    // of actual work being done (e.g., kitchen mid-remodel, crew at work)
    backgroundImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
  },

  // ── Trust Bar ────────────────────────────────────────────────────────
  trustBadges: [
    { icon: "Calendar", label: "Years in Business", value: "15+" },
    { icon: "Star", label: "Google Rating", value: "4.9★" },
    { icon: "CheckCircle", label: "Projects Completed", value: "1,200+" },
    { icon: "Shield", label: "Licensed & Insured", value: "Fully" },
    { icon: "Award", label: "BBB Accredited", value: "A+" },
  ],
  overallRating: { stars: 4.9, count: 340, platform: "Google" },

  // ── Services ─────────────────────────────────────────────────────────
  services: [
    {
      name: "Kitchen Remodeling",
      slug: "kitchen-remodeling",
      icon: "ChefHat",
      shortDescription:
        "Transform your kitchen into the heart of your home with custom cabinets, countertops, and modern layouts.",
      fullDescription: {
        problem:
          "Your kitchen feels outdated, cramped, and doesn't match how your family actually lives. Cooking is a chore instead of a joy, and you're embarrassed to have guests over.",
        agitate:
          "Every day you spend in a kitchen that doesn't work for you is a day of frustration. That peeling laminate, those cabinets that won't close properly, the countertop stains that won't come out — they're not just cosmetic issues. They're reducing your home's value and your quality of life.",
        solution:
          "Our kitchen remodeling team designs and builds kitchens that work as beautifully as they look. From custom cabinetry and premium countertops to smart storage solutions and modern appliances — we handle every detail. You get a fixed price upfront, a guaranteed completion date, and a kitchen you'll love for decades.",
      },
      image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80", // REPLACE WITH CLIENT'S REAL KITCHEN PHOTO
      priceRange: { min: 8000, max: 45000 }, // FIX 4: realistic mid-market ranges
      faqs: [
        {
          question: "How long does a kitchen remodel take?",
          answer:
            "Most kitchen remodels take 6-12 weeks depending on scope. We provide a detailed timeline before starting and guarantee our completion date.",
        },
        {
          question: "Can I stay in my home during the remodel?",
          answer:
            "Yes! We set up a temporary kitchen area and contain all dust and debris. Most families stay home comfortably throughout the process.",
        },
        {
          question: "Do you handle permits?",
          answer:
            "Absolutely. We handle all permits, inspections, and code compliance — you don't have to worry about any of the paperwork.",
        },
      ],
      relatedServices: ["bathroom-renovation", "home-additions"],
    },
    {
      name: "Bathroom Renovation",
      slug: "bathroom-renovation",
      icon: "Bath",
      shortDescription:
        "Modern bathrooms built for comfort and value — from quick updates to full gut renovations.",
      fullDescription: {
        problem:
          "Your bathroom is stuck in another decade. The grout is stained, the fixtures are dated, and there's never enough storage. It's the room in your house you wish guests wouldn't see.",
        agitate:
          "A worn-out bathroom doesn't just look bad — it can harbor mold, waste water, and actually decrease your home's value. And the longer you wait, the more those small issues become expensive problems.",
        solution:
          "We create spa-like bathrooms that combine beauty with function. Custom tile work, walk-in showers, double vanities, heated floors — whatever your vision, we bring it to life with meticulous craftsmanship and a clean, respectful process.",
      },
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", // REPLACE WITH CLIENT'S REAL BATHROOM PHOTO
      priceRange: { min: 4500, max: 18000 }, // FIX 4: realistic mid-market ranges
      faqs: [
        {
          question: "How long does a bathroom renovation take?",
          answer:
            "A standard bathroom renovation takes 3-6 weeks. We'll give you a specific timeline during your free estimate.",
        },
        {
          question: "Can you work with my existing plumbing?",
          answer:
            "In most cases, yes. During our inspection, we'll assess your plumbing and let you know if any updates are needed — with no surprise costs.",
        },
      ],
      relatedServices: ["kitchen-remodeling", "basement-finishing"],
    },
    {
      name: "Deck Building",
      slug: "deck-building",
      icon: "Fence",
      shortDescription:
        "Custom decks and outdoor living spaces that extend your home's footprint and boost its value.",
      fullDescription: {
        problem:
          "You have a backyard that's going to waste. No place to grill, entertain, or just sit and enjoy a morning coffee outside. Your home feels smaller than it should.",
        agitate:
          "Colorado summers are short and beautiful — every season without a proper outdoor space is time you can't get back. And that bare patch of yard? It's actually dragging down your property value.",
        solution:
          "We build stunning custom decks using premium composite and hardwood materials that last for decades with minimal maintenance. From intimate bistro decks to full outdoor kitchens with built-in seating — we design spaces you'll live in, not just look at.",
      },
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80", // REPLACE WITH CLIENT'S REAL DECK PHOTO
      priceRange: { min: 5000, max: 18000 }, // FIX 4: realistic mid-market ranges
      faqs: [
        {
          question: "What materials do you recommend?",
          answer:
            "We typically recommend composite decking (like Trex or TimberTech) for durability and low maintenance, but we also work with pressure-treated lumber and premium hardwoods like ipe.",
        },
        {
          question: "Do I need a permit for a deck?",
          answer:
            "In most Denver-area municipalities, yes. We handle all permits and ensure your deck meets local building codes.",
        },
      ],
      relatedServices: ["home-additions", "general-repairs"],
    },
    {
      name: "Basement Finishing",
      slug: "basement-finishing",
      icon: "Home",
      shortDescription:
        "Turn unused basement space into livable square footage — home theaters, guest suites, home offices, and more.",
      fullDescription: {
        problem:
          "You're sitting on hundreds of square feet of wasted space. Your unfinished basement is a dark, dusty storage dump when it could be the best room in your house.",
        agitate:
          "With Denver home prices where they are, every square foot matters. An unfinished basement is like paying your mortgage on space you can't even use. Meanwhile, you're running out of room upstairs.",
        solution:
          "We transform basements into beautiful, functional living spaces — home theaters, guest suites, home offices, playrooms, or full in-law apartments. We handle moisture management, egress windows, electrical, plumbing, and every finish detail. It's like adding a whole new floor to your home at a fraction of the cost.",
      },
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", // REPLACE WITH CLIENT'S REAL BASEMENT PHOTO
      priceRange: { min: 12000, max: 40000 }, // FIX 4: realistic mid-market ranges
      faqs: [
        {
          question: "Is my basement suitable for finishing?",
          answer:
            "Most basements can be finished. During our free inspection, we check for moisture issues, ceiling height, and structural considerations. If there are challenges, we'll explain your options honestly.",
        },
        {
          question: "How much value does a finished basement add?",
          answer:
            "On average, a finished basement recoups 70-85% of its cost in added home value, while giving you immediate usable living space.",
        },
      ],
      relatedServices: ["bathroom-renovation", "home-additions"],
    },
    {
      name: "Home Additions",
      slug: "home-additions",
      icon: "Building2",
      shortDescription:
        "Seamless room additions that feel like they were always part of your home — not an afterthought.",
      fullDescription: {
        problem:
          "Your family has outgrown your house, but you love your neighborhood and don't want to move. You need more space, but building an addition feels overwhelming and risky.",
        agitate:
          "Moving costs tens of thousands in realtor fees, closing costs, and the sheer stress of uprooting your life. But staying in a house that's too small means everyone is on top of each other, there's no quiet space, and holiday gatherings are a logistical nightmare.",
        solution:
          "We design and build home additions that blend seamlessly with your existing architecture — so they look like they were always there. From extra bedrooms and sunrooms to full second-story additions, we manage everything: design, permits, structural engineering, and construction. One team, one point of contact, one guaranteed price.",
      },
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", // REPLACE WITH CLIENT'S REAL ADDITION PHOTO
      priceRange: { min: 25000, max: 90000 }, // FIX 4: realistic mid-market ranges
      faqs: [
        {
          question: "Will an addition match my existing home?",
          answer:
            "Absolutely. We carefully match siding, roofing, trim, and interior finishes so the addition looks original to the home. Our design process includes detailed renderings before we start.",
        },
        {
          question: "How long does a home addition take?",
          answer:
            "Depending on size and complexity, most additions take 3-6 months. We'll give you a specific timeline during the planning phase.",
        },
      ],
      relatedServices: ["kitchen-remodeling", "basement-finishing"],
    },
    {
      name: "General Repairs",
      slug: "general-repairs",
      icon: "Wrench",
      shortDescription:
        "From drywall patches to full handyman services — no job too small, every job done right.",
      fullDescription: {
        problem:
          "You have a growing list of home repairs that never gets shorter. That leaky faucet, the drywall crack, the door that won't close right — individually they're small, but together they're making your home feel neglected.",
        agitate:
          "Small problems become big (and expensive) ones when ignored. That tiny roof leak becomes water damage. That sticky door becomes a frame problem. And trying to find a reliable handyman who actually shows up and does quality work? That's a project in itself.",
        solution:
          "Our general repair service handles your entire to-do list in one visit. Drywall, plumbing fixes, door and window repairs, trim work, painting touch-ups — we bring a fully equipped crew and knock it all out. We show up when we say we will, charge what we quote, and guarantee our work.",
      },
      image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80", // REPLACE WITH CLIENT'S REAL REPAIR PHOTO
      priceRange: { min: 150, max: 3500 }, // FIX 4: realistic mid-market ranges
      faqs: [
        {
          question: "Is there a minimum job size?",
          answer:
            "No minimum! We're happy to help with small repairs. We also offer a popular 'Honey-Do Day' package where we tackle your entire list in one visit.",
        },
        {
          question: "Do you offer emergency repairs?",
          answer:
            "Yes. For urgent issues like water leaks or storm damage, we offer same-day emergency service. Call us anytime.",
        },
      ],
      relatedServices: ["deck-building", "kitchen-remodeling"],
    },
  ],

  // ── Why Choose Us ────────────────────────────────────────────────────
  differentiators: [
    {
      icon: "Clock",
      headline: "Same-Day Response Guaranteed",
      description:
        "We return every call and email within 2 hours — because your time matters. No phone tag, no waiting days for a callback.",
    },
    {
      icon: "DollarSign",
      headline: "Transparent, Fixed Pricing",
      description:
        "You get a detailed, written estimate before any work begins. The price we quote is the price you pay — no surprises, no hidden fees.",
    },
    {
      icon: "ShieldCheck",
      headline: "Licensed, Insured & Guaranteed",
      description:
        "Fully licensed and insured with a 5-year workmanship warranty on every project. If something isn't right, we fix it — free.",
    },
    {
      icon: "Users",
      headline: "Your Own Dedicated Project Manager",
      description:
        "One point of contact from start to finish. Your project manager handles scheduling, updates, and quality checks so you never have to chase answers.",
    },
  ],

  // ── How It Works ─────────────────────────────────────────────────────
  howItWorks: [
    {
      stepNumber: 1,
      title: "Request Your Free Estimate",
      description:
        "Call us or fill out the form — we'll schedule a convenient time to visit your home.",
      icon: "MessageSquare",
    },
    {
      stepNumber: 2,
      title: "We Inspect & Plan",
      description:
        "Our expert visits your home, listens to your goals, and creates a detailed project plan.",
      icon: "ClipboardCheck",
    },
    {
      stepNumber: 3,
      title: "Get Your Fixed Price",
      description:
        "You receive a transparent, itemized estimate — no hidden costs, no pressure to decide on the spot.",
      icon: "FileText",
    },
    {
      stepNumber: 4,
      title: "We Build, You Relax",
      description:
        "Our crew handles everything from permits to final cleanup. You get weekly updates and a guaranteed timeline.",
      icon: "Hammer",
    },
  ],

  // ── Estimate Wizard ──────────────────────────────────────────────────
  estimateSteps: [
    {
      id: "service",
      question: "What type of project are you planning?",
      type: "select",
      options: [
        { label: "Kitchen Remodeling", value: "kitchen-remodeling", icon: "ChefHat" },
        { label: "Bathroom Renovation", value: "bathroom-renovation", icon: "Bath" },
        { label: "Deck Building", value: "deck-building", icon: "Fence" },
        { label: "Basement Finishing", value: "basement-finishing", icon: "Home" },
        { label: "Home Addition", value: "home-additions", icon: "Building2" },
        { label: "General Repairs", value: "general-repairs", icon: "Wrench" },
      ],
    },
    {
      id: "scope",
      question: "How would you describe the project scope?",
      type: "select",
      options: [
        { label: "Small — Minor updates or repairs", value: "small" },
        { label: "Medium — Partial renovation", value: "medium" },
        { label: "Large — Full renovation or build", value: "large" },
      ],
    },
    {
      id: "urgency",
      question: "When do you need this done?",
      type: "select",
      options: [
        { label: "ASAP — Emergency or urgent", value: "asap" },
        { label: "Within 2 weeks", value: "2-weeks" },
        { label: "Within 1-2 months", value: "1-2-months" },
        { label: "Just planning ahead", value: "planning" },
      ],
    },
    {
      id: "zip",
      question: "What's your ZIP code?",
      type: "text",
    },
    {
      id: "contact",
      question: "Almost done! Where should we send your estimate?",
      type: "contact",
    },
  ],
  estimateResultMessage:
    "Based on your answers, a typical project like this runs {min}–{max}. Submit your info and we'll confirm your exact price within 2 hours.",

  // ── Gallery ──────────────────────────────────────────────────────────
  // REPLACE ALL IMAGES with client's real before/after project photos
  galleryItems: [
    {
      id: "project-1",
      beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
      category: "Kitchen Remodeling",
      caption: "Complete kitchen transformation in Highlands Ranch",
      location: "Highlands Ranch, CO",
    },
    {
      id: "project-2",
      beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
      category: "Bathroom Renovation",
      caption: "Master bathroom renovation in Cherry Creek",
      location: "Cherry Creek, CO",
    },
    {
      id: "project-3",
      beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      category: "Basement Finishing",
      caption: "Basement home theater build in Lakewood",
      location: "Lakewood, CO",
    },
    {
      id: "project-4",
      beforeImage: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80",
      category: "Deck Building",
      caption: "Custom composite deck with built-in seating",
      location: "Littleton, CO",
    },
  ],

  // ── Testimonials ─────────────────────────────────────────────────────
  // REPLACE with client's real Google/Yelp reviews (with permission)
  testimonials: [
    {
      name: "Sarah Mitchell",
      city: "Denver, CO",
      rating: 5,
      quote:
        "Summit Builders completely transformed our outdated kitchen into a modern showpiece. Mike and his crew were professional, clean, and finished 3 days ahead of schedule. The fixed pricing meant zero surprises. I've already recommended them to two neighbors.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      service: "Kitchen Remodeling",
    },
    {
      name: "James & Linda Park",
      city: "Lakewood, CO",
      rating: 5,
      quote:
        "We got quotes from four contractors for our basement finish. Summit was the only one who showed up on time, gave us a written estimate on the spot, and actually answered their phone when we called back with questions. The finished space is incredible — it's like we added a whole floor to our house.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      service: "Basement Finishing",
    },
    {
      name: "Maria Gonzalez",
      city: "Aurora, CO",
      rating: 5,
      quote:
        "After a bad experience with another contractor, I was nervous about hiring anyone for our bathroom renovation. Summit Builders restored my faith — they communicated constantly, kept everything spotless, and the tile work is absolutely beautiful. Worth every penny.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      service: "Bathroom Renovation",
    },
    {
      name: "Tom Henderson",
      city: "Highlands Ranch, CO",
      rating: 5,
      quote:
        "Built us a gorgeous composite deck with a built-in pergola. The crew was respectful, the project manager kept us updated daily, and they even cleaned up better than they found it. This is how contracting should work.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      service: "Deck Building",
    },
  ],

  // ── Service Areas ────────────────────────────────────────────────────
  serviceAreas: [
    "Denver",
    "Lakewood",
    "Aurora",
    "Highlands Ranch",
    "Littleton",
    "Centennial",
    "Arvada",
    "Westminster",
    "Thornton",
    "Parker",
    "Castle Rock",
    "Golden",
    "Englewood",
    "Cherry Creek",
    "Broomfield",
    "Boulder",
  ],
  // REPLACE: Add your Google Maps embed URL here
  mapEmbedUrl: undefined,

  // ── FAQ ──────────────────────────────────────────────────────────────
  faqs: [
    {
      question: "Are you licensed and insured?",
      answer:
        "Yes. Summit Builders is fully licensed by the State of Colorado and carries comprehensive general liability insurance and workers' compensation coverage. We're happy to provide proof of insurance on request.",
    },
    {
      question: "Do you offer free estimates?",
      answer:
        "Absolutely. Every project starts with a free, no-obligation in-home estimate. We'll assess the work, discuss your goals, and provide a detailed written quote — usually within 24 hours of the visit.",
    },
    {
      question: "How fast can you start my project?",
      answer:
        "For general repairs and smaller projects, we can often start within 1-2 weeks. Larger remodels and additions typically begin within 3-4 weeks, depending on permit timelines and material lead times.",
    },
    {
      question: "Do you provide a warranty on your work?",
      answer:
        "Yes. Every Summit Builders project comes with a 5-year workmanship warranty. If anything we built or installed isn't right, we'll come back and fix it at no cost to you.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve the greater Denver metro area, including Lakewood, Aurora, Highlands Ranch, Littleton, Centennial, Arvada, Westminster, Thornton, Parker, Castle Rock, Golden, Englewood, and Broomfield.",
    },
    {
      question: "Can I see examples of your past work?",
      answer:
        "Of course! Visit our Gallery page to see before-and-after photos of recent projects. We also have over 340 verified reviews on Google with a 4.9-star rating.",
    },
    {
      question: "Do you offer financing?",
      answer:
        "Yes. We partner with trusted lenders to offer flexible financing options for larger projects. Ask about our 0% APR plans during your estimate.",
    },
    {
      question: "How do you handle unexpected issues during a project?",
      answer:
        "Surprises happen — especially in older homes. If we discover something unexpected (like hidden water damage or outdated wiring), we stop, explain the issue clearly, and give you a written cost estimate before proceeding. You'll never be surprised by a bill.",
    },
  ],

  // ── Team ─────────────────────────────────────────────────────────────
  // REPLACE with client's real team photos and bios
  team: [
    {
      name: "Mike Sullivan",
      role: "Founder & Lead Contractor",
      bio: "With 20 years in residential construction across Colorado, Mike founded Summit Builders to bring transparency and accountability to an industry that desperately needs it. He personally oversees every major project.",
      photo: "/images/summit-builders/team/mike.jpg",
    },
    {
      name: "Lisa Chen",
      role: "Design Consultant",
      bio: "Lisa brings 12 years of interior design experience to every remodel. She helps clients turn Pinterest boards into buildable plans — maximizing both style and budget.",
      photo: "/images/summit-builders/team/lisa.jpg",
    },
    {
      name: "Carlos Ramirez",
      role: "Senior Project Manager",
      bio: "Carlos manages timelines, coordinates crews, and keeps clients in the loop at every step. His obsessive attention to detail is why Summit projects finish on time (or early).",
      photo: "/images/summit-builders/team/carlos.jpg",
    },
    {
      name: "Rebecca Torres",
      role: "Client Relations Manager",
      bio: "Rebecca is usually the first voice you'll hear when you call Summit. She handles scheduling, follow-ups, and makes sure every client feels like a priority — because they are.",
      photo: "/images/summit-builders/team/rebecca.jpg",
    },
  ],

  // ── Business Hours ───────────────────────────────────────────────────
  businessHours: [
    { day: "Monday – Friday", hours: "7:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "8:00 AM – 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  // ── Social Links ─────────────────────────────────────────────────────
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com/summitbuilders", icon: "Facebook" },
    { platform: "Instagram", url: "https://instagram.com/summitbuilders", icon: "Instagram" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/summitbuilders", icon: "Linkedin" },
  ],

  // ── Footer ───────────────────────────────────────────────────────────
  licensingStatement: "Colorado Contractor License #CL-2024-58291",
  insuranceStatement:
    "Fully insured — General Liability & Workers' Compensation coverage on every project.",

  // ── SEO ──────────────────────────────────────────────────────────────
  seo: {
    home: {
      title: "Summit Builders | Denver's Premier Home Remodeling Contractor",
      description:
        "Denver's most trusted home remodeling experts. Kitchen renovations, bathroom remodels, deck building, basement finishing & more. Licensed, insured, 4.9★ rated. Free estimates.",
    },
    about: {
      title: "About Summit Builders | Our Story & Team | Denver, CO",
      description:
        "Meet the Summit Builders team — 15+ years of residential construction excellence in Denver. Licensed, insured, and committed to transparent pricing on every project.",
    },
    contact: {
      title: "Contact Summit Builders | Free Estimates | Denver, CO",
      description:
        "Get your free home remodeling estimate today. Call (555) 234-5678 or fill out our form. Same-day response guaranteed. Serving the greater Denver metro area.",
    },
    gallery: {
      title: "Our Work | Before & After Gallery | Summit Builders Denver",
      description:
        "See the difference Summit Builders makes — browse before and after photos of kitchen remodels, bathroom renovations, deck builds, and more in Denver, CO.",
    },
    services: {
      title: "{serviceName} in Denver, CO | Summit Builders",
      description:
        "Professional {serviceName} services in Denver. Licensed, insured, 4.9★ rated. Transparent pricing, guaranteed timelines. Get your free estimate today.",
    },
  },

  // ── Final CTA ────────────────────────────────────────────────────────
  finalCTA: {
    headline: "Ready to Transform Your Home?",
    subHeadline:
      "Join 1,200+ Denver homeowners who chose Summit Builders for their renovation. Your free estimate is one click away.",
    guaranteeText: "We respond within 2 hours — guaranteed.",
  },
};
