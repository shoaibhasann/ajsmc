import { doctors, type Doctor } from "@/lib/site";

/**
 * Health-library articles.
 *
 * Each post is a hand-authored page under `src/app/blog/<slug>/page.tsx` — no CMS, no
 * database, so every article prerenders to static HTML. This file is the registry the
 * listing, sitemap, related-links and JSON-LD all read from, so a post exists in exactly
 * one place and the pieces can never drift apart.
 *
 * To add an article: drop its HTML into `content/articles/<slug>.html` and add an entry
 * here with the same slug. The route at `app/blog/[slug]` renders every one of them, so
 * there is no per-post page file to write and nothing to forget to create.
 */
export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description + listing excerpt. Write it as a real answer, not a teaser. */
  description: string;
  category: BlogCategory;
  /** ISO date. Drives schema `datePublished` and the visible byline. */
  publishedAt: string;
  /** ISO date. Set whenever the medical content materially changes. */
  updatedAt?: string;
  /**
   * Slug of the AJSMC doctor who reviewed the article. Health content is YMYL — a named,
   * credentialed reviewer is what separates this from anonymous content, for both Google
   * and the AI engines that cite sources.
   */
  reviewedBy?: string;
  readingMinutes: number;
  /** The one query this page is written to win. */
  primaryKeyword?: string;
  /**
   * A single self-contained sentence answering the title's question. Rendered at the top
   * of the article and reused as the schema description — this is the sentence an AI
   * engine can lift verbatim, so it must stand alone without surrounding context.
   */
  keyTakeaway?: string;
  /**
   * Cover artwork, shown at the top of the article and on the listing card. Optional so a
   * post can publish before its image exists rather than being held back by one.
   */
  coverImage?: { src: string; alt: string };
  /** Surfaces the post in the featured slot on the listing page. */
  featured?: boolean;
};

export type BlogCategory =
  | "General Health"
  | "Emergency Care"
  | "Lifestyle Diseases"
  | "Infectious Diseases"
  | "Women's Health"
  | "Men's Health"
  | "Child Health"
  | "Senior Health"
  | "Mental Health"
  | "Treatments & Costs";

