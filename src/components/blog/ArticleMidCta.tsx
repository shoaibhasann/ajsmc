import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { siteConfig } from "@/lib/site";

/**
 * A slim booking prompt, dropped into the middle of a long article.
 *
 * Not the navy block that closes the page. That one is a destination: the reader has
 * finished, and a large card asking what to do next is the right size for the moment. In
 * the middle of a piece the same card reads as an ad break, and the reader is still
 * reading — the job here is to be available, not to interrupt.
 *
 * So: one line, one control, the width of the prose column, and no heading. It exists
 * because these articles run to thirty-one phone screens and the next booking link after
 * this point is at the very bottom.
 *
 * WhatsApp sits beside the appointment link because on this site it is the route people
 * actually take on a phone, and because an article read at 11pm is a poor moment to be
 * offered only a form.
 */
export function ArticleMidCta() {
  return (
    <aside className="my-11 flex flex-col gap-3.5 rounded-[18px] border border-navy/[0.1] bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-4">
      <p className="font-body text-[14.5px] leading-relaxed text-body">
        Want this looked at rather than read about?{" "}
        <span className="font-semibold text-navy">
          Outpatient consultations run {siteConfig.hoursShort}.
        </span>
      </p>

      <div className="flex shrink-0 items-center gap-2.5">
        <Link
          href="/#appointment"
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-navy pl-[18px] pr-4 font-body text-[14px] font-bold text-white transition-opacity hover:opacity-90"
        >
          <span>Book</span>
          <ArrowUpRight className="h-[15px] w-[15px]" strokeWidth={2.7} />
        </Link>
        <WhatsAppLink
          from="article-mid"
          aria-label="Message AJSMC on WhatsApp"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-white"
        >
          <MessageCircle className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </WhatsAppLink>
      </div>
    </aside>
  );
}
