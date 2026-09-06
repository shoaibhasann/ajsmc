/**
 * Long-form content for the individual department pages.
 *
 * Three rules held throughout, and worth keeping if you extend this file:
 *
 * 1. No new capability claims. Every sentence that says what AJSMC does traces back to the
 *    department's own `context` line in site.ts, or to facts true of the whole hospital —
 *    outpatient Mon to Sat 10am to 9pm, the 24-hour helpline, the in-house laboratory, the
 *    day-care surgical suite, and no casualty or trauma unit. The depth in these pages is
 *    patient education about the condition, which costs nothing to be honest about; it is
 *    not a longer list of things we claim to perform. If a department starts offering
 *    something new, `context` is the place it gets added first.
 *
 * 2. No cures. IMC (Professional Conduct, Etiquette and Ethics) Regulations 2002 reg. 6.1.1
 *    bars a practitioner or their institution from advertising "cases, operations, cures or
 *    remedies", and a hospital website is advertising. Conditions are described as treated,
 *    managed or controlled — never cured, never guaranteed. The Drugs and Magic Remedies
 *    (Objectionable Advertisements) Act 1954 sits behind this too.
 *
 * 3. No fees, and no drug names or doses. Both are settled decisions: costs are discussed
 *    with the patient before treatment rather than published, and dosing belongs with the
 *    consultant who has seen the patient, not on a public page.
 */

export type SpecialtyContent = {
  /**
   * A standalone answer to "what is this page about". Shown to readers in a box near the
   * top and written so an answer engine can quote it whole, away from the rest of the page:
   * it names the department, the hospital, the city and what the department handles, so it
   * still makes sense with nothing around it.
   */
  summary: string;
  /** What the department handles, expanded from its `context` line into plain language. */
  covers: { title: string; body: string }[];
  /** Symptom-level prompts. What a person is actually feeling when they search. */
  whenToSee: string[];
  /**
   * Red flags: symptoms that need care today, not an appointment.
   *
   * These are kept out of `whenToSee` on purpose. That list renders under "These are the
   * ones worth an appointment" with a green tick beside each item, and a green tick is the
   * wrong signal for cauda equina, acute urinary retention, a detaching retina or bleeding
   * in pregnancy. AJSMC has no casualty unit, no doctor on the premises overnight and no cover after 9pm or
   * on a Sunday, so an appointment is the wrong destination for every one of these and the
   * hours spent waiting for the clinic to open are the hours that cost the sight or the
   * limb or the life. They render separately, in alarm styling, pointing at 108.
   */
  urgent?: string[];
  faqs: { q: string; a: string }[];
};

const HOURS = "Monday to Saturday, 10am to 9pm";
const PHONE = "044 2532 2021";

