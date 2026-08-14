import { getReviewer, type BlogPost } from "@/lib/blog";
import {
  faqs,
  listedDoctors,
  siteConfig,
  specialties,
  specialtySlug,
  type Doctor,
  type Specialty,
} from "@/lib/site";

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

/**
 * A single consultant's page. The registration number is the part that matters: it is the
 * one credential a reader (or a quality rater doing reputation research) can independently
 * verify against the Tamil Nadu Medical Council register, so it goes in the markup and on
 * the page itself rather than only in prose.
 */
export function physicianSchema(doctor: Doctor) {
  const url = `${siteConfig.url}/doctors/${doctor.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": url,
    url,
    name: doctor.name,
    medicalSpecialty: doctor.specialty,
    jobTitle: doctor.role,
    ...(doctor.degree && { hasCredential: doctor.degree }),
    ...(doctor.reg && { identifier: doctor.reg }),
    ...(doctor.image && { image: doctor.image }),
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    telephone: siteConfig.phone,
  };
}

/**
 * A department page. `MedicalClinic` rather than a bare service type, because the entity a
 * patient is looking for is "somewhere in Egmore that does this, with a named doctor" — so
 * the markup ties the specialty to the physicians who actually hold it and to the address.
 */
export function specialtySchema(specialty: Specialty, consultants: Doctor[]) {
  const url = `${siteConfig.url}/specialties/${specialtySlug(specialty.name)}`;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": url,
    url,
    name: `${specialty.name} — ${siteConfig.fullName}`,
    description: specialty.context,
    medicalSpecialty: specialty.name,
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    telephone: siteConfig.phone,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "21:00",
      },
    ],
    physician: consultants.map((doc) => ({
      "@type": "Physician",
      "@id": `${siteConfig.url}/doctors/${doc.slug}`,
      name: doc.name,
      medicalSpecialty: doc.specialty,
      jobTitle: doc.role,
      ...(doc.reg && { identifier: doc.reg }),
    })),
  };
}

/**
 * Health articles are YMYL, so the markup leads with who stands behind the advice:
 * `MedicalWebPage` with a named, credentialed `reviewedBy` physician and an explicit
 * `lastReviewed` date. That pairing is what search and the AI engines look for to treat
 * medical content as trustworthy — an article with no attributable reviewer reads as
 * anonymous regardless of how good the prose is.
 */
export function articleSchema(post: BlogPost) {
  const reviewer = getReviewer(post);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": url,
    url,
    name: post.title,
    headline: post.title,
    description: post.keyTakeaway ?? post.description,
    inLanguage: "en-IN",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    ...(reviewer && {
      lastReviewed: post.updatedAt ?? post.publishedAt,
      reviewedBy: {
        "@type": "Physician",
        name: reviewer.name,
        medicalSpecialty: reviewer.specialty,
        jobTitle: reviewer.role,
        ...(reviewer.degree && { hasCredential: reviewer.degree }),
        worksFor: { "@type": "Hospital", name: siteConfig.fullName },
      },
    }),
    author: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    about: { "@id": `${siteConfig.url}/#organization` },
    isPartOf: { "@id": `${siteConfig.url}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Health Library", item: `${siteConfig.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  };
}

/** The /blog index — lets crawlers read the library as one collection. */
export function blogListingSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/blog`,
    url: `${siteConfig.url}/blog`,
    name: `Health Library | ${siteConfig.fullName}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteConfig.url}/#organization` },
    hasPart: posts.map((post) => ({
      "@type": "MedicalWebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
      url: `${siteConfig.url}/blog/${post.slug}`,
      name: post.title,
      description: post.description,
      datePublished: post.publishedAt,
    })),
  };
}

/**
 * Q&A blocks inside an article. Kept separate from the site-wide FAQ schema so an
 * article marks up only its own questions.
 */
export function articleFaqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

