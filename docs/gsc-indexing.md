# Search Console indexing — ajsmc.in

65 URLs. Google Search Console's Request Indexing quota is roughly 10 to 12 URLs a day,
so this runs over four or five days. Tick as you go — this file is the only record of
where you got to.

**Bing is already done.** Every URL went to IndexNow, which covers Bing, Yandex, Seznam
and Naver. Nothing further is needed there, and it does not need repeating unless a page
changes. `/api/indexnow` submits changed pages on its own schedule after that.

**Do this before any of the below:** submit `https://ajsmc.in/sitemap.xml` in Search
Console. That hands Google all 65 at once. The list underneath only makes the important
ones move faster — it is not how the rest get found.

Property: the account the verification token was rotated to on 7 September 2026
(`7Ju7JQjbLYvbECOzgyVbtBPk9yc2meTMTRvp_61RZb0`).

## Day 1 — new URLs (6)

Published 6 September 2026 and never crawled. These matter most.

- [ ] https://ajsmc.in/blog/female-infertility-tests
- [ ] https://ajsmc.in/blog/pre-marital-check-up
- [ ] https://ajsmc.in/blog/semen-analysis-explained
- [ ] https://ajsmc.in/blog/sti-testing-window-period
- [ ] https://ajsmc.in/specialties/general-surgery
- [ ] https://ajsmc.in/doctors/abishek

## Day 1 or 2 — pages whose content changed (6)

Founding year, the ten-bed correction, the roster, and the listing order all changed here.

- [ ] https://ajsmc.in
- [ ] https://ajsmc.in/about
- [ ] https://ajsmc.in/blog
- [ ] https://ajsmc.in/contact
- [ ] https://ajsmc.in/doctors
- [ ] https://ajsmc.in/specialties

## Day 2 to 3 — corrected articles (14)

Each of these had the no-inpatient-beds claim corrected. Google has the old text.

- [ ] https://ajsmc.in/blog/child-fever
- [ ] https://ajsmc.in/blog/child-vaccination
- [ ] https://ajsmc.in/blog/counselling-first-session
- [ ] https://ajsmc.in/blog/dengue-platelets
- [ ] https://ajsmc.in/blog/fatty-liver-grades
- [ ] https://ajsmc.in/blog/first-diabetes-visit
- [ ] https://ajsmc.in/blog/health-checkup-after-40
- [ ] https://ajsmc.in/blog/high-sugar-screening
- [ ] https://ajsmc.in/blog/how-fast-you-age
- [ ] https://ajsmc.in/blog/leptospirosis
- [ ] https://ajsmc.in/blog/monsoon-fever
- [ ] https://ajsmc.in/blog/pap-smear
- [ ] https://ajsmc.in/blog/pcos-testing
- [ ] https://ajsmc.in/blog/vomiting-loose-motion

## Day 3 to 4 — department pages (11)

The red-flag block and the overnight-cover wording changed on these.

- [ ] https://ajsmc.in/specialties/dermatology
- [ ] https://ajsmc.in/specialties/diabetology
- [ ] https://ajsmc.in/specialties/general-medicine
- [ ] https://ajsmc.in/specialties/obstetrics-gynaecology
- [ ] https://ajsmc.in/specialties/ophthalmology
- [ ] https://ajsmc.in/specialties/orthopedics
- [ ] https://ajsmc.in/specialties/pathology
- [ ] https://ajsmc.in/specialties/pediatrics
- [ ] https://ajsmc.in/specialties/psychology
- [ ] https://ajsmc.in/specialties/reproductive-medicine
- [ ] https://ajsmc.in/specialties/urology

## Day 4 to 5 — consultant profiles (28)

The registration badge came off every one of these. Lowest priority: the sitemap will reach them on its own well before you finish ticking.

- [ ] https://ajsmc.in/doctors/a-ameer-jahan
- [ ] https://ajsmc.in/doctors/a-muhammed-shadique
- [ ] https://ajsmc.in/doctors/a-najeerul-ameen
- [ ] https://ajsmc.in/doctors/a-sajitha-begum
- [ ] https://ajsmc.in/doctors/ar-chandrasekar
- [ ] https://ajsmc.in/doctors/arun
- [ ] https://ajsmc.in/doctors/as-bharathi-sezhian
- [ ] https://ajsmc.in/doctors/ashutosh-kumar-singh
- [ ] https://ajsmc.in/doctors/balachander-rajendiran
- [ ] https://ajsmc.in/doctors/chaithra-h-a
- [ ] https://ajsmc.in/doctors/chynna-christina
- [ ] https://ajsmc.in/doctors/d-divya-dakshani
- [ ] https://ajsmc.in/doctors/d-naveen-kumar
- [ ] https://ajsmc.in/doctors/e-alexander
- [ ] https://ajsmc.in/doctors/g-sarala
- [ ] https://ajsmc.in/doctors/jeric-ashwin
- [ ] https://ajsmc.in/doctors/karthikeyan
- [ ] https://ajsmc.in/doctors/md-nizamuddin-khan
- [ ] https://ajsmc.in/doctors/mohamed-moideen
- [ ] https://ajsmc.in/doctors/mohammad-abdul-qadir
- [ ] https://ajsmc.in/doctors/murali
- [ ] https://ajsmc.in/doctors/n-risswana-parveen
- [ ] https://ajsmc.in/doctors/nelliapar
- [ ] https://ajsmc.in/doctors/pradeep-sathya
- [ ] https://ajsmc.in/doctors/rm-fahadh
- [ ] https://ajsmc.in/doctors/sarvath
- [ ] https://ajsmc.in/doctors/sivaramakrishnan-s
- [ ] https://ajsmc.in/doctors/syed-ismail

---

## Checks worth running afterwards

- [ ] Coverage report shows 65 valid, 0 excluded that should not be
- [ ] No `Duplicate without user-selected canonical` on `/specialties/pediatrics` or
      `/specialties/orthopedics` — those two URLs keep American spelling deliberately
      while the pages read Paediatrics and Orthopaedics
- [ ] The four articles awaiting review are indexed without a `reviewedBy` in their
      structured data — that is intentional until the reviewer signs off
