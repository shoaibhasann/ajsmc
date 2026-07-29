import { faqs, listedDoctors, siteConfig, specialties } from "@/lib/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.mobileHref.replace("tel:", ""),
    email: siteConfig.email,
    foundingDate: siteConfig.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    medicalSpecialty: specialties.map((s) => s.name),
    availableService: specialties.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.name,
      description: s.description,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "21:00",
      },
    ],
    hasMap: siteConfig.mapsHref,
    sameAs: Object.values(siteConfig.social),
    // No aggregateRating. Review markup has to be backed by reviews actually shown on
    // this site, and self-serving ratings a business types about itself are against
    // Google's review-snippet policy — the penalty for getting caught is a manual
    // action on the whole domain, not just a lost star rating. If AJSMC wants stars in
    // search, the route is a verified Google Business Profile, not this field.
    priceRange: "$$",
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * Mirrors the /doctors page. Structured data is meant to describe what the page
 * actually shows, so this reads the listed set rather than the full roster — marking
 * up 28 physicians on a page that renders 17 is the kind of mismatch Google flags.
 */
export function physiciansSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: listedDoctors.map((doc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Physician",
        name: doc.name,
        medicalSpecialty: doc.specialty,
        jobTitle: doc.role,
        worksFor: {
          "@type": "Hospital",
          name: siteConfig.fullName,
        },
      },
    })),
  };
}

