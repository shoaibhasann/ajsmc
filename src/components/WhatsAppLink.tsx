import { siteConfig } from "@/lib/site";

/**
 * A WhatsApp link carrying the label of where on the page it sits.
 *
 * WhatsApp is the one route a phone visitor reliably takes — the floating button is the
 * only always-visible control on an article that runs thirty-one screens — and an
 * enquiry that arrives as a WhatsApp message never reaches helpdesk@ajsmc.in. So the tap
 * is the only evidence the site produced it.
 *
 * The counting happens in AnalyticsEvents, which listens for every WhatsApp, phone and
 * map link on the document. This component only supplies `data-cta`, which is what turns
 * the count into something useful: it separates the floating button from the article
 * blocks from the confirmation dialog, so it is possible to see which placement is doing
 * the work. That also means this no longer needs to be a client component.
 */
export function WhatsAppLink({
  from,
  className,
  "aria-label": ariaLabel,
  children,
}: {
  /** Where on the site the tap happened — "article-mid", "article-foot", and so on. */
  from: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      data-cta={from}
    >
      {children}
    </a>
  );
}
