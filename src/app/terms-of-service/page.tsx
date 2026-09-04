import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing the use of the ${siteConfig.fullName} website.`,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <Container as="section" className="max-w-[820px] pb-16 pt-[124px]">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy">Terms of Service</h1>
      <p className="mt-3 font-body text-sm text-muted">Last updated: 21 August 2026</p>

      <div className="mt-8 flex flex-col gap-6 font-body text-[15px] leading-relaxed text-body">
        <p>
          These terms govern your use of the {siteConfig.fullName} (&ldquo;AJSMC&rdquo;) website. By
          browsing this site or submitting a form, you agree to these terms.
        </p>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Website use</h2>
          <p>
            This website provides general information about AJSMC&apos;s specialities, doctors and
            facilities. Content is provided for informational purposes and does not constitute
            medical advice or a diagnosis.
          </p>
        </section>
        {/* Google's quality guidelines treat health content as YMYL and rate a page that
            gives medical information with no accountable source at the bottom of the
            scale. A plain disclaimer is also the honest thing to publish on a site whose
            readers are deciding what to do about a symptom. */}
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Medical disclaimer</h2>
          <p>
            Nothing on this website is a substitute for being examined by a doctor. The
            descriptions of departments, conditions and procedures here are general, and they
            cannot account for your history, your medication or your test results. Do not use
            this site to diagnose yourself, and do not start, stop or change any treatment on
            the strength of something you read here. If a symptom worries you, book a
            consultation on {siteConfig.phone} and let a doctor examine you.
          </p>
          <p className="mt-3">
            AJSMC does not operate a casualty or trauma unit. If you are dealing with chest
            pain, breathlessness, stroke symptoms, heavy bleeding, a serious injury, poisoning
            or any other life-threatening emergency, call 108 or go straight to the nearest
            hospital with a 24-hour emergency department. Do not wait for a reply to a form or
            a message.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Appointments</h2>
          <p>
            Submitting the appointment or contact form is a request only and does not guarantee a
            confirmed slot until our team contacts you. For anything urgent, call{" "}
            {siteConfig.phone} directly rather than using the website form. AJSMC does not run a
            casualty or trauma unit, so in a medical emergency call 108 or go to the nearest
            hospital with a 24-hour emergency department.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Accuracy of information</h2>
          <p>
            While we aim to keep doctor listings, speciality details and timings up to date,
            AJSMC does not warrant that all content on this site is error-free at all times. Please
            confirm details directly with our team when booking.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Content and ownership</h2>
          <p>
            The text, photographs and artwork on this site belong to AJSMC or are used with
            permission. You are welcome to link to any page; please do not reproduce pages or
            images elsewhere without asking us first.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Governing law</h2>
          <p>
            These terms are governed by the laws of India, and any dispute relating to this
            website is subject to the jurisdiction of the courts at Chennai, Tamil Nadu.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={siteConfig.emailHref} className="font-semibold text-navy">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