/**
 * Published articles, newest intent first. Order here is the order on the listing page.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "monsoon-fever",
    title:
      "Chennai Monsoon Fever: How Doctors Tell Dengue, Typhoid, Chikungunya and Leptospirosis Apart",
    description:
      "Four monsoon illnesses that all begin as fever, and the day-by-day test timing that separates them. Which test on which day of fever, and why testing too early comes back falsely negative.",
    category: "Infectious Diseases",
    publishedAt: "2026-08-16",
    reviewedBy: "ashutosh-kumar-singh",
    readingMinutes: 22,
    primaryKeyword: "monsoon fever Chennai dengue typhoid difference",
    keyTakeaway:
      "Fever alone does not separate these four illnesses — the day of illness does. India's national guidelines say to defer testing on day 1 and 2 of fever, because a test run too early is negative whether or not you have the infection.",
    featured: true,
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240794/ajsmc/blog/wwd2mpm7usjsaffwhyge.png",
      alt: "Four glass mosquito-and-water motifs on a timeline rail, illustrating how the day of fever separates dengue, typhoid, chikungunya and leptospirosis",
    },
  },
  {
    slug: "dengue-platelets",
    title: "Dengue Platelet Count: What the Number Actually Means, and What to Do at Home",
    description:
      "Platelets fall in dengue between day 3 and day 8, and in most people they recover on their own. What the count does and does not tell you, and the warning signs that matter more than the number.",
    category: "Infectious Diseases",
    publishedAt: "2026-08-16",
    reviewedBy: "n-risswana-parveen",
    readingMinutes: 23,
    primaryKeyword: "dengue platelet count what it means",
    keyTakeaway:
      "The platelet count is not what decides how severe dengue becomes. Plasma leakage is, and it shows up in the warning signs rather than the number — which is why a falling count alone is not a reason for panic or for a transfusion.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240792/ajsmc/blog/cid8whezrlqjqyymrt3r.png",
      alt: "Glass platelet discs falling from and drifting back towards a shallow dish, illustrating how the platelet count drops and recovers in dengue",
    },
  },
  {
    slug: "leptospirosis",
    title: "Fever After Walking Through Chennai Floodwater: When It Could Be Leptospirosis",
    description:
      "Fever starting 2 to 30 days after contact with floodwater, sewage or wet mud can be leptospirosis. The usual gap, the symptoms that point to it, and why it is treatable when caught early.",
    category: "Infectious Diseases",
    publishedAt: "2026-08-16",
    reviewedBy: "d-divya-dakshani",
    readingMinutes: 19,
    primaryKeyword: "leptospirosis symptoms after flood water Chennai",
    keyTakeaway:
      "Fever that begins 2 to 30 days after contact with flood water, stagnant water, sewage or wet mud can be leptospirosis, and the usual gap is 5 to 14 days. Tell the doctor about the water contact — it changes what they test for.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240808/ajsmc/blog/hk2zt3t2a18zkgzjfibd.png",
      alt: "A glass rain boot standing in rippling floodwater, illustrating leptospirosis risk after walking through Chennai floodwater",
    },
  },
  {
    slug: "child-fever",
    title: "When a Child's Fever Needs a Doctor: The Signs That Cannot Wait Until Morning",
    description:
      "Fever in a child is 38.0 °C or higher. Which readings need to be seen the same day, which signs mean go now, and which fevers can safely be watched at home.",
    category: "Child Health",
    publishedAt: "2026-08-16",
    reviewedBy: "a-muhammed-shadique",
    readingMinutes: 19,
    primaryKeyword: "when does child fever need a doctor",
    keyTakeaway:
      "Any baby under 3 months with a temperature of 38.0 °C or higher needs to be seen the same day, whatever else is happening. Above that age it is how the child looks and behaves between temperature spikes, not the number itself, that decides.",
    featured: true,
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240770/ajsmc/blog/b7ixlcsucnnag5t4lebi.png",
      alt: "A glass thermometer beside a small glass teddy bear, illustrating when a child's fever needs a doctor rather than waiting until morning",
    },
  },
  {
    slug: "child-vaccination",
    title:
      "Child Vaccination Chart 2026 (IAP Schedule): Which Vaccine at Which Age, and How the Clinic Runs",
    description:
      "The full IAP immunisation schedule from birth onwards, what is due at each visit, what to do about missed doses, and what actually happens on vaccination day at the clinic.",
    category: "Child Health",
    publishedAt: "2026-08-16",
    reviewedBy: "a-muhammed-shadique",
    readingMinutes: 18,
    primaryKeyword: "child vaccination chart India 2026",
    keyTakeaway:
      "Three vaccines are due at birth — BCG, oral polio and hepatitis B, the hepatitis B dose within 24 hours — and the next three visits fall at 6, 10 and 14 weeks. Missed doses are almost always caught up rather than started again.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787243670/ajsmc/blog/ypl0arxqxn4g3x3qpff5.png",
      alt: "A row of glass vaccine vials rising in height beside a glass syringe, illustrating the childhood vaccination schedule by age",
    },
  },
  {
    slug: "vomiting-loose-motion",
    title:
      "Vomiting and Loose Motion After the Chennai Rains: What to Do at Home, and When a Stool Test Is Worth It",
    description:
      "Most loose motion after the rains is treated with fluid, not with a test and not with an antibiotic. How much ORS to give, and the signs that mean it is time to come in.",
    category: "Infectious Diseases",
    publishedAt: "2026-08-16",
    reviewedBy: "d-divya-dakshani",
    readingMinutes: 14,
    primaryKeyword: "loose motion vomiting after rain treatment",
    keyTakeaway:
      "Most loose motion after the Chennai rains is treated with fluid, not with a test and not with an antibiotic — 50 to 100 ml of ORS after every loose stool for a child under two, and 100 to 200 ml for an older child or adult.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240769/ajsmc/blog/jcb7rxin5ktwaqjnqagk.png",
      alt: "A glass tumbler of water with an ORS sachet dissolving into it, illustrating rehydration at home for vomiting and loose motion",
    },
  },
  {
    slug: "high-sugar-screening",
    title:
      "High Sugar Reading at a Government Screening Camp: What Confirms Diabetes, and What Happens Next",
    description:
      "A finger-prick reading at your door is a screening trigger, not a diagnosis. The four laboratory tests that confirm diabetes, which need fasting, and the reading that skips a second test.",
    category: "Lifestyle Diseases",
    publishedAt: "2026-08-16",
    reviewedBy: "rm-fahadh",
    readingMinutes: 14,
    primaryKeyword: "high blood sugar screening camp confirm diabetes",
    keyTakeaway:
      "A finger-prick reading taken at your door is a screening trigger, not a diagnosis. India's NCD programme refers anyone above 140 mg/dl onward and records them as suspected — confirmation needs a laboratory blood sample.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787241557/ajsmc/blog/pgkawtjlklxqcnip2tnf.png",
      alt: "A glass fingertip blood drop joined by light to a rack of laboratory tubes, illustrating how a camp screening reading is confirmed in a lab",
    },
  },
  {
    slug: "first-diabetes-visit",
    title: "Your First Diabetes Consultation: Which Tests Are Done, and What to Bring",
    description:
      "What a first diabetes appointment actually involves, the three baseline checks that belong at diagnosis rather than later, and what to bring so the visit is not wasted.",
    category: "Lifestyle Diseases",
    publishedAt: "2026-08-16",
    reviewedBy: "rm-fahadh",
    readingMinutes: 16,
    primaryKeyword: "first diabetes consultation what to expect",
    keyTakeaway:
      "A first diabetes consultation is mostly history, examination and baseline tests. Three of those belong at diagnosis itself rather than later — a dilated eye examination, kidney tests, and a complete foot examination.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240879/ajsmc/blog/igd4vqbhwekpel5c0qax.png",
      alt: "Glass eye, kidney and foot icons arranged around a central blood drop, illustrating the checks done at a first diabetes consultation",
    },
  },
  {
    slug: "fatty-liver-grades",
    title: "Fatty Liver on Your Scan Report: What Grade 1, 2 and 3 Mean, and What Comes Next",
    description:
      "The grades describe how much fat is scattering the ultrasound beam — not how much scarring there is. What the grade does tell you, and which test answers the question that matters.",
    category: "Lifestyle Diseases",
    publishedAt: "2026-08-16",
    reviewedBy: "pradeep-sathya",
    readingMinutes: 14,
    primaryKeyword: "fatty liver grade 1 2 3 meaning",
    keyTakeaway:
      "Grade 1, 2 and 3 describe one thing: how much fat is scattering the ultrasound beam as it passes through your liver. None of the three measures scarring, and scarring is what decides the outcome.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787241620/ajsmc/blog/acvqolcu3hqoifawa5jb.png",
      alt: "Three glass liver forms of increasing cloudiness with ultrasound waves passing through, illustrating fatty liver grades 1, 2 and 3",
    },
  },
  {
    slug: "health-checkup-after-40",
    title: "Health Checkup After 40 in Chennai: Which Tests Are Worth Doing, and the Fasting Rules",
    description:
      "After 40 the list of tests with proven screening value is short. Which ones are worth doing, how often, which need fasting and for how long.",
    category: "Senior Health",
    publishedAt: "2026-08-16",
    reviewedBy: "ashutosh-kumar-singh",
    readingMinutes: 15,
    primaryKeyword: "health checkup after 40 which tests",
    keyTakeaway:
      "After 40, the list of tests with proven screening value is shorter than most packages suggest. India's national programme screens adults from 30 for blood pressure and diabetes once a year, and for oral, breast and cervical cancer.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240745/ajsmc/blog/rei6by06nzdbk47ebogr.png",
      alt: "Glass blood-collection tubes in a row before an early-morning clock face, illustrating the fasting tests in a health checkup after 40",
    },
  },
  {
    slug: "pap-smear",
    title:
      "Pap Smear in Chennai: When to Book It, What to Avoid Beforehand, and What Happens in the Room",
    description:
      "When cervical screening is due, what to avoid in the days before so the sample is usable, and exactly what the test involves — written to remove the reasons women put it off.",
    category: "Women's Health",
    publishedAt: "2026-08-16",
    reviewedBy: "chaithra-h-a",
    readingMinutes: 15,
    primaryKeyword: "pap smear test Chennai when to do",
    keyTakeaway:
      "India's national programme screens women aged 30 to 65 for cervical cancer once in five years, and ICMR-NICPR advises a Pap test every three years from 30. Timing in your cycle and what you avoid beforehand decide whether the sample is usable.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787241615/ajsmc/blog/gcnn2bvzidp13kehifg4.png",
      alt: "A glass calendar block with a protective shield resting on it, illustrating when to book a Pap smear and what to avoid beforehand",
    },
  },
  {
    slug: "pcos-testing",
    title: "PCOS Testing: Which Blood Tests, and Which Day of Your Cycle They Must Be Done On",
    description:
      "The PCOS panel is timed to the cycle, and a test drawn on the wrong day is a wasted test. Which tests, which days, and what the results can and cannot settle.",
    category: "Women's Health",
    publishedAt: "2026-08-16",
    reviewedBy: "chaithra-h-a",
    readingMinutes: 16,
    primaryKeyword: "PCOS blood test which day of cycle",
    keyTakeaway:
      "The basal PCOS panel — FSH, LH, oestradiol and total testosterone — is drawn on day 2 to 4 of the cycle, counting the first day of bleeding as day 1. Progesterone is the exception and is drawn much later.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787240864/ajsmc/blog/hpvtbw3qy9k20pkxzrdk.png",
      alt: "A circular glass cycle dial ringed by blood tubes with one lit brighter, illustrating which PCOS blood tests fall on which day of the cycle",
    },
  },
  {
    slug: "counselling-first-session",
    title:
      "Seeing a Counselling Psychologist: What the First Session Involves, and What Stays Confidential",
    description:
      "A first counselling appointment is a conversation, not a test. What happens in the room, and exactly what confidentiality means in law — including its limits.",
    category: "Mental Health",
    publishedAt: "2026-08-16",
    reviewedBy: "chynna-christina",
    readingMinutes: 14,
    primaryKeyword: "first counselling session what happens",
    keyTakeaway:
      "A first counselling appointment is a conversation, not a test. What you say is protected by a legal duty of confidentiality under section 23 of the Mental Healthcare Act 2017, limited only by the exceptions written into that section.",
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787241607/ajsmc/blog/x5dn54nkqfmqcsezqszg.png",
      alt: "Two empty glass chairs facing each other behind a privacy screen, illustrating a first counselling session and what stays confidential",
    },
  },
  {
    slug: "how-fast-you-age",
    title:
      "What Actually Slows How Fast You Age, and What the Evidence Says About the Things You Are Sold",
    description:
      "No drug, supplement, drip or hormone has been shown to slow human ageing. What the published evidence does support, and how to read the claims made for everything else.",
    category: "Senior Health",
    publishedAt: "2026-08-16",
    reviewedBy: "a-ameer-jahan",
    readingMinutes: 29,
    primaryKeyword: "how to slow ageing evidence",
    keyTakeaway:
      "Nothing available to any human being has been shown to undo ageing, and no drug, supplement, drip or hormone has been shown in a trial to slow human ageing itself. What the evidence does support is changing how fast decline happens.",
    featured: true,
    // Paste the Cloudinary URL between the quotes. The article publishes without
    // it; the cover simply appears once the src is filled in.
    coverImage: {
      src: "https://res.cloudinary.com/dh4blkvix/image/upload/v1787241618/ajsmc/blog/l3j8e6csevvokioyfgco.png",
      alt: "A glass hourglass whose falling sand is a slow stream of spheres, with a DNA helix rising behind it, illustrating what actually slows biological ageing",
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getReviewer(post: BlogPost): Doctor | undefined {
  if (!post.reviewedBy) return undefined;
  return doctors.find((d) => d.slug === post.reviewedBy);
}

/**
 * Up to `limit` other posts to link at the end of an article — same category first, then
 * anything else, so a thin category still produces internal links rather than none.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return blogPosts.slice(0, limit);
  const others = blogPosts.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategories(): BlogCategory[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

/** "14 August 2026" — matches the byline and the listing card. */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
