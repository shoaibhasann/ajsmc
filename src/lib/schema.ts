import { doctors, faqs, siteConfig, specialties } from "@/lib/site";

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating.value,
      reviewCount: siteConfig.rating.count,
    },
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

export function physiciansSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: doctors.map((doc, i) => ({
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

