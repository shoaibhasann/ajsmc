import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { assets } from "@/lib/assets";
import { listedDoctors, siteConfig, specialties } from "@/lib/site";

// Derived, not typed in. These numbers appear in several places across the site and
// drifted apart last time they were hardcoded.
const stats = [
  { value: `${specialties.length}`, label: "Departments" },
  { value: "24/7", label: "Helpline service" },
  { value: `${listedDoctors.length}`, label: "Specialist doctors" },
];

export function Story() {
  return (
    <Container as="section" className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-14">
      <div className="relative min-h-[340px] overflow-hidden rounded-[26px] bg-tile-blue sm:min-h-[440px]">
        <Image
          src={assets.hospitalBuilding.src}
          alt={assets.hospitalBuilding.alt}
          fill
          sizes="(min-width: 1024px) 552px, 100vw"
          className="object-cover"
        />
        <div className="absolute bottom-5 left-5 flex gap-3">
          <div className="rounded-2xl bg-white/90 px-[18px] py-3.5 shadow-[0_20px_40px_-22px_rgba(12,46,110,0.5)] backdrop-blur-md">
            <div className="font-heading text-2xl font-extrabold text-navy">{siteConfig.founded}</div>
            <div className="font-body text-[11px] font-medium text-muted">Centre opened</div>
          </div>
          <div className="rounded-2xl bg-navy/[0.92] px-[18px] py-3.5 shadow-[0_20px_40px_-22px_rgba(12,46,110,0.5)] backdrop-blur-md">
            <div className="font-heading text-2xl font-extrabold text-green-bright">{listedDoctors.length}</div>
            <div className="font-body text-[11px] font-medium text-white/75">Specialists</div>
          </div>
        </div>
      </div>

      <div>
        <SectionBadge tone="solid">OUR STORY</SectionBadge>
        <h2 className="mt-4.5 font-heading text-[28px] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[34px] lg:text-[clamp(28px,3.4vw,42px)]">
          Fifty years of practice, in one building since 2023
        </h2>
        <p className="mt-4.5 font-body text-[15px] leading-[1.75] text-body">
          It starts in {siteConfig.practiceSince}, in Madurai, where Dr. A. Ameer Jahan opened
          Ameeri Speciality Clinic. A practice in Delhi followed, then one in Chennai, and all
          three still run. In {siteConfig.founded} the Chennai practice became AJ Subaitha
          Medical Centre — the same care, with the departments, the theatre and the laboratory
          brought into one building on Police Commissioner Office Road in Egmore.
        </p>
        <p className="mt-3.5 font-body text-[15px] leading-[1.75] text-body">
          The idea behind it did not change: a family should not have to travel across Chennai,
          or pay heavily, to see a good specialist. Today {listedDoctors.length} consultants
          practise here across {specialties.length} departments.
        </p>
        <p className="mt-3.5 font-body text-[15px] leading-[1.75] text-body">
          That covers most of what a family needs in a year. Everyday consultations and
          health checks. Day-care surgery, where you have the procedure and go home the same
          evening. Sleep studies for snoring and breathing trouble at night. Lab tests and
          imaging done in house, so results reach your doctor the same visit instead of a
          week later.
        </p>
        <p className="mt-3.5 font-body text-[15px] leading-[1.75] text-body">
          Our helpline runs 24 hours. We are not a casualty or trauma unit, so if you are
          facing a genuine emergency, please call 108 or head to the nearest hospital with an
          emergency department. For everything else, we are a phone call away.
        </p>
        <div className="mt-6.5 grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={i > 0 ? "border-l border-navy/[0.1] pl-4" : ""}
            >
              <div className="font-heading text-[26px] font-extrabold leading-none text-navy sm:text-[30px]">
                {stat.value}
              </div>
              <div className="mt-1.5 font-body text-[12px] font-medium leading-snug text-muted sm:text-[13px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
