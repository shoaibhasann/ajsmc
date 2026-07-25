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
      <p className="mt-3 font-body text-sm text-muted">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-8 flex flex-col gap-6 font-body text-[15px] leading-relaxed text-body">
        <p>
          These terms govern your use of the {siteConfig.fullName} (&ldquo;AJSMC&rdquo;) website. By
          browsing this site or submitting a form, you agree to these terms.
        </p>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Website use</h2>
          <p>
            This website provides general information about AJSMC&apos;s specialties, doctors and
            facilities. Content is provided for informational purposes and does not constitute
            medical advice or a diagnosis.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Appointments</h2>
          <p>
            Submitting the appointment or contact form is a request only and does not guarantee a
            confirmed slot until our team contacts you. For urgent or emergency care, please call{" "}
            {siteConfig.phone} directly rather than using the website form.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Accuracy of information</h2>
          <p>
            While we aim to keep doctor listings, specialties and pricing information up to date,
            AJSMC does not warrant that all content on this site is error-free at all times. Please
            confirm details directly with our team when booking.
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
        <p className="text-xs text-faint">
          This is a general placeholder document. AJSMC should have this document reviewed by
          legal counsel before relying on it as complete terms of service.
        </p>
      </div>
    </Container>
  );
}
