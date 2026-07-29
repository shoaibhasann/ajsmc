import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.fullName} collects, uses and protects patient and visitor information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <Container as="section" className="max-w-[820px] pb-16 pt-[124px]">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy">Privacy Policy</h1>
      <p className="mt-3 font-body text-sm text-muted">Last updated: {new Date().getFullYear()}</p>

      <div className="prose-aj mt-8 flex flex-col gap-6 font-body text-[15px] leading-relaxed text-body">
        <p>
          {siteConfig.fullName} (&ldquo;AJSMC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
          policy explains what information we collect through this website and how it is used.
        </p>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Information we collect</h2>
          <p>
            When you use our appointment or contact forms, we collect the details you provide,
            such as your name, phone number, email address and the department or message you
            enter, solely to respond to your enquiry and schedule your visit.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">How we use your information</h2>
          <p>
            Information submitted through this website is used only to contact you about your
            appointment or enquiry. We do not sell or share your personal information with third
            parties for marketing purposes.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Medical records</h2>
          <p>
            Any medical records created during your treatment at AJSMC are maintained separately
            from this website in accordance with applicable healthcare regulations, and are not
            stored or processed through this site.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Contact us</h2>
          <p>
            For questions about this policy or your data, contact us at{" "}
            <a href={siteConfig.emailHref} className="font-semibold text-navy">
              {siteConfig.email}
            </a>{" "}
            or {siteConfig.phone}.
          </p>
        </section>
        <p className="text-xs text-faint">
          This is a general placeholder policy. AJSMC should have this document reviewed by legal
          counsel before relying on it as a complete privacy policy.
        </p>
      </div>
    </Container>
  );
}
