import type { AssetKey } from "@/lib/assets";

export const siteConfig = {
  name: "AJSMC",
  fullName: "AJ Subaitha Medical Centre",
  shortDescription: "Multi-specialty hospital in Egmore, Chennai",
  tagline: "Expert care, every specialty, one roof.",
  /**
   * Written to be lifted whole. Search engines use it as the fallback snippet and AI
   * answer engines quote a self-contained opening paragraph almost verbatim, so it
   * names the organisation, the category, the locality and the hours in plain
   * sentences rather than opening with adjectives.
   *
   * A getter, not a string, and deliberately so: the counts come from `listedDoctors`
   * and `specialties`, which are declared further down this file. Getters are lazy, so
   * they read the arrays at access time rather than at module load. This once said
   * "17 consultants" while the site rendered 28 — the schema-facing description
   * contradicting the page it described. Do not inline these numbers back.
   */
  get description() {
    return `AJ Subaitha Medical Centre (AJSMC) is a multi speciality hospital on Police Commissioner Office Road in Egmore, Chennai. It provides consultations across ${specialties.length} departments, day-care surgery, sleep studies and in-house lab and imaging, with ${listedDoctors.length} specialist consultants under one roof. Outpatient timings are Monday to Saturday, 10am to 9pm, and treatment costs are quoted upfront.`;
  },
  /**
   * The `description` above is the long form: it goes into schema.org and is what an AI
   * answer engine quotes, so it stays complete. This one is for the meta tag, where
   * Google truncates past roughly 160 characters and the rest is wasted.
   */
  get metaDescription() {
    return `Multi speciality hospital in Egmore, Chennai. ${listedDoctors.length} consultants across ${specialties.length} departments, day-care surgery, sleep studies and an in-house lab. Open Mon to Sat, 10am to 9pm.`;
  },
  url: "https://www.ajsmc.in",
  ogImage: "/og-image.jpg",
  /**
   * UNVERIFIED. Neither the founding year nor the years-of-service figure appears
   * anywhere on ajsmc.in, and they are published here as fact: on the About hero, in
   * the hero badge, in the animated counter, and as `foundingDate` in the Hospital
   * schema. Confirm both with the hospital, or drop them. An invented founding date is
   * the kind of detail that quietly undermines a medical site's credibility, and
   * Google reads YMYL trust signals closely.
   *
   * The doctor and department counts are no longer duplicated here. Everything counts
   * `listedDoctors.length` and `specialties.length` directly, so the numbers on the
   * page cannot drift from what the page actually shows.
   */
  founded: "2003",
  yearsOfService: 23,
  phone: "044 2532 2021",
  phoneHref: "tel:04425322021",
  mobile: "+91 91506 42999",
  mobileHref: "tel:+919150642999",
  whatsapp: "+91 91506 42999",
  whatsappHref:
    "https://wa.me/919150642999?text=Hi%20AJSMC%2C%20I%27d%20like%20to%20book%20an%20appointment.",
  email: "helpdesk@ajsmc.in",
  emailHref: "mailto:helpdesk@ajsmc.in",
  address: {
    line1: "No.47 (31), Police Commissioner Office Road",
    line2: "Egmore, Chennai – 600008",
    full: "No.47 (31), Police Commissioner Office Road, Egmore, Chennai – 600008",
    locality: "Egmore",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600008",
    country: "IN",
  },
  hours: "Mon to Sat · 10:00 am to 09:00 pm",
  hoursShort: "Mon to Sat: 10am to 9pm",
  /**
   * AJSMC runs a 24-hour helpline and inpatient support. It is NOT a casualty or
   * trauma unit, and it must never be described as one: a patient who reads
   * "emergency" on a hospital site and drives here during a cardiac event instead of
   * going to a hospital with a casualty department can die of the difference. Every
   * public string about hours comes from this field. Keep it as service language.
   */
  roundTheClock: "24-Hour Helpline",
  roundTheClockNote: "24/7 medical assistance by phone",
  // Official Google listing share link — opens the hospital's place page/directions.
  mapsHref: "https://share.google/cwOs9gRRkiI2E8dNM",
  // Iframe source for the embedded map (no API key needed with output=embed).
  mapsEmbed:
    "https://maps.google.com/maps?q=AJ+Subaitha+Medical+Centre,+Police+Commissioner+Office+Road,+Egmore,+Chennai+600008&z=16&output=embed",
  // Real profiles only. These are published as schema.org `sameAs`, which is how
  // search engines and AI answer engines confirm that this site, the Google listing
  // and the social accounts are all the same organisation. Placeholder links to a
  // network's homepage break that link instead of making it.
  social: {
    facebook: "https://www.facebook.com/61558762183594",
    instagram: "https://www.instagram.com/ajsmc2022/",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Specialties", href: "/specialties" },
  { label: "Doctors", href: "/doctors" },
  { label: "Health Library", href: "/blog" },
  { label: "Reach Us", href: "/contact" },
] as const;

export type Specialty = {
  name: string;
  description: string;
  icon:
    | "eye"
    | "sparkles"
    | "baby"
    | "bone"
    | "droplet"
    | "heart-pulse"
    | "stethoscope"
    | "activity"
    | "flower"
    | "brain"
    | "flask"
    | "siren";
  tone: "green" | "blue" | "dark";
  /** Longer blurb shown on the dedicated Specialties page. */
  context: string;
};

export const specialties: Specialty[] = [
  {
    name: "Ophthalmology",
    description: "Cataract surgery, eye tests & vision care",
    icon: "eye",
    tone: "green",
    context:
      "Eye tests, cataract surgery, glaucoma treatment and care for everyday problems like dry eyes, redness, watering and blurred vision. Cataract procedures are done as day care, so you come in and go home the same day.",
  },
  {
    name: "Dermatology",
    description: "Acne, hair fall & skin treatment",
    icon: "sparkles",
    tone: "blue",
    context:
      "Treatment for acne, eczema, psoriasis, fungal infections, pigmentation and hair fall, along with cosmetic procedures for skin and hair. We treat both adults and children.",
  },
  {
    name: "Pediatrics",
    description: "Vaccination & child health",
    icon: "baby",
    tone: "green",
    context:
      "Newborn checks, the full vaccination schedule, growth and development monitoring, and treatment for fever, cough, loose motions and the other illnesses children pick up.",
  },
  {
    name: "Orthopedics",
    description: "Knee pain, fractures & joint care",
    icon: "bone",
    tone: "blue",
    context:
      "Care for bone, joint and muscle problems including fractures, back pain, knee and shoulder pain, arthritis and sports injuries, plus guidance on joint replacement surgery.",
  },
  {
    name: "Urology",
    description: "Kidney stones & urinary problems",
    icon: "droplet",
    tone: "green",
    context:
      "Treatment for kidney stones, urinary infections, blood in urine, prostate enlargement and difficulty passing urine, including minimally invasive surgery.",
  },
  {
    name: "Obstetrics & Gynaecology",
    description: "Women's & maternity care",
    icon: "heart-pulse",
    tone: "blue",
    context:
      "Pregnancy care from the first scan through to delivery, plus treatment for irregular periods, PCOS, fibroids, white discharge, menopause symptoms and infertility. Keyhole gynaecological surgery is available.",
  },
  {
    name: "General Medicine",
    description: "Everyday & chronic illness",
    icon: "stethoscope",
    tone: "green",
    context:
      "Your first stop for fever, infection, body pain, weakness and stomach trouble, and for long-term conditions such as high blood pressure, thyroid disorders and high cholesterol. Annual health checks are done here too.",
  },
  {
    name: "Diabetology",
    description: "Diabetes & endocrine care",
    icon: "activity",
    tone: "blue",
    context:
      "Diabetes diagnosis and blood sugar control, diet and lifestyle guidance, diabetic foot and eye screening, and treatment for thyroid and other hormonal disorders.",
  },
  {
    name: "Reproductive Medicine",
    description: "Fertility, infertility & STD care",
    icon: "flower",
    tone: "green",
    context:
      "Private, confidential consultation and treatment for infertility in men and women, sexual health concerns and sexually transmitted infections. Counselling is part of every consultation, and records stay confidential.",
  },
  {
    name: "Psychology",
    description: "Counseling & mental wellness",
    icon: "brain",
    tone: "blue",
    context:
      "Confidential counselling for stress, anxiety, low mood, sleep difficulty, exam pressure, relationship problems and behavioural concerns in both children and adults.",
  },
  {
    name: "Pathology",
    description: "Lab & diagnostic testing",
    icon: "flask",
    tone: "green",
    context:
      "An in-house laboratory for blood tests, urine tests, biopsies and routine screening. Samples are processed in the building, so most reports reach your doctor within the same visit.",
  },
  {
    name: "General Surgery",
    description: "Hernia, appendix & general procedures",
    icon: "siren",
    tone: "dark",
    context:
      "Surgical consultation and treatment for common conditions such as hernia, appendicitis, gallstones, piles and lumps. Many of these are done as day-care procedures, so you go home the same day.",
  },
];

export type Doctor = {
  slug: string;
  name: string;
  /** Concise category — drives the green label and the specialty filter chips. */
  specialty: string;
  /** Full consultant title as provided by the hospital (used in the schema). */
  role: string;
  /** Qualification letters (MBBS, MD, …). Shown as the card's faint line when present. */
  degree?: string;
  /** Tamil Nadu Medical Council registration number. */
  reg?: string;
  tag?: string;
  /** Cutout/portrait URL. Falls back to a placeholder tile until supplied. */
  image?: string;
};

export const doctors: Doctor[] = [
  {
    slug: "a-ameer-jahan",
    name: "Dr. A. Ameer Jahan",
    specialty: "Reproductive Medicine",
    role: "Senior Consultant · Reproductive Medicine, Male Infertility & STD",
    degree: "MBBS, MD, FICA (USA), FRSH (Lond), FRSTM (Lond), PhD (USA)",
    reg: "TNMC 28017",
    tag: "Chairman",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784902802/ajsmc/assets/id612qguts4kwxezkt12.png",
  },
  {
    slug: "ashutosh-kumar-singh",
    name: "Dr. Ashutosh Kumar Singh",
    specialty: "General Medicine",
    role: "Consultant · General Physician & Emergency Medicine",
    degree: "MD, MEM, FICM, PGCR, CAM (UK), MRCEM",
    reg: "TNMC 126451",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784903149/ajsmc/assets/mfvck89uesppo2gajdym.png",
  },
  {
    slug: "n-risswana-parveen",
    name: "Dr. N. Risswana Parveen",
    specialty: "General Medicine",
    role: "Consultant · General Physician",
    degree: "MBBS",
    reg: "TNMC 178155",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784903321/ajsmc/assets/aabdv0d70syinxkeavta.png",
  },
  {
    slug: "e-alexander",
    name: "Dr. E. Alexander",
    specialty: "Ophthalmology",
    role: "Consultant Ophthalmologist",
    degree: "MBBS, DO, MS",
    reg: "TNMC 175840",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784903782/ajsmc/assets/sycvg48avh0map0vrf0q.png",
  },
  {
    slug: "a-sajitha-begum",
    name: "Dr. A. Sajitha Begum",
    specialty: "Pathology",
    role: "Consultant · Pathology & General Physician",
    degree: "MD (Pathology), FIDM, PGDM",
    reg: "TNMC 126449",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785246312/ajsmc/assets/ddgcbklj23hteiupdfhr.png",
  },
  {
    slug: "a-najeerul-ameen",
    name: "Dr. A. Najeerul Ameen",
    specialty: "Reproductive Medicine",
    role: "Senior Consultant · Reproductive Medicine · STD Director",
    degree: "MD, PGDHM, MHSc, PhD",
    reg: "TNMC 64776",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784902845/ajsmc/assets/syupuhcd6qiq9zxhlmzu.png",
  },
  {
    slug: "a-muhammed-shadique",
    name: "Dr. A. Muhammed Shadique",
    specialty: "Pediatrics",
    role: "Consultant Pediatrician",
    degree: "MD, DNB (Pediatrics), MNAMS",
    reg: "TNMC 111008",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784903958/ajsmc/assets/jsc0et14fk4teqysm75f.png",
  },
  {
    slug: "sivaramakrishnan-s",
    name: "Dr. Sivaramakrishnan S.",
    specialty: "Dermatology",
    role: "Consultant Dermatologist",
    degree: "MD (DVL), DNB (DVL)",
    reg: "TNMC 118632",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785174295/ajsmc/assets/ju5gtcavezrhocvqge2b.png",
  },
  {
    slug: "d-divya-dakshani",
    name: "Dr. D. Divya Dakshani",
    specialty: "General Medicine",
    role: "Consultant · General Medicine",
    degree: "MBBS, DNB (General Medicine)",
    reg: "TNMC 130971",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784905718/ajsmc/assets/yjhyvzqaonhghpcmvcz4.png",
  },
  {
    slug: "chaithra-h-a",
    name: "Dr. Chaithra H. A",
    specialty: "Obstetrics & Gynaecology",
    role: "Consultant · Obstetrics & Gynaecology (Minimal access surgery)",
    degree: "MBBS, DNB (Obstetrics & Gynaecology), FMAS, DMAS",
    reg: "TNMC 102973",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785159737/ajsmc/assets/n4te22sq4khuugm3mayg.png",
  },
  {
    slug: "jeric-ashwin",
    name: "Dr. Jeric Ashwin",
    specialty: "ENT",
    role: "Consultant ENT",
    degree: "MS (Otorhinolaryngology)",
    reg: "TNMC 123693",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1784905931/ajsmc/assets/okmtjctwhuywbcis6mj2.png",
  },
  {
    slug: "karthikeyan",
    name: "Dr. Karthikeyan",
    specialty: "Urology",
    role: "Consultant Urologist",
    degree: "MBBS, MCh (Urology)",
  },
  {
    slug: "d-naveen-kumar",
    name: "Dr. D. Naveen Kumar",
    specialty: "Orthopedics",
    role: "Consultant Orthopedics · Joint Replacement Fellowship (FIJR)",
    degree: "MBBS, MS (Orthopedics)",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785246201/ajsmc/assets/gbkvwjkpngo4azu4sx1x.png",
  },
  {
    slug: "mohamed-moideen",
    name: "Dr. Mohamed Moideen",
    specialty: "General Medicine",
    role: "Consultant · General Medicine",
  },
  {
    slug: "mohammad-abdul-qadir",
    name: "Dr. Mohammad Abdul Qadir",
    specialty: "General Medicine",
    role: "Consultant · General Physician",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785246454/ajsmc/assets/umftibutadqms2yllibm.png",
  },
  {
    slug: "md-nizamuddin-khan",
    name: "Dr. MD Nizamuddin Khan",
    specialty: "Orthopedics",
    role: "Consultant · Orthopedics",
  },
  {
    slug: "balachander-rajendiran",
    name: "Dr. Balachander Rajendiran",
    specialty: "Orthopedics",
    role: "Consultant · Orthopedics",
    degree: "MBBS, MS (Orthopedics)",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785245844/ajsmc/assets/itvhkoufhhoxzbgblovb.png",
  },
  {
    slug: "arun",
    name: "Dr. Arun",
    specialty: "Oncology",
    role: "Consultant · Surgical Oncology",
  },
  {
    slug: "syed-ismail",
    name: "Dr. Syed Ismail",
    specialty: "Oncology",
    role: "Consultant · Medical Oncology",
  },
  {
    slug: "g-sarala",
    name: "Dr. G. Sarala",
    specialty: "Neurology",
    role: "Senior Consultant · Neurology",
    degree: "MBBS, MD (General Medicine), DM (Neurology)",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785245987/ajsmc/assets/dwdd7ir3gpwwvqzr5cyw.png",
  },
  {
    slug: "pradeep-sathya",
    name: "Dr. Pradeep Sathya",
    specialty: "Gastroenterology",
    role: "Consultant · Medical Gastroenterology",
  },
  {
    slug: "murali",
    name: "Dr. Murali",
    specialty: "Radiology",
    role: "Senior Consultant · Interventional Radiology",
  },
  {
    slug: "nelliapar",
    name: "Dr. Nelliapar",
    specialty: "Plastic Surgery",
    role: "Senior Consultant · Plastic Surgery",
  },
  {
    slug: "ar-chandrasekar",
    name: "Dr. AR. Chandrasekar",
    specialty: "Diabetology",
    role: "Senior Consultant · General Medicine & Diabetology",
  },
  {
    slug: "rm-fahadh",
    name: "Dr. R.M. Fahadh",
    specialty: "Diabetology",
    role: "Consultant · General Medicine & Diabetology",
    degree: "MBBS, FID",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785159355/ajsmc/assets/vc250lwfcbpgluprpwiy.png",
  },
  {
    slug: "sarvath",
    name: "Dr. Sarvath",
    specialty: "Pulmonology",
    role: "Consultant Pulmonologist",
  },
  {
    slug: "as-bharathi-sezhian",
    name: "Dr. AS. Bharathi Sezhian",
    specialty: "Nephrology",
    role: "Consultant · Nephrology",
  },
  {
    slug: "chynna-christina",
    name: "Ms. Chynna Christina",
    specialty: "Psychology",
    role: "Counseling Psychologist",
    degree: "MSc (Applied Psychology)",
    image: "https://res.cloudinary.com/dh4blkvix/image/upload/v1785226888/ajsmc/assets/yklhnk53wytzloi2h6xi.png",
  },
];

/**
 * The doctors the site shows — the full roster, ordered so everyone with a portrait
 * comes first and those still awaiting a photo fall to the end (they render with an
 * on-brand avatar placeholder instead of a blank tile).
 *
 * Every public count and listing reads from here, never from `doctors` — so the count
 * a link promises ("view all N doctors") always matches the page it opens. Order within
 * each group preserves `doctors`; add an `image` to move someone up into the photographed
 * group.
 */
export const listedDoctors: Doctor[] = [
  ...doctors.filter((d) => d.image),
  ...doctors.filter((d) => !d.image),
];

/** URL slug for a department: "Obstetrics & Gynaecology" -> "obstetrics-gynaecology". */
export function specialtySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Consultants listed under a department, in roster order. */
export function doctorsInSpecialty(name: string): Doctor[] {
  return listedDoctors.filter((d) => d.specialty === name);
}

/**
 * Departments that get their own page. A department is only given a URL once a consultant
 * is listed under it — a page for a service with nobody to perform it is the same overclaim
 * as advertising emergency care without a casualty unit. General Surgery currently has no
 * consultant on the roster, so it has no page until one is added here.
 */
export const specialtiesWithPages: Specialty[] = specialties.filter(
  (s) => doctorsInSpecialty(s.name).length > 0,
);

export const doctorSpecialtyFilters = [
  "Reproductive Medicine",
  "General Medicine",
  "Ophthalmology",
  "Pediatrics",
  "Dermatology",
  "Obstetrics & Gynaecology",
  "ENT",
  "Urology",
  "Orthopedics",
  "Oncology",
  "Neurology",
  "Gastroenterology",
  "Radiology",
  "Plastic Surgery",
  "Diabetology",
  "Pathology",
  "Pulmonology",
  "Nephrology",
  "Psychology",
];

export type SignatureService = {
  name: string;
  description: string;
  asset: AssetKey;
  /** Dark variant (CTA navy) — breaks up the row; copy flips to white. */
  tone?: "navy";
};

/**
 * Named by body part, not by test — patients arrive knowing "heart trouble" or
 * "kidney problem", not "ECG" or "RFT". The test names live in the description
 * so the card still matches those searches.
 */
export const signatureServices: SignatureService[] = [
  {
    /**
     * Named for the test, not the symptom, and deliberately so. There is no cardiologist
     * among the consultants and no casualty unit, so this card must not read as an
     * invitation to anyone with chest pain — the FAQ on this same site correctly tells
     * that patient to call 108. What AJSMC does run is an outpatient ECG and blood
     * pressure check under General Medicine, which is what this now describes. Do not
     * put "chest pain" back into this card without a cardiologist on the roster.
     */
    name: "Heart Checks",
    description: "ECG, blood pressure and lipid profile, read by a physician",
    asset: "ecgTest",
  },
  {
    name: "Brain Care",
    description: "Headache, dizziness and memory concerns assessed",
    asset: "brainHealth",
  },
  {
    name: "Liver Care",
    description: "Jaundice, fatigue and appetite loss checked with LFT",
    asset: "liverHealth",
    tone: "navy",
  },
];

export const facilities = [
  { name: "Reception & Lobby", span: "tall" },
  { name: "Day-Care Surgical Suite", span: "wide" },
  { name: "Consultation Room", span: "normal" },
  { name: "Sleep Study Lab", span: "normal" },
  { name: "Pharmacy & Diagnostics", span: "wide", accent: true },
] as const;

/**
 * Patient testimonials are not published on this site, and the removal is deliberate.
 *
 * Three invented patients with invented quotes used to sit here, carried over from the
 * design mockup and shown to people choosing where to take a sick relative. Real quotes
 * would not fix it either: IMC (Professional Conduct, Etiquette and Ethics) Regulations
 * 2002 reg. 6.1.1 bars a practitioner or their institution from advertising "cases,
 * operations, cures or remedies", a website included, and the CCPA's 2022
 * misleading-advertisement guidelines reach the hospital as the advertiser.
 *
 * The route to visible social proof is a verified Google Business Profile, where the
 * reviews are the patients' own and are attributable. Do not reintroduce an array here.
 */

/**
 * Written for the two things that read them. Google shows these in People Also Ask,
 * and AI answer engines lift a question and its answer as a single unit, so each
 * answer opens with the fact itself and repeats enough context ("AJSMC", "Egmore")
 * to survive being quoted on its own, away from the rest of the page.
 *
 * Phrased the way patients actually type, not the way a brochure would ask.
 */
export const faqs = [
  {
    q: "Where is AJ Subaitha Medical Centre located?",
    a: "AJSMC is at No.47 (31), Police Commissioner Office Road, Egmore, Chennai 600008, beside the Commissioner of Police office. Egmore railway station is about a five minute walk and Chennai Central is roughly ten minutes by road. Call 044 2532 2021 if you need directions.",
  },
  {
    q: "Which areas of Chennai does AJSMC serve?",
    a: "Being in Egmore puts AJSMC in the middle of the city, so most patients come from the surrounding neighbourhoods: Chetpet, Kilpauk, Purasawalkam, Nungambakkam, Vepery, Periamet, Aminjikarai, Choolai, Triplicane and Anna Nagar. Egmore and Chennai Central stations both being close by also makes it straightforward for patients travelling in from outside the city.",
  },
  {
    q: "What are AJSMC hospital timings?",
    a: "Doctor consultations at AJSMC run Monday to Saturday, 10am to 9pm. The helpline is answered 24 hours on 044 2532 2021. Individual consultants keep their own clinic hours within that window, so call ahead to confirm when a particular doctor is available.",
  },
  {
    q: "How do I book an appointment at AJSMC?",
    a: "You can book three ways: fill in the appointment form on this website, call 044 2532 2021 or +91 91506 42999, or message the same number on WhatsApp. Walk-in patients are also seen Monday to Saturday between 10am and 9pm, though booking ahead means less waiting.",
  },
  {
    q: "Which specialties are available at AJSMC?",
    a: `AJSMC has ${specialties.length} departments: General Medicine, General Surgery, Ophthalmology, Dermatology, Pediatrics, Orthopedics, Urology, Obstetrics and Gynaecology, Diabetology, Reproductive Medicine, Psychology and Pathology. ${listedDoctors.length} consultants practise across them, so most conditions can be seen without a referral elsewhere.`,
  },
  {
    q: "Is AJSMC open 24 hours?",
    a: "The AJSMC helpline runs 24 hours and inpatients are supported round the clock, so someone answers on 044 2532 2021 at any hour. Doctor consultations are Monday to Saturday, 10am to 9pm. AJSMC does not run a casualty or trauma unit. In a life-threatening emergency such as an accident, chest pain, stroke symptoms or heavy bleeding, call 108 or go directly to the nearest hospital with a 24-hour emergency department.",
  },
  {
    q: "What is day-care surgery?",
    a: "Day-care surgery means the procedure and your recovery happen on the same day, so you go home that evening instead of staying overnight. Cataract surgery and several gynaecological and urological procedures are done this way at AJSMC. You are told what the procedure involves, and what it will cost, before you decide.",
  },
  {
    q: "What is a sleep study and who needs one?",
    a: "A sleep study records your breathing, oxygen levels and heart rate while you sleep overnight, and it is the test used to diagnose obstructive sleep apnoea. It is worth doing if you snore loudly, wake up gasping, feel exhausted despite a full night in bed, or have been told you stop breathing in your sleep. AJSMC runs sleep studies on site and the report goes to your consultant directly.",
  },
  {
    q: "Do I need an appointment or can I walk in?",
    a: "Both work. Walk-in patients are seen Monday to Saturday, 10am to 9pm, in the order they arrive. Booking ahead by phone or through this site means you are given a slot with the consultant you need, which usually cuts the wait considerably.",
  },
  {
    q: "How much does a consultation at AJSMC cost?",
    a: "Consultation fees vary by specialist, and the amount is told to you before your visit rather than at the billing counter. The same applies to procedures and tests: you are quoted the cost upfront. Call 044 2532 2021 for the current fee for the consultant you want to see.",
  },
  {
    q: "Does AJSMC have its own lab and pharmacy?",
    a: "Yes. Blood tests, urine tests, biopsies and routine screening are processed in the in-house laboratory, so most reports reach your doctor within the same visit instead of days later. There is also a pharmacy on site, which means consultation, tests and medicines can all be done in one trip.",
  },
] as const;

export const aboutHighlights = [
  `${listedDoctors.length} specialist consultants across ${specialties.length} departments`,
  "Day-care surgery and sleep studies on site",
  "Treatment costs quoted upfront, before you decide",
];

export const whyChooseUs = [
  {
    title: "Expert Specialists",
    description: `${listedDoctors.length} consultants covering ${specialties.length} departments, in one building.`,
    icon: "users",
    tone: "green",
  },
  {
    title: "Affordable Care",
    description: "You are told what a treatment costs before it starts.",
    icon: "heart",
    tone: "green",
  },
  {
    title: "Under One Roof",
    description: "Consultation, surgery, lab and pharmacy without leaving the site.",
    icon: "building",
    tone: "green",
  },
  {
    title: "24-Hour Helpline",
    description: "A helpline that answers at any hour, plus round-the-clock inpatient support.",
    icon: "clock",
    tone: "green",
  },
] as const;

export const missionVisionValues = [
  {
    title: "Our Mission",
    description:
      "To deliver high quality, personal care to every patient who walks through our doors, and to keep it affordable enough that cost never decides whether a family seeks treatment.",
    icon: "target",
    tone: "green",
  },
  {
    title: "Our Vision",
    description:
      "To be the multi-specialty centre families in Egmore turn to first, trusted for its doctors, its honesty about cost, and the calm of the place itself.",
    icon: "eye",
    tone: "green",
  },
  {
    title: "Our Values",
    description:
      "Compassion, integrity and transparency. We treat every patient the way we would want our own family treated, and every bill the same way.",
    icon: "heart-handshake",
    tone: "green",
  },
] as const;

export const contactInfoCards = [
  {
    title: "Visit Us",
    lines: [siteConfig.address.full],
    href: siteConfig.mapsHref,
    icon: "map-pin",
    tone: "green",
  },
  {
    title: "Call Us",
    lines: [siteConfig.phone, siteConfig.mobile],
    href: siteConfig.phoneHref,
    icon: "phone",
    tone: "green",
  },
  {
    title: "Email Us",
    lines: [siteConfig.email],
    href: siteConfig.emailHref,
    icon: "mail",
    tone: "green",
  },
] as const;

/**
 * What the booking forms offer, derived from the roster rather than typed.
 *
 * The rule is one line long: if a consultant practises it, a patient can ask for it.
 *
 * That matters because the two lists are not the same. AJSMC publishes twelve departments,
 * but consultants carry specialty tags that reach past them — ENT, Oncology, Neurology,
 * Gastroenterology, Radiology, Plastic Surgery, Pulmonology and Nephrology are nine
 * consultants between them, every one with a profile page on this site, and none of them
 * was selectable while this list came from `specialties` alone.
 *
 * Published departments come first, in their own order, so the common ones stay at the top
 * of the dropdown; the rest follow alphabetically.
 *
 * General Surgery drops out on its own, which is the other half of the rule working: AJSMC
 * publishes the department but has no surgeon, and offering that appointment would promise
 * a consultation that cannot happen.
 */
export const departments = [
  ...specialtiesWithPages.map((s) => s.name),
  ...[...new Set(listedDoctors.map((d) => d.specialty))]
    .filter((name) => !specialties.some((s) => s.name === name))
    .sort(),
];
