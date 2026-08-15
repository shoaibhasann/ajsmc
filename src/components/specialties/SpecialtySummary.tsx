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
 * Glass, not a solid surface — it sits on the hero artwork and is meant to let it through.
 * The tint is three brand colours at low alpha, in the order the brand gradient uses them,
 * over a white base held at 0.72. That base is not decoration: it is what keeps the body
 * text at a measured 5.9:1 whichever department's hero happens to be behind it, which fully
 * transparent glass could not promise. See `.aj-card-glass` in globals.css.
 */
export function SpecialtySummary({ summary }: { summary: string }) {
  return (
    <div className="aj-card-glass mt-7 max-w-[620px] rounded-[20px] p-5 sm:p-6">
      {/* Navy label, green icon. On a solid card this would be green like every other
          eyebrow on the site, but glass means the backdrop sets the contrast, and at this
          size green-deep landed at 4.14:1 through the panel. Navy is 9.4:1 through the same
          panel whatever the hero behind it is doing. The icon can stay green — it is
          decorative and carries no meaning the label does not. */}
      <p className="mb-2.5 flex items-center gap-2 font-body text-[11.5px] font-bold uppercase tracking-[0.14em] text-navy">
        <Sparkles className="h-[15px] w-[15px] text-green-deep" strokeWidth={2.4} />
        In short
      </p>
      {/* font-medium, not the body default. The panel was made more transparent so the
          artwork shows through, and weight is what keeps the text legible against a
          backdrop that is now doing more of the talking. */}
      <p className="font-body text-[15px] font-medium leading-relaxed text-body sm:text-base">
        {summary}
      </p>
    </div>
  );
}
