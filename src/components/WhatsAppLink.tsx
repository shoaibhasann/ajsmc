"use client";

import { track } from "@vercel/analytics";
import { siteConfig } from "@/lib/site";

/**
 * Every WhatsApp link on the site, so the taps can be counted.
 *
 * WhatsApp is the one route a phone visitor reliably takes — the floating button is the
 * only always-visible control on an article that runs thirty-one screens — and until now
 * a tap on it left no trace anywhere we could see. An enquiry that arrives as a WhatsApp
 * message never reaches helpdesk@ajsmc.in, so the site looked as though it converted
 * nobody while the conversations were happening on somebody's phone.
 *
 * `from` is what makes the number useful rather than merely large: it separates the
 * floating button from the article blocks from the confirmation dialog, so it is possible
 * to tell which placement is actually doing the work.
 *
 * The event fires and the browser follows the href — `track` posts with sendBeacon, which
 * survives the page being replaced, so there is no need to delay the navigation. If the
 * call fails for any reason the link still opens; nothing here can stop a patient
 * reaching the hospital.
 */
export function WhatsAppLink({
  from,
  className,
  "aria-label": ariaLabel,
  children,
}: {
  /** Where on the site the tap happened — "float", "article-mid", "article-foot", "sent-dialog". */
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
      onClick={() => {
        try {
          track("whatsapp_click", { from });
        } catch {
          // Counting is not worth breaking a link over.
        }
      }}
    >
      {children}
    </a>
  );
}
