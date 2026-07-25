import type { AssetKey } from "@/lib/assets";

export const siteConfig = {
  name: "AJSMC",
  fullName: "AJ Subaitha Medical Centre",
  shortDescription: "Multi-specialty hospital in Egmore, Chennai",
  tagline: "Expert care, every specialty, one roof.",
  description:
    "AJ Subaitha Medical Centre (AJSMC) is a trusted multi-specialty hospital in Egmore, Chennai, offering 15+ specialist doctors across 12+ departments, day-care surgery, sleep studies and 24-hour emergency care — with affordable, transparent pricing and no heavy charges.",
  url: "https://www.ajsmc.in",
  ogImage: "/og-image.jpg",
  founded: "2003",
  yearsOfService: 23,
  doctorCount: 15,
  specialtyCount: 12,
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
  hours: "Mon–Sat · 10:00 am – 09:00 pm",
  hoursShort: "Mon–Sat: 10am–9pm",
  emergency: "24 Hours Emergency Service",
  // Official Google listing share link — opens the hospital's place page/directions.
  mapsHref: "https://share.google/cwOs9gRRkiI2E8dNM",
  // Iframe source for the embedded map (no API key needed with output=embed).
  mapsEmbed:
    "https://maps.google.com/maps?q=AJ+Subaitha+Medical+Centre,+Police+Commissioner+Office+Road,+Egmore,+Chennai+600008&z=16&output=embed",
  rating: {
    value: 4.9,
    count: 1200,
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Specialties", href: "/specialties" },
  { label: "Doctors", href: "/doctors" },
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
    description: "Eye care, cataract & vision correction",
    icon: "eye",
    tone: "green",
    context:
      "Complete eye care — routine vision checks, cataract surgery, glaucoma management and treatment for everyday eye conditions, backed by modern diagnostics.",
  },
  {
    name: "Dermatology",
    description: "Skin, hair & cosmetology care",
    icon: "sparkles",
    tone: "blue",
    context:
      "Medical and cosmetic care for skin, hair and nails — from acne, eczema and allergies to hair-loss treatment and skin-health procedures.",
  },
  {
    name: "Pediatrics",
    description: "Child health & vaccination",
    icon: "baby",
    tone: "green",
    context:
      "Complete child health — newborn care, vaccinations, growth monitoring and treatment of childhood illnesses in a friendly, reassuring setting.",
  },
  {
    name: "Orthopedics",
    description: "Bone, joint & fracture care",
    icon: "bone",
    tone: "blue",
    context:
      "Diagnosis and treatment of bone, joint and muscle problems — fractures, arthritis, sports injuries and joint-replacement guidance.",
  },
  {
    name: "Urology",
    description: "Kidney & urinary tract care",
    icon: "droplet",
    tone: "green",
    context:
      "Care for the kidneys, bladder and urinary tract — stones, infections, prostate concerns and minimally invasive surgical treatment.",
  },
  {
    name: "Obstetrics & Gynaecology",
    description: "Women's & maternity care",
    icon: "heart-pulse",
    tone: "blue",
    context:
      "Full women's and maternity care — pregnancy, safe delivery, menstrual and hormonal health, and minimal-access gynaecological surgery.",
  },
  {
    name: "General Medicine",
    description: "Everyday & chronic illness",
    icon: "stethoscope",
    tone: "green",
    context:
      "Your first point of care for everyday and chronic conditions — fevers, infections, blood pressure, thyroid and long-term disease management.",
  },
  {
    name: "Diabetology",
    description: "Diabetes & endocrine care",
    icon: "activity",
    tone: "blue",
    context:
      "Focused diabetes and endocrine care — blood-sugar control, lifestyle guidance and management of thyroid and hormonal disorders.",
  },
  {
    name: "Reproductive Medicine",
    description: "Fertility, infertility & STD care",
    icon: "flower",
    tone: "green",
    context:
      "Sensitive, confidential care for fertility and infertility, reproductive health and STD treatment — with counselling at every step.",
  },
  {
    name: "Psychology",
    description: "Counseling & mental wellness",
    icon: "brain",
    tone: "blue",
    context:
      "Confidential counselling and mental-wellness support — stress, anxiety, relationship and behavioural concerns for adults and children.",
  },
  {
    name: "Pathology",
    description: "Lab & diagnostic testing",
    icon: "flask",
    tone: "green",
    context:
      "In-house laboratory for accurate, timely diagnostics — blood tests, biopsies and routine screening that guide the right treatment.",
  },
  {
    name: "Emergency Medicine",
    description: "24/7 urgent & trauma care",
    icon: "siren",
    tone: "dark",
    context:
      "24-hour emergency and trauma care with a ready on-call team — immediate attention when every minute matters.",
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
  },
  {
    slug: "mohamed-moideen",
    name: "Dr. Mohamed Moideen",
    specialty: "General Medicine",
    role: "Consultant · General Medicine",
  },
  {
    slug: "md-nizamuddin-khan",
    name: "Dr. MD Nizamuddin Khan",
    specialty: "Orthopedics",
    role: "Consultant · Orthopedics",
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
];

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
    name: "Heart Care",
    description: "Chest pain, BP & palpitations — ECG and treatment",
    asset: "ecgTest",
  },
  {
    name: "Brain Care",
    description: "Headache, dizziness & memory — checked and treated",
    asset: "brainHealth",
  },
  {
    name: "Liver Care",
    description: "Jaundice, fatigue & appetite loss — LFT and treatment",
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

export const testimonials = [
  {
    name: "Priya Ramesh",
    role: "Ophthalmology · Day Care",
    quote:
      "My cataract surgery was done the same day and I was home by evening. Caring doctors and genuinely affordable — no hidden charges at all.",
    rating: 5,
    dark: false,
  },
  {
    name: "Karthik Subramanian",
    role: "Sleep Study · Pulmonology",
    quote:
      "I did my sleep study here and the whole team explained every step. Comfortable overnight stay and a clear diagnosis the next morning.",
    rating: 5,
    dark: true,
  },
  {
    name: "Fathima Noor",
    role: "Family · Multi-Specialty",
    quote:
      "From paediatrics to my mother's diabetes care, every specialist is under one roof. Friendly staff and fair pricing kept us coming back.",
    rating: 5,
    dark: false,
  },
] as const;

export const faqs = [
  {
    q: "How do I book an appointment at AJSMC?",
    a: "Book online through the appointment form on this site, or simply call 044 2532 2021 / +91 91506 42999. Walk-ins are welcome Monday–Saturday, 10am–9pm, and our team will guide you to the right specialist.",
  },
  {
    q: "Are AJSMC treatments really affordable?",
    a: "Yes. AJSMC is built on transparent, fair pricing with no heavy or hidden charges. You are told the cost upfront, and every specialty is available under one roof — so you save on repeat visits elsewhere.",
  },
  {
    q: "What is day-care surgery?",
    a: "Day-care surgery means selected procedures are completed the same day, so you can recover at home instead of staying overnight. It is faster, lower-cost, and reduces hospital exposure.",
  },
  {
    q: "Does AJSMC offer 24-hour emergency services?",
    a: "Yes, we provide 24-hour emergency service every day of the year. For urgent care outside consultation hours, call us directly and our on-call team will assist you immediately.",
  },
  {
    q: "Which medical specialties are available at AJSMC?",
    a: "Ophthalmology, Dermatology, Pediatrics, Orthopedics, Urology, Obstetrics & Gynaecology, General Medicine, Diabetology, Reproductive Medicine and Psychology — 15+ specialist consultants across 12+ departments.",
  },
] as const;

export const aboutHighlights = [
  "15+ specialist consultants across 12+ departments",
  "Day-care surgery, sleep study & 24-hour service",
  "Affordable, transparent pricing for every patient",
];

export const whyChooseUs = [
  {
    title: "Expert Specialists",
    description: "15+ experienced consultants across every major specialty.",
    icon: "users",
    tone: "green",
  },
  {
    title: "Affordable Care",
    description: "Transparent, fair pricing — no heavy or hidden charges.",
    icon: "heart",
    tone: "green",
  },
  {
    title: "Under One Roof",
    description: "Consultations, surgery, lab and pharmacy in one place.",
    icon: "building",
    tone: "green",
  },
  {
    title: "24/7 Emergency",
    description: "Round-the-clock support, every day of the year.",
    icon: "clock",
    tone: "green",
  },
] as const;

export const missionVisionValues = [
  {
    title: "Our Mission",
    description:
      "To deliver accurate, effective and affordable healthcare to every patient — with all specialties accessible under one roof.",
    icon: "target",
    tone: "green",
  },
  {
    title: "Our Vision",
    description:
      "To be Chennai's most trusted neighbourhood multi-specialty centre — known for compassion, quality and fair pricing.",
    icon: "eye",
    tone: "green",
  },
  {
    title: "Our Values",
    description:
      "Compassion, integrity and transparency — treating every patient like family, and every bill with honesty.",
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

export const departments = [
  "General Medicine",
  "Ophthalmology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Urology",
  "Obstetrics & Gynaecology",
  "Diabetology",
  "Reproductive Medicine",
  "Psychology",
];
