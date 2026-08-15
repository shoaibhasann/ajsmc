import { Sparkles } from "lucide-react";

/**
 * The whole page in one paragraph, near the top.
 *
 * Two readers, one block. A person who has landed here from a search and wants to know in
 * five seconds whether this is the right department gets the answer without scrolling. An
 * answer engine gets a passage that survives being quoted on its own — it names the
 * department, the hospital, the city and the hours, so it still means something with none
 * of the surrounding page attached.
 *
 * Solid white rather than a tint. It sits over hero artwork whose brightness varies by
 * viewport, and a translucent panel would make the text's contrast depend on whatever
 * happens to be behind it.
 */
export function SpecialtySummary({ summary }: { summary: string }) {
  return (
    <div className="mt-7 max-w-[620px] rounded-[20px] border border-navy/[0.1] bg-white p-5 shadow-[0_20px_44px_-30px_rgba(12,46,110,0.5)] sm:p-6">
      <p className="mb-2.5 flex items-center gap-2 font-body text-[11.5px] font-bold uppercase tracking-[0.14em] text-green-deep">
        <Sparkles className="h-[15px] w-[15px]" strokeWidth={2.4} />
        In short
      </p>
      <p className="font-body text-[15px] leading-relaxed text-body sm:text-base">{summary}</p>
    </div>
  );
}
