import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { SpecialtyContent } from "@/lib/specialty-content";

/**
 * What the department handles, in plain language.
 *
 * Written as explanation rather than as a list of services: what the condition actually is,
 * why it matters, and what is realistic about treating it. A list of names tells a worried
 * person nothing they could not get from the department title.
 */
export function SpecialtyCovers({
  specialtyName,
  covers,
}: {
  specialtyName: string;
  covers: SpecialtyContent["covers"];
}) {
  return (
    <Container as="section" className="py-14 lg:py-16">
      <SectionBadge tone="green">WHAT THIS DEPARTMENT TREATS</SectionBadge>
      <h2 className="mt-4.5 max-w-[720px] font-heading text-[28px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[34px]">
        {specialtyName} at AJSMC, explained
      </h2>
      <p className="mt-4 max-w-[620px] font-body text-base leading-relaxed text-body">
        If you are not sure whether this is the department you need, this is what it covers
        and what each of these conditions actually involves.
      </p>

      <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        {covers.map((item) => (
          <article
            key={item.title}
            className="rounded-[20px] border border-navy/[0.09] aj-card p-6 transition-shadow hover:shadow-[0_22px_44px_-30px_rgba(12,46,110,0.5)]"
          >
            <h3 className="font-heading text-[19px] font-bold leading-snug text-navy">
              {item.title}
            </h3>
            <p className="mt-2.5 font-body text-[15px] leading-relaxed text-body">{item.body}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}

/**
 * The symptom-level list. People search what they are feeling, not what it is called, so
 * these are phrased as the complaint rather than as the diagnosis it might turn out to be.
 */
export function WhenToSee({
  specialtyName,
  items,
}: {
  specialtyName: string;
  items: string[];
}) {
  return (
    <section className="bg-soft-blue/40 py-14 lg:py-16">
      <Container>
        <SectionBadge tone="green">WHEN TO COME IN</SectionBadge>
        <h2 className="mt-4.5 max-w-[720px] font-heading text-[28px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[34px]">
          When to see a consultant in {specialtyName}
        </h2>
        <p className="mt-4 max-w-[620px] font-body text-base leading-relaxed text-body">
          Not every symptom needs a specialist, and waiting is reasonable for a great many of
          them. These are the ones worth an appointment rather than another week of watching.
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-soft-green">
                <Check className="h-3.5 w-3.5 text-green-deep" strokeWidth={3} />
              </span>
              <span className="font-body text-[15px] leading-relaxed text-body">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
