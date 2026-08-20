import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.fullName} collects, uses and protects patient and visitor information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

// Every claim on this page was checked against what the site actually does before
// launch: no analytics package, no cookies set by the app, no account system, no
// advertising trackers. If any of those change, this page must change with them.
export default function PrivacyPolicyPage() {
  return (
    <Container as="section" className="max-w-[820px] pb-16 pt-[124px]">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-navy">Privacy Policy</h1>
      <p className="mt-3 font-body text-sm text-muted">Last updated: 21 August 2026</p>

      <div className="prose-aj mt-8 flex flex-col gap-6 font-body text-[15px] leading-relaxed text-body">
        <p>
          {siteConfig.fullName} (&ldquo;AJSMC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
          policy explains what information this website collects, what it is used for, and the
          choices you have. It applies to the website only — the information you share with your
          doctor during treatment is governed by medical confidentiality and the section on
          medical records below.
        </p>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Information we collect</h2>
          <p>
            When you use the appointment or contact forms on this site, we collect the details
            you type in — typically your name, phone number, the department you want and your
            message — solely to respond to your enquiry and schedule your visit. If you contact
            us by phone or WhatsApp instead, we receive the details you choose to share there.
          </p>
          <p className="mt-3">
            This site has no user accounts and sets no advertising or analytics cookies. Like
            almost every website, our hosting infrastructure keeps standard technical logs
            (such as IP address and pages requested) for security and operations; these are
            retained briefly and are not used to profile you.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">How we use your information</h2>
          <p>
            Information submitted through this website is used only to contact you about your
            appointment or enquiry. We do not sell your personal information, and we do not
            share it with third parties for marketing.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Who processes it on our behalf</h2>
          <p>
            The website runs on reputable infrastructure providers (web hosting and email
            delivery), which process data only as needed to operate the site and deliver your
            enquiry to our front desk. Links on this site that open WhatsApp or Google Maps
            take you to those services, which have their own privacy policies.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">How long we keep it</h2>
          <p>
            Enquiry details are kept only as long as needed to handle your request and maintain
            a record of the correspondence, after which they are deleted in the ordinary course
            of mailbox housekeeping.
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
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Your rights</h2>
          <p>
            You can ask us what information we hold about you from your website enquiries, ask
            us to correct it, or ask us to delete it, subject to applicable law including the
            Digital Personal Data Protection Act, 2023. Write to{" "}
            <a href={siteConfig.emailHref} className="font-semibold text-navy">
              {siteConfig.email}
            </a>{" "}
            and we will respond.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Changes to this policy</h2>
          <p>
            If we change how this website handles personal information — for example, by adding
            analytics or online payments — this page will be updated first, with a new date at
            the top.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-heading text-xl font-bold text-navy">Contact us</h2>
          <p>
            For questions about this policy or your data, contact us at{" "}
            <a href={siteConfig.emailHref} className="font-semibold text-navy">
              {siteConfig.email}
            </a>{" "}
            or {siteConfig.phone}, or write to {siteConfig.address.line1},{" "}
            {siteConfig.address.locality}, {siteConfig.address.region} —{" "}
            {siteConfig.address.postalCode}.
          </p>
        </section>
      </div>
    </Container>
  );
}
