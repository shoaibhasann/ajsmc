import { doctors, type Doctor } from "@/lib/site";

/**
 * Draft articles put in front of the consultant who has to put their name on them.
 *
 * These pages are deliberately `noindex, nofollow` and are kept out of the sitemap.
 * They carry unreviewed medical writing under a hospital's name, which is the one kind
 * of page that must never be found by a patient or indexed by a search engine — the
 * whole point of the review is that nobody has yet confirmed it is safe to say.
 *
 * The article body lives in docs/drafts/<file> and is read at build time, so the file
 * the consultant reads is byte-for-byte the file that ships once approved.
 */
export type ReviewItem = {
  slug: string;
  title: string;
  file: string;
  /** Doctor slug of the consultant whose name goes on the article. */
  reviewer: string;
  /** Optional second reader, where the subject spans two departments. */
  secondReviewer?: string;
  /** One line on why this article exists and who searches for it. */
  purpose: string;
  /** What the writer needs decided. Each is a real open question, not a formality. */
  questions: { q: string; why: string }[];
  /** Claims the article makes about AJSMC itself, which only the hospital can confirm. */
  factsToConfirm: string[];
  /** Sources the clinical content was built from, so the reviewer can spot-check. */
  sources: string[];
};

export const reviewItems: ReviewItem[] = [
  {
    slug: "child-vaccination",
    title: "Child Vaccination Chart 2026 (IAP Schedule): Which Vaccine at Which Age, and How the Clinic Runs",
    file: "a1-child-vaccination.draft.html",
    reviewer: "a-muhammed-shadique",
    secondReviewer: "ashutosh-kumar-singh",
    purpose:
      "Parents search the vaccination schedule again and again over several years, and almost no Chennai hospital publishes which vaccines are free under the government programme and which are not. That distinction is the reason to read this page.",
    questions: [
      {
        q: "Is the age-by-age schedule correct as printed, including the typhoid conjugate row at 6–9 months and the HPV single dose from 9 up to 15 years?",
        why: "Two independent checks disagreed on both rows. One read the IAP-ACVIP 2025 timetable (Table 2), the other read the published abstract, and the two documents word it differently. A paediatrician settling this in one reading is faster and safer than us arbitrating between sources.",
      },
      {
        q: "Is the free-versus-paid column right for Tamil Nadu?",
        why: "This is the most useful thing on the page and the easiest to get wrong. A parent who pays privately for something available free that week will not come back.",
      },
      {
        q: "Does the catch-up rule read correctly — that a delayed schedule is resumed, not restarted?",
        why: "Parents commonly believe a missed dose means starting again. The page contradicts that; it needs your confirmation.",
      },
      {
        q: "Are the postpone criteria and the reactions-that-need-a-doctor list clinically right, and is anything missing?",
        why: "Fever appears twice with different thresholds — once as a reason to postpone a dose, once as a reason to be seen. Both are labelled with their context. Please check the labelling holds.",
      },
    ],
    factsToConfirm: [
      "AJSMC runs a paediatric vaccination clinic within outpatient hours, Monday to Saturday, 10am to 9pm.",
      "The vaccines named as stocked are actually held here, and any that are ordered in advance are described as such.",
      "What happens if a child reacts on the premises, and whether the page should say anything about that at all.",
    ],
    sources: [
      "IAP-ACVIP Recommended Immunization Schedule 2025, Indian Pediatrics 2026;63:311-324",
      "MoHFW Routine Immunization Manual for Health Workers, 2024 (National Immunization Schedule)",
      "PIB / MoHFW statements on the national HPV programme, February and March 2026",
    ],
  },
  {
    slug: "monsoon-fever",
    title: "Chennai Monsoon Fever: How Doctors Tell Dengue, Typhoid, Chikungunya and Leptospirosis Apart",
    file: "a2-monsoon-fever.draft.html",
    reviewer: "ashutosh-kumar-singh",
    purpose:
      "Four illnesses that all start as fever, and a patient who wants to know which one they have. The page's real value is the test-timing table — which test on which day of fever, and why a test on the wrong day comes back falsely negative.",
    questions: [
      {
        q: "Is the day-by-day test timing correct for all four illnesses?",
        why: "This is the spine of the article. NS1 versus IgM for dengue, blood culture versus Widal for typhoid, and the leptospirosis and chikungunya windows are each quoted from national guidance, but the windows differ slightly between sources.",
      },
      {
        q: "Is the symptom differential fair, or does it make the four look more separable than they are in clinic?",
        why: "A page that implies a patient can self-diagnose from a symptom table would do harm. Please tell us if it needs hedging.",
      },
      {
        q: "Is the Widal section right to say a positive Widal alone is not a reason to start treatment?",
        why: "It is the most commonly misread report in Chennai, and saying so publicly is worth doing only if you agree with it.",
      },
    ],
    factsToConfirm: [
      "Which of these tests the in-house laboratory actually runs on site, and which are sent out.",
      "The latest hour on an outpatient day a sample can be given and still be processed that day.",
    ],
    sources: [
      "NCVBDC National Guidelines for Clinical Management of Dengue Fever, 2023",
      "NCDC and ICMR guidance on leptospirosis and chikungunya",
      "Tamil Nadu Directorate of Public Health advisories, 2026",
    ],
  },
  {
    slug: "dengue-platelets",
    title: "Dengue Platelet Count: What the Number Actually Means, and What to Do at Home",
    file: "a6-dengue-platelets.draft.html",
    reviewer: "n-risswana-parveen",
    purpose:
      "\"How do I raise my platelets\" is the highest-volume dengue search in Tamil Nadu, and it is currently answered by people selling papaya leaf extract and goat milk. This page answers it truthfully, which is the only way to take that ground.",
    questions: [
      {
        q: "Is it right to lead with the national guideline's own line that platelet counts are unreliable to predict bleeding?",
        why: "It is quoted verbatim from NCVBDC 2023, and it is the whole argument of the page. If you would soften it, the article needs rebuilding around something else.",
      },
      {
        q: "Is the papaya leaf and goat milk section pitched correctly?",
        why: "It says the evidence does not support them, without ridiculing families who have been told otherwise by people they trust. Tell us if it is too blunt, or not blunt enough.",
      },
      {
        q: "Are the warning signs, and the instruction to go elsewhere when they appear, complete and correctly worded?",
        why: "The list is the national guideline's own family-facing version. It is the part of the page a frightened reader will act on at 2am.",
      },
      {
        q: "Is the article right that a patient needing serial monitoring should not be managed here?",
        why: "It says plainly that AJSMC has no casualty unit, no beds and no intensive care, and that dengue often deteriorates when the fever breaks — at night or on a Sunday, when we are closed. That is a deliberate choice to send business away, and it needs your endorsement.",
      },
    ],
    factsToConfirm: [
      "The in-house laboratory runs NS1, dengue IgM/IgG and CBC, and reports reach the consultant within the same visit.",
      "The outpatient hours and the statement that there is no casualty unit, no inpatient bed and no intensive care.",
    ],
    sources: [
      "WHO Guidelines for clinical management of arboviral diseases, 4 July 2025 — this replaced the 2009 dengue guidance",
      "NCVBDC National Guidelines for Clinical Management of Dengue Fever, 2023",
    ],
  },
  {
    slug: "leptospirosis",
    title: "Fever After Walking Through Chennai Floodwater: When It Could Be Leptospirosis",
    file: "a7-leptospirosis.draft.html",
    reviewer: "d-divya-dakshani",
    purpose:
      "Leptospirosis is missed because roughly nine in ten cases are mild and look like any other monsoon fever. The page leads with exposure — floodwater, drainage work, animal handling — because that is what the reader recognises about themselves.",
    questions: [
      {
        q: "Is the exposure list right for urban Chennai, and is anything commonly seen here missing?",
        why: "The article's whole premise is that the exposure history is what changes the answer, so the list has to match what actually walks into the clinic.",
      },
      {
        q: "Are the incubation window and the test timing correct, including that an early negative does not rule it out?",
        why: "A patient who tests on day two and is reassured by a negative is the failure mode this page exists to prevent.",
      },
      {
        q: "Is the severe-disease section clear enough about going elsewhere?",
        why: "Jaundice, reduced urine, breathlessness and bleeding are described as needing inpatient and intensive care, which AJSMC does not have. Please confirm the threshold is drawn in the right place.",
      },
      {
        q: "Is it correct to say nothing about which antibiotic or preventive course to take?",
        why: "The article deliberately names no drug and no dose, and says it is a doctor's decision. Confirm that is the right call for a public page.",
      },
    ],
    factsToConfirm: [
      "The in-house laboratory can run the baseline bloods, liver and kidney function tests the article refers to.",
      "The Tamil Nadu case figures quoted (1,473 cases, January to June 2026) are acceptable to publish.",
    ],
    sources: [
      "WHO and ICMR guidance on leptospirosis diagnosis and management",
      "Union MoHFW data tabled in the Rajya Sabha, reported August 2026",
      "Tamil Nadu Directorate of Public Health advisory, 12 August 2026",
    ],
  },
];

export function getReviewItem(slug: string): ReviewItem | undefined {
  return reviewItems.find((r) => r.slug === slug);
}

export function reviewerOf(item: ReviewItem): Doctor | undefined {
  return doctors.find((d) => d.slug === item.reviewer);
}

export function secondReviewerOf(item: ReviewItem): Doctor | undefined {
  if (!item.secondReviewer) return undefined;
  return doctors.find((d) => d.slug === item.secondReviewer);
}
