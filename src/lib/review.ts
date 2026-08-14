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

/* ------------------------------------------------------------------ *
 * Second batch. Same rules: nothing here is published, and no name goes
 * on the live site until the consultant named below says so.
 * ------------------------------------------------------------------ */

reviewItems.push(
  {
    slug: "pap-smear",
    title: "Pap Smear in Chennai: When to Book It, What to Avoid Beforehand, and What Happens in the Room",
    file: "a3-pap-smear.draft.html",
    reviewer: "chaithra-h-a",
    purpose:
      "Screening is done while a woman feels completely well, which is the hardest thing to persuade anyone of. The page is written for someone who has never had the test and is putting it off because she does not know what the ten minutes involve.",
    questions: [
      {
        q: "Is the screening age and interval table right for India, and is it right to say plainly that no guideline anywhere recommends an annual Pap smear?",
        why: "Indian guidance starts at 30 and the shortest interval in any source is three years, but women in Chennai are routinely offered it yearly. Saying so publicly is worth doing only if you agree with it.",
      },
      {
        q: "Is the distinction between the Pap test, the HPV test and VIA drawn correctly?",
        why: "An earlier draft wrongly said a Pap smear looks for HPV. It has been corrected, but the section is the one most likely to still read loosely, and you will spot it faster than we can.",
      },
      {
        q: "Is the description of the examination itself accurate to how it is actually done here, and pitched right for an anxious first-timer?",
        why: "This is the part that decides whether she books. Too clinical and it frightens her; too breezy and it is dishonest.",
      },
      {
        q: "Is what we say about an abnormal result correct — that most changes resolve on their own, and what the usual next step is?",
        why: "The regression figures are quoted from NCI. A woman reading an abnormal result at home needs this to be exactly right.",
      },
    ],
    factsToConfirm: [
      "Cervical screening is offered at AJSMC and the sample is processed by the in-house laboratory or sent out — whichever is actually true.",
      "Colposcopy: whether it is done here or referred, so the article routes correctly.",
    ],
    sources: [
      "MoHFW Operational Framework: Management of Common Cancers, 2016",
      "ICMR-NICPR cervical cancer screening guidance",
      "FOGSI Good Clinical Practice Recommendations, 2018; WHO screening guideline, 2021",
    ],
  },
  {
    slug: "vomiting-loose-motion",
    title: "Vomiting and Loose Motion After the Chennai Rains: What to Do at Home, and When a Stool Test Is Worth It",
    file: "a4-vomiting-loose-motion.draft.html",
    reviewer: "d-divya-dakshani",
    purpose:
      "Diarrhoeal illness is the commonest thing the monsoon brings, and most of it is managed at home. The page exists to make the home management correct and to say honestly when a test changes nothing.",
    questions: [
      {
        q: "Is the ORS section right — preparation, the 24-hour rule, and how much to give after each loose stool?",
        why: "This is the extractable core of the page and the part a parent will act on. It follows the MoHFW/NHM material.",
      },
      {
        q: "We removed the zinc dosing numbers. Is it acceptable to say the national programme recommends zinc and that the dose is set by the treating doctor?",
        why: "Printing a paediatric dose on a public page is a prescription, which we do not do. But zinc matters, so we want the recommendation there without the number. Tell us if that reads as unhelpful.",
      },
      {
        q: "Are the dehydration signs the right ones for a layperson to assess, and are the red flags complete?",
        why: "The page turns on someone correctly judging when home care has stopped being enough.",
      },
      {
        q: "Is the guidance on when a stool test is worth doing correct?",
        why: "Saying a test is often unnecessary is unusual for a hospital site. It needs your endorsement.",
      },
    ],
    factsToConfirm: [
      "The in-house laboratory runs stool studies, and the article's description of what is available is accurate.",
    ],
    sources: [
      "MoHFW / National Health Mission, Intensified Diarrhoea Control Fortnight materials",
      "WHO guidance on oral rehydration and zinc in childhood diarrhoea",
    ],
  },
  {
    slug: "health-checkup-after-40",
    title: "Health Checkup After 40 in Chennai: Which Tests Are Worth Doing, and the Fasting Rules",
    file: "a5-health-checkup-after-40.draft.html",
    reviewer: "ashutosh-kumar-singh",
    purpose:
      "Every competitor publishes a package with no test list. This page publishes the test list with no package, and says which commonly-sold items have little screening value.",
    questions: [
      {
        q: "Is the list of tests actually worth doing after 40 correct for an Indian adult, and is anything important missing?",
        why: "The article's whole claim is that it is honest about what is worth doing. If the list is wrong, the claim collapses.",
      },
      {
        q: "Are we right to say that some commonly-sold panel items have little screening value, and are the ones named the right ones?",
        why: "This is the most commercially awkward paragraph on the site and the most useful to a reader. We will cut it if you are not comfortable.",
      },
      {
        q: "Are the fasting rules correct — which tests need it, for how long, and whether water is allowed?",
        why: "People fast unnecessarily, or eat before a test that needed fasting and waste the visit.",
      },
    ],
    factsToConfirm: [
      "Which of the named tests the in-house laboratory runs, and which are sent out.",
      "That the article correctly describes AJSMC's departments — it should not claim or deny any service wrongly, including ophthalmology, which AJSMC does have.",
    ],
    sources: [
      "ICMR-INDIAB and national NCD programme guidance",
      "Indian professional body recommendations on adult screening intervals",
    ],
  },
  {
    slug: "pcos-testing",
    title: "PCOS Testing: Which Blood Tests, and Which Day of Your Cycle They Must Be Done On",
    file: "b1-pcos-testing.draft.html",
    reviewer: "chaithra-h-a",
    purpose:
      "The cycle-day timing decides whether a hormone result means anything, and almost nobody publishes it clearly. Women repeatedly pay for tests drawn on the wrong day and get a result nobody can interpret.",
    questions: [
      {
        q: "Is the test-by-cycle-day table correct, including the day 2 to 5 window and the timing for progesterone, AMH and androgens?",
        why: "This table is the entire reason the page exists. Every row needs to be right.",
      },
      {
        q: "Are the Rotterdam criteria stated correctly, and is the ultrasound follicle threshold current?",
        why: "The threshold has changed across guideline versions and we want the one you actually use.",
      },
      {
        q: "Is the list of conditions that must be excluded before calling it PCOS complete?",
        why: "Thyroid disease and hyperprolactinaemia get missed, and a page that helps someone self-diagnose PCOS without exclusion would do harm.",
      },
    ],
    factsToConfirm: [
      "The in-house laboratory runs the hormone panel described, and the article does not imply a test that is sent out is done here.",
    ],
    sources: [
      "International Evidence-Based Guideline for the Assessment and Management of PCOS, 2023",
      "ESHRE / ASRM consensus material on diagnostic criteria",
    ],
  },
  {
    slug: "fatty-liver-grades",
    title: "Fatty Liver on Your Scan Report: What Grade 1, 2 and 3 Mean, and What Comes Next",
    file: "b2-fatty-liver-grades.draft.html",
    reviewer: "pradeep-sathya",
    purpose:
      "People get this as an incidental finding on a scan done for something else, and then either panic or ignore it. The page explains the grades and moves the reader onto fibrosis, which is what actually determines outcome.",
    questions: [
      {
        q: "Is it right to say that ultrasound grading is operator-dependent and tells you nothing about fibrosis?",
        why: "It is the turn the whole article depends on. If you would put it differently, the structure changes.",
      },
      {
        q: "Are the fibrosis assessment tools described correctly, and is the referral threshold right?",
        why: "FIB-4 and elastography are described in general terms. We need the version you would actually apply.",
      },
      {
        q: "Are the weight-reduction percentages and what each achieves stated accurately?",
        why: "These are the numbers a reader will act on, and they came from the literature rather than from you.",
      },
    ],
    factsToConfirm: [
      "IMPORTANT: Gastroenterology is not one of the twelve departments AJSMC publishes, though you are on the roster. Please tell us how this article should describe where a reader goes next — whether that is you here, or a referral.",
      "We do not hold a registration number for you. Please send it, as the article carries your name.",
    ],
    sources: [
      "Current MASLD/MAFLD nomenclature statements",
      "Indian and international guidance on non-invasive fibrosis assessment",
    ],
  },
  {
    slug: "high-sugar-screening",
    title: "High Sugar Reading at a Government Screening Camp: What Confirms Diabetes, and What Happens Next",
    file: "b3-high-sugar-screening.draft.html",
    reviewer: "rm-fahadh",
    purpose:
      "Tamil Nadu's doorstep programme screens at scale and hands people a single reading with no named next step. Nobody is writing that follow-up, and the people searching for it have already been told something is wrong.",
    questions: [
      {
        q: "Is it correct to say plainly that a finger-prick reading at a camp is not a diagnosis?",
        why: "It is the opening line and the reason the page exists. It has to be both true and reassuring without being dismissive of the screening.",
      },
      {
        q: "Are the diagnostic thresholds and the fasting requirements in the table exactly right?",
        why: "Fasting plasma glucose, the 2-hour value and HbA1c are printed as numbers. A wrong threshold here is the worst error the page could carry.",
      },
      {
        q: "Are the symptoms we flag as urgent the right ones?",
        why: "The article sends someone with vomiting, drowsiness or rapid breathing to emergency care rather than to an outpatient booking. Confirm the threshold is drawn correctly.",
      },
    ],
    factsToConfirm: [
      "The confirmatory tests named are available in the in-house laboratory, and the fasting sample timing described is workable within outpatient hours.",
      "We do not hold a registration number for you. Please send it, as the article carries your name.",
    ],
    sources: [
      "ICMR guidelines for the management of type 2 diabetes",
      "Tamil Nadu Makkalai Thedi Maruthuvam programme material; WHO and ADA diagnostic criteria",
    ],
  },
  {
    slug: "counselling-first-session",
    title: "Seeing a Counselling Psychologist: What the First Session Involves, and What Stays Confidential",
    file: "b4-counselling-first-session.draft.html",
    reviewer: "chynna-christina",
    purpose:
      "The barrier is rarely cost. It is not knowing what happens in the room, and fearing it will get back to the family. The page answers both plainly.",
    questions: [
      {
        q: "Is the description of a first session accurate to how you actually run one?",
        why: "It is written generically from published practice. It should read like your room, not a textbook.",
      },
      {
        q: "Are the confidentiality limits stated correctly under Indian law, and is the list complete?",
        why: "The article names specific exceptions. Getting this wrong would be a promise we cannot keep. Please check it against the Mental Healthcare Act and POCSO as you apply them.",
      },
      {
        q: "Is the boundary between counselling psychology, clinical psychology and psychiatry drawn correctly, and is it clear you do not prescribe?",
        why: "A reader who needs medication must not think this page is offering it.",
      },
      {
        q: "Is the crisis routing right, and are the helpline numbers current?",
        why: "This is the part someone in difficulty will use. It must be correct and it must be near the top.",
      },
    ],
    factsToConfirm: [
      "How you should be described professionally — your title, qualification, and your registration body, since psychologists in India register with the Rehabilitation Council of India rather than a medical council.",
      "Whether sessions at AJSMC are individual only, and how consent is handled for someone under 18.",
    ],
    sources: [
      "Mental Healthcare Act, 2017",
      "Rehabilitation Council of India material on psychology practice; Tele-MANAS and KIRAN helpline listings",
    ],
  },
  {
    slug: "child-fever",
    title: "When a Child's Fever Needs a Doctor: The Signs That Cannot Wait Until Morning",
    file: "b5-child-fever.draft.html",
    reviewer: "a-muhammed-shadique",
    purpose:
      "This is searched at two in the morning by a frightened parent. The answer has to be at the very top of the page, and the red flags have to be scannable.",
    questions: [
      {
        q: "Are the age thresholds right, particularly for an infant under three months?",
        why: "The article treats under three months as categorically different. Confirm that is how you want it stated.",
      },
      {
        q: "Is the red-flag list complete and correctly attributed?",
        why: "An earlier draft misattributed one item to NICE and used a superseded IMNCI classification for chest indrawing. Both were corrected — please confirm the current version matches what you use.",
      },
      {
        q: "We removed all paracetamol dosing numbers. Is it acceptable to say the dose is weight-based and set by the doctor?",
        why: "Three articles on this site were quoting three different regimens, which is worse than quoting none. But you may feel a parent needs something concrete — tell us.",
      },
      {
        q: "Is the routing right — that a child with red flags goes to a hospital with 24-hour emergency care rather than waiting for us to open?",
        why: "AJSMC is closed at night and all Sunday. The article says so directly.",
      },
    ],
    factsToConfirm: [
      "Paediatric outpatient hours as described, and that nothing in the article implies AJSMC can see a child overnight.",
    ],
    sources: [
      "IAP guidance on fever in children",
      "NICE NG143 traffic-light system; MoHFW IMNCI material",
    ],
  },
  {
    slug: "first-diabetes-visit",
    title: "Your First Diabetes Consultation: Which Tests Are Done, and What to Bring",
    file: "b6-first-diabetes-visit.draft.html",
    reviewer: "rm-fahadh",
    purpose:
      "Uncertainty about what a first appointment involves is what delays it. The page removes that, and lists the complication screening people forget exists.",
    questions: [
      {
        q: "Are the baseline investigations at diagnosis correct, and are the repeat intervals right?",
        why: "The table is the core of the page and drives what a patient expects to happen.",
      },
      {
        q: "Is the complication screening schedule right, including the eye and foot examinations?",
        why: "These are the two people skip. The article gives them their own section.",
      },
      {
        q: "Is the emergency routing adequate, particularly for severe hypoglycaemia?",
        why: "The checker found hypoglycaemia missing from the routing entirely. It has been added — please confirm the threshold and the instruction are right.",
      },
      {
        q: "Cardiac screening is named in the investigations. AJSMC has no cardiologist. How should the article handle that?",
        why: "We do not want to list a test and leave the reader assuming it happens here.",
      },
    ],
    factsToConfirm: [
      "Which of the baseline investigations run in-house and which are referred, including the retinal examination.",
      "We do not hold a registration number for you. Please send it, as the article carries your name.",
    ],
    sources: [
      "ICMR guidelines for the management of type 2 diabetes",
      "National NCD programme guidance on complication screening intervals",
    ],
  },
);

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