export const specialtyContent: Record<string, SpecialtyContent> = {
  Ophthalmology: {
    summary:
      "Ophthalmology at AJ Subaitha Medical Centre in Egmore, Chennai covers eye testing, cataract surgery, glaucoma treatment and everyday eye complaints such as dry eyes, redness, watering and blurred vision. Cataract procedures are done as day care, so you come in and go home the same day. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Cataract",
        body: "A cataract is the natural lens of the eye turning cloudy, usually with age. Vision goes misty rather than dark, colours look washed out, and headlights and sunlight start to glare. It does not clear on its own and no drop reverses it — the treatment is surgery to replace the clouded lens. At AJSMC this is done as a day-care procedure, so you are not admitted overnight.",
      },
      {
        title: "Glaucoma",
        body: "Glaucoma is pressure inside the eye damaging the optic nerve. What makes it dangerous is that it is painless and takes side vision first, so most people notice nothing until a good deal is already lost. That lost vision does not come back, which is why it is found on a routine eye test rather than by symptoms. Treatment aims to control the pressure and protect the sight you still have.",
      },
      {
        title: "Everyday eye problems",
        body: "Dry eyes, redness, watering and blurred vision are the complaints people come in with most. They can be as simple as strain and screen use or as treatable as an infection or allergy, but blurred vision that is new, one-sided or getting worse is worth an examination rather than a wait.",
      },
      {
        title: "Eye tests",
        body: "A proper eye test is more than reading a chart. It checks how well each eye sees, whether glasses would help, the pressure inside the eye and the health of the retina and optic nerve at the back — which is how glaucoma and diabetic eye changes are picked up before they are felt.",
      },
    ],
    whenToSee: [
      "Vision has gone misty or dim, or lights glare more than they used to",
      "Blurring that is new, in one eye, or getting worse",
      "Redness, pain, watering or discharge that has not settled",
      "You have diabetes and have not had your eyes checked this year",
      "Frequent headaches with eye strain, or holding things closer to read",
    ],
    urgent: ["Sudden loss of vision, flashes of light, or a curtain or shadow across your sight"],
    faqs: [
      {
        q: "Is cataract surgery at AJSMC a day-care procedure?",
        a: `Yes. Cataract procedures at AJSMC in Egmore, Chennai are done as day care, which means you come in and go home the same day rather than staying overnight. Your consultant will explain what to expect before and after, and what follow-up you will need. Call ${PHONE} to arrange a consultation first — surgery is only decided after an examination.`,
      },
      {
        q: "How do I know if I have a cataract?",
        a: "Cataract usually comes on slowly, so it is often noticed as a gradual change rather than a sudden one: vision that looks misty or smoky, colours that seem faded, glare from headlights or sunlight, and needing more light to read. It is confirmed by an eye examination, not by symptoms alone, so a check is the only way to be sure.",
      },
      {
        q: "Can glaucoma be detected before it affects vision?",
        a: "Yes, and that is the point of testing for it. Glaucoma is painless and takes side vision first, so people usually notice nothing until damage is done — and damage already done cannot be reversed. It is picked up by measuring the pressure inside the eye and examining the optic nerve, both part of a full eye test.",
      },
      {
        q: "I have diabetes. How often should my eyes be checked?",
        a: "Diabetes can affect the blood vessels at the back of the eye long before your vision changes, so eye screening is recommended even when your sight feels fine. Your consultant will tell you how often to come based on your own readings and history. AJSMC has both ophthalmology and diabetology on site, so the two can be arranged in the same visit.",
      },
      {
        q: "Do I need an appointment to see an eye consultant?",
        a: `Walk-in patients are seen ${HOURS}, but booking ahead means less waiting and makes sure the consultant you need is in — each one keeps their own clinic hours inside that window. Call ${PHONE}, message the same number on WhatsApp, or use the appointment form on this site.`,
      },
      {
        q: "What should I bring to an eye appointment?",
        a: "Bring your current glasses or lenses, any previous eye reports or prescriptions, and the actual strips of any medicines you take — the packaging carries the strength, which the name alone does not. If you have diabetes or high blood pressure, bring your recent readings.",
      },
    ],
  },

  Dermatology: {
    summary:
      "Dermatology at AJ Subaitha Medical Centre in Egmore, Chennai treats acne, eczema, psoriasis, fungal infections, pigmentation and hair fall, and offers cosmetic procedures for skin and hair. Both adults and children are seen. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Acne",
        body: "Acne is not a hygiene problem and it is not limited to teenagers — it is oil, blocked pores, bacteria and hormones interacting, and it can carry on well into adult life. It is worth treating early rather than waiting it out, because the scarring and dark marks acne leaves behind are harder to deal with than the acne itself.",
      },
      {
        title: "Eczema and psoriasis",
        body: "Both are long-term conditions where the skin becomes inflamed — eczema typically dry, itchy and prone to flaring, psoriasis with thickened, scaly patches. Neither is contagious. Neither is something you catch from being unclean. They are managed rather than finished with: the aim is fewer flares, less itch, and knowing what sets yours off.",
      },
      {
        title: "Fungal infections",
        body: "Fungal infections of the skin, nails and scalp are extremely common in Chennai's heat and humidity, and they are one of the most frequently self-treated and mis-treated skin problems. Over-the-counter creams that mix steroids in can settle the itch while the infection spreads underneath, which makes it harder to treat later.",
      },
      {
        title: "Pigmentation",
        body: "Dark patches, uneven tone and marks left behind by old spots have very different causes — sun, hormones, injury to the skin, or a reaction to something applied to it. What works for one does little for another, which is why pigmentation is examined before anything is prescribed rather than treated by product name.",
      },
      {
        title: "Hair fall",
        body: "Some daily shedding is normal. What is worth examining is hair that is thinning in a pattern, coming out in patches, or falling noticeably more than it used to — because the cause may be on the scalp or may be elsewhere entirely, including thyroid problems, low iron, illness or a recent pregnancy.",
      },
      {
        title: "Cosmetic procedures for skin and hair",
        body: "Cosmetic treatment for skin and hair is available alongside medical dermatology, and starts the same way: an examination and a discussion of what is realistic for your skin, rather than a package chosen in advance.",
      },
    ],
    whenToSee: [
      "Acne that is leaving marks or scars, or has not responded to what you have tried",
      "An itchy, scaly or spreading rash that keeps coming back",
      "Hair falling in patches, or thinning in a clear pattern",
      "A mole or patch that is changing in size, shape or colour",
      "Nail changes — thickening, discolouration or lifting",
      "A skin problem you have been treating yourself for weeks without it settling",
    ],
    faqs: [
      {
        q: "Does AJSMC treat children's skin problems?",
        a: `Yes. Dermatology at AJSMC in Egmore, Chennai sees both adults and children. Childhood skin complaints such as eczema, fungal infections and rashes are common and are examined the same way. Call ${PHONE} to book, or walk in ${HOURS}.`,
      },
      {
        q: "Why does my fungal infection keep coming back?",
        a: "Recurrence usually has a reason: treatment stopped as soon as the itch settled rather than when the infection cleared, a combination cream containing a steroid was used, or the source — footwear, damp clothing, another affected person at home — was never dealt with. Chennai's humidity makes reinfection easy. An examination sorts out which of these applies to you.",
      },
      {
        q: "Is hair fall always a scalp problem?",
        a: "No, and that is why it is examined rather than treated blindly. Hair fall can follow thyroid problems, low iron, a recent illness, pregnancy, or significant stress, as well as conditions of the scalp itself. AJSMC has an in-house laboratory, so blood tests your consultant orders are processed in the building and most reports reach them within the same visit.",
      },
      {
        q: "Can eczema and psoriasis be cured?",
        a: "Both are long-term conditions, and it would be dishonest to promise otherwise. What treatment aims at is control — fewer and milder flares, less itch, and a clear understanding of what triggers yours. Many people go long stretches with settled skin. Your consultant will explain what is realistic in your case.",
      },
      {
        q: "Should I stop using the cream I bought over the counter?",
        a: "Bring it with you rather than stopping and guessing. Many over-the-counter skin creams contain steroids, which can settle itching quickly while allowing a fungal infection to spread underneath and change how it looks — which makes diagnosis harder. Showing your consultant the actual tube tells them more than the name will.",
      },
      {
        q: "What should I bring to a dermatology appointment?",
        a: "Bring the actual tubes, bottles or strips of anything you have been applying or taking, including things bought without a prescription, and any previous reports. If the problem comes and goes, photographs of it at its worst are genuinely useful.",
      },
    ],
  },

  Paediatrics: {
    summary:
      "Paediatrics at AJ Subaitha Medical Centre in Egmore, Chennai covers newborn checks, the full childhood vaccination schedule, growth and development monitoring, and treatment for fever, cough, loose motions and the other illnesses children pick up. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Newborn checks",
        body: "The first weeks are when feeding, weight, jaundice and the early reflexes are watched most closely, because small problems found early are far easier to deal with. These visits are also where parents get to ask the questions that no one prepares you for.",
      },
      {
        title: "Vaccination",
        body: "The full childhood vaccination schedule is given here. Vaccines are timed the way they are for a reason — each is due when a child is old enough to respond to it and young enough to still be at risk — so keeping to the schedule matters more than it might seem. If your child has missed doses, catch-up is usually possible; bring whatever record you have.",
      },
      {
        title: "Growth and development",
        body: "Growth monitoring tracks height, weight and head size against expected ranges, and development covers the milestones — sitting, walking, first words, social response. The point is not to compare your child with someone else's but to notice a pattern moving away from their own, which is what a chart over time shows and a single visit cannot.",
      },
      {
        title: "Everyday childhood illness",
        body: "Fever, cough, colds, loose motions, vomiting, throat and ear infections, and rashes are the bulk of what children are brought in with. Most are viral and settle on their own. The consultation is as much about identifying the few that are not, and telling you what warning signs to watch for at home.",
      },
    ],
    whenToSee: [
      "Fever in a baby under three months — always get this seen",
      "A child who is drinking very little, passing much less urine, or is unusually drowsy",
      "Breathing that is fast, noisy, or pulling in at the ribs",
      "Loose motions or vomiting that will not stop, especially with signs of dehydration",
      "Not gaining weight, or dropping away from their own growth pattern",
      "Missed vaccinations, or a schedule you are not sure about",
      "A milestone that seems well behind — sitting, walking, speech or social response",
    ],
    faqs: [
      {
        q: "Does AJSMC give the full childhood vaccination schedule?",
        a: `Yes. The full vaccination schedule is given at AJSMC in Egmore, Chennai, ${HOURS}. Bring your child's vaccination card or any record you have so the consultant can see what has been given and what is due. Call ${PHONE} to check timings before you come.`,
      },
      {
        q: "My child has missed some vaccinations. Is it too late?",
        a: "Usually not. Missed doses can generally be caught up, and the schedule adjusted from where your child actually is rather than starting over. Bring whatever record you have, even if it is incomplete — the consultant will work out what is still needed.",
      },
      {
        q: "When is a child's fever serious enough to come in?",
        a: "Any fever in a baby under three months should be seen. At any age, come in if your child is very drowsy or difficult to wake, is drinking very little or passing much less urine, is breathing fast or with effort, has a rash that does not fade when pressed, or has a fever that is not settling. A child who is feverish but drinking, alert and playing between spikes is usually less worrying than the number itself suggests.",
      },
      {
        q: "Does AJSMC have an emergency department for children?",
        a: `No. AJSMC does not run a casualty or trauma unit. In a life-threatening emergency — a child who is unresponsive, struggling to breathe, having a fit, or badly injured — call 108 or go straight to the nearest hospital with a 24-hour emergency department. For everything else, outpatient consultations run ${HOURS} and the helpline is answered 24 hours on ${PHONE}.`,
      },
      {
        q: "How is my child's growth actually monitored?",
        a: "Height, weight and head circumference are plotted over time rather than judged at a single visit. What matters is the child's own line: a steady curve is reassuring even if it sits lower than average, and a curve that flattens or falls away is what prompts a closer look. Bringing previous records helps a great deal.",
      },
      {
        q: "What should I bring to a paediatric appointment?",
        a: "Bring the vaccination card, any previous prescriptions or reports, and the actual strips or bottles of any medicine your child is taking — the packaging carries the strength, which the name alone does not. If you can, note when the illness started and what the temperature has been.",
      },
    ],
  },

  Orthopaedics: {
    summary:
      "Orthopaedics at AJ Subaitha Medical Centre in Egmore, Chennai treats bone, joint and muscle problems including fractures, back pain, knee and shoulder pain, arthritis and sports injuries, and provides guidance on joint replacement surgery. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Fractures",
        body: "A broken bone needs to be confirmed, put in the right position and held there while it heals. Not every fracture is obvious — some show as pain and swelling that will not settle rather than an unmistakable break — which is why an X-ray usually settles the question rather than waiting to see.",
      },
      {
        title: "Back pain",
        body: "Most back pain is mechanical and improves, but it is worth being examined when it is severe, keeps returning, or runs down a leg. Pain travelling below the knee, numbness or weakness in the leg, or any change in bladder or bowel control point to a nerve being involved and should not be sat on.",
      },
      {
        title: "Knee and shoulder pain",
        body: "These two joints carry very different problems. Knees tend to give trouble with wear, weight and old injuries; shoulders more often with the tendons around the joint, which is why a stiff shoulder can hurt most at night and when reaching behind you. Both are worth examining early, since stiffness that sets in is harder to undo than pain that is treated.",
      },
      {
        title: "Arthritis",
        body: "Arthritis is joint pain, stiffness and swelling from the joint surface wearing or becoming inflamed. It is a long-term condition and it is managed rather than finished with — through treatment, activity, weight and strengthening the muscles around the joint. Well-managed arthritis is a very different experience from arthritis left alone.",
      },
      {
        title: "Sports injuries",
        body: "Sprains, ligament and muscle injuries need an accurate assessment of what was actually damaged, because returning too early is how a single injury turns into a recurring one. Rest is only part of it — what and when you start moving again matters just as much.",
      },
      {
        title: "Joint replacement guidance",
        body: "Whether a joint should be replaced is a decision, not a foregone conclusion, and it depends on how much the joint limits your daily life rather than on the X-ray alone. Your consultant will talk through where you are, what non-surgical treatment can still offer, and what replacement would and would not change.",
      },
    ],
    whenToSee: [
      "Pain after a fall or injury, especially with swelling or an inability to bear weight",
      "Back pain that runs down a leg, or comes with numbness or weakness",
      "A joint that has become stiff, or that gives way",
      "Knee or shoulder pain that has lasted weeks, or wakes you at night",
      "Morning stiffness in joints that takes a while to loosen",
      "A previous injury that keeps recurring",
    ],
    urgent: ["Back pain with any change in bladder or bowel control, or numbness between the legs"],
    faqs: [
      {
        q: "Do I need an X-ray before seeing an orthopaedic consultant?",
        a: `No — come and be examined first. The consultant will decide what imaging is actually needed, which avoids the wrong scan or one you did not need. AJSMC has diagnostics on site, so tests ordered on the day are done in the building. If you already have X-rays or scans from elsewhere, bring them. Outpatient consultations run ${HOURS}.`,
      },
      {
        q: "Does AJSMC treat fractures?",
        a: `Yes. Orthopaedics at AJSMC covers fractures along with back pain, knee and shoulder pain, arthritis and sports injuries. Note that AJSMC does not run a casualty or trauma unit — for a serious accident or a major injury, call 108 or go directly to the nearest hospital with a 24-hour emergency department.`,
      },
      {
        q: "When does knee pain need surgery?",
        a: "Most knee pain does not. Surgery becomes a question when the joint is limiting your daily life — how far you can walk, stairs, sleep — and non-surgical treatment has been given a fair try. It is decided on how you are actually living, not on the X-ray alone, and your consultant will talk you through both sides before anything is planned.",
      },
      {
        q: "Can arthritis be cured?",
        a: "No, and anyone promising otherwise is not being straight with you. Arthritis is a long-term condition that is managed — with treatment, movement, weight and strengthening the muscles supporting the joint. That management makes a real difference to pain and to what you can do, which is the honest goal.",
      },
      {
        q: "How long should back pain last before I get it checked?",
        a: "Ordinary back pain often eases within a few weeks. Get it looked at sooner if it followed an injury, is severe, runs below the knee, comes with numbness or weakness in the leg, or is not improving at all. Any change in bladder or bowel control alongside back pain should be treated as urgent.",
      },
      {
        q: "What should I bring to an orthopaedic appointment?",
        a: "Bring any previous X-rays, scans or reports — the films or images themselves, not just the report — and the actual strips of medicines you are taking. Wear or bring clothing that lets the joint be examined properly.",
      },
    ],
  },

  Urology: {
    summary:
      "Urology at AJ Subaitha Medical Centre in Egmore, Chennai treats kidney stones, urinary infections, blood in urine, prostate enlargement and difficulty passing urine, including minimally invasive surgery. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Kidney stones",
        body: "Stones form when substances in urine concentrate and crystallise. Small ones may pass on their own; larger ones can block the flow, which is what turns a stone into severe pain in the side or back, often coming in waves, sometimes with nausea or blood in the urine. Treatment depends on size and position, so both are established before anything is decided.",
      },
      {
        title: "Urinary infections",
        body: "Burning, urgency, passing urine frequently and cloudy or strong-smelling urine are the usual signs. Infections are common and treatable, but ones that keep returning, or that come with fever and back pain, need looking into rather than treating again — recurrence is often a signal about something underlying.",
      },
      {
        title: "Blood in urine",
        body: "Blood in the urine should always be examined, even once, even without pain, and even if it clears on its own. Causes range from infection and stones to conditions that matter a great deal to find early. It is one of the clearest reasons to see a urologist rather than wait.",
      },
      {
        title: "Prostate enlargement",
        body: "The prostate commonly enlarges with age and presses on the passage urine flows through. That shows up as a weak stream, difficulty starting, dribbling at the end, going often, and getting up at night. It is common, it is treatable, and it is not the same thing as cancer — but it is examined properly rather than assumed.",
      },
      {
        title: "Difficulty passing urine",
        body: "Straining, a weak stream, a feeling that the bladder has not emptied, or going far more often than you used to are all worth an examination. Being unable to pass urine at all, with a full and painful bladder, needs urgent attention.",
      },
      {
        title: "Minimally invasive surgery",
        body: "Where surgery is needed, minimally invasive approaches are available. What suits your case depends on the diagnosis and on you, and is discussed after examination rather than decided in advance.",
      },
    ],
    whenToSee: [
      "Severe pain in the side or back that comes in waves",
      "Blood in the urine — even once, even if it clears",
      "Burning or urgency that keeps coming back after treatment",
      "A weak stream, difficulty starting, or getting up repeatedly at night",
      "A feeling that the bladder never empties fully",
      "Fever with back pain and urinary symptoms",
    ],
    urgent: ["Being unable to pass urine at all, with a painful or swollen lower abdomen"],
    faqs: [
      {
        q: "Do all kidney stones need surgery?",
        a: `No. Small stones often pass on their own with fluids and treatment for the pain. Whether more is needed depends on the size of the stone, where it sits and whether it is blocking the flow — which is why it is imaged before anything is decided. Urology at AJSMC includes minimally invasive surgery where it is needed. Call ${PHONE} to arrange a consultation.`,
      },
      {
        q: "Is blood in urine always serious?",
        a: "Not always, but it is always worth examining. It can come from an infection or a stone, and it can also point to something more significant that is far better found early. Get it checked even if it happened once, even if there was no pain, and even if it has stopped on its own.",
      },
      {
        q: "Is prostate enlargement the same as prostate cancer?",
        a: "No. The prostate commonly enlarges with age, and that enlargement is not cancer. But the symptoms can overlap, which is exactly why the difference is established by examination rather than assumed either way. If you are getting up at night to pass urine, or your stream has weakened, it is worth being seen.",
      },
      {
        q: "Why do my urinary infections keep coming back?",
        a: "Repeated infections are a reason to investigate rather than simply treat again. There may be a stone, incomplete bladder emptying, or another underlying reason that keeps making infection likely. AJSMC has an in-house laboratory, so urine tests ordered on the day are processed in the building and most reports reach your consultant within the same visit.",
      },
      {
        q: "Are urology consultations private?",
        a: `Yes. Consultations are private and your records stay confidential. If it helps, call ${PHONE} beforehand and ask when the consultant's clinic is quietest.`,
      },
      {
        q: "What should I bring to a urology appointment?",
        a: "Bring any previous scans, ultrasound reports or urine test results, and the actual strips of any medicines you take. If you have been noting how often you pass urine or getting up at night, that is genuinely useful information.",
      },
    ],
  },

  "Obstetrics & Gynaecology": {
    summary:
      "Obstetrics and Gynaecology at AJ Subaitha Medical Centre in Egmore, Chennai covers pregnancy care from the first scan through to delivery, and treatment for irregular periods, PCOS, fibroids, white discharge, menopause symptoms and infertility. Keyhole gynaecological surgery is available. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Pregnancy care",
        body: "Care runs from the first scan through to delivery — confirming the pregnancy and dates, the scans and blood tests due at each stage, watching blood pressure, sugar and the baby's growth, and answering the questions that come with a first pregnancy or a difficult previous one. Regular visits exist to catch the things that are silent early and treatable when found.",
      },
      {
        title: "Irregular periods",
        body: "Cycles that are unpredictable, very heavy, very painful or have stopped are worth investigating rather than tolerating. The cause may be hormonal, structural, thyroid-related or something else, and treatment differs completely depending on which — so it is examined rather than guessed.",
      },
      {
        title: "PCOS",
        body: "Polycystic ovary syndrome is a hormonal condition that can show up as irregular or absent periods, weight that is difficult to shift, acne, excess hair growth, or difficulty conceiving. It is long-term and it is managed rather than finished with, but management makes a real difference — to cycles, to symptoms and to fertility.",
      },
      {
        title: "Fibroids",
        body: "Fibroids are non-cancerous growths in the wall of the uterus. Many cause nothing at all and are found incidentally; others cause heavy or painful periods, pressure, or trouble conceiving. Whether they need treating depends on size, position and what they are actually doing to you.",
      },
      {
        title: "White discharge",
        body: "Some discharge is normal and changes through the cycle. What is worth examining is a change — in amount, colour or smell — or discharge with itching, burning or pain, which usually points to an infection that is straightforward to treat once identified.",
      },
      {
        title: "Menopause",
        body: "Hot flushes, disturbed sleep, mood changes, dryness and irregular cycles in the years around menopause are common and are not something to simply endure. There are ways to make this stretch easier, and they start with a consultation rather than with a supplement.",
      },
      {
        title: "Infertility",
        body: "Difficulty conceiving is investigated in both partners, because the cause lies with the man in a substantial share of cases and testing only one side wastes time. Consultation is private and records stay confidential.",
      },
      {
        title: "Keyhole gynaecological surgery",
        body: "Where surgery is needed, keyhole (laparoscopic) gynaecological surgery is available. What suits your case is discussed after examination.",
      },
    ],
    whenToSee: [
      "A positive pregnancy test — the first scan and dating matter",
      "Periods that are very heavy, very painful, irregular or have stopped",
      "Difficulty conceiving after a year of trying, or six months if you are over 35",
      "Discharge with itching, burning, odour or pain",
      "Bleeding between periods, after intercourse, or after menopause",
      "Menopausal symptoms disrupting sleep, mood or daily life",
    ],
    urgent: ["Bleeding or severe abdominal pain during pregnancy"],
    faqs: [
      {
        q: "Does AJSMC provide pregnancy care through to delivery?",
        a: `Yes. Obstetrics at AJSMC in Egmore, Chennai covers pregnancy care from the first scan through to delivery, including the scans and blood tests due at each stage. Call ${PHONE} to book your first visit, or use the appointment form on this site.`,
      },
      {
        q: "When should I see a doctor about difficulty conceiving?",
        a: "After about a year of trying without success, or after six months if you are over 35 or have a known reason to expect difficulty. Both partners are assessed — a substantial share of infertility involves the man, so testing only one side often means starting again later.",
      },
      {
        q: "Can PCOS be cured?",
        a: "PCOS is a long-term hormonal condition, and it is managed rather than cured. That management is worth doing: it makes a real difference to cycles, to symptoms like acne and excess hair, and to fertility. What it involves depends on which symptoms affect you most and whether you are trying to conceive.",
      },
      {
        q: "Do all fibroids need to be removed?",
        a: "No. Many fibroids cause no symptoms and are simply monitored. Treatment is considered when they are causing heavy or painful periods, pressure, or difficulty conceiving — the decision follows what they are doing to you, not their presence on a scan.",
      },
      {
        q: "Is a gynaecology consultation confidential?",
        a: `Yes. Consultations are private and records stay confidential. If you would prefer to be seen by a particular consultant, call ${PHONE} beforehand — each keeps their own clinic hours within ${HOURS}.`,
      },
      {
        q: "What should I bring to a gynaecology appointment?",
        a: "Bring any previous scans and reports, the dates of your last few periods if you have them, and the actual strips of medicines you take. If you are pregnant, bring every scan and blood test you have had so far.",
      },
    ],
  },

  "General Medicine": {
    summary:
      "General Medicine at AJ Subaitha Medical Centre in Egmore, Chennai is the first stop for fever, infection, body pain, weakness and stomach trouble, and for long-term conditions such as high blood pressure, thyroid disorders and high cholesterol. Annual health checks are done here. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Fever and infection",
        body: "Fever is a symptom, not a diagnosis, and in Chennai the causes worth ruling out change with the season — dengue and other mosquito-borne illness after the rains, waterborne infection when water gets contaminated. Fever lasting more than two or three days, or with severe headache, breathlessness, rash or persistent vomiting, needs examining rather than treating at home.",
      },
      {
        title: "Body pain and weakness",
        body: "Feeling persistently tired, weak or aching is common and is often dismissed. It can follow infection, anaemia, thyroid problems, diabetes or vitamin deficiency — all of which are found by testing rather than by how the symptom feels. AJSMC's laboratory is in the building, so tests ordered on the day are processed here.",
      },
      {
        title: "Stomach trouble",
        body: "Acidity, indigestion, loose motions, constipation and abdominal pain are among the most common reasons people come in. Most settle. What is worth examining is pain that keeps returning, any bleeding, unintended weight loss, or a change in bowel habit that has lasted.",
      },
      {
        title: "High blood pressure",
        body: "Blood pressure is high in a great many people who feel entirely well, which is precisely the problem — it does its damage to the heart, kidneys, eyes and brain silently over years. It is found by measuring, and once found it is controlled and monitored rather than treated once and forgotten.",
      },
      {
        title: "Thyroid disorders",
        body: "An underactive or overactive thyroid can look like tiredness, weight change, hair fall, feeling cold or hot, palpitations or low mood — vague on their own, which is why the condition is often carried for a long time before it is picked up. A blood test settles it.",
      },
      {
        title: "High cholesterol",
        body: "Cholesterol causes no symptoms at all. It is found on a blood test and it matters because of what it contributes to over years. It is managed with diet, activity and treatment where needed, and rechecked rather than assumed to have stayed put.",
      },
      {
        title: "Annual health checks",
        body: "A yearly check exists to find the silent things — blood pressure, sugar, cholesterol, thyroid, anaemia — while they are still easy to deal with. Worth doing before something prompts it, particularly if these conditions run in your family.",
      },
    ],
    whenToSee: [
      "Fever lasting more than two or three days, or with severe headache or rash",
      "Tiredness or weakness that has not lifted",
      "Stomach pain that keeps returning, or a lasting change in bowel habit",
      "Weight loss you did not intend",
      "A blood pressure, sugar or cholesterol reading you have not followed up",
      "A long-term condition you have stopped monitoring",
      "Breathlessness, chest pain or one-sided weakness — treat these as urgent and call 108",
    ],
    faqs: [
      {
        q: "What does a general medicine consultant treat?",
        a: `General Medicine at AJSMC in Egmore, Chennai is the first stop for adults with fever, infection, body pain, weakness and stomach trouble, and for long-term conditions including high blood pressure, thyroid disorders and high cholesterol. It is also where annual health checks are done. If a specialist is needed, this is usually where that is worked out. Outpatient consultations run ${HOURS}.`,
      },
      {
        q: "How long should a fever last before I get it checked?",
        a: "Come in if a fever has lasted more than two or three days, or at any point if it comes with severe headache, breathlessness, a rash, persistent vomiting, or you are unable to keep fluids down. In Chennai, fever after the monsoon is worth being straightforward about — mosquito-borne and waterborne illness both rise then.",
      },
      {
        q: "Do I need to fast before a health check?",
        a: `It depends which tests are being done — some, including certain sugar and cholesterol tests, need fasting and others do not. Call ${PHONE} before you come and ask, so you are not turned away or tested in a state that makes the result useless.`,
      },
      {
        q: "How quickly will I get my test results?",
        a: "AJSMC's laboratory is in the building, so samples do not travel. Most reports for tests ordered on the day reach your consultant within the same visit, which often means your treatment is decided before you leave rather than at a second appointment.",
      },
      {
        q: "I feel fine. Why would I need a health check?",
        a: "Because the conditions a check looks for — high blood pressure, high sugar, high cholesterol, thyroid problems, anaemia — mostly cause nothing you can feel until they have been present for years. Feeling well is not evidence that they are absent; it is the reason they get missed.",
      },
      {
        q: "What should I bring to a general medicine appointment?",
        a: "Bring previous reports and the actual strips of every medicine you take, including anything bought without a prescription — the packaging carries the strength, which the name alone does not. If you monitor blood pressure or sugar at home, bring those readings.",
      },
    ],
  },

  Diabetology: {
    summary:
      "Diabetology at AJ Subaitha Medical Centre in Egmore, Chennai covers diabetes diagnosis and blood sugar control, diet and lifestyle guidance, diabetic foot and eye screening, and treatment for thyroid and other hormonal disorders. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Diagnosis and blood sugar control",
        body: "Diabetes is diagnosed on blood tests, not on symptoms — many people have raised sugar for years while feeling well. Once diagnosed, the work is control: keeping sugar within a range that protects the eyes, kidneys, nerves and heart over decades. That means monitoring and adjusting, not a single prescription.",
      },
      {
        title: "Diet and lifestyle guidance",
        body: "What you eat, how you move and how you sleep affect blood sugar as much as treatment does. Guidance here means something that fits a South Indian kitchen and your actual routine, rather than a generic list — advice you cannot follow is advice that does nothing.",
      },
      {
        title: "Diabetic foot screening",
        body: "Diabetes can reduce sensation in the feet, which means an injury can go unnoticed until it is serious. Screening checks sensation, circulation and the skin, and it exists precisely because the early stage of this problem is the stage you cannot feel.",
      },
      {
        title: "Diabetic eye screening",
        body: "Diabetes can damage the blood vessels at the back of the eye long before vision changes. By the time sight is affected, damage is already done — so eyes are screened on schedule rather than when something feels wrong. AJSMC has ophthalmology on site, so this can be arranged alongside your diabetes review.",
      },
      {
        title: "Thyroid and hormonal disorders",
        body: "Thyroid problems and other hormonal disorders are treated here too. They often present vaguely — tiredness, weight change, hair fall, mood or temperature intolerance — and are confirmed on blood tests rather than by symptoms alone.",
      },
    ],
    whenToSee: [
      "Increased thirst, passing urine often, or unexplained weight loss",
      "A high sugar reading you have not followed up",
      "Diabetes in the family and no test in the last year",
      "Numbness, tingling or burning in the feet",
      "A cut, blister or ulcer on the foot that is not healing",
      "Blurred vision, or no eye screening in the last year",
      "Tiredness, weight change or hair fall that has not been explained",
    ],
    faqs: [
      {
        q: "How is diabetes diagnosed?",
        a: `On blood tests, not on symptoms. Fasting sugar, post-meal sugar and HbA1c — which reflects the average over the preceding months — are the usual measures. AJSMC has an in-house laboratory, so tests ordered on the day are processed in the building and most reports reach your consultant within the same visit. Outpatient consultations run ${HOURS}.`,
      },
      {
        q: "Can diabetes be cured?",
        a: "No, and it would be wrong to suggest otherwise. Diabetes is a long-term condition that is controlled — through diet, activity, monitoring and treatment. Control is not a small thing: it is what protects your eyes, kidneys, nerves and heart over the decades ahead. Anyone promising a cure is selling something.",
      },
      {
        q: "How often should someone with diabetes have their eyes and feet checked?",
        a: "Both are checked on a schedule rather than when something feels wrong, because both problems begin silently — diabetic eye changes appear before vision does, and reduced sensation in the feet means an injury can go unnoticed. Your consultant will set the interval for you. Ophthalmology is on site here, so eye screening can be arranged alongside your review.",
      },
      {
        q: "I feel completely well. Should I still be tested?",
        a: "Yes, particularly if diabetes runs in your family, you are overweight, or you have high blood pressure or cholesterol. Raised blood sugar commonly causes nothing you can feel for years, and those are exactly the years in which it is easiest to act on.",
      },
      {
        q: "Do I need to fast for a diabetes test?",
        a: `Some tests need fasting and others do not — HbA1c does not, fasting sugar obviously does. Call ${PHONE} before you come and ask which applies, so the sample you give is one that can actually be interpreted.`,
      },
      {
        q: "What should I bring to a diabetes appointment?",
        a: "Bring your home sugar readings if you take them, all previous reports, and the actual strips of every medicine you use — the packaging carries the strength, which the name alone does not. It also helps to be honest about what you actually eat rather than what you intend to.",
      },
    ],
  },

  "Reproductive Medicine": {
    summary:
      "Reproductive Medicine at AJ Subaitha Medical Centre in Egmore, Chennai provides private, confidential consultation and treatment for infertility in men and women, sexual health concerns and sexually transmitted infections. Counselling is part of every consultation and records stay confidential. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Infertility in women",
        body: "Difficulty conceiving is investigated rather than waited out. Assessment looks at cycles and ovulation, hormonal factors and the structures involved, and it takes account of age, because time matters more in some situations than others.",
      },
      {
        title: "Infertility in men",
        body: "A substantial share of infertility involves the man, and testing only one partner is how couples lose a year. Male assessment is straightforward and it is part of the picture from the start, not a step taken after everything else has been ruled out.",
      },
      {
        title: "Sexual health",
        body: "Concerns about sexual health are extremely common and are among the least likely to be raised, usually out of embarrassment. They are treated as a medical matter here, in a private consultation, without judgement.",
      },
      {
        title: "Sexually transmitted infections",
        body: "STIs are common, frequently cause no symptoms at all, and are treatable — and the ones that cause nothing are exactly the ones that go on to cause harm, including to fertility. Testing is confidential. Being tested is a sensible thing to do, not an admission of anything.",
      },
      {
        title: "Counselling",
        body: "Counselling is part of every consultation here rather than an add-on. Infertility and sexual health carry a real weight — on individuals and on relationships — and treating the medical side while ignoring that helps less than it should.",
      },
    ],
    whenToSee: [
      "Trying to conceive for a year without success, or six months if you are over 35",
      "Irregular or absent periods while trying to conceive",
      "A concern about sexual health you have not raised with anyone",
      "Possible exposure to a sexually transmitted infection",
      "Discharge, ulcers, pain or burning in the genital area",
      "A previous diagnosis affecting fertility that was never followed up",
    ],
    faqs: [
      {
        q: "Is the consultation confidential?",
        a: `Yes. Consultations in Reproductive Medicine at AJSMC are private and records stay confidential. Counselling is part of every consultation. If you would prefer a quieter time, call ${PHONE} and ask when the consultant's clinic is least busy.`,
      },
      {
        q: "Should both partners come for an infertility consultation?",
        a: "Ideally yes. A substantial share of infertility involves the man, so assessing only one partner often means discovering months later that the investigation was incomplete. Coming together also means you hear the same explanation at the same time.",
      },
      {
        q: "When is difficulty conceiving worth investigating?",
        a: "After about a year of regular attempts, or after six months if you are over 35 or already know of a reason to expect difficulty — such as irregular cycles, previous pelvic infection, or surgery affecting the reproductive organs. Age matters here, so earlier advice is better than waiting on principle.",
      },
      {
        q: "Can a sexually transmitted infection be present without symptoms?",
        a: "Yes, frequently — and those are the ones most worth finding. An infection causing nothing you notice can still cause damage over time, including to fertility, and can still be passed on. This is why testing is based on exposure rather than on symptoms.",
      },
      {
        q: "Will I be judged for coming in about sexual health?",
        a: "No. These are medical matters and they are common ones. The reason they go untreated is almost never that treatment is difficult — it is that people put off asking. A consultation here is private and the conversation is a clinical one.",
      },
      {
        q: "What should I bring to the appointment?",
        a: "Bring any previous test results or scans for both partners, details of how long you have been trying and of your cycles, and the actual strips of any medicines you take. If you have had previous treatment elsewhere, bring those records too.",
      },
    ],
  },

  Psychology: {
    summary:
      "Psychology at AJ Subaitha Medical Centre in Egmore, Chennai provides confidential counselling for stress, anxiety, low mood, sleep difficulty, exam pressure, relationship problems and behavioural concerns, in both children and adults. Outpatient consultations run Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Stress and anxiety",
        body: "Anxiety is not only worry. It shows up physically — a racing heart, tight chest, disturbed sleep, stomach trouble — often convincingly enough that people look for a physical cause first. Counselling works on what keeps the cycle running rather than on talking you out of it.",
      },
      {
        title: "Low mood",
        body: "Persistent low mood is not a character flaw and not something to be reasoned out of. Losing interest in what you used to enjoy, sleeping and eating differently, tiredness, and finding ordinary tasks heavy are the common signs. It is worth raising early — much of the harm comes from the months spent hoping it lifts by itself.",
      },
      {
        title: "Sleep difficulty",
        body: "Trouble falling asleep, waking through the night, or waking early and unable to return to sleep can be a problem on its own or part of stress, anxiety or low mood. Because poor sleep then worsens all three, it is a useful place to start.",
      },
      {
        title: "Exam pressure",
        body: "Academic pressure on students in Chennai is real, and so is what it does — sleeplessness, panic before exams, physical symptoms, going blank in the hall despite having prepared. This is a common reason young people are brought in, and it responds well to being addressed rather than pushed through.",
      },
      {
        title: "Relationship problems",
        body: "Difficulties in a marriage, a family or between parents and children affect health directly, through sleep, appetite, mood and the ability to function day to day. A neutral space to work through them is a legitimate reason to come in.",
      },
      {
        title: "Behavioural concerns in children",
        body: "Changes in a child's behaviour, mood, sleep, school performance or friendships are worth taking seriously rather than waiting out. Children often show distress through behaviour long before they can name it, and early attention is usually far simpler than late.",
      },
    ],
    whenToSee: [
      "Worry, tension or fear that is affecting sleep, appetite or daily life",
      "Low mood, or loss of interest in things you used to enjoy, lasting weeks",
      "Difficulty sleeping that has become a pattern",
      "Panic, blanking or physical symptoms around exams",
      "Strain at home that you cannot see a way through",
      "A child whose behaviour, mood or school performance has clearly changed",
      "Thoughts of harming yourself — do not wait for an appointment, call 044 2532 2021 or a helpline now",
    ],
    faqs: [
      {
        q: "Is counselling at AJSMC confidential?",
        a: `Yes. Counselling at AJSMC in Egmore, Chennai is confidential. It is available for both children and adults, ${HOURS}. Call ${PHONE} to arrange a session.`,
      },
      {
        q: "Do I need a referral to see a counsellor?",
        a: `No. You can book directly — call ${PHONE}, message on WhatsApp, or use the appointment form on this site. You do not need another doctor to send you, and you do not need to have a diagnosis to come.`,
      },
      {
        q: "What actually happens in a first counselling session?",
        a: "Mostly listening. The first session is about understanding what has been happening, how long it has been going on, and what you want to be different — not about being assessed or labelled. You set the pace, and you are not obliged to discuss anything you are not ready to.",
      },
      {
        q: "Can children be seen for counselling?",
        a: "Yes. Behavioural concerns, exam pressure, changes in mood or school performance, sleep problems and difficulties at home are common reasons children and teenagers are brought in. Children often express distress through behaviour before they can put it into words, so a change worth noticing is worth acting on.",
      },
      {
        q: "How is exam stress treated?",
        a: "By working on what is actually happening — sleep, the panic itself, the thinking that feeds it, and how preparation is structured — rather than by telling a student to relax. Exam pressure is one of the most common reasons young people are seen, and it responds well to being addressed directly.",
      },
      {
        q: "I am having thoughts of harming myself. What should I do?",
        a: `Please do not wait for an appointment. Call ${PHONE}, which is answered 24 hours, or a mental health helpline, or go to the nearest hospital with a 24-hour emergency department. Tell someone near you now. This is treatable and you should not be handling it alone.`,
      },
    ],
  },

  Pathology: {
    summary:
      "Pathology at AJ Subaitha Medical Centre in Egmore, Chennai is an in-house laboratory for blood tests, urine tests, biopsies and routine screening. Samples are processed in the building, so most reports reach your doctor within the same visit. The laboratory operates alongside outpatient consultations, Monday to Saturday, 10am to 9pm.",
    covers: [
      {
        title: "Blood tests",
        body: "Blood tests are how most of the conditions that cause no symptoms get found — anaemia, diabetes, thyroid disorders, cholesterol, infection, and how the kidneys and liver are working. They turn a vague complaint like tiredness into something specific enough to treat.",
      },
      {
        title: "Urine tests",
        body: "Urine testing identifies infection, blood, protein and sugar, which makes it central to diagnosing urinary infections and to monitoring diabetes and kidney health.",
      },
      {
        title: "Biopsies",
        body: "A biopsy is the examination of a small sample of tissue. It is how a diagnosis is confirmed rather than presumed, and being sent for one is a step towards an answer, not a verdict.",
      },
      {
        title: "Routine screening",
        body: "Screening is testing done while you feel well, to find things early. That is the whole point of it: blood pressure, sugar, cholesterol, thyroid and anaemia are all easier to deal with well before they announce themselves.",
      },
      {
        title: "Reports within the same visit",
        body: "Because the laboratory is in the building, samples do not travel to an outside lab and reports do not wait on a courier. Most reports for tests ordered on the day reach your consultant within the same visit, which often means your treatment is decided before you go home instead of at a second appointment.",
      },
    ],
    whenToSee: [
      "Your consultant has ordered tests and you want them done in the same visit",
      "You are due an annual health check",
      "Tiredness, weakness or weight change that has not been explained",
      "A long-term condition that needs monitoring — diabetes, thyroid, blood pressure",
      "Diabetes, heart disease or thyroid problems in the family",
      "A previous abnormal result that was never repeated",
    ],
    faqs: [
      {
        q: "Does AJSMC have its own laboratory?",
        a: `Yes. AJSMC has an in-house laboratory in the building at Egmore, Chennai, handling blood tests, urine tests, biopsies and routine screening. Because samples are processed on site rather than sent out, most reports reach your doctor within the same visit.`,
      },
      {
        q: "How quickly will I get my report?",
        a: "Most reports for tests ordered during your consultation reach your consultant within the same visit. That is the practical value of the laboratory being in the building — it often means your treatment can be decided before you leave rather than at a second appointment. Some specialised tests take longer, and you will be told which those are.",
      },
      {
        q: "Do I need to fast before a blood test?",
        a: `It depends entirely on the test — some sugar and cholesterol tests need fasting, many others do not. Call ${PHONE} and ask before you come, so you do not fast unnecessarily or give a sample that cannot be interpreted.`,
      },
      {
        q: "Can I get tests done without seeing a doctor first?",
        a: `Call ${PHONE} and ask about what you need. A consultation is usually worth having even so — a result on its own is a number, and what it means depends on your history, your symptoms and what else is being measured.`,
      },
      {
        q: "What is a biopsy, and should I be worried if one is suggested?",
        a: "A biopsy is the examination of a small sample of tissue under a microscope. It is suggested when a diagnosis needs to be confirmed rather than assumed, and confirming works in both directions — a great many biopsies return reassuring results. It is a step towards a definite answer.",
      },
      {
        q: "What should I bring for tests?",
        a: "Bring the request from your consultant, any previous reports of the same tests so results can be compared over time, and the actual strips of medicines you take — some affect results, and your consultant needs to know what you are on.",
      },
    ],
  },
};
